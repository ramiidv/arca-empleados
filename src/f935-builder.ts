import { ArcaValidationError, ArcaSerializationError } from './errors.js';
import type {
  ArcaEmpleadosConfig,
  AltaEmpleado,
  BajaEmpleado,
  ModificacionEmpleado,
  DatosComplementarios,
  DatosCBU,
  RelacionFamiliar,
  DomicilioExplotacion,
  F935Archivo,
  F935Registro,
  F935Output,
  F935Resumen,
} from './types.js';
import {
  validateCuil,
  validateAlta,
  validateBaja,
  validateModificacion,
  validateDatosComplementarios,
  validateCBUData,
  validateRelacionFamiliar,
  validateDomicilio,
  normalizeCuil,
} from './validators.js';
import { serializeArchivo } from './serializer.js';

/**
 * Builder class for generating ARCA F935 bulk employee management files.
 *
 * Supports method chaining for adding records and generates the complete
 * file content via the `generar()` method.
 *
 * @example
 * ```ts
 * const sdk = new ArcaEmpleados({ cuitEmpleador: '30-71234567-9' });
 * const output = sdk
 *   .alta({ cuil: '20-12345678-9', fechaInicio: new Date(), ... })
 *   .datosComplementarios({ cuil: '20-12345678-9', ... })
 *   .generar();
 *
 * fs.writeFileSync('F935.txt', output.contenido);
 * ```
 */
export class ArcaEmpleados {
  private readonly config: Required<Pick<ArcaEmpleadosConfig, 'cuitEmpleador' | 'strict'>> & Pick<ArcaEmpleadosConfig, 'razonSocial'>;
  private _registros: F935Registro[] = [];

  constructor(config: ArcaEmpleadosConfig) {
    // Validate employer CUIT
    const normalizedCuit = validateCuil(config.cuitEmpleador);

    this.config = {
      cuitEmpleador: normalizedCuit,
      razonSocial: config.razonSocial,
      strict: config.strict ?? true,
    };
  }

  // ---------------------------------------------------------------------------
  // Read-only access to stored records
  // ---------------------------------------------------------------------------

  /** Returns a shallow copy of the stored records. */
  get registros(): F935Registro[] {
    return [...this._registros];
  }

  // ---------------------------------------------------------------------------
  // Add individual records
  // ---------------------------------------------------------------------------

  /**
   * Adds an employee registration (alta) record.
   * Validates the data if strict mode is enabled.
   */
  alta(data: AltaEmpleado): this {
    if (this.config.strict) {
      validateAlta(data);
    }
    this._registros.push({ tipo: 1, operacion: 0, data });
    return this;
  }

  /**
   * Adds an employee termination (baja) record.
   * Validates the data if strict mode is enabled.
   */
  baja(data: BajaEmpleado): this {
    if (this.config.strict) {
      validateBaja(data);
    }
    this._registros.push({ tipo: 1, operacion: 1, data });
    return this;
  }

  /**
   * Adds an employee modification record.
   * Validates the data if strict mode is enabled.
   */
  modificacion(data: ModificacionEmpleado): this {
    if (this.config.strict) {
      validateModificacion(data);
    }
    this._registros.push({ tipo: 1, operacion: 2, data });
    return this;
  }

  /**
   * Adds supplementary worker data.
   * Validates the data if strict mode is enabled.
   */
  datosComplementarios(data: DatosComplementarios): this {
    if (this.config.strict) {
      validateDatosComplementarios(data);
    }
    this._registros.push({ tipo: 2, data });
    return this;
  }

  /**
   * Adds a CBU (banking data) record.
   * Validates the data if strict mode is enabled.
   */
  cbu(data: DatosCBU): this {
    if (this.config.strict) {
      validateCBUData(data);
    }
    this._registros.push({ tipo: 3, data });
    return this;
  }

  /**
   * Adds a family relationship record.
   * Validates the data if strict mode is enabled.
   */
  relacionFamiliar(data: RelacionFamiliar): this {
    if (this.config.strict) {
      validateRelacionFamiliar(data);
    }
    this._registros.push({ tipo: 4, data });
    return this;
  }

  /**
   * Adds a work location address record.
   * Validates the data if strict mode is enabled.
   */
  domicilioExplotacion(data: DomicilioExplotacion & { cuil: string }): this {
    if (this.config.strict) {
      validateCuil(data.cuil);
      validateDomicilio(data);
    }
    this._registros.push({ tipo: 5, data });
    return this;
  }

  // ---------------------------------------------------------------------------
  // Bulk operations
  // ---------------------------------------------------------------------------

  /**
   * Adds multiple employee registrations (altas) at once.
   * Validates each record if strict mode is enabled.
   * Stops at the first validation error.
   */
  altasMasivas(data: AltaEmpleado[]): this {
    for (const item of data) {
      this.alta(item);
    }
    return this;
  }

  /**
   * Adds multiple employee terminations (bajas) at once.
   * Validates each record if strict mode is enabled.
   * Stops at the first validation error.
   */
  bajasMasivas(data: BajaEmpleado[]): this {
    for (const item of data) {
      this.baja(item);
    }
    return this;
  }

  // ---------------------------------------------------------------------------
  // Generate output
  // ---------------------------------------------------------------------------

  /**
   * Generates the F935 file content and metadata.
   * Validates all records and serializes them to the pipe-delimited format.
   *
   * @throws ArcaValidationError if any record fails validation.
   * @throws ArcaSerializationError if serialization fails.
   */
  generar(): F935Output {
    if (this._registros.length === 0) {
      throw new ArcaValidationError(
        'No hay registros para generar el archivo.',
        [{ field: 'registros', message: 'Debe agregar al menos un registro antes de generar el archivo' }],
      );
    }

    const archivo: F935Archivo = {
      cuitEmpleador: this.config.cuitEmpleador,
      razonSocial: this.config.razonSocial,
      fechaGeneracion: new Date(),
      registros: [...this._registros],
      cantidadRegistros: this._registros.length,
    };

    let contenido: string;
    try {
      contenido = serializeArchivo(archivo);
    } catch (error) {
      if (error instanceof ArcaSerializationError) {
        throw error;
      }
      const message = error instanceof Error ? error.message : String(error);
      throw new ArcaSerializationError(`Error al generar el archivo F935: ${message}`);
    }

    return {
      contenido,
      archivo,
      resumen: this.resumen(),
    };
  }

  // ---------------------------------------------------------------------------
  // Utilities
  // ---------------------------------------------------------------------------

  /**
   * Returns a summary of the currently stored records.
   */
  resumen(): F935Resumen {
    let altas = 0;
    let bajas = 0;
    let modificaciones = 0;
    let datosComp = 0;
    let cbus = 0;
    let familiares = 0;
    let domicilios = 0;

    for (const reg of this._registros) {
      switch (reg.tipo) {
        case 1:
          switch (reg.operacion) {
            case 0: altas++; break;
            case 1: bajas++; break;
            case 2: modificaciones++; break;
          }
          break;
        case 2: datosComp++; break;
        case 3: cbus++; break;
        case 4: familiares++; break;
        case 5: domicilios++; break;
      }
    }

    return {
      totalRegistros: this._registros.length,
      altas,
      bajas,
      modificaciones,
      datosComplementarios: datosComp,
      cbus,
      familiares,
      domicilios,
    };
  }

  /**
   * Clears all stored records.
   */
  limpiar(): this {
    this._registros = [];
    return this;
  }
}
