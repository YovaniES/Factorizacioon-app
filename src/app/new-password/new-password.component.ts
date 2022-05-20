import { Component, OnInit } from '@angular/core';
import { ChangePasswordService } from '../services/change-password.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import Swal from '../../../node_modules/sweetalert2/dist/sweetalert2.js';
import { NgxSpinnerService } from "ngx-spinner";
import {Md5} from 'ts-md5/dist/md5';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.sass']
})
export class NewPasswordComponent implements OnInit {

  uniqueId:string = '';
  newPassword:string = '';
  confirmPassword:string = '';

  constructor(private _resetPassword: ChangePasswordService, private _router: Router, 
        private _activatedRoute:ActivatedRoute, private _spinner: NgxSpinnerService) { }

  ngOnInit() {
    
    this._activatedRoute.paramMap.subscribe(params => {
      this.uniqueId = params.get('uid');
      this.validateUid(this.uniqueId);
    });

    
  }

  validateUid(uid:string){
    this._spinner.show();
    this._resetPassword.validateResetLink(uid).subscribe(data => {
      this._spinner.hide();
      let values:any = data;
      let isValid = values.mapValue.IsValid;
      console.log("isvalid= " + isValid);
      if(isValid == 0){
        Swal.fire({
          title: 'Error!',
          text: "El link no valido",
          icon: 'error',
          confirmButtonText: 'Ok'
        }).then(result => {
            this.toLogin();
        });
      }
    });
  }

  changePassword(){
    
    if(this.newPassword != this.confirmPassword){
      let message = "Las contraseñas no son iguales";
      Swal.fire({
        title: 'Error!',
        text: message,
        icon: 'error',
        confirmButtonText: 'Ok'
      })
    }else{
      this._spinner.show();
      this._resetPassword.getUsuarioIdByToken(this.uniqueId).subscribe(data => {
      
        if(data.hasOwnProperty('errorMessage') || data == 'undefined'){
          let message = "Hubo un error inesperado";
          Swal.fire({
            title: 'Error!',
            text: message,
            icon: 'error',
            confirmButtonText: 'Ok'
          })
        }else{
          let userData:any = data;
          console.log(userData[0]);
          console.log(this.newPassword);
          const md5 = new Md5();
          let hashnewPassword:string = md5.appendStr(this.newPassword).end().toString();
          this._resetPassword.changePassword(userData[0].userId, hashnewPassword).subscribe(data => {
            this._spinner.hide();
            this._resetPassword.deleteResetRequest(this.uniqueId).subscribe(data2 => {
              console.log(data);
            });
            Swal.fire({
              title: 'Exito!',
              text: "Se cambió la contraseña",
              icon: 'success',
              confirmButtonText: 'Ok'
            }).then(result => {
              this.toLogin();
            });
            
          });
        }
      });
    }
    
  }

  toLogin(){
    this._router.navigate(['login']);
  }

}
