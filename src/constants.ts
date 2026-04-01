// ---------------------------------------------------------------------------
// Enums - SICOSS reference codes
// ---------------------------------------------------------------------------

/** T03 - Modalidades de Contratacion (codigos oficiales SICOSS) */
export enum ModalidadContratacion {
  /** Contrato Modalidad Promovida. Reduccion 0% */
  PROMOVIDA_REDUCCION_0 = 0,
  /** A tiempo parcial: Indeterminado/permanente */
  TIEMPO_PARCIAL_INDETERMINADO = 1,
  /** Becarios - Residencias medicas Ley 22.127 */
  BECARIOS_RESIDENCIAS = 2,
  /** De aprendizaje Ley 25.013 */
  APRENDIZAJE = 3,
  /** Especial de Fomento del Empleo Ley 24.465 */
  FOMENTO_EMPLEO_24465 = 4,
  /** Fomento del Empleo Ley 24.013 y Ley 24.465 */
  FOMENTO_EMPLEO_24013 = 5,
  /** Lanzamiento nueva actividad */
  LANZAMIENTO_NUEVA_ACTIVIDAD = 6,
  /** Periodo de prueba Ley 24.465 y Ley 25.013 */
  PERIODO_PRUEBA_ANTIGUO = 7,
  /** A Tiempo completo indeterminado / Trabajo permanente */
  TIEMPO_COMPLETO_INDETERMINADO = 8,
  /** Practica laboral para jovenes */
  PRACTICA_LABORAL_JOVENES = 9,
  /** Pasantias Ley 25.165 Decreto 340/92 (sin obra social) */
  PASANTIA_SIN_OS = 10,
  /** Trabajo de temporada */
  TEMPORADA = 11,
  /** Trabajo eventual */
  EVENTUAL = 12,
  /** Trabajo formacion */
  TRABAJO_FORMACION = 13,
  /** Nuevo Periodo de Prueba */
  PERIODO_PRUEBA_NUEVO = 14,
  /** Trabajador Discapacitado Art. 34 Ley 24.147 */
  DISCAPACITADO_24147 = 18,
  /** A tiempo parcial determinado (contrato a plazo fijo) */
  TIEMPO_PARCIAL_PLAZO_FIJO = 21,
  /** A Tiempo completo determinado (contrato a plazo fijo) */
  TIEMPO_COMPLETO_PLAZO_FIJO = 22,
  /** Personal no permanente Ley 22.248 */
  NO_PERMANENTE_22248 = 23,
  /** Personal de la Construccion Ley 22.250 */
  CONSTRUCCION = 24,
  /** Empleo publico provincial */
  EMPLEO_PUBLICO_PROVINCIAL = 25,
  /** Beneficiario programa empleo/capacitacion */
  PROGRAMA_EMPLEO = 26,
  /** Pasantias Ley 26.427 -con obra social- */
  PASANTIA_CON_OS = 27,
  /** Periodo de Prueba Art. 6 Ley 25.877 */
  PERIODO_PRUEBA = 32,
  /** Planta transitoria Admin. Publica */
  PLANTA_TRANSITORIA = 46,
  /** Directores SA con Obra Social y LRT */
  DIRECTORES_SA = 49,
  /** Contrato Modalidad Promovida. Reduccion 50% */
  PROMOVIDA_REDUCCION_50 = 50,
  /** LRT (Directores SA, municipios, etc.) */
  LRT = 99,
  /** Contrato Modalidad Promovida. Reduccion 100% */
  PROMOVIDA_REDUCCION_100 = 100,
  /** Trabajo permanente prestacion continua Ley 26.727 (agrario) */
  AGRARIO_PERMANENTE = 110,
  /** Trabajo temporario Ley 26.727 (agrario) */
  AGRARIO_TEMPORARIO = 111,
  /** Trabajo permanente discontinuo Ley 26.727 (agrario) */
  AGRARIO_PERMANENTE_DISCONTINUO = 112,
  /** Trabajo por equipo o cuadrilla familiar Ley 26.727 */
  AGRARIO_CUADRILLA_FAMILIAR = 113,
  /** Art. 19 Ley 26940. Tiempo indeterminado */
  LEY_26940_INDETERMINADO = 301,
  /** Art. 19 Ley 26940. Tiempo parcial Art. 92 ter LCT */
  LEY_26940_PARCIAL = 304,
}

