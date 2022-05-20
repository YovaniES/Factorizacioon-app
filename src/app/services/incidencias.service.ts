import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IncidenciasService {

  constructor(private http: HttpClient) { }

  getIncidencias(idSolicitud:string){
    const urlApiReq = environment.apiReports+'?id=33&param='+idSolicitud;
    return this.http.get<any[]>(urlApiReq);
  }
}
