import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatusRequerimientoService {

  constructor(private http: HttpClient) { }

  getReqData(codigoUnico:string){
    const urlApiReq = environment.apiReports+'?id=14&param='+codigoUnico;
    return this.http.get<any[]>(urlApiReq);
  }

  getHallazgoData(idSolicitud:string){
    const urlApiReq = environment.apiReports+'?id=16&param='+idSolicitud;
    return this.http.get<any[]>(urlApiReq);
  }

  getCasosPruebaData(idSolicitud:string){
    const urlApiReq = environment.apiReports+'?id=12&param='+idSolicitud;
    return this.http.get<any[]>(urlApiReq);
  }
}
