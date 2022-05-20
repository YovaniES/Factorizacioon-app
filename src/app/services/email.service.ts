import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http: HttpClient) { }

  getEmailDataById(id:string){
    const urlApiReq = environment.urlApi+'getcustomquery/'+'82-mailId-'+id;
    return this.http.get(urlApiReq);
  };

  sendEmail(subject:string, body:string, to:string){
    const urlApiMail = environment.apiSendEmail;
    const formData: FormData = new FormData();
    formData.append('subject', subject);
    formData.append('body', body);
    formData.append('emails', to);

    return this.http.post(urlApiMail,formData);
  }
}
