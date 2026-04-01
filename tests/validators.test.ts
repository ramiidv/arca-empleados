import { describe, it, expect } from 'vitest';
import {
  validateCuil,
  validateCBU,
  normalizeCuil,
  formatCuil,
  validateAlta,
  validateBaja,
  validateModificacion,
  validateDomicilio,
} from '../src/validators.js';
import { ArcaValidationError } from '../src/errors.js';
import type { AltaEmpleado, BajaEmpleado, ModificacionEmpleado, DomicilioExplotacion } from '../src/types.js';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function validDomicilio(): DomicilioExplotacion {
  return {
    calle: 'Av. Corrientes',
    numero: '1234',
    localidad: 'CABA',
    codigoPostal: '1043',
    provincia: 0,
  };
}

function validAlta(): AltaEmpleado {
  return {
    cuil: '20123456786',
    fechaInicio: new Date(2024, 0, 15),
    modalidadContratacion: 8,
    obraSocial: '100000',
    domicilioExplotacion: validDomicilio(),
    actividadEconomica: '620100',
  };
}

function validBaja(): BajaEmpleado {
  return {
    cuil: '20123456786',
    fechaBaja: new Date(2024, 5, 15),
    motivoBaja: 21,
  };
}

function validModificacion(): ModificacionEmpleado {
  return {
    cuil: '20123456786',
    fechaInicio: new Date(2024, 0, 15),
    obraSocial: '200000',
  };
}

// ---------------------------------------------------------------------------
// validateCuil
// ---------------------------------------------------------------------------

describe('validateCuil', () => {
  it('passes for a valid CUIL (no hyphens)', () => {
    // 20-12345678-6 is a valid CUIL
    expect(validateCuil('20123456786')).toBe('20123456786');
  });

  it('passes for a valid CUIL (with hyphens)', () => {
    expect(validateCuil('20-12345678-6')).toBe('20123456786');
  });

  it('passes for a valid CUIT with prefix 30', () => {
    // 30-71234567-1 checksum: need to verify
    expect(validateCuil('30712345671')).toBe('30712345671');
  });

  it('throws on invalid format (too short)', () => {
    expect(() => validateCuil('2012345')).toThrow(ArcaValidationError);
  });

  it('throws on invalid format (too long)', () => {
    expect(() => validateCuil('201234567890')).toThrow(ArcaValidationError);
  });

  it('throws on invalid format (letters)', () => {
    expect(() => validateCuil('2012345678A')).toThrow(ArcaValidationError);
  });

  it('throws on invalid prefix', () => {
    // 15 is not a valid prefix
    expect(() => validateCuil('15123456789')).toThrow(ArcaValidationError);
    try {
      validateCuil('15123456789');
    } catch (e) {
      expect((e as ArcaValidationError).details[0].field).toBe('cuil');
    }
  });

  it('throws on invalid checksum', () => {
    // Change the last digit to make the checksum wrong
    expect(() => validateCuil('20123456780')).toThrow(ArcaValidationError);
    try {
      validateCuil('20123456780');
    } catch (e) {
      const err = e as ArcaValidationError;
      expect(err.message).toContain('verificador');
    }
  });
});

// ---------------------------------------------------------------------------
// validateCBU
// ---------------------------------------------------------------------------

describe('validateCBU', () => {
  // Computed valid CBU:
  // Block1: banco=014, sucursal=006, dc
  //   digits: 0,1,4,0,0,6 -> weights: 7,1,3,7,1,3
  //   sum = 0+1+12+0+0+18 = 31
  //   check = (10 - 31%10)%10 = (10-1)%10 = 9
  //   block1 = 01400069
  // Block2: 0000000123456, dc
  //   digits: 0,0,0,0,0,0,0,1,2,3,4,5,6 -> weights: 3,7,1,3,7,1,3,7,1,3,7,1,3
  //   sum = 0+0+0+0+0+0+0+7+2+9+28+5+18 = 69
  //   check = (10-69%10)%10 = (10-9)%10 = 1
  //   block2 = 00000001234561
  // Full CBU = 0140006900000001234561

  const VALID_CBU = '0140006900000001234561';

  it('passes for a valid CBU', () => {
    expect(validateCBU(VALID_CBU)).toBe(VALID_CBU);
  });

  it('throws on wrong length (too short)', () => {
    expect(() => validateCBU('014000690000000123456')).toThrow(ArcaValidationError);
    try {
      validateCBU('014000690000000123456');
    } catch (e) {
      expect((e as ArcaValidationError).details[0].message).toContain('22');
    }
  });

  it('throws on wrong length (too long)', () => {
    expect(() => validateCBU('01400069000000012345610')).toThrow(ArcaValidationError);
  });

  it('throws on bad block1 checksum', () => {
    // Change block1 check digit (position 7) from 9 to 0
    const badBlock1 = '0140006000000001234561';
    expect(() => validateCBU(badBlock1)).toThrow(ArcaValidationError);
    try {
      validateCBU(badBlock1);
    } catch (e) {
      expect((e as ArcaValidationError).details[0].message).toContain('bloque 1');
    }
  });

  it('throws on bad block2 checksum', () => {
    // Change block2 check digit (last digit) from 1 to 0
    const badBlock2 = '0140006900000001234560';
    expect(() => validateCBU(badBlock2)).toThrow(ArcaValidationError);
    try {
      validateCBU(badBlock2);
    } catch (e) {
      expect((e as ArcaValidationError).details[0].message).toContain('bloque 2');
    }
  });
});