/** Situaciones de Revista (codigos oficiales Simplificacion Registral) */
export enum SituacionRevista {
  /** Activo */
  ACTIVO = 1,
  /** Licencia por maternidad */
  LICENCIA_MATERNIDAD = 5,
  /** Suspensiones otras causales */
  SUSPENSION_OTRAS_CAUSALES = 6,
  /** Suspendido. Ley 20744 Art. 223 Bis */
  SUSPENSION_223_BIS = 9,
  /** Licencia por excedencia */
  LICENCIA_EXCEDENCIA = 10,
  /** Licencia por maternidad Down */
  LICENCIA_MATERNIDAD_DOWN = 11,
  /** Licencia por vacaciones */
  LICENCIA_VACACIONES = 12,
  /** Licencia sin goce de haberes */
  LICENCIA_SIN_GOCE = 13,
  /** Reserva de puesto */
  RESERVA_PUESTO = 14,
  /** E.S.E. Cese transitorio de servicios */
  CESE_TRANSITORIO_ESE = 15,
  /** Personal siniestrado de terceros */
  SINIESTRADO_TERCEROS = 16,
  /** Reingreso por disposicion judicial */
  REINGRESO_JUDICIAL = 17,
  /** Trabajador de temporada - Reserva de puesto */
  TEMPORADA_RESERVA_PUESTO = 21,
  /** Activo - Funciones en el exterior */
  ACTIVO_EXTERIOR = 31,
  /** Licencia por paternidad */
  LICENCIA_PATERNIDAD = 32,
  /** Licencia por fuerza mayor (Art. 221 LCT) */
  LICENCIA_FUERZA_MAYOR = 33,
  /** Empleado eventual en EU (mes completo) */
  EVENTUAL_EU_MES_COMPLETO = 42,
  /** Empleado eventual en EU (mes incompleto) */
  EVENTUAL_EU_MES_INCOMPLETO = 43,
  /** Conservacion del empleo por accidente/enfermedad inculpable */
  CONSERVACION_EMPLEO = 44,
  /** Suspensiones por causas disciplinarias */
  SUSPENSION_DISCIPLINARIA = 45,
  /** Suspendido. Res. 397/2020 MTEySS c/Aportes OS */
  SUSPENSION_RES_397 = 48,
  /** Susp. periodo parcial L 20744 art.223bis / Res. 397 MTEySS */
  SUSPENSION_PARCIAL_223_BIS = 49,
  /** Licencia Ley 27.674 - Regimen Proteccion Integral Nino con Cancer */
  LICENCIA_CANCER_INFANTIL = 51,
}

