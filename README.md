# @ramiidv/arca-empleados-sdk

SDK de TypeScript para la gestion de empleados con ARCA (ex AFIP). Genera archivos F935 para el sistema "Mi Simplificacion - Ingreso Masivo de Datos v2.0".

## Importante

Este SDK **no realiza llamadas a servicios web ni APIs**. ARCA no expone una API publica para la gestion de empleados. En cambio, los empleadores utilizan la interfaz web de "Mi Simplificacion" o la aplicacion de escritorio "Ingreso Masivo de Datos" que procesa archivos de datos estructurados.

Este SDK genera esos archivos de datos (formato F935) con tipado fuerte y validacion completa.

## Instalacion

```bash
npm install @ramiidv/arca-empleados-sdk
```

## Inicio rapido

```ts
import { writeFileSync } from 'node:fs';
import {
  ArcaEmpleados,
  ModalidadContratacion,
  Provincia,
} from '@ramiidv/arca-empleados-sdk';

const empleados = new ArcaEmpleados({
  cuitEmpleador: '30-71234567-1',
  razonSocial: 'Mi Empresa S.A.',
});

empleados.alta({
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

const resultado = empleados.generar();
writeFileSync('F935.txt', resultado.contenido, 'utf-8');
console.log(resultado.resumen);
```

## Tipos de registro

El archivo F935 comunica 5 tipos de registro:

### 1. Relaciones Laborales (Alta / Baja / Modificacion)

**Alta** - Registro de un nuevo empleado. Segun RG 5508/2024, requiere 7 campos obligatorios:

```ts
empleados.alta({
  cuil: '20-12345678-6',
  fechaInicio: new Date(2024, 2, 1),
  modalidadContratacion: ModalidadContratacion.TIEMPO_COMPLETO_INDETERMINADO,
  obraSocial: '100100',
  actividadEconomica: '620100',
  trabajadorAgropecuario: false, // default: false
  domicilioExplotacion: { /* ... */ },
  fechaFin: undefined, // solo para plazo fijo, eventual, aprendizaje, pasantia
});
```

**Baja** - Desvinculacion de un empleado (debe informarse dentro de 5 dias habiles):

```ts
empleados.baja({
  cuil: '20-12345678-6',
  fechaBaja: new Date(2024, 5, 15),
  motivoBaja: MotivoBaja.RENUNCIA,
});
```

**Modificacion** - Cambios en una relacion laboral existente:

```ts
empleados.modificacion({
  cuil: '20-12345678-6',
  fechaInicio: new Date(2024, 2, 1),
  obraSocial: '100200', // nuevo valor
});
```

### 2. Datos Complementarios del Trabajador

Datos adicionales que deben completarse antes de la primera liquidacion:

```ts
empleados.datosComplementarios({
  cuil: '20-12345678-6',
  fechaInicio: new Date(2024, 2, 1),
  situacionRevista: SituacionRevista.ACTIVO,
  nivelEducacion: NivelEducacion.UNIVERSITARIO_COMPLETO,
  modalidadLiquidacion: ModalidadLiquidacion.MENSUAL,
  remuneracion: 350000,
  // ... mas campos opcionales
});
```

### 3. CBU (Datos Bancarios)

```ts
empleados.cbu({
  cuil: '20-12345678-6',
  fechaInicio: new Date(2024, 2, 1),
  cbu: '0110599100000054489273',
  tipoCuenta: TipoCuenta.CAJA_AHORRO,
});
```

### 4. Relaciones Familiares

```ts
empleados.relacionFamiliar({
  cuil: '20-12345678-6',
  fechaInicio: new Date(2024, 2, 1),
  tipoRelacion: TipoRelacionFamiliar.HIJO,
  nombreFamiliar: 'Juan',
  apellidoFamiliar: 'Perez',
  fechaNacimiento: new Date(2015, 5, 10),
});
```

### 5. Domicilios de Explotacion

