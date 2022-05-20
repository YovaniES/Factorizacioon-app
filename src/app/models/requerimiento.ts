export interface RequerimientoInterface {
  id: string;
  codigoSolicitud: string;
  nombre: string;
  tipo: string;
  subtipo: string;
  codigoPET: string;
  descripcion: string;
  solicitanteNombre: string;
  solicitanteJefe: string;
  solicitanteCorreo: string;
  solicitanteTelefono: string;
  solicitanteArea: string;
  complejidad: string;
  servicio: string;
  segmento: string;
  producto: string;
  fechaSolicitud: string;
  fechaInicioPrueba: string;
  fechaFinPrueba: string;
  estado: string;
  motivoEstado: string;
  estimacion: number;
  codigoMantis: string;
  codigoJira: string;
  codigoTestlink: string;
  archivos: Array<any>;
  cantidadCP: number;
}

export interface BusquedaF {
  list: Array<any>;
}

export interface escalar {
  mapValue: number;
}
