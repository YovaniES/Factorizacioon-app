import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { PersonalInterface, BusquedaF, escalar } from '../models/mantenimiento';

@Injectable({
  providedIn: 'root'
})

export class MantenimientoService {

  constructor(private http: HttpClient) { 

  }

  /*PERSONAL INICIO*/
  getListaMantenimiento(queryId){
    //const urlApiReq = environment.urlApi+'getcustomquery/'+queryId;//+'6-0-0-1-1-2-2'
    //const httpParams = new HttpParams({fromObject: {filtros: '6'}});
    //return this.http.get<Array<any>>(urlApiReq);
    const urlApiReq = environment.urlApi+'ExecuteQuery';
    return this.http.post(urlApiReq,queryId);
  }

  getProyectos(queryId){
    //const urlApiReq = environment.urlApi+'getcustomquery/'+queryId;//'5-xxx-0000'
    //return this.http.get(urlApiReq);
    const urlApiReq = environment.urlApi+'ExecuteQuery';
    return this.http.post(urlApiReq,queryId);
  }

  getInfoProyecto(obj){
    //const urlApiReq = environment.urlApi+'getcustomquery/'+queryId+id;//'5-xxx-0000'
    const urlApiReq = environment.urlApi+'ExecuteQuery';
    return this.http.post(urlApiReq,obj);
    /*return this.http.post(urlApiReq,{
      "queryId": queryId,
      "mapValue": {
        "param_id_proyecto": id,
      }
    });*/
  }

  getPerfiles(queryId){
    //const urlApiReq = environment.urlApi+'getcustomquery/'+queryId;//'5-xxx-0000'
    //return this.http.get(urlApiReq);
    const urlApiReq = environment.urlApi+'ExecuteQuery';
    return this.http.post(urlApiReq,queryId);
  }

  getInfoPerfiles(obj){
    const urlApiReq = environment.urlApi+'ExecuteQuery';
    return this.http.post(urlApiReq,obj);
  }

  addPersonal(obj){
    const urlApiReq = environment.urlApi+'ExecuteQuery';
    return this.http.post(urlApiReq,obj);
  }

  deletePersonal(obj){
    const urlApiReq = environment.urlApi+'ExecuteQuery';
    return this.http.post(urlApiReq,obj);
  }

  getListHardwareDisponible(obj){
    const urlApiReq = environment.urlApi+'ExecuteQuery';
    return this.http.post(urlApiReq,obj);
  }

  getListCuentaDisponible(obj){
    const urlApiReq = environment.urlApi+'ExecuteQuery';
    return this.http.post(urlApiReq,obj);
  }

  asignarRecusoPersona(obj){
    const urlApiReq = environment.urlApi+'ExecuteQuery';
    return this.http.post(urlApiReq,obj);
  }

  getListHardwareAsignado(obj){
    const urlApiReq = environment.urlApi+'ExecuteQuery';
    return this.http.post(urlApiReq,obj);
  }

  getListCuentaAsignado(obj){
    const urlApiReq = environment.urlApi+'ExecuteQuery';
    return this.http.post(urlApiReq,obj);
  }

  desasignarRecurso(obj){
    const urlApiReq = environment.urlApi+'ExecuteQuery';
    return this.http.post(urlApiReq,obj);
  }

  deleteRecurso(obj){
    const urlApiReq = environment.urlApi+'ExecuteQuery';
    return this.http.post(urlApiReq,obj);
  }

  buscarPersona(obj){
    const urlApiReq = environment.urlApi+'ExecuteQuery';
    return this.http.post(urlApiReq,obj);
  }

  getListMarca(obj){
    const urlApiReq = environment.urlApi+'ExecuteQuery';
    return this.http.post(urlApiReq,obj);
  }

  getListTipo(obj){
    const urlApiReq = environment.urlApi+'ExecuteQuery';
    return this.http.post(urlApiReq,obj);
  }

  addHardware(obj){
    const urlApiReq = environment.urlApi+'ExecuteQuery';
    return this.http.post(urlApiReq,obj);
  }

  addTipo(obj){
    const urlApiReq = environment.urlApi+'ExecuteQuery';
    return this.http.post(urlApiReq,obj);
  }

  addMarca(obj){
    const urlApiReq = environment.urlApi+'ExecuteQuery';
    return this.http.post(urlApiReq,obj);
  }

  getPersonalId(obj){
    const urlApiReq = environment.urlApi+'ExecuteQuery';
    return this.http.post(urlApiReq,obj);
  }

  updatePersonal(obj){
    const urlApiReq = environment.urlApi+'ExecuteQuery';
    return this.http.post(urlApiReq,obj);
  }