/** Motivos de Baja (codigos oficiales Simplificacion Registral) */
export enum MotivoBaja {
  /** Baja por fallecimiento */
  FALLECIMIENTO = 0,
  /** Bajas otras causales */
  OTRAS_CAUSALES = 2,
  /** Baja por despido */
  DESPIDO = 7,
  /** Transferencia del contrato de trabajo (Art.225 LCT) */
  TRANSFERENCIA_CONTRATO = 18,
  /** Denuncia contrato por transferencia establecimiento (Art.226 LCT) */
  DENUNCIA_TRANSFERENCIA = 19,
  /** Cesion del personal (Art.229 LCT) */
  CESION_PERSONAL = 20,
  /** Renuncia del trabajador (Art.240 LCT) */
  RENUNCIA = 21,
  /** Voluntad concurrente de las partes (Art.241 LCT) */
  MUTUO_ACUERDO = 22,
  /** Denuncia de contrato por el empleador (Art.242 LCT) */
  DENUNCIA_POR_EMPLEADOR = 23,
  /** Denuncia de contrato por el trabajador (Art.242 LCT) */
  DENUNCIA_POR_TRABAJADOR = 24,
  /** Abandono del trabajo (Art.244 LCT) */
  ABANDONO_TRABAJO = 25,
  /** Despido sin causa (Art.245 LCT) */
  DESPIDO_SIN_CAUSA = 26,
  /** Falta o disminucion del trabajo (Art.247 LCT) */
  FALTA_TRABAJO = 27,
  /** Fuerza mayor (Art.247 LCT) */
  FUERZA_MAYOR = 28,
  /** Fallecimiento del empleador (Art.249 LCT) */
  FALLECIMIENTO_EMPLEADOR = 29,
  /** Vencimiento de plazo (Art.250 LCT) */
  VENCIMIENTO_PLAZO = 30,
  /** Quiebra del empleador (Art.251 LCT) */
  QUIEBRA = 31,
  /** Concurso del empleador (Art.251 LCT) */
  CONCURSO = 32,
  /** Jubilacion (Art.252 LCT) */
  JUBILACION = 33,
  /** Incapacidad o inhabilidad del trabajador (Art.254 LCT) */
  INCAPACIDAD = 34,
  /** Voluntad concurrente - Trabajo Agrario (Art.64 inc.b L.22248) */
  MUTUO_ACUERDO_AGRARIO = 35,
  /** Despido - Agrario (Art.64 inc.c L.22248) */
  DESPIDO_AGRARIO = 36,
  /** Despido por fuerza mayor - Agrario (Art.64 inc.d L.22248) */
  FUERZA_MAYOR_AGRARIO = 37,
  /** Fin contrato de aprendizaje y pasantias */
  FIN_APRENDIZAJE_PASANTIA = 38,
  /** Despido Art.5 Ley 25371 (construccion) */
  DESPIDO_CONSTRUCCION = 39,
  /** Cesantia laboral (sector publico) */
  CESANTIA = 40,
  /** Exoneracion (sector publico) */
  EXONERACION = 41,
  /** Inicio Pago Retiro Voluntario */
  INICIO_RETIRO_VOLUNTARIO = 46,
  /** Fin Pago Retiro Voluntario */
  FIN_RETIRO_VOLUNTARIO = 47,
  /** Extincion por mutuo acuerdo (Art.241 Ley 20.744) */
  EXTINCION_MUTUO_ACUERDO = 52,
  /** Baja de oficio por denuncia */
  BAJA_OFICIO = 53,
  /** Baja por retiro anticipado o voluntario */
  RETIRO_VOLUNTARIO = 54,
  /** Traspaso de personal / RIGI (Ley 27.742) */
  TRASPASO_RIGI = 55,
  /** Vencimiento contrato a plazo fijo o determinado */
  VENCIMIENTO_PLAZO_FIJO = 99,
}

/** Nivel de Educacion */
export enum NivelEducacion {
  SIN_INSTRUCCION = 0,
  PRIMARIO_INCOMPLETO = 1,
  PRIMARIO_COMPLETO = 2,
  SECUNDARIO_INCOMPLETO = 3,
  SECUNDARIO_COMPLETO = 4,
  TERCIARIO_INCOMPLETO = 5,
  TERCIARIO_COMPLETO = 6,
  UNIVERSITARIO_INCOMPLETO = 7,
  UNIVERSITARIO_COMPLETO = 8,
  POSGRADO_INCOMPLETO = 9,
  POSGRADO_COMPLETO = 10,
}

/** Estado Civil */
export enum EstadoCivil {
  SOLTERO = 1,
  CASADO = 2,
  DIVORCIADO = 3,
  VIUDO = 4,
  SEPARADO = 5,
  UNION_CONVIVENCIAL = 6,
}

/** Tipo de Relacion Familiar */
export enum TipoRelacionFamiliar {
  CONYUGE = 1,
  HIJO = 2,
  HIJO_DISCAPACITADO = 3,
  HIJASTRO = 4,
  MENOR_GUARDA = 5,
  PRENATAL = 6,
  CONVIVIENTE = 7,
}

