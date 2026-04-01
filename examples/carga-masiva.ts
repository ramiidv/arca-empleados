/**
 * Ejemplo: Carga masiva de empleados.
 *
 * Muestra como usar method chaining y operaciones masivas
 * para cargar multiples empleados de una sola vez.
 */
import { writeFileSync } from 'node:fs';
import {
  ArcaEmpleados,
  ModalidadContratacion,
  SituacionRevista,
  ModalidadLiquidacion,
  TipoServicio,
  TipoRelacionFamiliar,
  Provincia,
} from '@ramiidv/arca-empleados-sdk';

const sdk = new ArcaEmpleados({
  cuitEmpleador: '30-71234567-1',
  razonSocial: 'Empresa Ejemplo S.A.',
});

const fechaIngreso = new Date(2024, 3, 1); // 1 de abril de 2024

const domicilioOficina = {
  calle: 'Av. Corrientes',
  numero: '1234',
  localidad: 'CABA',
  codigoPostal: '1043',
  provincia: Provincia.CAPITAL_FEDERAL,
};

// Usar altasMasivas para cargar varios empleados
sdk.altasMasivas([
  {
    cuil: '20-12345678-6',
    fechaInicio: fechaIngreso,
    modalidadContratacion: ModalidadContratacion.TIEMPO_COMPLETO_INDETERMINADO,
    obraSocial: '100100',
    actividadEconomica: '620100',
    domicilioExplotacion: domicilioOficina,
  },
  {
    cuil: '27-87654321-1',
    fechaInicio: fechaIngreso,
    modalidadContratacion: ModalidadContratacion.TIEMPO_COMPLETO_INDETERMINADO,
    obraSocial: '100100',
    actividadEconomica: '620100',
    domicilioExplotacion: domicilioOficina,
  },
  {
    cuil: '23-33333333-3',
    fechaInicio: fechaIngreso,
    modalidadContratacion: ModalidadContratacion.TIEMPO_COMPLETO_PLAZO_FIJO,
    obraSocial: '100200',
    actividadEconomica: '620100',
    fechaFin: new Date(2024, 8, 30), // 30 de septiembre de 2024
    domicilioExplotacion: domicilioOficina,
  },
]);

// Encadenar datos complementarios para cada empleado
sdk
  .datosComplementarios({
    cuil: '20-12345678-6',
    fechaInicio: fechaIngreso,
    situacionRevista: SituacionRevista.ACTIVO,
    tipoServicio: TipoServicio.CON_APORTE_PAMI,
    modalidadLiquidacion: ModalidadLiquidacion.MENSUAL,
    remuneracion: 400000,
  })
  .datosComplementarios({
    cuil: '27-87654321-1',
    fechaInicio: fechaIngreso,
    situacionRevista: SituacionRevista.ACTIVO,
    tipoServicio: TipoServicio.CON_APORTE_PAMI,
    modalidadLiquidacion: ModalidadLiquidacion.MENSUAL,
    remuneracion: 450000,
  })
  .datosComplementarios({
    cuil: '23-33333333-3',
    fechaInicio: fechaIngreso,
    situacionRevista: SituacionRevista.ACTIVO,
    tipoServicio: TipoServicio.CON_APORTE_PAMI,
    modalidadLiquidacion: ModalidadLiquidacion.MENSUAL,
    remuneracion: 300000,
  });

// Agregar un familiar para uno de los empleados
sdk.relacionFamiliar({
  cuil: '20-12345678-6',
  fechaInicio: fechaIngreso,
  tipoRelacion: TipoRelacionFamiliar.HIJO,
  nombreFamiliar: 'Juan',
  apellidoFamiliar: 'Perez',
  fechaNacimiento: new Date(2015, 5, 10),
  escolaridad: 2, // Primaria
});

// Generar y ver resumen
const output = sdk.generar();

console.log('Resumen de carga masiva:');
console.log(JSON.stringify(output.resumen, null, 2));

writeFileSync('F935_masiva.txt', output.contenido, 'utf-8');
console.log('\nArchivo generado: F935_masiva.txt');
console.log('Contenido:');
console.log(output.contenido);
