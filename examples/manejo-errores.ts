/**
 * Ejemplo: Manejo de errores y validaciones.
 *
 * Muestra como capturar y manejar los distintos tipos de errores
 * que puede lanzar el SDK.
 */
import {
  ArcaEmpleados,
  ArcaEmpleadosError,
  ArcaValidationError,
  ArcaSerializationError,
  validateCuil,
  validateCBU,
  formatCuil,
  normalizeCuil,
  ModalidadContratacion,
  Provincia,
} from '@ramiidv/arca-empleados-sdk';

// ---------------------------------------------------------------------------
// 1. Validacion de CUIL
// ---------------------------------------------------------------------------
console.log('--- Validacion de CUIL ---');

try {
  const cuil = validateCuil('20-12345678-6');
  console.log(`CUIL valido: ${cuil}`);
  console.log(`Formateado: ${formatCuil(cuil)}`);
} catch (error) {
  if (error instanceof ArcaValidationError) {
    console.error('CUIL invalido:', error.message);
  }
}

// CUIL con digito verificador incorrecto
try {
  validateCuil('20-12345678-0');
} catch (error) {
  if (error instanceof ArcaValidationError) {
    console.error('CUIL invalido:', error.message);
    console.error('Detalle:', error.errors);
  }
}

// ---------------------------------------------------------------------------
// 2. Validacion de CBU
// ---------------------------------------------------------------------------
console.log('\n--- Validacion de CBU ---');

try {
  const cbu = validateCBU('0110599930000054489274');
  console.log(`CBU valido: ${cbu}`);
} catch (error) {
  if (error instanceof ArcaValidationError) {
    console.error('CBU invalido:', error.message);
  }
}

// ---------------------------------------------------------------------------
// 3. Errores al agregar registros
// ---------------------------------------------------------------------------
console.log('\n--- Errores al agregar registros ---');

const sdk = new ArcaEmpleados({
  cuitEmpleador: '30-71234567-1',
});

// Alta sin campos requeridos
try {
  sdk.alta({
    cuil: '20-12345678-6',
    fechaInicio: new Date(2024, 2, 1),
    modalidadContratacion: ModalidadContratacion.TIEMPO_COMPLETO_PLAZO_FIJO,
    obraSocial: '100100',
    actividadEconomica: '620100',
    // Falta fechaFin (requerida para plazo fijo)
    // Falta domicilioExplotacion
    domicilioExplotacion: {
      calle: 'Av. Corrientes',
      numero: '1234',
      localidad: 'CABA',
      codigoPostal: '1043',
      provincia: Provincia.CAPITAL_FEDERAL,
    },
  });
  console.error('No deberia llegar aqui');
} catch (error) {
  if (error instanceof ArcaValidationError) {
    console.error('Error de validacion:', error.message);
    console.error('Errores:', error.errors.map(e => `${e.field}: ${e.message}`));
  }
}

// ---------------------------------------------------------------------------
// 4. Generar sin registros
// ---------------------------------------------------------------------------
console.log('\n--- Generar sin registros ---');

const sdkVacio = new ArcaEmpleados({
  cuitEmpleador: '30-71234567-1',
  strict: true,
});

try {
  sdkVacio.generar();
} catch (error) {
  if (error instanceof ArcaValidationError) {
    console.error('Error:', error.message);
  }
}

// ---------------------------------------------------------------------------
// 5. Captura generica de errores del SDK
// ---------------------------------------------------------------------------
console.log('\n--- Captura generica ---');

try {
  // Cualquier operacion del SDK que pueda fallar
  validateCuil('INVALIDO');
} catch (error) {
  if (error instanceof ArcaValidationError) {
    console.error('Error de validacion:', error.message);
    console.error('Campo:', error.field);
    console.error('Errores:', error.errors);
  } else if (error instanceof ArcaSerializationError) {
    console.error('Error de serializacion:', error.message);
  } else if (error instanceof ArcaEmpleadosError) {
    console.error('Error generico del SDK:', error.message);
  } else {
    console.error('Error inesperado:', error);
  }
}

// ---------------------------------------------------------------------------
// 6. Modo no estricto (sin validacion al agregar)
// ---------------------------------------------------------------------------
console.log('\n--- Modo no estricto ---');

const sdkNoEstricto = new ArcaEmpleados({
  cuitEmpleador: '30-71234567-1',
  strict: false,
});

// Esto NO lanza error en modo no estricto, aunque los datos sean incompletos
sdkNoEstricto.alta({
  cuil: '20-12345678-6',
  fechaInicio: new Date(2024, 2, 1),
  modalidadContratacion: ModalidadContratacion.TIEMPO_COMPLETO_INDETERMINADO,
  obraSocial: '100100',
  actividadEconomica: '620100',
  domicilioExplotacion: {
    calle: 'Av. Corrientes',
    numero: '1234',
    localidad: 'CABA',
    codigoPostal: '1043',
    provincia: Provincia.CAPITAL_FEDERAL,
  },
});

const output = sdkNoEstricto.generar();
console.log('Archivo generado en modo no estricto.');
console.log('Registros:', output.resumen.totalRegistros);

// ---------------------------------------------------------------------------
// 7. Utilidades de CUIL
// ---------------------------------------------------------------------------
console.log('\n--- Utilidades de CUIL ---');

const cuilConGuiones = '20-12345678-6';
console.log(`Original: ${cuilConGuiones}`);
console.log(`Normalizado: ${normalizeCuil(cuilConGuiones)}`);
console.log(`Formateado: ${formatCuil('20123456789')}`);