/** Provincias (codigos oficiales ARCA) */
export enum Provincia {
  CAPITAL_FEDERAL = 0,
  BUENOS_AIRES = 1,
  CATAMARCA = 2,
  CORDOBA = 3,
  CORRIENTES = 4,
  ENTRE_RIOS = 5,
  JUJUY = 6,
  MENDOZA = 7,
  LA_RIOJA = 8,
  SALTA = 9,
  SAN_JUAN = 10,
  SAN_LUIS = 11,
  SANTA_FE = 12,
  SANTIAGO_DEL_ESTERO = 13,
  TUCUMAN = 14,
  CHACO = 15,
  CHUBUT = 16,
  FORMOSA = 17,
  MISIONES = 18,
  NEUQUEN = 19,
  LA_PAMPA = 20,
  RIO_NEGRO = 21,
  SANTA_CRUZ = 22,
  TIERRA_DEL_FUEGO = 23,
}

/** Tipo de Servicio */
export enum TipoServicio {
  CON_APORTE_PAMI = 1,
  SIN_APORTE_PAMI = 2,
}

/** Modalidad de Liquidacion */
export enum ModalidadLiquidacion {
  MENSUAL = 1,
  QUINCENAL = 2,
  SEMANAL = 3,
  DIARIA = 4,
  POR_HORA = 5,
  POR_PIEZA = 6,
  A_COMISION = 7,
  JORNAL = 8,
}

/** Tipo de Operacion */
export enum TipoOperacion {
  ALTA = 0,
  BAJA = 1,
  MODIFICACION = 2,
}

/** Tipo de Cuenta Bancaria */
export enum TipoCuenta {
  CAJA_AHORRO = 1,
  CUENTA_CORRIENTE = 2,
}

/** Escolaridad familiar */
export enum Escolaridad {
  NO_ESCOLAR = 0,
  PREESCOLAR = 1,
  PRIMARIA = 2,
  SECUNDARIA = 3,
  TERCIARIA = 4,
  UNIVERSITARIA = 5,
}

// ---------------------------------------------------------------------------
// Description maps
// ---------------------------------------------------------------------------

/** Descripciones de modalidades de contratacion */
export const MODALIDAD_CONTRATACION_DESCRIPCION: Record<number, string> = {
  [ModalidadContratacion.PROMOVIDA_REDUCCION_0]: 'Contrato Modalidad Promovida. Reduccion 0%',
  [ModalidadContratacion.TIEMPO_PARCIAL_INDETERMINADO]: 'A tiempo parcial: Indeterminado/permanente',
  [ModalidadContratacion.BECARIOS_RESIDENCIAS]: 'Becarios - Residencias medicas Ley 22.127',
  [ModalidadContratacion.APRENDIZAJE]: 'De aprendizaje Ley 25.013',
  [ModalidadContratacion.FOMENTO_EMPLEO_24465]: 'Especial de Fomento del Empleo Ley 24.465',
  [ModalidadContratacion.FOMENTO_EMPLEO_24013]: 'Fomento del Empleo Ley 24.013 y Ley 24.465',
  [ModalidadContratacion.LANZAMIENTO_NUEVA_ACTIVIDAD]: 'Lanzamiento nueva actividad',
  [ModalidadContratacion.PERIODO_PRUEBA_ANTIGUO]: 'Periodo de prueba Ley 24.465 y Ley 25.013',
  [ModalidadContratacion.TIEMPO_COMPLETO_INDETERMINADO]: 'A Tiempo completo indeterminado / Trabajo permanente',
  [ModalidadContratacion.PRACTICA_LABORAL_JOVENES]: 'Practica laboral para jovenes',
  [ModalidadContratacion.PASANTIA_SIN_OS]: 'Pasantias Ley 25.165 Decreto 340/92 (sin obra social)',
  [ModalidadContratacion.TEMPORADA]: 'Trabajo de temporada',
  [ModalidadContratacion.EVENTUAL]: 'Trabajo eventual',
  [ModalidadContratacion.TRABAJO_FORMACION]: 'Trabajo formacion',
  [ModalidadContratacion.PERIODO_PRUEBA_NUEVO]: 'Nuevo Periodo de Prueba',
  [ModalidadContratacion.DISCAPACITADO_24147]: 'Trabajador Discapacitado Art. 34 Ley 24.147',
  [ModalidadContratacion.TIEMPO_PARCIAL_PLAZO_FIJO]: 'A tiempo parcial determinado (contrato a plazo fijo)',
  [ModalidadContratacion.TIEMPO_COMPLETO_PLAZO_FIJO]: 'A Tiempo completo determinado (contrato a plazo fijo)',
  [ModalidadContratacion.NO_PERMANENTE_22248]: 'Personal no permanente Ley 22.248',
  [ModalidadContratacion.CONSTRUCCION]: 'Personal de la Construccion Ley 22.250',
  [ModalidadContratacion.EMPLEO_PUBLICO_PROVINCIAL]: 'Empleo publico provincial',
  [ModalidadContratacion.PROGRAMA_EMPLEO]: 'Beneficiario programa empleo/capacitacion',
  [ModalidadContratacion.PASANTIA_CON_OS]: 'Pasantias Ley 26.427 -con obra social-',
  [ModalidadContratacion.PERIODO_PRUEBA]: 'Periodo de Prueba Art. 6 Ley 25.877',
  [ModalidadContratacion.PLANTA_TRANSITORIA]: 'Planta transitoria Admin. Publica',
  [ModalidadContratacion.DIRECTORES_SA]: 'Directores SA con Obra Social y LRT',
  [ModalidadContratacion.PROMOVIDA_REDUCCION_50]: 'Contrato Modalidad Promovida. Reduccion 50%',
  [ModalidadContratacion.LRT]: 'LRT (Directores SA, municipios, etc.)',
  [ModalidadContratacion.PROMOVIDA_REDUCCION_100]: 'Contrato Modalidad Promovida. Reduccion 100%',
  [ModalidadContratacion.AGRARIO_PERMANENTE]: 'Trabajo permanente prestacion continua Ley 26.727 (agrario)',
  [ModalidadContratacion.AGRARIO_TEMPORARIO]: 'Trabajo temporario Ley 26.727 (agrario)',
  [ModalidadContratacion.AGRARIO_PERMANENTE_DISCONTINUO]: 'Trabajo permanente discontinuo Ley 26.727 (agrario)',
  [ModalidadContratacion.AGRARIO_CUADRILLA_FAMILIAR]: 'Trabajo por equipo o cuadrilla familiar Ley 26.727',
  [ModalidadContratacion.LEY_26940_INDETERMINADO]: 'Art. 19 Ley 26940. Tiempo indeterminado',
  [ModalidadContratacion.LEY_26940_PARCIAL]: 'Art. 19 Ley 26940. Tiempo parcial Art. 92 ter LCT',
};

