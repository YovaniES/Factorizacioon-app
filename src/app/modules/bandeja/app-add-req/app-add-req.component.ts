import { Component, OnInit } from '@angular/core';
import { RequerimientoService } from '../../../services/requerimiento.service';
import { RequerimientoInterface } from '../../../models/requerimiento';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-app-add-req',
  templateUrl: './app-add-req.component.html',
  styleUrls: ['./app-add-req.component.sass']
})
export class AppAddReqComponent implements OnInit {

  complejidades: any;
  servicios: any;
  segmentos: any;
  areas:any;
  productos:any;
  tipos: any;
  subTipos:any;
  archivos:FileList;
  usuario:Usuario;

  requerimiento: RequerimientoInterface = {
    id:'',
    codigoSolicitud: '',
    nombre: '',
    tipo: '',
    subtipo: '',
    codigoPET: '',
    descripcion: '',
    solicitanteNombre: '',
    solicitanteJefe: '',
    solicitanteCorreo: '',
    solicitanteTelefono: '',
    solicitanteArea: '',
    complejidad: '',
    servicio: '',
    segmento: '',
    producto: '',
    fechaSolicitud: '',
    fechaInicioPrueba: '',
    fechaFinPrueba: '',
    estado: '',
    motivoEstado: '',
    estimacion: 0,
    codigoMantis:'',
    codigoJira:'',
    codigoTestlink: '',
    archivos: [],
    cantidadCP: 0
  };

  constructor(private _service: RequerimientoService,public datepipe: DatePipe, 
    private router: Router, private spinner: NgxSpinnerService) { 

      this.usuario = JSON.parse(localStorage.getItem('currentUser'));
    }

  ngOnInit() {
    this.getComplejidad();
    this.getServicios();
    this.getSegmentos();
    this.getProductos();
    this.getAreas();
    this.getTipos();
    console.log(localStorage.getItem('currentUser'));
  }

  getTipos(){
    this.spinner.show();
    this._service.getAllTipos().subscribe(data => {
      this.tipos = data;
      console.log(this.tipos);
      this.spinner.hide();
    });
  }

  getSubTipos(idTipo:string){
    this.spinner.show();
    this._service.getSubTipos(idTipo).subscribe(data => {
      this.subTipos = data;
      this.spinner.hide();
    });
  }

  getComplejidad(){
    this._service.getAllComplejidad().subscribe(data => {
      this.complejidades = data;
    });
  }

  getServicios(){
    this._service.getAllServicio().subscribe(data => {
      this.servicios = data;
    });
  }

  getSegmentos(){
    this._service.getAllSegmento().subscribe(data => {
      this.segmentos = data;
    });
  }

  getAreas(){
    this._service.getAllArea().subscribe(data => {
      this.areas = data;
    });
  }

  getProductos(){
    this._service.getAllProducto().subscribe(data => {
      this.productos = data;
    });
  }

  callSubtypes(idType:string){
    this.getSubTipos(idType);
  }

  getFechaSolicitud(){
    let fecha2 =  new Date();
    let dateF = this.datepipe.transform(fecha2, 'yyyy/MM/dd HH:mm:ss');
    this.requerimiento.fechaSolicitud = dateF;
  }

  /*
  actualizarFechaLanzamiento(fecha:string){
    let fecha2 =  new Date(fecha + ' 00:00:00');
    let dateF = this.datepipe.transform(fecha2, 'yyyy/MM/dd');
    this.requerimiento.fechaLanzamiento = dateF;
  }

  actualizarFechaVentana(fecha:string){
    
    let fecha2 =  new Date(fecha);
    let dateF = this.datepipe.transform(fecha2, 'yyyy/MM/dd HH:mm');
    this.requerimiento.fechaVentana = dateF;
  }
  */

  agregarReq(req:RequerimientoInterface){
    this.getFechaSolicitud();
    this.spinner.show();
    let showMessage:String = '';

    showMessage = '<ul>'
    
    if(this.requerimiento.nombre == ''){
      showMessage = showMessage + '<li> Falta Nombre de PET</li>';
    }
    if(this.requerimiento.solicitanteNombre == ''){
      showMessage = showMessage + '<li> Falta Nombre de solicitante</li>';
    }
    if(this.requerimiento.solicitanteCorreo == ''){
      showMessage = showMessage + '<li> Falta correo de solicitante</li>';
    }
    if(this.archivos == undefined){
      showMessage = showMessage + '<li> Falta adjuntar un archivo</li>';
    }

    if (showMessage !== '<ul>'){
      this.spinner.hide();
      showMessage = showMessage + '</ul>';
      Swal.fire({
        title: 'Error!',
        html: showMessage,
        icon: 'error',
        confirmButtonText: 'Ok'
      }).then(result => {
      });
    }else{
      this._service.addRequerimiento(req, this.usuario.user.userId).subscribe(data => {
        showMessage = '';
        console.log(data);
        let resultReq:any = data;
        
        if(resultReq.hasOwnProperty('errorMessage')){
            this.spinner.hide();
            
            if(resultReq.hasOwnProperty('errorMessage')){
              let message:String = resultReq.errorMessage;
              let splitedMessage = message.split(';');
              console.log(splitedMessage);
              splitedMessage.forEach(element => {
                showMessage = showMessage + '<li>' + element + '</li>';
              });
            }
            
            showMessage = showMessage + '</ul>';
  
            if(resultReq.hasOwnProperty('internalError')){
              showMessage = resultReq.internalError;
            }
  
            Swal.fire({
              title: 'Error!',
              html: showMessage,
              icon: 'error',
              confirmButtonText: 'Ok'
            }).then(result => {
            });
        }else{
          console.log(resultReq.exitoMessage);
  
          this._service.uploadFile(this.archivos.item(0), resultReq.exitoMessage).subscribe(data => {
            
            let arc:any = data;
            console.log(arc.filePath);
            
            this._service.addFileLinkToDB(resultReq.resultId, arc.originalName,arc.filePath,this.requerimiento.fechaSolicitud).subscribe(data => {
              this.archivos = undefined;
              this.spinner.hide();
              let message:string;
              if(data.hasOwnProperty('errorMessage')){
                message = "Hubo un error al adjuntar archivo";
                Swal.fire({
                  title: 'Error!',
                  text: message,
                  icon: 'error',
                  confirmButtonText: 'Ok'
                })
              }else{
                message = "Registro exitoso!";
                Swal.fire({
                  title: 'Exito!',
                  text: message,
                  icon: 'success',
                  confirmButtonText: 'Ok'
                }).then(result => {
                  if(result.value){
                    this.regresarBandeja();
                  }
                });
              }
            });
            
          });
        }
        
        
      });
    }
    
  }

  regresarBandeja(){
    this.router.navigate(['/bandejaRequerimientos']);
  }

  onFileSelected(files:FileList) {
    if(files.length > 0) 
     {
        let messageFile:String =  '';
        var re = /(?:\.([^.]+))?$/;
        var fileExtension = re.exec(files[0].name);
        let arrayExtensions = ['pdf','doc','xls','zip','7z','docx','xlsx','mpp','rar'];
        console.log(fileExtension);
        let count:number = 0;
        arrayExtensions.forEach(element => {
          if(fileExtension[0].includes(element)){
            count = count + 1;
          }
        });
        
        if(count == 0){
          messageFile = 'Extensión "'+fileExtension[0]+'" no válida';
          Swal.fire({
            title: 'Error!',
            text: messageFile,
            icon: 'error',
            confirmButtonText: 'Ok'
          }).then(result => {
          });
        }else{
          this.archivos = files;
          console.log(files[0].name);
        }
     }
   }
}
