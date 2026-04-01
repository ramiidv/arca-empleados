import { describe, it, expect } from 'vitest';
import {
  formatDate,
  boolToStr,
  serializeAlta,
  serializeBaja,
  serializeHeader,
  serializeModificacion,
  serializeDatosComplementarios,
  serializeCBU,
  serializeRelacionFamiliar,
  serializeDomicilio,
} from '../src/serializer.js';
import type { AltaEmpleado, BajaEmpleado, F935Archivo, DomicilioExplotacion } from '../src/types.js';

// ---------------------------------------------------------------------------
// formatDate
// ---------------------------------------------------------------------------

describe('formatDate', () => {
  it('formats a date as DDMMYYYY', () => {
    const date = new Date(2024, 0, 15); // January 15, 2024
    expect(formatDate(date)).toBe('15012024');
  });

  it('pads single-digit day and month', () => {
    const date = new Date(2024, 2, 5); // March 5, 2024
    expect(formatDate(date)).toBe('05032024');
  });

  it('handles December 31', () => {
    const date = new Date(2024, 11, 31); // December 31, 2024
    expect(formatDate(date)).toBe('31122024');
  });

  it('handles January 1', () => {
    const date = new Date(2025, 0, 1); // January 1, 2025
    expect(formatDate(date)).toBe('01012025');
  });
});

// ---------------------------------------------------------------------------
// boolToStr
// ---------------------------------------------------------------------------

describe('boolToStr', () => {
  it('converts true to "S"', () => {
    expect(boolToStr(true)).toBe('S');
  });

  it('converts false to "N"', () => {
    expect(boolToStr(false)).toBe('N');
  });

  it('converts undefined to "N"', () => {
    expect(boolToStr(undefined)).toBe('N');
  });
});

// ---------------------------------------------------------------------------
// serializeHeader
// ---------------------------------------------------------------------------

describe('serializeHeader', () => {
  it('produces correct pipe-delimited header', () => {
    const archivo: F935Archivo = {
      cuitEmpleador: '30-71234567-1',
      razonSocial: 'Empresa SA',
      fechaGeneracion: new Date(2024, 5, 15), // June 15, 2024
      registros: [],
      cantidadRegistros: 3,
    };

    const header = serializeHeader(archivo);
    const parts = header.split('|');

    expect(parts[0]).toBe('00');
    expect(parts[1]).toBe('30712345671'); // normalized CUIT
    expect(parts[2]).toBe('Empresa SA');
    expect(parts[3]).toBe('15062024');
    expect(parts[4]).toBe('3');
    // Ends with trailing pipe
    expect(header.endsWith('|')).toBe(true);
  });

  it('handles empty razonSocial', () => {
    const archivo: F935Archivo = {
      cuitEmpleador: '30712345671',
      fechaGeneracion: new Date(2024, 0, 1),
      registros: [],
      cantidadRegistros: 0,
    };

    const header = serializeHeader(archivo);
    const parts = header.split('|');

    expect(parts[2]).toBe(''); // empty razon social
  });
});

// ---------------------------------------------------------------------------
// serializeAlta
// ---------------------------------------------------------------------------