/** Descripciones de motivos de baja */
export const MOTIVO_BAJA_DESCRIPCION: Record<number, string> = {
  [MotivoBaja.FALLECIMIENTO]: 'Baja por fallecimiento',
  [MotivoBaja.OTRAS_CAUSALES]: 'Bajas otras causales',
  [MotivoBaja.DESPIDO]: 'Baja por despido',
  [MotivoBaja.TRANSFERENCIA_CONTRATO]: 'Transferencia del contrato de trabajo (Art.225 LCT)',
  [MotivoBaja.DENUNCIA_TRANSFERENCIA]: 'Denuncia contrato por transferencia establecimiento (Art.226 LCT)',
  [MotivoBaja.CESION_PERSONAL]: 'Cesion del personal (Art.229 LCT)',
  [MotivoBaja.RENUNCIA]: 'Renuncia del trabajador (Art.240 LCT)',
  [MotivoBaja.MUTUO_ACUERDO]: 'Voluntad concurrente de las partes (Art.241 LCT)',
  [MotivoBaja.DENUNCIA_POR_EMPLEADOR]: 'Denuncia de contrato por el empleador (Art.242 LCT)',
  [MotivoBaja.DENUNCIA_POR_TRABAJADOR]: 'Denuncia de contrato por el trabajador (Art.242 LCT)',
  [MotivoBaja.ABANDONO_TRABAJO]: 'Abandono del trabajo (Art.244 LCT)',
  [MotivoBaja.DESPIDO_SIN_CAUSA]: 'Despido sin causa (Art.245 LCT)',
  [MotivoBaja.FALTA_TRABAJO]: 'Falta o disminucion del trabajo (Art.247 LCT)',
  [MotivoBaja.FUERZA_MAYOR]: 'Fuerza mayor (Art.247 LCT)',
  [MotivoBaja.FALLECIMIENTO_EMPLEADOR]: 'Fallecimiento del empleador (Art.249 LCT)',
  [MotivoBaja.VENCIMIENTO_PLAZO]: 'Vencimiento de plazo (Art.250 LCT)',
  [MotivoBaja.QUIEBRA]: 'Quiebra del empleador (Art.251 LCT)',
  [MotivoBaja.CONCURSO]: 'Concurso del empleador (Art.251 LCT)',
  [MotivoBaja.JUBILACION]: 'Jubilacion (Art.252 LCT)',
  [MotivoBaja.INCAPACIDAD]: 'Incapacidad o inhabilidad del trabajador (Art.254 LCT)',
  [MotivoBaja.MUTUO_ACUERDO_AGRARIO]: 'Voluntad concurrente - Trabajo Agrario (Art.64 inc.b L.22248)',
  [MotivoBaja.DESPIDO_AGRARIO]: 'Despido - Agrario (Art.64 inc.c L.22248)',
  [MotivoBaja.FUERZA_MAYOR_AGRARIO]: 'Despido por fuerza mayor - Agrario (Art.64 inc.d L.22248)',
  [MotivoBaja.FIN_APRENDIZAJE_PASANTIA]: 'Fin contrato de aprendizaje y pasantias',
  [MotivoBaja.DESPIDO_CONSTRUCCION]: 'Despido Art.5 Ley 25371 (construccion)',
  [MotivoBaja.CESANTIA]: 'Cesantia laboral (sector publico)',
  [MotivoBaja.EXONERACION]: 'Exoneracion (sector publico)',
  [MotivoBaja.INICIO_RETIRO_VOLUNTARIO]: 'Inicio Pago Retiro Voluntario',
  [MotivoBaja.FIN_RETIRO_VOLUNTARIO]: 'Fin Pago Retiro Voluntario',
  [MotivoBaja.EXTINCION_MUTUO_ACUERDO]: 'Extincion por mutuo acuerdo (Art.241 Ley 20.744)',
  [MotivoBaja.BAJA_OFICIO]: 'Baja de oficio por denuncia',
  [MotivoBaja.RETIRO_VOLUNTARIO]: 'Baja por retiro anticipado o voluntario',
  [MotivoBaja.TRASPASO_RIGI]: 'Traspaso de personal / RIGI (Ley 27.742)',
  [MotivoBaja.VENCIMIENTO_PLAZO_FIJO]: 'Vencimiento contrato a plazo fijo o determinado',
};