// ---------------------------------------------------------------------------
// validateAlta
// ---------------------------------------------------------------------------

describe('validateAlta', () => {
  it('passes for a valid alta', () => {
    expect(() => validateAlta(validAlta())).not.toThrow();
  });

  it('throws when cuil is missing/invalid', () => {
    const alta = validAlta();
    alta.cuil = 'invalid';
    expect(() => validateAlta(alta)).toThrow(ArcaValidationError);
  });

  it('throws when modalidadContratacion is missing', () => {
    const alta = validAlta();
    (alta as any).modalidadContratacion = undefined;
    expect(() => validateAlta(alta)).toThrow(ArcaValidationError);
  });

  it('throws when obraSocial is missing', () => {
    const alta = validAlta();
    alta.obraSocial = '';
    expect(() => validateAlta(alta)).toThrow(ArcaValidationError);
  });

  it('throws when actividadEconomica is missing', () => {
    const alta = validAlta();
    alta.actividadEconomica = '';
    expect(() => validateAlta(alta)).toThrow(ArcaValidationError);
  });

  it('throws when domicilioExplotacion.calle is missing', () => {
    const alta = validAlta();
    alta.domicilioExplotacion.calle = '';
    expect(() => validateAlta(alta)).toThrow(ArcaValidationError);
  });

  it('throws when fechaFin required but missing (plazo fijo modalidad)', () => {
    const alta = validAlta();
    alta.modalidadContratacion = 22; // TIEMPO_COMPLETO_PLAZO_FIJO requires fechaFin
    alta.fechaFin = undefined;
    expect(() => validateAlta(alta)).toThrow(ArcaValidationError);
  });

  it('throws when fechaFin is before fechaInicio', () => {
    const alta = validAlta();
    alta.fechaFin = new Date(2023, 0, 1); // Before fechaInicio (2024-01-15)
    expect(() => validateAlta(alta)).toThrow(ArcaValidationError);
  });

  it('passes when fechaFin is after fechaInicio', () => {
    const alta = validAlta();
    alta.modalidadContratacion = 22;
    alta.fechaFin = new Date(2025, 0, 15);
    expect(() => validateAlta(alta)).not.toThrow();
  });

  it('collects multiple errors in a single throw', () => {
    const alta = validAlta();
    alta.cuil = 'bad';
    alta.obraSocial = '';
    alta.actividadEconomica = '';
    try {
      validateAlta(alta);
      expect.unreachable('should have thrown');
    } catch (e) {
      const err = e as ArcaValidationError;
      expect(err.details.length).toBeGreaterThanOrEqual(3);
    }
  });
});

// ---------------------------------------------------------------------------
// validateBaja
// ---------------------------------------------------------------------------

describe('validateBaja', () => {
  it('passes for a valid baja', () => {
    expect(() => validateBaja(validBaja())).not.toThrow();
  });

  it('throws when cuil is invalid', () => {
    const baja = validBaja();
    baja.cuil = 'abc';
    expect(() => validateBaja(baja)).toThrow(ArcaValidationError);
  });

  it('throws when fechaBaja is invalid', () => {
    const baja = validBaja();
    (baja as any).fechaBaja = 'not-a-date';
    expect(() => validateBaja(baja)).toThrow(ArcaValidationError);
  });

  it('throws when motivoBaja is missing', () => {
    const baja = validBaja();
    (baja as any).motivoBaja = undefined;
    expect(() => validateBaja(baja)).toThrow(ArcaValidationError);
  });

  it('throws when motivoBaja is not a number', () => {
    const baja = validBaja();
    (baja as any).motivoBaja = 'renuncia';
    expect(() => validateBaja(baja)).toThrow(ArcaValidationError);
  });
});

