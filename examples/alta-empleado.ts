/**
 * Ejemplo: Alta de un empleado con datos completos.
 *
 * Genera un archivo F935 con el alta, datos complementarios y CBU.
 */
import { writeFileSync } from 'node:fs';
import {
  ArcaEmpleados,
  ModalidadContratacion,
  SituacionRevista,
  ModalidadLiquidacion,
  TipoServicio,
  EstadoCivil,
  NivelEducacion,
  TipoCuenta,
  Provincia,
} from '@ramiidv/arca-empleados-sdk';

// 1. Crear instancia con CUIT del empleador
const sdk = new ArcaEmpleados({
  cuitEmpleador: '30-71234567-1',
  razonSocial: 'Empresa Ejemplo S.A.',
});

// 2. Agregar el alta del empleado (7 campos obligatorios segun RG 5508/2024)
sdk.alta({
  cuil: '20-12345678-6',
  fechaInicio: new Date(2024, 2, 1), // 1 de marzo de 2024
  modalidadContratacion: ModalidadContratacion.TIEMPO_COMPLETO_INDETERMINADO,
  obraSocial: '100100',
  actividadEconomica: '620100',
  trabajadorAgropecuario: false,
  domicilioExplotacion: {
    calle: 'Av. Corrientes',
    numero: '1234',
    piso: '5',
    depto: 'A',
    localidad: 'Ciudad Autonoma de Buenos Aires',
    codigoPostal: '1043',
    provincia: Provincia.CAPITAL_FEDERAL,
    telefono: '011-4555-1234',
  },
});

// 3. Agregar datos complementarios (deben completarse antes de la primera liquidacion)
sdk.datosComplementarios({
  cuil: '20-12345678-6',
  fechaInicio: new Date(2024, 2, 1),
  situacionRevista: SituacionRevista.ACTIVO,
  nivelEducacion: NivelEducacion.UNIVERSITARIO_COMPLETO,
  puestoDesempenado: '0301',
  convenioColectivo: '000',
  tipoServicio: TipoServicio.CON_APORTE_PAMI,
  modalidadLiquidacion: ModalidadLiquidacion.MENSUAL,
  estadoCivil: EstadoCivil.SOLTERO,
  remuneracion: 350000,
});

// 4. Agregar CBU para deposito de sueldo
sdk.cbu({
  cuil: '20-12345678-6',
  fechaInicio: new Date(2024, 2, 1),
  cbu: '0110599100000054489273',
  tipoCuenta: TipoCuenta.CAJA_AHORRO,
});

// 5. Generar el archivo
const output = sdk.generar();

// 6. Mostrar resumen
console.log('Resumen:', output.resumen);
// { totalRegistros: 3, altas: 1, bajas: 0, modificaciones: 0,
//   datosComplementarios: 1, cbus: 1, familiares: 0, domicilios: 0 }

// 7. Escribir a disco
writeFileSync('F935_alta.txt', output.contenido, 'utf-8');
console.log('Archivo generado: F935_alta.txt');
console.log('Contenido:');
console.log(output.contenido);