describe('serializeAlta', () => {
  it('produces correct pipe-delimited alta output', () => {
    const alta: AltaEmpleado = {
      cuil: '20-12345678-6',
      fechaInicio: new Date(2024, 0, 15),
      modalidadContratacion: 8,
      obraSocial: '100000',
      domicilioExplotacion: {
        calle: 'Av. Corrientes',
        numero: '1234',
        piso: '3',
        depto: 'A',
        localidad: 'CABA',
        codigoPostal: '1043',
        provincia: 0,
        telefono: '1155551234',
      },
      actividadEconomica: '620100',
      trabajadorAgropecuario: false,
    };

    const line = serializeAlta('30-71234567-1', alta);
    const parts = line.split('|');

    expect(parts[0]).toBe('01'); // record type
    expect(parts[1]).toBe('30712345671'); // CUIT empleador normalized
    expect(parts[2]).toBe('0'); // TipoOperacion.ALTA
    expect(parts[3]).toBe('20123456786'); // CUIL normalized
    expect(parts[4]).toBe('15012024'); // fecha inicio
    expect(parts[5]).toBe('8'); // modalidad
    expect(parts[6]).toBe('100000'); // obra social
    expect(parts[7]).toBe('620100'); // actividad economica
    expect(parts[8]).toBe('N'); // trabajadorAgropecuario = false
    expect(parts[9]).toBe(''); // fechaFin empty
    expect(parts[10]).toBe('Av. Corrientes'); // calle
    expect(parts[11]).toBe('1234'); // numero
    expect(parts[12]).toBe('3'); // piso
    expect(parts[13]).toBe('A'); // depto
    expect(parts[14]).toBe('CABA'); // localidad
    expect(parts[15]).toBe('1043'); // CP
    expect(parts[16]).toBe('0'); // provincia
    expect(parts[17]).toBe('1155551234'); // telefono
    // Trailing pipe
    expect(line.endsWith('|')).toBe(true);
  });

  it('includes fechaFin when provided', () => {
    const alta: AltaEmpleado = {
      cuil: '20123456786',
      fechaInicio: new Date(2024, 0, 15),
      modalidadContratacion: 22,
      obraSocial: '100000',
      domicilioExplotacion: {
        calle: 'Calle',
        numero: '1',
        localidad: 'Loc',
        codigoPostal: '1000',
        provincia: 1,
      },
      actividadEconomica: '620100',
      fechaFin: new Date(2024, 11, 31),
    };

    const line = serializeAlta('30712345671', alta);
    const parts = line.split('|');

    expect(parts[9]).toBe('31122024'); // fechaFin
  });

  it('escapes pipe characters in text fields', () => {
    const alta: AltaEmpleado = {
      cuil: '20123456786',
      fechaInicio: new Date(2024, 0, 15),
      modalidadContratacion: 8,
      obraSocial: '100000',
      domicilioExplotacion: {
        calle: 'Calle|Con|Pipes',
        numero: '1',
        localidad: 'Loc',
        codigoPostal: '1000',
        provincia: 0,
      },
      actividadEconomica: '620100',
    };

    const line = serializeAlta('30712345671', alta);

    // Pipes in text fields should be escaped
    expect(line).toContain('Calle\\|Con\\|Pipes');
  });
});

// ---------------------------------------------------------------------------
// serializeBaja
// ---------------------------------------------------------------------------