/** Descripciones de situaciones de revista */
export const SITUACION_REVISTA_DESCRIPCION: Record<number, string> = {
  [SituacionRevista.ACTIVO]: 'Activo',
  [SituacionRevista.LICENCIA_MATERNIDAD]: 'Licencia por maternidad',
  [SituacionRevista.SUSPENSION_OTRAS_CAUSALES]: 'Suspensiones otras causales',
  [SituacionRevista.SUSPENSION_223_BIS]: 'Suspendido. Ley 20744 Art. 223 Bis',
  [SituacionRevista.LICENCIA_EXCEDENCIA]: 'Licencia por excedencia',
  [SituacionRevista.LICENCIA_MATERNIDAD_DOWN]: 'Licencia por maternidad Down',
  [SituacionRevista.LICENCIA_VACACIONES]: 'Licencia por vacaciones',
  [SituacionRevista.LICENCIA_SIN_GOCE]: 'Licencia sin goce de haberes',
  [SituacionRevista.RESERVA_PUESTO]: 'Reserva de puesto',
  [SituacionRevista.CESE_TRANSITORIO_ESE]: 'E.S.E. Cese transitorio de servicios',
  [SituacionRevista.SINIESTRADO_TERCEROS]: 'Personal siniestrado de terceros',
  [SituacionRevista.REINGRESO_JUDICIAL]: 'Reingreso por disposicion judicial',
  [SituacionRevista.TEMPORADA_RESERVA_PUESTO]: 'Trabajador de temporada - Reserva de puesto',
  [SituacionRevista.ACTIVO_EXTERIOR]: 'Activo - Funciones en el exterior',
  [SituacionRevista.LICENCIA_PATERNIDAD]: 'Licencia por paternidad',
  [SituacionRevista.LICENCIA_FUERZA_MAYOR]: 'Licencia por fuerza mayor (Art. 221 LCT)',
  [SituacionRevista.EVENTUAL_EU_MES_COMPLETO]: 'Empleado eventual en EU (mes completo)',
  [SituacionRevista.EVENTUAL_EU_MES_INCOMPLETO]: 'Empleado eventual en EU (mes incompleto)',
  [SituacionRevista.CONSERVACION_EMPLEO]: 'Conservacion del empleo por accidente/enfermedad inculpable',
  [SituacionRevista.SUSPENSION_DISCIPLINARIA]: 'Suspensiones por causas disciplinarias',
  [SituacionRevista.SUSPENSION_RES_397]: 'Suspendido. Res. 397/2020 MTEySS c/Aportes OS',
  [SituacionRevista.SUSPENSION_PARCIAL_223_BIS]: 'Susp. periodo parcial L 20744 art.223bis / Res. 397 MTEySS',
  [SituacionRevista.LICENCIA_CANCER_INFANTIL]: 'Licencia Ley 27.674 - Regimen Proteccion Integral Nino con Cancer',
};