```ts
empleados.domicilioExplotacion({
  cuil: '20-12345678-6',
  calle: 'Av. Corrientes',
  numero: '1234',
  localidad: 'CABA',
  codigoPostal: '1043',
  provincia: Provincia.CAPITAL_FEDERAL,
});
```

## API

### `ArcaEmpleados`

Constructor:

```ts
new ArcaEmpleados(config: ArcaEmpleadosConfig)
```

| Opcion | Tipo | Default | Descripcion |
|--------|------|---------|-------------|
| `cuitEmpleador` | `string` | (requerido) | CUIT del empleador |
| `razonSocial` | `string` | - | Razon social del empleador |
| `strict` | `boolean` | `true` | Valida campos al agregar registros |

Metodos:

| Metodo | Retorno | Descripcion |
|--------|---------|-------------|
| `alta(data)` | `this` | Agrega un alta |
| `baja(data)` | `this` | Agrega una baja |
| `modificacion(data)` | `this` | Agrega una modificacion |
| `datosComplementarios(data)` | `this` | Agrega datos complementarios |
| `cbu(data)` | `this` | Agrega datos de CBU |
| `relacionFamiliar(data)` | `this` | Agrega relacion familiar |
| `domicilioExplotacion(data)` | `this` | Agrega domicilio de explotacion |
| `altasMasivas(data[])` | `this` | Agrega multiples altas |
| `bajasMasivas(data[])` | `this` | Agrega multiples bajas |
| `generar()` | `F935Output` | Genera el archivo |
| `resumen()` | `F935Resumen` | Resumen sin generar |
| `limpiar()` | `this` | Limpia registros |
| `registros` | `F935Registro[]` | Registros almacenados (lectura) |

### `F935Output`

```ts
interface F935Output {
  contenido: string;      // Contenido del archivo
  archivo: F935Archivo;    // Metadata
  resumen: F935Resumen;    // Resumen de registros
}
```

### `F935Resumen`

```ts
interface F935Resumen {
  totalRegistros: number;
  altas: number;
  bajas: number;
  modificaciones: number;
  datosComplementarios: number;
  cbus: number;
  familiares: number;
  domicilios: number;
}
```

## Enums y constantes

### Modalidad de Contratacion (`ModalidadContratacion`)

Codigos oficiales SICOSS (tabla T03). Se muestran los mas utilizados:

| Codigo | Enum | Descripcion |
|--------|------|-------------|
| `0` | `PROMOVIDA_REDUCCION_0` | Contrato Modalidad Promovida. Reduccion 0% |
| `1` | `TIEMPO_PARCIAL_INDETERMINADO` | A tiempo parcial: Indeterminado/permanente |
| `3` | `APRENDIZAJE` | De aprendizaje Ley 25.013 |
| `8` | `TIEMPO_COMPLETO_INDETERMINADO` | A Tiempo completo indeterminado / Trabajo permanente |
| `11` | `TEMPORADA` | Trabajo de temporada |
| `12` | `EVENTUAL` | Trabajo eventual |
| `21` | `TIEMPO_PARCIAL_PLAZO_FIJO` | A tiempo parcial determinado (plazo fijo) |
| `22` | `TIEMPO_COMPLETO_PLAZO_FIJO` | A Tiempo completo determinado (plazo fijo) |
| `24` | `CONSTRUCCION` | Personal de la Construccion Ley 22.250 |
| `27` | `PASANTIA_CON_OS` | Pasantias Ley 26.427 -con obra social- |
| `32` | `PERIODO_PRUEBA` | Periodo de Prueba Art. 6 Ley 25.877 |
| `110` | `AGRARIO_PERMANENTE` | Trabajo permanente Ley 26.727 (agrario) |
| `111` | `AGRARIO_TEMPORARIO` | Trabajo temporario Ley 26.727 (agrario) |
| `112` | `AGRARIO_PERMANENTE_DISCONTINUO` | Trabajo permanente discontinuo Ley 26.727 |

> Hay 35 codigos en total. Consultar el enum `ModalidadContratacion` para la lista completa.

