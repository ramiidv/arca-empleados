// ---------------------------------------------------------------------------
// Main class
// ---------------------------------------------------------------------------
export { ArcaEmpleados } from './f935-builder.js';

// ---------------------------------------------------------------------------
// Errors (base from common, domain-specific local)
// ---------------------------------------------------------------------------
export {
  ArcaError,
  ArcaValidationError,
  ArcaEmpleadosError,
  ArcaSerializationError,
} from './errors.js';
export type { ValidationErrorDetail } from './errors.js';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export type {
  ArcaEmpleadosConfig,
  DomicilioExplotacion,
  AltaEmpleado,
  BajaEmpleado,
  ModificacionEmpleado,
  DatosComplementarios,
  DatosCBU,
  RelacionFamiliar,
  F935RegistroAlta,
  F935RegistroBaja,
  F935RegistroModificacion,
  F935RegistroDatosComplementarios,
  F935RegistroCBU,
  F935RegistroRelacionFamiliar,
  F935RegistroDomicilio,
  F935Registro,
  F935Archivo,
  F935Resumen,
  F935Output,
} from './types.js';

// ---------------------------------------------------------------------------
// Constants / Enums
// ---------------------------------------------------------------------------
export {
  ModalidadContratacion,
  SituacionRevista,
  MotivoBaja,
  NivelEducacion,
  EstadoCivil,
  TipoRelacionFamiliar,
  Provincia,
  TipoServicio,
  ModalidadLiquidacion,
  TipoOperacion,
  TipoCuenta,
  Escolaridad,
  MODALIDAD_CONTRATACION_DESCRIPCION,
  MOTIVO_BAJA_DESCRIPCION,
  SITUACION_REVISTA_DESCRIPCION,
  NIVEL_EDUCACION_DESCRIPCION,
  ESTADO_CIVIL_DESCRIPCION,
  TIPO_RELACION_FAMILIAR_DESCRIPCION,
  PROVINCIA_DESCRIPCION,
  MODALIDAD_LIQUIDACION_DESCRIPCION,
  TIPO_CUENTA_DESCRIPCION,
  ESCOLARIDAD_DESCRIPCION,
  TIPO_SERVICIO_DESCRIPCION,
  MODALIDADES_CON_FECHA_FIN,
} from './constants.js';

// ---------------------------------------------------------------------------
// Validators / Utilities (shared from common + local record-level)
// ---------------------------------------------------------------------------
export {
  validateCuil,
  validateCBU,
  normalizeCuil,
  formatCuil,
  validateFecha,
  validateFechaRango,
  validateAlta,
  validateBaja,
  validateModificacion,
  validateDatosComplementarios,
  validateCBUData,
  validateRelacionFamiliar,
  validateDomicilio,
} from './validators.js';

// ---------------------------------------------------------------------------
// Serializer (advanced usage)
// ---------------------------------------------------------------------------
export {
  formatDate,
  boolToStr,
  serializeArchivo,
  serializeHeader,
  serializeAlta,
  serializeBaja,
  serializeModificacion,
  serializeDatosComplementarios,
  serializeCBU,
  serializeRelacionFamiliar,
  serializeDomicilio,
} from './serializer.js';
