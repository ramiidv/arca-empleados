// Shared validators from common
export {
  validateCuil,
  validateCBU,
  normalizeCuil,
  formatCuil,
  validateFecha,
  validateFechaRango,
  collectErrors,
  collectErrorsWithPrefix,
} from '@ramiidv/arca-common';

import {
  ArcaValidationError,
  collectErrors,
  collectErrorsWithPrefix,
  validateCuil,
  validateFecha,
  validateFechaRango,
  validateCBU,
} from '@ramiidv/arca-common';
import type { ValidationErrorDetail } from '@ramiidv/arca-common';
import type {
  AltaEmpleado,
  BajaEmpleado,
  ModificacionEmpleado,
  DatosComplementarios,
  DatosCBU,
  RelacionFamiliar,
  DomicilioExplotacion,
} from './types.js';
import { MODALIDADES_CON_FECHA_FIN } from './constants.js';

// ---------------------------------------------------------------------------
// Error collection helpers (local)
// ---------------------------------------------------------------------------

/**
 * Same as collectErrors but replaces the field name entirely on collected errors.
 */
function collectErrorsAs(fn: () => void, errors: ValidationErrorDetail[], fieldName: string): void {
  try {
    fn();
  } catch (e) {
    if (e instanceof ArcaValidationError) {
      errors.push(...e.details.map(err => ({
        ...err,
        field: fieldName,
      })));
    }
  }
}

// ---------------------------------------------------------------------------
// Record-level validators
// ---------------------------------------------------------------------------

/**
 * Validates all fields of an AltaEmpleado record.
 * @throws ArcaValidationError if any field is invalid.
 */
export function validateAlta(alta: AltaEmpleado): void {
  const errors: ValidationErrorDetail[] = [];

  // CUIL
  collectErrors(() => validateCuil(alta.cuil), errors);

  // Fecha de inicio
  collectErrors(() => validateFecha(alta.fechaInicio, 'fechaInicio'), errors);

  // Modalidad de contratacion
  if (alta.modalidadContratacion == null || typeof alta.modalidadContratacion !== 'number') {
    errors.push({
      field: 'modalidadContratacion',
      message: 'La modalidad de contratacion es requerida',
      value: alta.modalidadContratacion,
    });
  }

  // Obra social
  if (!alta.obraSocial || typeof alta.obraSocial !== 'string' || alta.obraSocial.trim() === '') {
    errors.push({
      field: 'obraSocial',
      message: 'La obra social es requerida',
      value: alta.obraSocial,
    });
  }

  // Actividad economica
  if (!alta.actividadEconomica || typeof alta.actividadEconomica !== 'string' || alta.actividadEconomica.trim() === '') {
    errors.push({
      field: 'actividadEconomica',
      message: 'La actividad economica es requerida',
      value: alta.actividadEconomica,
    });
  }

  // Domicilio de explotacion
  collectErrorsWithPrefix(() => validateDomicilio(alta.domicilioExplotacion), errors, 'domicilioExplotacion');

  // Fecha de fin requerida para ciertas modalidades
  if (MODALIDADES_CON_FECHA_FIN.has(alta.modalidadContratacion) && !alta.fechaFin) {
    errors.push({
      field: 'fechaFin',
      message: `La fecha de fin es requerida para la modalidad de contratacion ${alta.modalidadContratacion}`,
      value: alta.fechaFin,
    });
  }

  // Validate fecha range if both dates exist
  if (alta.fechaFin) {
    collectErrors(() => validateFechaRango(alta.fechaInicio, alta.fechaFin), errors);
  }

  if (errors.length > 0) {
    throw new ArcaValidationError(
      `Datos de alta invalidos: ${errors.map(e => e.message).join('; ')}`,
      errors,
    );
  }
}

/**
 * Validates all fields of a BajaEmpleado record.
 * @throws ArcaValidationError if any field is invalid.
 */
export function validateBaja(baja: BajaEmpleado): void {
  const errors: ValidationErrorDetail[] = [];

  collectErrors(() => validateCuil(baja.cuil), errors);

  collectErrors(() => validateFecha(baja.fechaBaja, 'fechaBaja'), errors);

  if (baja.motivoBaja == null || typeof baja.motivoBaja !== 'number') {
    errors.push({
      field: 'motivoBaja',
      message: 'El motivo de baja es requerido',
      value: baja.motivoBaja,
    });
  }

  if (errors.length > 0) {
    throw new ArcaValidationError(
      `Datos de baja invalidos: ${errors.map(e => e.message).join('; ')}`,
      errors,
    );
  }
}

/**
 * Validates all fields of a ModificacionEmpleado record.
 * @throws ArcaValidationError if any field is invalid.
 */
export function validateModificacion(mod: ModificacionEmpleado): void {
  const errors: ValidationErrorDetail[] = [];

  collectErrors(() => validateCuil(mod.cuil), errors);

  collectErrors(() => validateFecha(mod.fechaInicio, 'fechaInicio'), errors);

  if (mod.domicilioExplotacion) {
    collectErrorsWithPrefix(() => validateDomicilio(mod.domicilioExplotacion!), errors, 'domicilioExplotacion');
  }

  if (mod.fechaFin) {
    collectErrors(() => validateFechaRango(mod.fechaInicio, mod.fechaFin), errors);
  }

  if (errors.length > 0) {
    throw new ArcaValidationError(
      `Datos de modificacion invalidos: ${errors.map(e => e.message).join('; ')}`,
      errors,
    );
  }
}

/**
 * Validates all fields of a DatosComplementarios record.
 * @throws ArcaValidationError if any field is invalid.
 */
