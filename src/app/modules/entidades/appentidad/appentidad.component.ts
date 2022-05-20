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
import { promise } from 'protractor';

@Component({
  selector: 'app-entidad',
  templateUrl: './appentidad.component.html',
  styleUrls: ['./appentidad.component.css']
})
export class AppEntidadComponent implements OnInit {

  paginaInicioT:number;
  datosInfoEntidad = {
    nombre: '',
    descripcion: '',
    idPadre:''
  };
  datosEntidad = {
    nombre: '',
    descripcion: ''
  };
  @ViewChild('btnGuardarInfoEntidad') btnGuardarInfoEntidad:ElementRef;
  @ViewChild('btnGuardarEntidad') btnGuardarEntidad:ElementRef;
  @ViewChild('cerrarModalInfoEntidad') cerrarModalInfoEntidad:ElementRef;
  @ViewChild('cerrarModalEntidad') cerrarModalEntidad:ElementRef;
  @ViewChild('btnInfoEntidad') btnInfoEntidad:ElementRef;
  @ViewChild('tablaEntidad1') tablaEntidad1:ElementRef;
  @ViewChild('tablaEntidad2') tablaEntidad2:ElementRef;
  @ViewChild('cerrarModalEditarInfoEntidad') cerrarModalEditarInfoEntidad:ElementRef;
  @ViewChild('btnEditarInfoEntidad') btnEditarInfoEntidad:ElementRef;

  totaltablas = {
    id: ''
  };
  tablas:any;
  tablaEntidad:any;
  titulo:any;
  etiqueta:any;
  nombre:any;

  entidades:any;
  entidadTabla:any;

  datosEditarInfoEntidad = {
    id:'',
    idTabla: '',
    idInfo: '',
    nombre:'',
    descripcion:'',
    idPadre:'',
    nombrePadre:'',
    idTablaEntidad:'',
    NombreTablaEntidad:'',
    idCorrelativo:'',
  };
  idPadre:any;

  usuario:Usuario;
  role = Role; 

  constructor(private _Activatedroute:ActivatedRoute, private _service: MantenimientoService, 
              private _emailService: EmailService,public datepipe: DatePipe, 
              private spinner: NgxSpinnerService, private router: Router, private toastr: ToastrService) {

                this.usuario = JSON.parse(localStorage.getItem('currentUser'));
               
              }

  ngOnInit() {
    this.getListaTotalTablas();
    this.btnInfoEntidad.nativeElement.hidden = true;
    this.tablaEntidad1.nativeElement.hidden = true;
    this.tablaEntidad2.nativeElement.hidden = true;
  }

  getInfoTotalTablaEntidad(id:any,evento:any){
    this.totaltablas.id = id;
    this.idPadre = evento.target['options'][evento.target['options'].selectedIndex].id;
    this.nombre = evento.target['options'][evento.target['options'].selectedIndex].innerText;
    this.tablaEntidad = [];
    if (this.totaltablas.id != '1000') {
      this.titulo = ' Agregar ' + this.nombre;
      this.btnInfoEntidad.nativeElement.hidden = false;
      this.tablaEntidad1.nativeElement.hidden = false;
      this.tablaEntidad2.nativeElement.hidden = false;
    }else{
      this.titulo = '';
      this.btnInfoEntidad.nativeElement.hidden = true;
      this.tablaEntidad1.nativeElement.hidden = true;
      this.tablaEntidad2.nativeElement.hidden = true;
    }
     
    this.getListaTablaEntidad(id);
    this.getCboEntidadesTabla(this.idPadre);
    //this.getCboEntidades(id); 
  }

  getEntidades(id:any){
    this.getCboEntidadesTabla(id);
  }

  getEntidadesTabla(id:any){
    this.datosInfoEntidad.idPadre = id;
  }

  getListaTotalTablas(){
    //this.spinner.show();
    let arrayParametro:any[] = [{
      "queryId": 47
    }];
    this._service.getListaTotalTablas(arrayParametro[0]).subscribe(data => {
      const arrayData:any[] = Array.of(data);
      this.tablas = [];
      for (let index = 0; index < arrayData[0].list.length; index++) {
        this.tablas.push({
          id:arrayData[0].list[index].id,
          nombre:arrayData[0].list[index].nombre,  
          descripcion:arrayData[0].list[index].descripcion,
          idPadre:arrayData[0].list[index].idPadre
        });
      }
      //this.spinner.hide();
    });
  }

  getListaTablaEntidad(id:any){
    this.nroPaginaT();
    let arrayParametro:any[] = [{
      "queryId": 48,
      "mapValue": {
        "param_id_tabla": id,
      }
    }];
    this._service.getListaTablaEntidad(arrayParametro[0]).subscribe(data => {
      const arrayData:any[] = Array.of(data);
      this.tablaEntidad = [];
      for (let index = 0; index < arrayData[0].list.length; index++) {
        this.tablaEntidad.push({
          id:arrayData[0].list[index].id,
          nombre:arrayData[0].list[index].nombre,  
          descripcion:arrayData[0].list[index].descripcion,
          nombrePadre:arrayData[0].list[index].nombrePadre
        });
      }
    });
  }

