import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { RequerimientoInterface, BusquedaF, escalar } from '../models/requerimiento';

@Injectable({
  providedIn: 'root'
})

export class RequerimientoService {


  constructor(private http: HttpClient) {

  }

  getById(id:string){
    const urlApiReq = environment.urlApi+'getcustomquery/'+'74-PAR_REQID-'+id;
    return this.http.get(urlApiReq);
  }

  getListOfTen(offset:string = '0'){
    const urlApiReq = environment.urlApi+'getcustomquery/'+'73-offset-'+offset;
    return this.http.get<Array<any>>(urlApiReq);
  }

  getAllReqs(){
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
  }

  getMotivosCancelado(){
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
  }


  read(obj){
    const urlApiReq = environment.urlApi+'ExecuteQuery';
    return this.http.post(urlApiReq,obj);
  }
  create(obj){
    const urlApiReq = environment.urlApi+'ExecuteQuery';
    return this.http.post(urlApiReq,obj);
  }
  update(obj){
    const urlApiReq = environment.urlApi+'ExecuteQuery';
    return this.http.post(urlApiReq,obj);
  }
  delete(obj){
    const urlApiReq = environment.urlApi+'ExecuteQuery';
    return this.http.post(urlApiReq,obj);
  }
  exportar(obj){
    const urlApiReq = environment.urlApi+'ExecuteQuery';
    return this.http.post(urlApiReq,obj);
  }


}