/** Descripciones de niveles de educacion */
export const NIVEL_EDUCACION_DESCRIPCION: Record<number, string> = {
  [NivelEducacion.SIN_INSTRUCCION]: 'Sin instruccion',
  [NivelEducacion.PRIMARIO_INCOMPLETO]: 'Primario incompleto',
  [NivelEducacion.PRIMARIO_COMPLETO]: 'Primario completo',
  [NivelEducacion.SECUNDARIO_INCOMPLETO]: 'Secundario incompleto',
  [NivelEducacion.SECUNDARIO_COMPLETO]: 'Secundario completo',
  [NivelEducacion.TERCIARIO_INCOMPLETO]: 'Terciario incompleto',
  [NivelEducacion.TERCIARIO_COMPLETO]: 'Terciario completo',
  [NivelEducacion.UNIVERSITARIO_INCOMPLETO]: 'Universitario incompleto',
  [NivelEducacion.UNIVERSITARIO_COMPLETO]: 'Universitario completo',
  [NivelEducacion.POSGRADO_INCOMPLETO]: 'Posgrado incompleto',
  [NivelEducacion.POSGRADO_COMPLETO]: 'Posgrado completo',
};

/** Descripciones de estados civiles */
export const ESTADO_CIVIL_DESCRIPCION: Record<number, string> = {
  [EstadoCivil.SOLTERO]: 'Soltero/a',
  [EstadoCivil.CASADO]: 'Casado/a',
  [EstadoCivil.DIVORCIADO]: 'Divorciado/a',
  [EstadoCivil.VIUDO]: 'Viudo/a',
  [EstadoCivil.SEPARADO]: 'Separado/a',
  [EstadoCivil.UNION_CONVIVENCIAL]: 'Union convivencial',
};

/** Descripciones de tipos de relacion familiar */
export const TIPO_RELACION_FAMILIAR_DESCRIPCION: Record<number, string> = {
  [TipoRelacionFamiliar.CONYUGE]: 'Conyuge',
  [TipoRelacionFamiliar.HIJO]: 'Hijo/a',
  [TipoRelacionFamiliar.HIJO_DISCAPACITADO]: 'Hijo/a discapacitado/a',
  [TipoRelacionFamiliar.HIJASTRO]: 'Hijastro/a',
  [TipoRelacionFamiliar.MENOR_GUARDA]: 'Menor en guarda',
  [TipoRelacionFamiliar.PRENATAL]: 'Prenatal',
  [TipoRelacionFamiliar.CONVIVIENTE]: 'Conviviente',
};

