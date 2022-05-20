import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { EmailService } from './email.service';

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {

  constructor(private http: HttpClient, private mail: EmailService) { }

  getEmailToken(email:string){
    const urlApiMail = environment.apiSeguridadUrl + 'PasswordToken';
    return this.http.post(urlApiMail,{email: email});
  }

  saveResetLink(token:string, userId:string){
    const urlApiReq = environment.urlApi+'ExecuteQuery';
    return this.http.post(urlApiReq,{
      "queryId": 84,
      "mapValue": {
        "uniqueIdentifier": token,
        "userId": userId
      }
    });
  }

  validateResetLink(token:string){
    const urlApiReq = environment.urlApi+'ExecuteQuery';
    return this.http.post(urlApiReq,{
      "queryId": 83,
      "mapValue": {
        "uniqueIdentifier": token
      }
    });
  }

  getUsuarioIdByToken(uid:string){
    const urlApiReq = environment.urlApi+'getcustomquery/'+'86-token-'+uid;
    return this.http.get(urlApiReq);
  }

  getUsuarioIdByemail(email:string){
    const urlApiReq = environment.urlApi+'getcustomquery/'+'85-correo-'+email;
    return this.http.get(urlApiReq);
  }

  changePassword(userId:string, newPassword:string){
    const urlApiReq = environment.urlApi+'ExecuteQuery';
    return this.http.post(urlApiReq,{
      "queryId": 87,
      "mapValue": {
        "userId": userId,
        "newPassword": newPassword
      }
    });
  }

  deleteResetRequest(uid:string){
    const urlApiReq = environment.urlApi+'ExecuteQuery';
    return this.http.post(urlApiReq,{
      "queryId": 88,
      "mapValue": {
        "uid": uid
      }
    });
  }
}
