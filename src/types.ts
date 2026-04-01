// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

/** Configuration for the ArcaEmpleados builder. */
export interface ArcaEmpleadosConfig {
  /** CUIT del empleador (11 digitos, con o sin guiones). */
  cuitEmpleador: string;
  /** Razon social del empleador (opcional, se incluye en el header del archivo). */
  razonSocial?: string;
  /** Si es true (default), valida todos los campos al agregar registros. */
  strict?: boolean;
}

// ---------------------------------------------------------------------------
// Record Type 5 - Domicilio de Explotacion
// ---------------------------------------------------------------------------

/** Domicilio de explotacion (lugar de trabajo). */
export interface DomicilioExplotacion {
  calle: string;
  numero: string;
  piso?: string;
  depto?: string;
  localidad: string;
  codigoPostal: string;
  /** Codigo de provincia (0-23). */
  provincia: number;
  telefono?: string;
  actividadEconomica?: string;
}

// ---------------------------------------------------------------------------
// Record Type 1 - Relacion Laboral
// ---------------------------------------------------------------------------

/** Datos para el alta de un empleado (Tipo de Operacion 0). */
export interface AltaEmpleado {
  /** CUIL del trabajador (11 digitos, con o sin guiones). */
  cuil: string;
  /** Fecha de inicio de la relacion laboral. */
  fechaInicio: Date;
  /** Codigo de modalidad de contratacion (tabla T03). */
  modalidadContratacion: number;
  /** Codigo de obra social. */
  obraSocial: string;
  /** Domicilio de explotacion donde se desempena el trabajador. */
  domicilioExplotacion: DomicilioExplotacion;
  /** Codigo de actividad economica. */
  actividadEconomica: string;
  /** Marca de trabajador agropecuario (default: false). */
  trabajadorAgropecuario?: boolean;
  /** Fecha de fin (requerida para contratos a plazo fijo, eventuales, aprendizaje, pasantia). */
  fechaFin?: Date;
}

/** Datos para la baja de un empleado (Tipo de Operacion 1). */
export interface BajaEmpleado {
  /** CUIL del trabajador. */
  cuil: string;
  /** Fecha de baja de la relacion laboral. */
  fechaBaja: Date;
  /** Codigo de motivo de baja. */
  motivoBaja: number;
}

/** Datos para la modificacion de un empleado (Tipo de Operacion 2). */
export interface ModificacionEmpleado {
  /** CUIL del trabajador. */
  cuil: string;
  /** Fecha de inicio de la relacion laboral (identifica la relacion a modificar). */
  fechaInicio: Date;
  modalidadContratacion?: number;
  obraSocial?: string;
  domicilioExplotacion?: DomicilioExplotacion;
  actividadEconomica?: string;
  trabajadorAgropecuario?: boolean;
  fechaFin?: Date;
}

// ---------------------------------------------------------------------------
// Record Type 2 - Datos Complementarios del Trabajador
// ---------------------------------------------------------------------------

/** Datos complementarios del trabajador. */
export interface DatosComplementarios {
  /** CUIL del trabajador. */
  cuil: string;
  /** Fecha de inicio de la relacion laboral. */
  fechaInicio: Date;
  /** Situacion de revista del trabajador. */
  situacionRevista: number;
  nivelEducacion?: number;
  /** Codigo de puesto desempenado. */
  puestoDesempenado?: string;
  /** Codigo de convenio colectivo de trabajo. */
  convenioColectivo?: string;
  tipoServicio?: number;
  modalidadLiquidacion?: number;
  estadoCivil?: number;
  /** Remuneracion pactada (en pesos). */
  remuneracion?: number;
  cantidadHorasTrabajadas?: number;
  /** Porcentaje de aporte adicional de seguridad social. */
  porcentajeAporteAdicionalSS?: number;
  /** Contribucion por tareas diferenciales. */
  contribucionTareasDiferenciales?: number;
  /** Codigo de siniestrado. */
  codigoSiniestrado?: number;
  /** Marca de preaviso. */
  marcaPreaviso?: boolean;
  /** Fecha de preaviso. */
  fechaPreaviso?: Date;
  /** Concepto de liquidacion. */
  conceptoLiquidacion?: number;
}

