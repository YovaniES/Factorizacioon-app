import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { PuntoFuncion } from '../models/puntoFuncion';

@Injectable({
  providedIn: 'root'
})
export class PuntoFuncionService {

  constructor(private http: HttpClient) { }

  getAllIdSolicitudes(){
    const urlApiReq = environment.urlApi+'getcustomquery/'+'90-xxx-xxx';
    return this.http.get(urlApiReq);
  }

  getPuntosFuncionByIdSolicitud(id:number){
    const urlApiReq = environment.urlApi+'getcustomquery/'+'89-idSolicitud-'+id;
    return this.http.get<Array<PuntoFuncion>>(urlApiReq);
  }

  addPuntoFuncion(idSolicitud:number, nroPF:number, nombrePF:string){
    const urlApiReq = environment.urlApi+'ExecuteQuery';
    return this.http.post(urlApiReq,{
      "queryId": 91,
      "mapValue": {
        "idSolicitud": idSolicitud,
        "idPF": nroPF,
        "nombre": nombrePF
      }
    });
  }

  getPuntoFuncionById(idPuntoFuncion:number){
    const urlApiReq = environment.urlApi+'getcustomquery/'+'92-id-'+idPuntoFuncion;
    return this.http.get<PuntoFuncion>(urlApiReq);
  }

  deletePuntoFuncionById(idPuntoFuncion:number){
    const urlApiReq = environment.urlApi+'ExecuteQuery';
    return this.http.post(urlApiReq,{
      "queryId": 93,
      "mapValue": {
        "id": idPuntoFuncion
      }
    });
  }
}
