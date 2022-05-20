import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmailService } from '../../../services/email.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2/dist/sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';
import { Usuario } from '../../../models/usuario';
import { Role } from '../../../models/role';
import { MantenimientoService } from '../../../services/mantenimiento.service';
import {ToastrService} from 'ngx-toastr';
import { toDate } from '@angular/common/src/i18n/format_date';

@Component({
  selector: 'app-recursocuentadetalle',
  templateUrl: './apprecursocuentadetalle.component.html',
  styleUrls: ['./apprecursocuentadetalle.component.sass']
})
export class ApprecursocuentadetalleComponent implements OnInit {

  paginaInicioT:number;
  paginaInicioM:number;
  totalItemsH:number;
  totalItemsP:number;
  tipo:Array<any> = [];
  datosTipo = {
    nombre: '',
    descripcion: ''
  };
  @ViewChild('btnGuardarTipo') btnGuardarTipo:ElementRef;
  @ViewChild('cerrarModalTipo') cerrarModalTipo:ElementRef;

  usuario:Usuario;
  role = Role; 

  constructor(private _Activatedroute:ActivatedRoute, private _service: MantenimientoService, 
              private _emailService: EmailService,public datepipe: DatePipe, 
              private spinner: NgxSpinnerService, private router: Router, private toastr: ToastrService) {

                this.usuario = JSON.parse(localStorage.getItem('currentUser'));
               
              }

  ngOnInit() {
    this.getListaTipo();
  }

  nroPaginaT(){
    this.paginaInicioT = 1;
  }

  showSuccess(msj:string){
    this.toastr.success(msj,'',{timeOut: 2000});
  }

  showError(msj:string){
    this.toastr.error(msj,'',{timeOut: 2000});
  }

  showWarning(msj:string){
    this.toastr.warning(msj,'',{timeOut: 2000});
  }

  eliminarTipo(idTipo:number){
    this.spinner.show();

    let arrayParametro:any[] = [{
      "queryId": 41,
      "mapValue": {
        "param_id_tipo": idTipo,
        "CONFIG_USER_ID":this.usuario.user.userId,
        "CONFIG_OUT_MSG_ERROR":'',
        "CONFIG_OUT_MSG_EXITO":''
      }
    }];

    this._service.deleteCuentaTipo(arrayParametro[0]).subscribe(data => {
      const arrayData:any[] = Array.of(data);
      let msj = arrayData[0].exitoMessage;
      let msj2 = arrayData[0].errorMessage
      if(msj == undefined){
        msj = '';
      }
      if(msj2 == undefined){
        msj2 = '';
      }
      if (msj != '') {
        this.showSuccess(msj);
      }else if (msj2 != ''){
        this.showError(msj2);
      }else{
        this.showError('Error');
      }
      this.getListaTipo();
    });
    this.spinner.hide();
  }

  getListaTipo(){
    //this.spinner.show();
    let arrayParametro:any[] = [{
      "queryId": 40
    }];
    this._service.getListTipo(arrayParametro[0]).subscribe(data => {
      const arrayData:any[] = Array.of(data);
      this.tipo = [];
      for (let index = 0; index < arrayData[0].list.length; index++) {
        this.tipo.push({
          id:arrayData[0].list[index].id,
          nombre:arrayData[0].list[index].nombre,  
          descripcion:arrayData[0].list[index].descripcion
        });
      }
      //this.spinner.hide();
    });
  }

  addTipo(){
    this.spinner.show();
    this.btnGuardarTipo.nativeElement.disabled = true;
    let nombre = this.datosTipo.nombre
    let descripcion = this.datosTipo.descripcion;

    let arrayParametro:any[] = [{
      "queryId": 39,
      "mapValue": {
        "param_nombre": nombre,
        "param_descripcion": descripcion,
        "CONFIG_USER_ID":this.usuario.user.userId,
        "CONFIG_OUT_MSG_ERROR":'',
        "CONFIG_OUT_MSG_EXITO":''
      }
    }];

    this._service.addTipo(arrayParametro[0]).subscribe(data => {
      const arrayData:any[] = Array.of(data);
      let msj = arrayData[0].exitoMessage;
      let msj2 = arrayData[0].errorMessage
      if(msj == undefined){
        msj = '';
      }
      if(msj2 == undefined){
        msj2 = '';
      }
      if (msj != '') {
        this.showSuccess(msj);
      }else if (msj2 != ''){
        this.showError(msj2);
      }else{
        this.showError('Error');
      }
      this.getListaTipo();
      this.cerrarModalTipo.nativeElement.click();
    });
    this.spinner.hide();
  }

  habilitarGuardar(){
    this.btnGuardarTipo.nativeElement.disabled = false;
  }

  limpiarTipo(){
    this.datosTipo.nombre = '';
    this.datosTipo.descripcion = '';
  }

  regresarBandeja(){
    this.router.navigate(['mantenimientoCuenta']);
  }

}
