// Base error and validation from common
export { ArcaError, ArcaValidationError } from '@ramiidv/arca-common';
export type { ValidationErrorDetail } from '@ramiidv/arca-common';
import { ArcaError } from '@ramiidv/arca-common';

/**
 * Base error class for ARCA Empleados SDK.
 */
export class ArcaEmpleadosError extends ArcaError {
  constructor(message: string) {
    super(message);
    this.name = 'ArcaEmpleadosError';
  }
}

/**
 * Error thrown when file serialization fails.
 */
export class ArcaSerializationError extends ArcaEmpleadosError {
  constructor(message: string) {
    super(message);
    this.name = 'ArcaSerializationError';
  }
}