  buscarRecursoHardware(obj){
    const urlApiReq = environment.urlApi+'ExecuteQuery';
    return this.http.post(urlApiReq,obj);
  }

  buscarCuenta(obj){
    const urlApiReq = environment.urlApi+'ExecuteQuery';
    return this.http.post(urlApiReq,obj);
  }

  getHardwareId(obj){
    const urlApiReq = environment.urlApi+'ExecuteQuery';
    return this.http.post(urlApiReq,obj);
  }

  deleteCuentaTipo(obj){
    const urlApiReq = environment.urlApi+'ExecuteQuery';
    return this.http.post(urlApiReq,obj);
  }

  getCuentaId(obj){
    const urlApiReq = environment.urlApi+'ExecuteQuery';
    return this.http.post(urlApiReq,obj);
  }

  updateCuenta(obj){
    const urlApiReq = environment.urlApi+'ExecuteQuery';
    return this.http.post(urlApiReq,obj);
  }

  getListaTotalTablas(obj){
    const urlApiReq = environment.urlApi+'ExecuteQuery';
    return this.http.post(urlApiReq,obj);
  }

  getListaTablaEntidad(obj){
    const urlApiReq = environment.urlApi+'ExecuteQuery';
    return this.http.post(urlApiReq,obj);
  }

  getCboEnt(obj){
    const urlApiReq = environment.urlApi+'ExecuteQuery';
    return this.http.post(urlApiReq,obj);
  }

  getCboEntTabla(obj){
    const urlApiReq = environment.urlApi+'ExecuteQuery';
    return this.http.post(urlApiReq,obj);
  }

  getInfoEntidad(obj){
    const urlApiReq = environment.urlApi+'ExecuteQuery';
    return this.http.post(urlApiReq,obj);
  }

  updateInfoPersonal(obj){
    const urlApiReq = environment.urlApi+'ExecuteQuery';
    return this.http.post(urlApiReq,obj);
  }

  getHistoricoPersonaProyectos(obj){
    const urlApiReq = environment.urlApi+'ExecuteQuery';
    return this.http.post(urlApiReq,obj);
  }

  /*PERSONAL FIN*/

  /*getById(id:string){
    const urlApiReq = environment.urlApi+'getcustomquery/'+'74-PAR_REQID-'+id;
    return this.http.get(urlApiReq);
  }*/

  /*findReqs(busqueda){
    const urlApiReq = environment.urlApi+'ExecuteQuery';
    return this.http.post<BusquedaF>(urlApiReq,{
      "queryId": 77,
      "mapValue": {
        "codigoPET": busqueda.texto,
        "servicio": busqueda.servicio,
        "estado": busqueda.estado,
        "inicio": busqueda.fechaInicio,
        "fin": busqueda.fechaFin
      }
    });
  }*/

  /*getAllReqs(){
    const urlApiReq = environment.urlApi+'getcustomquery/'+'75-xxx-00';
    return this.http.get<Array<any>>(urlApiReq);
  }

  getHistoricoCambios(id:string){
    const urlApiReq = environment.urlApi+'getcustomquery/'+'71-PAR_REQID-'+id;
    return this.http.get(urlApiReq);
  }

  getAllTipos(){
    const urlApiReq = environment.urlApi+'getcustomquery/'+'7-tipoRequerimiento-0';
    return this.http.get(urlApiReq);
  }

  getSubTipos(id: String){
    const urlApiReq = environment.urlApi+'getcustomquery/'+'8-tipoRequerimiento-'+id;
    return this.http.get(urlApiReq);
  }

  getAllComplejidad(){
    const urlApiReq = environment.urlApi+'getcustomquery/'+'10-PAR_REQID-0000';
    return this.http.get(urlApiReq);
  }

  getAllServicio(){
    const urlApiReq = environment.urlApi+'getcustomquery/'+'4-PAR_REQID-0000';
    return this.http.get(urlApiReq);
  }
  
  getAllSegmento(){
    const urlApiReq = environment.urlApi+'getcustomquery/'+'11-PAR_REQID-0000';
    return this.http.get(urlApiReq);
  }

  getAllArea(){
    const urlApiReq = environment.urlApi+'getcustomquery/'+'9-PAR_REQID-0000';
    return this.http.get(urlApiReq);
  }

  getAllProducto(){
    const urlApiReq = environment.urlApi+'getcustomquery/'+'12-PAR_REQID-0000';
    return this.http.get(urlApiReq);
  }
  
  getEstados(){
    const urlApiReq = environment.urlApi+'getcustomquery/'+'5-xxx-0000';
    return this.http.get(urlApiReq);
  }

  getMotivosRechazo(){
    const urlApiReq = environment.urlApi+'getcustomquery/'+'51-xxx-0000';
    return this.http.get(urlApiReq);
  }*/

