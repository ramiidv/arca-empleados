/**
 * Ejemplo: Baja de un empleado.
 *
 * La baja debe informarse dentro de los 5 dias habiles posteriores
 * a la desvinculacion.
 */
import { writeFileSync } from 'node:fs';
import {
  ArcaEmpleados,
  MotivoBaja,
  MOTIVO_BAJA_DESCRIPCION,
} from '@ramiidv/arca-empleados-sdk';

const sdk = new ArcaEmpleados({
  cuitEmpleador: '30-71234567-1',
  razonSocial: 'Empresa Ejemplo S.A.',
});

// Registrar la baja
const motivoBaja = MotivoBaja.RENUNCIA;

sdk.baja({
  cuil: '20-12345678-6',
  fechaBaja: new Date(2024, 5, 15), // 15 de junio de 2024
  motivoBaja,
});

console.log(`Motivo de baja: ${MOTIVO_BAJA_DESCRIPCION[motivoBaja]}`);

// Generar el archivo
const output = sdk.generar();

writeFileSync('F935_baja.txt', output.contenido, 'utf-8');
console.log('Archivo generado: F935_baja.txt');
console.log('Contenido:');
console.log(output.contenido);
