import { ArcaSerializationError } from './errors.js';
import type {
  AltaEmpleado,
  BajaEmpleado,
  ModificacionEmpleado,
  DatosComplementarios,
  DatosCBU,
  RelacionFamiliar,
  DomicilioExplotacion,
  F935Archivo,
  F935Registro,
} from './types.js';
import { TipoOperacion } from './constants.js';
import { normalizeCuil } from './validators.js';

// ---------------------------------------------------------------------------
// Formatting helpers
// ---------------------------------------------------------------------------

/**
 * Formats a Date as DDMMYYYY.
 */
export function formatDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear());
  return `${day}${month}${year}`;
}

/**
 * Converts a boolean to 'S' or 'N'.
 */
export function boolToStr(val?: boolean): string {
  return val ? 'S' : 'N';
}

/**
 * Formats a number with 2 decimal places as a string (e.g. 1500.50 -> "1500.50").
 */
function formatMonto(val?: number): string {
  if (val === undefined || val === null) return '';
  return val.toFixed(2);
}

/**
 * Returns the string representation of a value, or empty string if undefined/null.
 */
function str(val: string | number | undefined | null): string {
  if (val === undefined || val === null) return '';
  return String(val);
}

/**
 * Escapes a string field for the pipe-delimited format.
 * Replaces pipe characters (|), newlines, and carriage returns to prevent
 * corruption of the file format.
 */
function escapeField(val: string): string {
  if (!val) return '';
  return val
    .replace(/\\/g, '\\\\')
    .replace(/\|/g, '\\|')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r');
}

/**
 * Returns the escaped string representation of a value, or empty string if undefined/null.
 * Use this for free-text fields (calle, localidad, razon social, nombres, etc.).
 */
function strEsc(val: string | undefined | null): string {
  if (val === undefined || val === null) return '';
  return escapeField(val);
}

// ---------------------------------------------------------------------------
// Record serializers
// ---------------------------------------------------------------------------

/**
 * Serializes the file header line.
 * Format: 00|CUIT|RAZON_SOCIAL|FECHA_GENERACION|CANTIDAD_REGISTROS|
 */
export function serializeHeader(archivo: F935Archivo): string {
  const cuit = normalizeCuil(archivo.cuitEmpleador);
  const razon = strEsc(archivo.razonSocial ?? '');
  const fecha = formatDate(archivo.fechaGeneracion);
  const cantidad = String(archivo.cantidadRegistros);
  return `00|${cuit}|${razon}|${fecha}|${cantidad}|`;
}

/**
 * Serializes an alta (employee registration) record.
 * Format: 01|CUIT_EMPLEADOR|TIPO_OP|CUIL|FECHA_INICIO|MODALIDAD|OBRA_SOCIAL|ACTIVIDAD|AGROPECUARIO|FECHA_FIN|CALLE|NUMERO|PISO|DEPTO|LOCALIDAD|CP|PROVINCIA|TELEFONO|
 */
export function serializeAlta(cuitEmpleador: string, alta: AltaEmpleado): string {
  const cuit = normalizeCuil(cuitEmpleador);
  const cuil = normalizeCuil(alta.cuil);
  const dom = alta.domicilioExplotacion;

  const fields = [
    '01',
    cuit,
    String(TipoOperacion.ALTA),
    cuil,
    formatDate(alta.fechaInicio),
    String(alta.modalidadContratacion),
    alta.obraSocial,
    alta.actividadEconomica,
    boolToStr(alta.trabajadorAgropecuario),
    alta.fechaFin ? formatDate(alta.fechaFin) : '',
    strEsc(dom.calle),
    strEsc(dom.numero),
    strEsc(dom.piso),
    strEsc(dom.depto),
    strEsc(dom.localidad),
    dom.codigoPostal,
    String(dom.provincia),
    strEsc(dom.telefono),
  ];
  return fields.join('|') + '|';
}

/**
 * Serializes a baja (employee termination) record.
 * Format: 01|CUIT_EMPLEADOR|TIPO_OP|CUIL|FECHA_BAJA|MOTIVO_BAJA|
 */