  /*getMotivosCancelado(){
    const urlApiReq = environment.urlApi+'getcustomquery/'+'67-xxx-0000';
    return this.http.get(urlApiReq);
  }

  getMotivosStandby(){
    const urlApiReq = environment.urlApi+'getcustomquery/'+'68-xxx-0000';
    return this.http.get(urlApiReq);
  }

  getMotivosCerrado(){
    const urlApiReq = environment.urlApi+'getcustomquery/'+'81-xxx-0000';
    return this.http.get(urlApiReq);
  }

  getNumberOfTotalReqs(){
    const urlApiReq = environment.urlApi+'getcustomquery/'+'77-xxx-0000';
    return this.http.get(urlApiReq);
  }

  findReqs(busqueda){
    const urlApiReq = environment.urlApi+'ExecuteQuery';
    return this.http.post<BusquedaF>(urlApiReq,{
      "queryId": 77,
      "mapValue": {
        "codigoPET": busqueda.texto,
        "servicio": busqueda.servicio,
        "estado": busqueda.estado,
        "inicio": busqueda.fechaInicio,
        "fin": busqueda.fechaFin
      }
    });
  }

  findReqsTotal(){
    const urlApiReq = environment.urlApi+'ExecuteQuery';
    return this.http.post<escalar>(urlApiReq,{
      "queryId": 78
    });
  }
  
  updateRequerimiento(req:RequerimientoInterface, fechaCambio: string, usuarioId:number){
    const urlApiReq = environment.urlApi+'ExecuteQuery';
    return this.http.post(urlApiReq,{
      "queryId": 72,
      "mapValue": {
        "reqId": req.id,
        "nombreRequerimiento": req.nombre,
        "servicio": req.servicio,
        "areaSolicitante": req.solicitanteArea,
        "complejidad": req.complejidad,
        "segmento": req.segmento,
        "producto": req.producto,
        "fechaInicioPrueba": req.fechaInicioPrueba,
        "fechaFinPrueba": req.fechaFinPrueba,
        "estado": req.estado,
        "motivoEstado": req.motivoEstado,
        "fechaCambio": fechaCambio,
        "estimacion": req.estimacion,
        "codigoJira": req.codigoJira,
        "codigoMantis": req.codigoMantis,
        "codigoTestlink": req.codigoTestlink,
        "cantidadCP": req.cantidadCP,
        "userId": usuarioId
      }
    });
  }

  addRequerimiento(req:RequerimientoInterface, usuarioId:number){
    console.log(req);
    const urlApiReq = environment.urlApi+'ExecuteQuery';
    return this.http.post(urlApiReq,{
      "queryId": 76,
      "mapValue": {
        "tipoRequerimiento": req.tipo,
        "subTipoRequerimiento": req.subtipo,
        "codigoPET": req.codigoPET,
        "nombreRequerimiento": req.nombre,
        "descripcion": req.descripcion,
        "solicitante": req.solicitanteNombre,
        "correoSolicitante": req.solicitanteCorreo,
        "telefonoSolicitante": req.solicitanteTelefono,
        "jefeSolicitante": req.solicitanteJefe,
        "complejidad": req.complejidad,
        "servicio": req.servicio,
        "segmento": req.segmento,
        "producto": req.producto,
        "areaSolicitante": req.solicitanteArea,
        "fechaSolicitud": req.fechaSolicitud,
        "cantidadCP": req.cantidadCP,
        "SIS_USER": usuarioId
      }
    });
  }

  uploadFile(file:File, folder:string){
    const urlApiFile = environment.apiFiles;
    const formData: FormData = new FormData();
    formData.append('upfile', file);
    formData.append('folder', folder);
    console.log(formData);

    return this.http.post(urlApiFile, formData);
  }

  addFileLinkToDB(reqId:number, originalName:string, url:string, fechaRegistro:string){
    const urlApiReq = environment.urlApi+'ExecuteQuery';
    return this.http.post(urlApiReq,{
      "queryId": 79,
      "mapValue": {
        "url": url,
        "originalName": originalName,
        "fechaRegistro": fechaRegistro,
        "reqId": reqId
      }
    });
  }

  getFiles(reqId:string){
    const urlApiReq = environment.urlApi+'getcustomquery/'+'80-reqId-'+reqId;
    return this.http.get(urlApiReq);
  }*/
}