export function validateDatosComplementarios(datos: DatosComplementarios): void {
  const errors: ValidationErrorDetail[] = [];

  collectErrors(() => validateCuil(datos.cuil), errors);

  collectErrors(() => validateFecha(datos.fechaInicio, 'fechaInicio'), errors);

  if (datos.situacionRevista == null || typeof datos.situacionRevista !== 'number') {
    errors.push({
      field: 'situacionRevista',
      message: 'La situacion de revista es requerida',
      value: datos.situacionRevista,
    });
  }

  if (datos.remuneracion !== undefined && datos.remuneracion < 0) {
    errors.push({
      field: 'remuneracion',
      message: 'La remuneracion no puede ser negativa',
      value: datos.remuneracion,
    });
  }

  if (datos.cantidadHorasTrabajadas !== undefined && datos.cantidadHorasTrabajadas < 0) {
    errors.push({
      field: 'cantidadHorasTrabajadas',
      message: 'La cantidad de horas trabajadas no puede ser negativa',
      value: datos.cantidadHorasTrabajadas,
    });
  }

  if (datos.fechaPreaviso) {
    collectErrors(() => validateFecha(datos.fechaPreaviso!, 'fechaPreaviso'), errors);
  }

  if (errors.length > 0) {
    throw new ArcaValidationError(
      `Datos complementarios invalidos: ${errors.map(e => e.message).join('; ')}`,
      errors,
    );
  }
}

/**
 * Validates all fields of a DatosCBU record.
 * @throws ArcaValidationError if any field is invalid.
 */
export function validateCBUData(cbuData: DatosCBU): void {
  const errors: ValidationErrorDetail[] = [];

  collectErrors(() => validateCuil(cbuData.cuil), errors);

  collectErrors(() => validateFecha(cbuData.fechaInicio, 'fechaInicio'), errors);

  collectErrors(() => validateCBU(cbuData.cbu), errors);

  if (errors.length > 0) {
    throw new ArcaValidationError(
      `Datos de CBU invalidos: ${errors.map(e => e.message).join('; ')}`,
      errors,
    );
  }
}

/**
 * Validates all fields of a RelacionFamiliar record.
 * @throws ArcaValidationError if any field is invalid.
 */
export function validateRelacionFamiliar(rel: RelacionFamiliar): void {
  const errors: ValidationErrorDetail[] = [];

  collectErrors(() => validateCuil(rel.cuil), errors);

  collectErrors(() => validateFecha(rel.fechaInicio, 'fechaInicio'), errors);

  if (rel.tipoRelacion == null || typeof rel.tipoRelacion !== 'number') {
    errors.push({
      field: 'tipoRelacion',
      message: 'El tipo de relacion familiar es requerido',
      value: rel.tipoRelacion,
    });
  }

  if (!rel.nombreFamiliar || rel.nombreFamiliar.trim() === '') {
    errors.push({
      field: 'nombreFamiliar',
      message: 'El nombre del familiar es requerido',
      value: rel.nombreFamiliar,
    });
  }

  if (!rel.apellidoFamiliar || rel.apellidoFamiliar.trim() === '') {
    errors.push({
      field: 'apellidoFamiliar',
      message: 'El apellido del familiar es requerido',
      value: rel.apellidoFamiliar,
    });
  }

  collectErrors(() => validateFecha(rel.fechaNacimiento, 'fechaNacimiento'), errors);

  // CUIL familiar validation (if provided)
  if (rel.cuilFamiliar) {
    collectErrorsAs(() => validateCuil(rel.cuilFamiliar!), errors, 'cuilFamiliar');
  }

  // CUIL titular obra social validation (if provided)
  if (rel.cuilTitularObraSocial) {
    collectErrorsAs(() => validateCuil(rel.cuilTitularObraSocial!), errors, 'cuilTitularObraSocial');
  }

  if (errors.length > 0) {
    throw new ArcaValidationError(
      `Datos de relacion familiar invalidos: ${errors.map(e => e.message).join('; ')}`,
      errors,
    );
  }
}

/**
 * Validates all fields of a DomicilioExplotacion record.
 * @throws ArcaValidationError if any field is invalid.
 */
export function validateDomicilio(dom: DomicilioExplotacion): void {
  const errors: ValidationErrorDetail[] = [];

  if (!dom) {
    throw new ArcaValidationError(
      'El domicilio de explotacion es requerido.',
      [{ field: 'domicilioExplotacion', message: 'El domicilio de explotacion es requerido' }],
      'domicilioExplotacion',
    );
  }

  if (!dom.calle || dom.calle.trim() === '') {
    errors.push({
      field: 'calle',
      message: 'La calle es requerida',
      value: dom.calle,
    });
  }

  if (!dom.numero || dom.numero.trim() === '') {
    errors.push({
      field: 'numero',
      message: 'El numero es requerido',
      value: dom.numero,
    });
  }

  if (!dom.localidad || dom.localidad.trim() === '') {
    errors.push({
      field: 'localidad',
      message: 'La localidad es requerida',
      value: dom.localidad,
    });
  }

  if (!dom.codigoPostal || dom.codigoPostal.trim() === '') {
    errors.push({
      field: 'codigoPostal',
      message: 'El codigo postal es requerido',
      value: dom.codigoPostal,
    });
  }

  if (dom.provincia == null || typeof dom.provincia !== 'number' || dom.provincia < 0 || dom.provincia > 23) {
    errors.push({
      field: 'provincia',
      message: 'La provincia debe ser un valor entre 0 y 23',
      value: dom.provincia,
    });
  }

  if (errors.length > 0) {
    throw new ArcaValidationError(
      `Domicilio de explotacion invalido: ${errors.map(e => e.message).join('; ')}`,
      errors,
    );
  }
}