  nroPaginaT(){
    this.paginaInicioT = 1;
  }

  nroPaginaM(){
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

  eliminarInfoEntidad(idInfoEntidad:any){
    this.spinner.show();

    let arrayParametro:any[] = [{
      "queryId": 53,
      "mapValue": {
        "param_id_tabla": this.totaltablas.id,
        "param_id_correlativo": idInfoEntidad,
        "CONFIG_USER_ID":this.usuario.user.userId,
        "CONFIG_OUT_MSG_ERROR":'',
        "CONFIG_OUT_MSG_EXITO":''
      }
    }];

    this._service.deleteRecurso(arrayParametro[0]).subscribe(data => {
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
      //this.getListaTipo();
      this.getListaTablaEntidad(this.totaltablas.id);
    });
    this.spinner.hide();
  }

  getCboEntidades(idCorrelativo:any){
    //this.idPadre = idCorrelativo;
    let arrayParametro:any[] = [{
      "queryId": 51
    }];

    this._service.getCboEnt(arrayParametro[0]).subscribe(data => {
      const arrayData:any[] = Array.of(data);
      this.entidades = [];
      for (let index = 0; index < arrayData[0].list.length; index++) {
        this.entidades.push({
          id:arrayData[0].list[index].id,
          nombre:arrayData[0].list[index].nombre
        });
      }
    });

  }

  getCboEntidadesTabla(idTabla:any){
    if (idTabla == 'null') {
      idTabla = 1000;
    }

    let arrayParametro:any[] = [{
      "queryId": 52,
      "mapValue": {
        "param_id_tabla": idTabla
      }
    }];

    this._service.getCboEntTabla(arrayParametro[0]).subscribe(data => {
      const arrayData:any[] = Array.of(data);
      this.entidadTabla = [];
      for (let index = 0; index < arrayData[0].list.length; index++) {
        this.entidadTabla.push({
          id:arrayData[0].list[index].id,
          nombre:arrayData[0].list[index].nombre
        });
      }
    });

  }

  addInfoEntidad(){
    this.spinner.show();
    this.btnGuardarInfoEntidad.nativeElement.disabled = true;
    let nombre = this.datosInfoEntidad.nombre
    let descripcion = this.datosInfoEntidad.descripcion;
    let idPadreInfoEntidad = this.datosInfoEntidad.idPadre;

    let arrayParametro:any[] = [{
      "queryId": 50,
      "mapValue": {
        "param_nombre": nombre,
        "param_descripcion": descripcion,
        "param_id_padre": idPadreInfoEntidad,
        "param_id_tabla": this.totaltablas.id,
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
      this.getListaTablaEntidad(this.totaltablas.id);
      this.cerrarModalInfoEntidad.nativeElement.click();
    });
    this.spinner.hide();
  }

  addEntidad(){
    this.spinner.show();
    this.btnGuardarEntidad.nativeElement.disabled = true;
    let nombre = this.datosEntidad.nombre
    let descripcion = this.datosEntidad.descripcion;

    let arrayParametro:any[] = [{
      "queryId": 49,
      "mapValue": {
        "param_nombre": nombre,
        "param_descripcion": descripcion,
        "param_padre_id": this.idPadre,
        "CONFIG_USER_ID":this.usuario.user.userId,
        "CONFIG_OUT_MSG_ERROR":'',
        "CONFIG_OUT_MSG_EXITO":''
      }
    }];

    this._service.addMarca(arrayParametro[0]).subscribe(data => {
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
      this.getListaTotalTablas();
      this.cerrarModalEntidad.nativeElement.click();
    });
    this.tablaEntidad = [];
    this.titulo = '';
    this.tablaEntidad1.nativeElement.hidden = true;
    this.tablaEntidad2.nativeElement.hidden = true;
    this.btnInfoEntidad.nativeElement.hidden = true;
    this.spinner.hide();
  }

  modalEditarInfoEntidad(entidad:any){
    //console.log('entidad: ' + entidad);//Id Info Entidad 
    //console.log('id tabla: ' + this.totaltablas.id);//Id Tabla
    this.btnEditarInfoEntidad.nativeElement.disabled = false;
    this.titulo = 'Editar'+ this.nombre;

    this.getCboEntidades(1);
    this.getCboEntidadesTabla2(1);

    let arrayParametro:any[] = [{
      "queryId": 54,
      "mapValue": {
        "param_id_tabla": this.totaltablas.id,
        "param_id_correlativo": entidad.id
      }
    }];

    this._service.getInfoEntidad(arrayParametro[0]).subscribe(data => {
      const arrayData:any[] = Array.of(data);
      this.datosEditarInfoEntidad.id = '';
      this.datosEditarInfoEntidad.idTabla = '';
      this.datosEditarInfoEntidad.idInfo = '';
      this.datosEditarInfoEntidad.nombre = '';
      this.datosEditarInfoEntidad.descripcion = '';
      this.datosEditarInfoEntidad.idPadre = '';
      this.datosEditarInfoEntidad.nombrePadre = '';
      this.datosEditarInfoEntidad.idTablaEntidad = '';
      this.datosEditarInfoEntidad.NombreTablaEntidad = '';
      this.datosEditarInfoEntidad.idCorrelativo = '';
      for (let index = 0; index < arrayData[0].list.length; index++) {
        this.datosEditarInfoEntidad.id = arrayData[0].list[index].id;
        this.datosEditarInfoEntidad.idTabla = arrayData[0].list[index].idTabla;
        this.datosEditarInfoEntidad.idInfo = arrayData[0].list[index].idInfo;
        this.datosEditarInfoEntidad.nombre = arrayData[0].list[index].nombre;
        this.datosEditarInfoEntidad.descripcion = arrayData[0].list[index].descripcion;
        this.datosEditarInfoEntidad.idPadre = arrayData[0].list[index].idPadre;
        this.datosEditarInfoEntidad.nombrePadre = arrayData[0].list[index].nombrePadre;
        this.datosEditarInfoEntidad.idTablaEntidad = arrayData[0].list[index].idTablaEntidad;
        this.datosEditarInfoEntidad.NombreTablaEntidad = arrayData[0].list[index].NombreTablaEntidad;
        this.datosEditarInfoEntidad.idCorrelativo = arrayData[0].list[index].idCorrelativoPadre;
      }
      this.getCboEntidades(this.totaltablas.id);
      this.getCboEntidadesTabla2(this.datosEditarInfoEntidad.idTablaEntidad);
    });
  }

  getCboEntidadesTabla2(idTabla:any){
    let arrayParametro:any[] = [{
      "queryId": 55,
      "mapValue": {
        "param_id_tabla": idTabla
      }
    }];

    this._service.getCboEntTabla(arrayParametro[0]).subscribe(data => {
      const arrayData:any[] = Array.of(data);
      this.entidadTabla = [];
      for (let index = 0; index < arrayData[0].list.length; index++) {
        this.entidadTabla.push({
          id:arrayData[0].list[index].idPadre,
          nombre:arrayData[0].list[index].valor_texto_1
        });
      }
    });
  }

  editarInfoEntidad(){
    this.spinner.show();
    this.btnEditarInfoEntidad.nativeElement.disabled = false;

    let arrayParametro:any[] = [{
      "queryId": 56,
      "mapValue": {
        "param_id": this.datosEditarInfoEntidad.id,
        "param_tabla": this.datosEditarInfoEntidad.idTabla,
        "param_correlativo": this.datosEditarInfoEntidad.idInfo,
        "param_nombre": this.datosEditarInfoEntidad.nombre,
        "param_descripcion": this.datosEditarInfoEntidad.descripcion,
        "param_padre": this.datosEditarInfoEntidad.idPadre,
        "CONFIG_USER_ID":this.usuario.user.userId,
        "CONFIG_OUT_MSG_ERROR":'',
        "CONFIG_OUT_MSG_EXITO":''
      }
    }];

    this._service.updateInfoPersonal(arrayParametro[0]).subscribe(data => {
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
      this.cerrarModalEditarInfoEntidad.nativeElement.click();
      this.getListaTablaEntidad(this.totaltablas.id);
    });
    this.spinner.hide();
  }

  habilitarGuardar(){
    this.titulo = 'Agregar ' + this.nombre;
    this.btnGuardarInfoEntidad.nativeElement.disabled = false;
    this.btnGuardarEntidad.nativeElement.disabled = false;
    this.getCboEntidades(this.totaltablas.id);
  }

  habilitarGuardarInfoEntidad(){
    this.titulo = 'Agregar ' + this.nombre;
    this.btnGuardarInfoEntidad.nativeElement.disabled = false;
    this.btnGuardarEntidad.nativeElement.disabled = false;
    //this.getCboEntidadesTabla(this.idPadre);
  }


  limpiarInfoEntidad(){
    this.datosInfoEntidad.nombre = '';
    this.datosInfoEntidad.descripcion = '';
    this.datosInfoEntidad.idPadre = '';
    //this.getCboEntidades(this.totaltablas.id);
    //this.getEntidades(1000);
  }

  limpiarEntidad(){
    this.datosEntidad.nombre = '';
    this.datosEntidad.descripcion = '';
  }

  regresarBandeja(){
    this.router.navigate(['mantenimientoRecurso']);
  }

}