/** Descripciones de provincias */
export const PROVINCIA_DESCRIPCION: Record<number, string> = {
  [Provincia.CAPITAL_FEDERAL]: 'Ciudad Autonoma de Buenos Aires',
  [Provincia.BUENOS_AIRES]: 'Buenos Aires',
  [Provincia.CATAMARCA]: 'Catamarca',
  [Provincia.CORDOBA]: 'Cordoba',
  [Provincia.CORRIENTES]: 'Corrientes',
  [Provincia.ENTRE_RIOS]: 'Entre Rios',
  [Provincia.JUJUY]: 'Jujuy',
  [Provincia.MENDOZA]: 'Mendoza',
  [Provincia.LA_RIOJA]: 'La Rioja',
  [Provincia.SALTA]: 'Salta',
  [Provincia.SAN_JUAN]: 'San Juan',
  [Provincia.SAN_LUIS]: 'San Luis',
  [Provincia.SANTA_FE]: 'Santa Fe',
  [Provincia.SANTIAGO_DEL_ESTERO]: 'Santiago del Estero',
  [Provincia.TUCUMAN]: 'Tucuman',
  [Provincia.CHACO]: 'Chaco',
  [Provincia.CHUBUT]: 'Chubut',
  [Provincia.FORMOSA]: 'Formosa',
  [Provincia.MISIONES]: 'Misiones',
  [Provincia.NEUQUEN]: 'Neuquen',
  [Provincia.LA_PAMPA]: 'La Pampa',
  [Provincia.RIO_NEGRO]: 'Rio Negro',
  [Provincia.SANTA_CRUZ]: 'Santa Cruz',
  [Provincia.TIERRA_DEL_FUEGO]: 'Tierra del Fuego',
};

/** Descripciones de modalidades de liquidacion */
export const MODALIDAD_LIQUIDACION_DESCRIPCION: Record<number, string> = {
  [ModalidadLiquidacion.MENSUAL]: 'Mensual',
  [ModalidadLiquidacion.QUINCENAL]: 'Quincenal',
  [ModalidadLiquidacion.SEMANAL]: 'Semanal',
  [ModalidadLiquidacion.DIARIA]: 'Diaria',
  [ModalidadLiquidacion.POR_HORA]: 'Por hora',
  [ModalidadLiquidacion.POR_PIEZA]: 'Por pieza',
  [ModalidadLiquidacion.A_COMISION]: 'A comision',
  [ModalidadLiquidacion.JORNAL]: 'Jornal',
};

/** Descripciones de tipos de cuenta */
export const TIPO_CUENTA_DESCRIPCION: Record<number, string> = {
  [TipoCuenta.CAJA_AHORRO]: 'Caja de ahorro',
  [TipoCuenta.CUENTA_CORRIENTE]: 'Cuenta corriente',
};

/** Descripciones de escolaridad */
export const ESCOLARIDAD_DESCRIPCION: Record<number, string> = {
  [Escolaridad.NO_ESCOLAR]: 'No escolar',
  [Escolaridad.PREESCOLAR]: 'Preescolar',
  [Escolaridad.PRIMARIA]: 'Primaria',
  [Escolaridad.SECUNDARIA]: 'Secundaria',
  [Escolaridad.TERCIARIA]: 'Terciaria',
  [Escolaridad.UNIVERSITARIA]: 'Universitaria',
};

/** Descripciones de tipos de servicio */
export const TIPO_SERVICIO_DESCRIPCION: Record<number, string> = {
  [TipoServicio.CON_APORTE_PAMI]: 'Con aporte PAMI',
  [TipoServicio.SIN_APORTE_PAMI]: 'Sin aporte PAMI',
};

/** Modalidades de contratacion que requieren fecha de fin */
export const MODALIDADES_CON_FECHA_FIN: ReadonlySet<number> = new Set([
  ModalidadContratacion.TIEMPO_PARCIAL_PLAZO_FIJO,   // 21
  ModalidadContratacion.TIEMPO_COMPLETO_PLAZO_FIJO,   // 22
  ModalidadContratacion.TEMPORADA,                     // 11
  ModalidadContratacion.EVENTUAL,                      // 12
  ModalidadContratacion.APRENDIZAJE,                   // 3
  ModalidadContratacion.PASANTIA_SIN_OS,               // 10
  ModalidadContratacion.PASANTIA_CON_OS,               // 27
  ModalidadContratacion.AGRARIO_TEMPORARIO,            // 111
  ModalidadContratacion.NO_PERMANENTE_22248,           // 23
]);