// ---------------------------------------------------------------------------
// validateModificacion
// ---------------------------------------------------------------------------

describe('validateModificacion', () => {
  it('passes for a valid modificacion', () => {
    expect(() => validateModificacion(validModificacion())).not.toThrow();
  });

  it('throws when cuil is invalid', () => {
    const mod = validModificacion();
    mod.cuil = '999';
    expect(() => validateModificacion(mod)).toThrow(ArcaValidationError);
  });

  it('validates domicilioExplotacion if provided', () => {
    const mod = validModificacion();
    mod.domicilioExplotacion = {
      calle: '',
      numero: '123',
      localidad: 'CABA',
      codigoPostal: '1000',
      provincia: 0,
    };
    expect(() => validateModificacion(mod)).toThrow(ArcaValidationError);
  });

  it('validates fechaFin range if provided', () => {
    const mod = validModificacion();
    mod.fechaFin = new Date(2023, 0, 1); // Before fechaInicio
    expect(() => validateModificacion(mod)).toThrow(ArcaValidationError);
  });

  it('passes without optional fields', () => {
    const mod: ModificacionEmpleado = {
      cuil: '20123456786',
      fechaInicio: new Date(2024, 0, 15),
    };
    expect(() => validateModificacion(mod)).not.toThrow();
  });
});

// ---------------------------------------------------------------------------
// validateDomicilio
// ---------------------------------------------------------------------------

describe('validateDomicilio', () => {
  it('passes for a valid domicilio', () => {
    expect(() => validateDomicilio(validDomicilio())).not.toThrow();
  });

  it('throws when calle is missing', () => {
    const dom = validDomicilio();
    dom.calle = '';
    expect(() => validateDomicilio(dom)).toThrow(ArcaValidationError);
  });

  it('throws when numero is missing', () => {
    const dom = validDomicilio();
    dom.numero = '';
    expect(() => validateDomicilio(dom)).toThrow(ArcaValidationError);
  });

  it('throws when localidad is missing', () => {
    const dom = validDomicilio();
    dom.localidad = '';
    expect(() => validateDomicilio(dom)).toThrow(ArcaValidationError);
  });

  it('throws when codigoPostal is missing', () => {
    const dom = validDomicilio();
    dom.codigoPostal = '';
    expect(() => validateDomicilio(dom)).toThrow(ArcaValidationError);
  });

  it('throws when provincia is invalid (negative)', () => {
    const dom = validDomicilio();
    dom.provincia = -1;
    expect(() => validateDomicilio(dom)).toThrow(ArcaValidationError);
  });

  it('throws when provincia is invalid (> 23)', () => {
    const dom = validDomicilio();
    dom.provincia = 24;
    expect(() => validateDomicilio(dom)).toThrow(ArcaValidationError);
  });

  it('passes for boundary provincia values (0 and 23)', () => {
    const dom0 = validDomicilio();
    dom0.provincia = 0;
    expect(() => validateDomicilio(dom0)).not.toThrow();

    const dom23 = validDomicilio();
    dom23.provincia = 23;
    expect(() => validateDomicilio(dom23)).not.toThrow();
  });

  it('collects multiple errors', () => {
    const dom: DomicilioExplotacion = {
      calle: '',
      numero: '',
      localidad: '',
      codigoPostal: '',
      provincia: 99,
    };
    try {
      validateDomicilio(dom);
      expect.unreachable('should have thrown');
    } catch (e) {
      const err = e as ArcaValidationError;
      expect(err.details.length).toBeGreaterThanOrEqual(5);
    }
  });
});

// ---------------------------------------------------------------------------
// normalizeCuil
// ---------------------------------------------------------------------------

describe('normalizeCuil', () => {
  it('removes hyphens from CUIL', () => {
    expect(normalizeCuil('20-12345678-6')).toBe('20123456786');
  });

  it('returns same string if no hyphens', () => {
    expect(normalizeCuil('20123456786')).toBe('20123456786');
  });

  it('removes multiple hyphens', () => {
    expect(normalizeCuil('2-0-1-2-3-4-5-6-7-8-6')).toBe('20123456786');
  });
});

// ---------------------------------------------------------------------------
// formatCuil
// ---------------------------------------------------------------------------

describe('formatCuil', () => {
  it('formats 11-digit CUIL as XX-XXXXXXXX-X', () => {
    expect(formatCuil('20123456786')).toBe('20-12345678-6');
  });

  it('formats from already-hyphenated input', () => {
    expect(formatCuil('20-12345678-6')).toBe('20-12345678-6');
  });

  it('formats CUIT prefix 30', () => {
    expect(formatCuil('30712345671')).toBe('30-71234567-1');
  });
});