export function serializeBaja(cuitEmpleador: string, baja: BajaEmpleado): string {
  const cuit = normalizeCuil(cuitEmpleador);
  const cuil = normalizeCuil(baja.cuil);

  const fields = [
    '01',
    cuit,
    String(TipoOperacion.BAJA),
    cuil,
    formatDate(baja.fechaBaja),
    String(baja.motivoBaja),
  ];
  return fields.join('|') + '|';
}

/**
 * Serializes a modificacion (employee modification) record.
 * Format: 01|CUIT_EMPLEADOR|TIPO_OP|CUIL|FECHA_INICIO|MODALIDAD|OBRA_SOCIAL|ACTIVIDAD|AGROPECUARIO|FECHA_FIN|CALLE|NUMERO|PISO|DEPTO|LOCALIDAD|CP|PROVINCIA|TELEFONO|
 */
export function serializeModificacion(cuitEmpleador: string, mod: ModificacionEmpleado): string {
  const cuit = normalizeCuil(cuitEmpleador);
  const cuil = normalizeCuil(mod.cuil);
  const dom = mod.domicilioExplotacion;

  const fields = [
    '01',
    cuit,
    String(TipoOperacion.MODIFICACION),
    cuil,
    formatDate(mod.fechaInicio),
    str(mod.modalidadContratacion),
    str(mod.obraSocial),
    str(mod.actividadEconomica),
    mod.trabajadorAgropecuario !== undefined ? boolToStr(mod.trabajadorAgropecuario) : '',
    mod.fechaFin ? formatDate(mod.fechaFin) : '',
    dom ? strEsc(dom.calle) : '',
    dom ? strEsc(dom.numero) : '',
    dom ? strEsc(dom.piso) : '',
    dom ? strEsc(dom.depto) : '',
    dom ? strEsc(dom.localidad) : '',
    dom ? dom.codigoPostal : '',
    dom ? String(dom.provincia) : '',
    dom ? strEsc(dom.telefono) : '',
  ];
  return fields.join('|') + '|';
}

/**
 * Serializes a datos complementarios record.
 * Format: 02|CUIT_EMPLEADOR|CUIL|FECHA_INICIO|SITUACION_REVISTA|NIVEL_EDUCACION|PUESTO|CCT|TIPO_SERVICIO|MOD_LIQUIDACION|ESTADO_CIVIL|REMUNERACION|HORAS|APORTE_ADICIONAL|CONTRIB_TAREAS_DIF|COD_SINIESTRADO|MARCA_PREAVISO|FECHA_PREAVISO|CONCEPTO_LIQUIDACION|
 */
export function serializeDatosComplementarios(
  cuitEmpleador: string,
  datos: DatosComplementarios,
): string {
  const cuit = normalizeCuil(cuitEmpleador);
  const cuil = normalizeCuil(datos.cuil);

  const fields = [
    '02',
    cuit,
    cuil,
    formatDate(datos.fechaInicio),
    String(datos.situacionRevista),
    str(datos.nivelEducacion),
    strEsc(datos.puestoDesempenado),
    strEsc(datos.convenioColectivo),
    str(datos.tipoServicio),
    str(datos.modalidadLiquidacion),
    str(datos.estadoCivil),
    formatMonto(datos.remuneracion),
    str(datos.cantidadHorasTrabajadas),
    formatMonto(datos.porcentajeAporteAdicionalSS),
    str(datos.contribucionTareasDiferenciales),
    str(datos.codigoSiniestrado),
    datos.marcaPreaviso !== undefined ? boolToStr(datos.marcaPreaviso) : '',
    datos.fechaPreaviso ? formatDate(datos.fechaPreaviso) : '',
    str(datos.conceptoLiquidacion),
  ];
  return fields.join('|') + '|';
}

/**
 * Serializes a CBU record.
 * Format: 03|CUIT_EMPLEADOR|CUIL|FECHA_INICIO|CBU|TIPO_CUENTA|
 */
export function serializeCBU(cuitEmpleador: string, cbuData: DatosCBU): string {
  const cuit = normalizeCuil(cuitEmpleador);
  const cuil = normalizeCuil(cbuData.cuil);

  const fields = [
    '03',
    cuit,
    cuil,
    formatDate(cbuData.fechaInicio),
    cbuData.cbu,
    str(cbuData.tipoCuenta),
  ];
  return fields.join('|') + '|';
}