### Motivo de Baja (`MotivoBaja`)

Codigos oficiales de Simplificacion Registral. Se muestran los mas utilizados:

| Codigo | Enum | Descripcion |
|--------|------|-------------|
| `0` | `FALLECIMIENTO` | Baja por fallecimiento |
| `7` | `DESPIDO` | Baja por despido |
| `21` | `RENUNCIA` | Renuncia del trabajador (Art.240 LCT) |
| `22` | `MUTUO_ACUERDO` | Voluntad concurrente de las partes (Art.241 LCT) |
| `26` | `DESPIDO_SIN_CAUSA` | Despido sin causa (Art.245 LCT) |
| `30` | `VENCIMIENTO_PLAZO` | Vencimiento de plazo (Art.250 LCT) |
| `33` | `JUBILACION` | Jubilacion (Art.252 LCT) |
| `34` | `INCAPACIDAD` | Incapacidad del trabajador (Art.254 LCT) |
| `38` | `FIN_APRENDIZAJE_PASANTIA` | Fin contrato de aprendizaje y pasantias |
| `99` | `VENCIMIENTO_PLAZO_FIJO` | Vencimiento contrato a plazo fijo o determinado |

> Hay 34 codigos en total. Consultar el enum `MotivoBaja` para la lista completa.

### Situacion de Revista (`SituacionRevista`)

Codigos oficiales de Simplificacion Registral. Se muestran los mas utilizados:

| Codigo | Enum | Descripcion |
|--------|------|-------------|
| `1` | `ACTIVO` | Activo |
| `5` | `LICENCIA_MATERNIDAD` | Licencia por maternidad |
| `6` | `SUSPENSION_OTRAS_CAUSALES` | Suspensiones otras causales |
| `9` | `SUSPENSION_223_BIS` | Suspendido Art. 223 Bis |
| `13` | `LICENCIA_SIN_GOCE` | Licencia sin goce de haberes |
| `14` | `RESERVA_PUESTO` | Reserva de puesto |
| `32` | `LICENCIA_PATERNIDAD` | Licencia por paternidad |
| `44` | `CONSERVACION_EMPLEO` | Conservacion del empleo |

> Hay 23 codigos en total. Consultar el enum `SituacionRevista` para la lista completa.

### Provincias (`Provincia`)

Codigos 0-23: CABA (0), Buenos Aires (1), Catamarca (2), Cordoba (3), Corrientes (4), Entre Rios (5), Jujuy (6), Mendoza (7), La Rioja (8), Salta (9), San Juan (10), San Luis (11), Santa Fe (12), Santiago del Estero (13), Tucuman (14), Chaco (15), Chubut (16), Formosa (17), Misiones (18), Neuquen (19), La Pampa (20), Rio Negro (21), Santa Cruz (22), Tierra del Fuego (23).

### Otros enums

- `NivelEducacion` (0-10): Sin instruccion hasta Posgrado completo
- `EstadoCivil` (1-6): Soltero, Casado, Divorciado, Viudo, Separado, Union convivencial
- `TipoRelacionFamiliar` (1-7): Conyuge, Hijo, Hijo discapacitado, Hijastro, Menor en guarda, Prenatal, Conviviente
- `TipoServicio` (1-2): Con/sin aporte PAMI
- `ModalidadLiquidacion` (1-8): Mensual, Quincenal, Semanal, Diaria, Por hora, Por pieza, A comision, Jornal
- `TipoCuenta` (1-2): Caja de ahorro, Cuenta corriente
- `Escolaridad` (0-5): No escolar hasta Universitaria

### Mapas de descripciones

Cada enum tiene un mapa de descripciones exportado:

```ts
import { MOTIVO_BAJA_DESCRIPCION, MotivoBaja } from '@ramiidv/arca-empleados-sdk';

console.log(MOTIVO_BAJA_DESCRIPCION[MotivoBaja.RENUNCIA]); // "Renuncia del trabajador (Art.240 LCT)"
```