describe('serializeBaja', () => {
  it('produces correct pipe-delimited baja output', () => {
    const baja: BajaEmpleado = {
      cuil: '20-12345678-6',
      fechaBaja: new Date(2024, 5, 15),
      motivoBaja: 21,
    };

    const line = serializeBaja('30-71234567-1', baja);
    const parts = line.split('|');

    expect(parts[0]).toBe('01'); // record type
    expect(parts[1]).toBe('30712345671'); // CUIT empleador
    expect(parts[2]).toBe('1'); // TipoOperacion.BAJA
    expect(parts[3]).toBe('20123456786'); // CUIL
    expect(parts[4]).toBe('15062024'); // fecha baja
    expect(parts[5]).toBe('21'); // motivo baja (RENUNCIA)
    expect(line.endsWith('|')).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// serializeModificacion
// ---------------------------------------------------------------------------

describe('serializeModificacion', () => {
  it('produces correct output with partial fields', () => {
    const line = serializeModificacion('30712345671', {
      cuil: '20123456786',
      fechaInicio: new Date(2024, 0, 15),
      obraSocial: '200000',
    });
    const parts = line.split('|');

    expect(parts[0]).toBe('01');
    expect(parts[2]).toBe('2'); // TipoOperacion.MODIFICACION
    expect(parts[3]).toBe('20123456786');
    expect(parts[4]).toBe('15012024');
    expect(parts[5]).toBe(''); // modalidad empty
    expect(parts[6]).toBe('200000'); // obra social
    expect(parts[7]).toBe(''); // actividad empty
    expect(parts[8]).toBe(''); // trabajadorAgropecuario undefined -> ''
  });
});

// ---------------------------------------------------------------------------
// serializeDatosComplementarios
// ---------------------------------------------------------------------------

describe('serializeDatosComplementarios', () => {
  it('produces correct output', () => {
    const line = serializeDatosComplementarios('30712345671', {
      cuil: '20123456786',
      fechaInicio: new Date(2024, 0, 15),
      situacionRevista: 1,
      remuneracion: 1500000.50,
    });
    const parts = line.split('|');

    expect(parts[0]).toBe('02');
    expect(parts[1]).toBe('30712345671');
    expect(parts[2]).toBe('20123456786');
    expect(parts[3]).toBe('15012024');
    expect(parts[4]).toBe('1'); // situacionRevista
    expect(parts[11]).toBe('1500000.50'); // remuneracion formatted
  });
});

// ---------------------------------------------------------------------------
// serializeCBU
// ---------------------------------------------------------------------------

describe('serializeCBU', () => {
  it('produces correct output', () => {
    const line = serializeCBU('30712345671', {
      cuil: '20123456786',
      fechaInicio: new Date(2024, 0, 15),
      cbu: '0140006900000001234561',
      tipoCuenta: 1,
    });
    const parts = line.split('|');

    expect(parts[0]).toBe('03');
    expect(parts[1]).toBe('30712345671');
    expect(parts[2]).toBe('20123456786');
    expect(parts[3]).toBe('15012024');
    expect(parts[4]).toBe('0140006900000001234561');
    expect(parts[5]).toBe('1');
  });
});

// ---------------------------------------------------------------------------
// serializeRelacionFamiliar
// ---------------------------------------------------------------------------

describe('serializeRelacionFamiliar', () => {
  it('produces correct output', () => {
    const line = serializeRelacionFamiliar('30712345671', {
      cuil: '20123456786',
      fechaInicio: new Date(2024, 0, 15),
      tipoRelacion: 2,
      nombreFamiliar: 'PEDRO',
      apellidoFamiliar: 'PEREZ',
      fechaNacimiento: new Date(2010, 5, 20),
      discapacitado: false,
      escolaridad: 2,
    });
    const parts = line.split('|');

    expect(parts[0]).toBe('04');
    expect(parts[1]).toBe('30712345671');
    expect(parts[2]).toBe('20123456786');
    expect(parts[3]).toBe('15012024');
    expect(parts[4]).toBe('2'); // tipoRelacion
    expect(parts[5]).toBe(''); // cuilFamiliar empty
    expect(parts[6]).toBe(''); // dniFamiliar empty
    expect(parts[7]).toBe('PEDRO');
    expect(parts[8]).toBe('PEREZ');
    expect(parts[9]).toBe('20062010'); // fechaNacimiento
    expect(parts[10]).toBe('N'); // discapacitado false
    expect(parts[11]).toBe('2'); // escolaridad
  });
});

// ---------------------------------------------------------------------------
// serializeDomicilio
// ---------------------------------------------------------------------------

describe('serializeDomicilio', () => {
  it('produces correct output', () => {
    const line = serializeDomicilio('30712345671', {
      cuil: '20123456786',
      calle: 'Av. Rivadavia',
      numero: '5000',
      piso: '10',
      depto: 'B',
      localidad: 'CABA',
      codigoPostal: '1424',
      provincia: 0,
      telefono: '1144445555',
      actividadEconomica: '620100',
    });
    const parts = line.split('|');

    expect(parts[0]).toBe('05');
    expect(parts[1]).toBe('30712345671');
    expect(parts[2]).toBe('20123456786');
    expect(parts[3]).toBe('Av. Rivadavia');
    expect(parts[4]).toBe('5000');
    expect(parts[5]).toBe('10');
    expect(parts[6]).toBe('B');
    expect(parts[7]).toBe('CABA');
    expect(parts[8]).toBe('1424');
    expect(parts[9]).toBe('0');
    expect(parts[10]).toBe('1144445555');
    expect(parts[11]).toBe('620100');
  });
});