/**
 * Serializes a relacion familiar record.
 * Format: 04|CUIT_EMPLEADOR|CUIL|FECHA_INICIO|TIPO_RELACION|CUIL_FAMILIAR|DNI_FAMILIAR|NOMBRE|APELLIDO|FECHA_NACIMIENTO|DISCAPACITADO|ESCOLARIDAD|OBRA_SOCIAL_FAMILIAR|CUIL_TITULAR_OS|
 */
export function serializeRelacionFamiliar(
  cuitEmpleador: string,
  rel: RelacionFamiliar,
): string {
  const cuit = normalizeCuil(cuitEmpleador);
  const cuil = normalizeCuil(rel.cuil);

  const fields = [
    '04',
    cuit,
    cuil,
    formatDate(rel.fechaInicio),
    String(rel.tipoRelacion),
    rel.cuilFamiliar ? normalizeCuil(rel.cuilFamiliar) : '',
    str(rel.dniFamiliar),
    strEsc(rel.nombreFamiliar),
    strEsc(rel.apellidoFamiliar),
    formatDate(rel.fechaNacimiento),
    rel.discapacitado !== undefined ? boolToStr(rel.discapacitado) : '',
    str(rel.escolaridad),
    str(rel.obraSocialFamiliar),
    rel.cuilTitularObraSocial ? normalizeCuil(rel.cuilTitularObraSocial) : '',
  ];
  return fields.join('|') + '|';
}

/**
 * Serializes a domicilio de explotacion record.
 * Format: 05|CUIT_EMPLEADOR|CUIL|CALLE|NUMERO|PISO|DEPTO|LOCALIDAD|CP|PROVINCIA|TELEFONO|ACTIVIDAD_ECONOMICA|
 */
export function serializeDomicilio(
  cuitEmpleador: string,
  dom: DomicilioExplotacion & { cuil: string },
): string {
  const cuit = normalizeCuil(cuitEmpleador);
  const cuil = normalizeCuil(dom.cuil);

  const fields = [
    '05',
    cuit,
    cuil,
    strEsc(dom.calle),
    strEsc(dom.numero),
    strEsc(dom.piso),
    strEsc(dom.depto),
    strEsc(dom.localidad),
    dom.codigoPostal,
    String(dom.provincia),
    strEsc(dom.telefono),
    str(dom.actividadEconomica),
  ];
  return fields.join('|') + '|';
}

// ---------------------------------------------------------------------------
// Full file serializer
// ---------------------------------------------------------------------------

/**
 * Serializes a complete F935Archivo to a string.
 * Returns the full file content with header and all record lines.
 * @throws ArcaSerializationError if serialization fails.
 */
export function serializeArchivo(archivo: F935Archivo): string {
  try {
    const lines: string[] = [];

    // Header
    lines.push(serializeHeader(archivo));

    // Records
    for (const registro of archivo.registros) {
      lines.push(serializeRegistro(archivo.cuitEmpleador, registro));
    }

    return lines.join('\n');
  } catch (error) {
    if (error instanceof ArcaSerializationError) {
      throw error;
    }
    const message = error instanceof Error ? error.message : String(error);
    throw new ArcaSerializationError(`Error al serializar el archivo F935: ${message}`);
  }
}

/**
 * Serializes a single F935Registro based on its type.
 */
function serializeRegistro(cuitEmpleador: string, registro: F935Registro): string {
  switch (registro.tipo) {
    case 1:
      switch (registro.operacion) {
        case 0:
          return serializeAlta(cuitEmpleador, registro.data);
        case 1:
          return serializeBaja(cuitEmpleador, registro.data);
        case 2:
          return serializeModificacion(cuitEmpleador, registro.data);
        default:
          throw new ArcaSerializationError(
            `Tipo de operacion desconocido en registro tipo 1`,
          );
      }
    case 2:
      return serializeDatosComplementarios(cuitEmpleador, registro.data);
    case 3:
      return serializeCBU(cuitEmpleador, registro.data);
    case 4:
      return serializeRelacionFamiliar(cuitEmpleador, registro.data);
    case 5:
      return serializeDomicilio(cuitEmpleador, registro.data);
    default: {
      const _exhaustive: never = registro;
      throw new ArcaSerializationError(
        `Tipo de registro desconocido: ${(_exhaustive as F935Registro).tipo}`,
      );
    }
  }
}