Mapas disponibles: `MODALIDAD_CONTRATACION_DESCRIPCION`, `MOTIVO_BAJA_DESCRIPCION`, `SITUACION_REVISTA_DESCRIPCION`, `NIVEL_EDUCACION_DESCRIPCION`, `ESTADO_CIVIL_DESCRIPCION`, `TIPO_RELACION_FAMILIAR_DESCRIPCION`, `PROVINCIA_DESCRIPCION`, `MODALIDAD_LIQUIDACION_DESCRIPCION`, `TIPO_CUENTA_DESCRIPCION`, `ESCOLARIDAD_DESCRIPCION`, `TIPO_SERVICIO_DESCRIPCION`.

## Validacion

El SDK valida automaticamente los datos cuando `strict: true` (default):

### CUIL

- Formato: 11 digitos (acepta `XX-XXXXXXXX-X` o `XXXXXXXXXXX`)
- Prefijos validos: 20, 23, 24, 27, 30, 33, 34
- Digito verificador: algoritmo de modulo 11 con pesos [5,4,3,2,7,6,5,4,3,2]

### CBU

- Formato: 22 digitos
- Bloque 1 (8 digitos): banco + sucursal + digito verificador
- Bloque 2 (14 digitos): cuenta + digito verificador
- Ambos digitos verificadores se validan con algoritmo de pesos alternados

### Fechas

- Deben ser objetos `Date` validos
- `fechaFin` debe ser posterior a `fechaInicio`
- `fechaFin` es obligatoria para contratos a plazo fijo, eventuales, aprendizaje y pasantia

### Domicilios

- Calle, numero, localidad y codigo postal son requeridos
- Provincia debe ser un valor entre 0 y 23

## Manejo de errores

```ts
import {
  ArcaEmpleadosError,     // Base (catch-all)
  ArcaValidationError,     // Datos invalidos
  ArcaSerializationError,  // Fallo al serializar
} from '@ramiidv/arca-empleados-sdk';

try {
  empleados.alta({ /* ... */ });
} catch (error) {
  if (error instanceof ArcaValidationError) {
    console.error('Campo:', error.field);
    for (const detalle of error.errors) {
      console.error(`  ${detalle.field}: ${detalle.message}`);
    }
  }
}
```

## Utilidades de CUIL/CBU

```ts
import {
  validateCuil,   // Valida y retorna CUIL normalizado (11 digitos)
  validateCBU,     // Valida y retorna CBU (22 digitos)
  normalizeCuil,   // Quita guiones: "20-12345678-6" -> "20123456786"
  formatCuil,      // Agrega guiones: "20123456789" -> "20-12345678-6"
} from '@ramiidv/arca-empleados-sdk';
```

## Formato del archivo

El archivo generado usa formato delimitado por pipes (`|`). Cada linea representa un registro:

```text
00|CUIT_EMPLEADOR|RAZON_SOCIAL|FECHA_GENERACION|CANTIDAD_REGISTROS|
01|CUIT_EMPLEADOR|TIPO_OP|CUIL|...campos...|
02|CUIT_EMPLEADOR|CUIL|...campos...|
03|CUIT_EMPLEADOR|CUIL|...campos...|
04|CUIT_EMPLEADOR|CUIL|...campos...|
05|CUIT_EMPLEADOR|CUIL|...campos...|
```

- `00`: Header
- `01`: Relacion laboral (alta=0, baja=1, modificacion=2)
- `02`: Datos complementarios
- `03`: CBU
- `04`: Relacion familiar
- `05`: Domicilio de explotacion

Las fechas se formatean como DDMMYYYY. Los booleanos como 'S'/'N'.

## Nota sobre codigos SICOSS

Los codigos de modalidad de contratacion, situacion de revista, motivos de baja y otros estan basados en las tablas SICOSS oficiales. Es recomendable verificar los valores contra las tablas vigentes publicadas por ARCA, ya que pueden actualizarse periodicamente.

## Licencia

MIT