// ---------------------------------------------------------------------------
// Record Type 3 - CBU
// ---------------------------------------------------------------------------

/** Datos bancarios (CBU) del trabajador. */
export interface DatosCBU {
  /** CUIL del trabajador. */
  cuil: string;
  /** Fecha de inicio de la relacion laboral. */
  fechaInicio: Date;
  /** CBU (22 digitos). */
  cbu: string;
  /** Tipo de cuenta bancaria. */
  tipoCuenta?: number;
}

// ---------------------------------------------------------------------------
// Record Type 4 - Relacion Familiar
// ---------------------------------------------------------------------------

/** Datos de un familiar a cargo del trabajador. */
export interface RelacionFamiliar {
  /** CUIL del trabajador. */
  cuil: string;
  /** Fecha de inicio de la relacion laboral. */
  fechaInicio: Date;
  /** Tipo de relacion familiar. */
  tipoRelacion: number;
  /** CUIL del familiar (si lo tiene). */
  cuilFamiliar?: string;
  /** DNI del familiar (si no tiene CUIL). */
  dniFamiliar?: string;
  /** Nombre del familiar. */
  nombreFamiliar: string;
  /** Apellido del familiar. */
  apellidoFamiliar: string;
  /** Fecha de nacimiento del familiar. */
  fechaNacimiento: Date;
  /** Indica si el familiar tiene discapacidad. */
  discapacitado?: boolean;
  /** Nivel de escolaridad del familiar. */
  escolaridad?: number;
  /** Codigo de obra social del familiar. */
  obraSocialFamiliar?: string;
  /** CUIL del titular de la obra social del familiar. */
  cuilTitularObraSocial?: string;
}

// ---------------------------------------------------------------------------
// Output types
// ---------------------------------------------------------------------------

/** Registro de tipo alta en el archivo F935. */
export interface F935RegistroAlta {
  tipo: 1;
  operacion: 0;
  data: AltaEmpleado;
}

/** Registro de tipo baja en el archivo F935. */
export interface F935RegistroBaja {
  tipo: 1;
  operacion: 1;
  data: BajaEmpleado;
}

/** Registro de tipo modificacion en el archivo F935. */
export interface F935RegistroModificacion {
  tipo: 1;
  operacion: 2;
  data: ModificacionEmpleado;
}

/** Registro de datos complementarios. */
export interface F935RegistroDatosComplementarios {
  tipo: 2;
  data: DatosComplementarios;
}

/** Registro de CBU. */
export interface F935RegistroCBU {
  tipo: 3;
  data: DatosCBU;
}

/** Registro de relacion familiar. */
export interface F935RegistroRelacionFamiliar {
  tipo: 4;
  data: RelacionFamiliar;
}

/** Registro de domicilio de explotacion. */
export interface F935RegistroDomicilio {
  tipo: 5;
  data: DomicilioExplotacion & { cuil: string };
}

/** Union discriminada de todos los tipos de registro. */
export type F935Registro =
  | F935RegistroAlta
  | F935RegistroBaja
  | F935RegistroModificacion
  | F935RegistroDatosComplementarios
  | F935RegistroCBU
  | F935RegistroRelacionFamiliar
  | F935RegistroDomicilio;

/** Metadata del archivo F935 generado. */
export interface F935Archivo {
  cuitEmpleador: string;
  razonSocial?: string;
  fechaGeneracion: Date;
  registros: F935Registro[];
  cantidadRegistros: number;
}

/** Resumen de registros en el archivo. */
export interface F935Resumen {
  totalRegistros: number;
  altas: number;
  bajas: number;
  modificaciones: number;
  datosComplementarios: number;
  cbus: number;
  familiares: number;
  domicilios: number;
}

/** Resultado de la generacion del archivo F935. */
export interface F935Output {
  /** Contenido del archivo (texto plano). */
  contenido: string;
  /** Metadata del archivo. */
  archivo: F935Archivo;
  /** Resumen de registros. */
  resumen: F935Resumen;
}
