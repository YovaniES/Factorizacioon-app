import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequerimientoService } from '../../../services/requerimiento.service';
import { RequerimientoInterface } from '../../../models/requerimiento';
import { EmailService } from '../../../services/email.service';
import { DatePipe } from '@angular/common';
import Swal from '../../../../../node_modules/sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';
import { Usuario } from '../../../models/usuario';
import { Role } from '../../../models/role';
@Component({
  selector: 'app-appreqdetail',
  templateUrl: './appreqdetail.component.html',
  styleUrls: ['./appreqdetail.component.sass']
})
export class AppreqdetailComponent implements OnInit {

  reqId: any = 0;
  complejidades: any;
  servicios: any;
  segmentos: any;
  areas:any;
  productos:any;
  tipos: any;
  subTipos:any;
  historicoCambios:any;
  estados:Array<any> = [];
  motivos:any;
  usuario:Usuario;
  role = Role;
  

  selectedComplejidad: any = 0;
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
    codigoMantis: '',
    codigoJira: '',
    codigoTestlink: '',
    archivos: [],
    cantidadCP: 0
  };

  constructor(private _Activatedroute:ActivatedRoute, private _service: RequerimientoService, 
              private _emailService: EmailService,
              public datepipe: DatePipe, private spinner: NgxSpinnerService, private router: Router) {

                this.usuario = JSON.parse(localStorage.getItem('currentUser'));
               
              }

  ngOnInit() {
    
    this._Activatedroute.paramMap.subscribe(params => {
      this.reqId = params.get('id');
      this.getComplejidad();
      this.getServicios();
      this.getSegmentos();
      this.getProductos();
      this.getAreas();
      this.getTipos();
      this.getReq(this.reqId);
      this.getHistoricoCambios(this.reqId);
      this.getArchivos(this.reqId);
      
    });
    console.log(this.usuario.user);
  }

  getReq(reqIdParam:string){
    this.spinner.show();
    this._service.getById(reqIdParam).subscribe(data => {
      this.requerimiento.id = data[0].reqId;
      this.requerimiento.codigoSolicitud = data[0].codigoSolicitud;
      this.requerimiento.nombre = data[0].nombreRequerimiento;
      this.requerimiento.tipo = data[0].tipoRequerimiento;
      this.requerimiento.subtipo = data[0].subTipoRequerimiento;
      this.requerimiento.codigoPET = data[0].codigoPET;
      this.requerimiento.descripcion = data[0].descripcion;
      this.requerimiento.solicitanteNombre = data[0].solicitante;
      this.requerimiento.solicitanteJefe = data[0].jefeSolicitante;
      this.requerimiento.solicitanteCorreo = data[0].correoSolicitante;
      this.requerimiento.solicitanteTelefono = data[0].telefonoSolicitante;
      this.requerimiento.solicitanteArea = data[0].areaSolicitante;
      this.requerimiento.complejidad = data[0].complejidad;
      this.requerimiento.servicio = data[0].servicio;
      this.requerimiento.segmento = data[0].segmento;
      this.requerimiento.producto = data[0].producto;
      this.requerimiento.fechaSolicitud = data[0].fechaSolicitud;
      this.requerimiento.fechaInicioPrueba = data[0].fechaInicioPruebas;
      this.requerimiento.fechaFinPrueba = data[0].fechaFinPruebas;
      this.requerimiento.estimacion = data[0].estimacion;
      this.requerimiento.codigoMantis = data[0].codigoMantis;
      this.requerimiento.codigoJira = data[0].codigoJira;
      this.requerimiento.codigoTestlink = data[0].codigoTestlink;
      this.requerimiento.estado = data[0].estado;
      this.requerimiento.motivoEstado = data[0].motivoEstado;
      this.requerimiento.cantidadCP = data[0].cantidadCP;
      this.getSubTipos(this.requerimiento.tipo);
      this.getMotivos(this.requerimiento.estado);
      this.getEstados();
      this.spinner.hide();
    });
  }

  getTipos(){
    this._service.getAllTipos().subscribe(data => {
      this.tipos = data;
    });
  }

  getSubTipos(idTipo:string){
    this._service.getSubTipos(idTipo).subscribe(data => {
      this.subTipos = data;
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

  getEstados(){
    this.estados = [];
    this._service.getEstados().subscribe(data => {
      let estadosData:any = [] ;
      estadosData = data;
      console.log(estadosData);
      estadosData.forEach(element => {
        if(element.padre != null){
          let padresElemento = element.padre.split(",");
          console.log(padresElemento);
          padresElemento.forEach(padre => {
            if(padre.localeCompare(this.requerimiento.estado) == 0){
              console.log(element.padre);
              this.estados.push(element);
            }
          });
        }
      });
      
    });
  }

  getMotivos(idEstado:string){
    console.log(this.requerimiento.motivoEstado);
    let NidEstado:number = parseInt(idEstado);
    this.spinner.show();
    switch(NidEstado){
      case 2:
        this._service.getMotivosRechazo().subscribe(data => {
          this.motivos = data;
          this.spinner.hide();
        });
        break;

      case 10:
        this._service.getMotivosCancelado().subscribe(data => {
          this.motivos = data;
          this.spinner.hide();
        });
        break;

      case 9:
        this._service.getMotivosStandby().subscribe(data => {
          this.motivos = data;
          this.spinner.hide();
        });
        break;

      case 11:
        this._service.getMotivosCerrado().subscribe(data => {
          this.motivos = data;
          this.spinner.hide();
        });
        break;

      default:
        this.motivos=[];
        this.requerimiento.motivoEstado = '';
        this.spinner.hide();
    }
    
  }

  getHistoricoCambios(reqIdParam:string){
    this._service.getHistoricoCambios(reqIdParam).subscribe(data => {
      this.historicoCambios = data;
    });
  }

  actualizarReq(req:RequerimientoInterface): void {
    this.spinner.show();
    let myDate = new Date();
    let date:string = this.datepipe.transform(myDate, 'yyyy-MM-dd HH:mm:ss');
    this._service.updateRequerimiento(req, date, this.usuario.user.userId).subscribe(data => {
      
      let message:string;
      this.getHistoricoCambios(this.reqId);
      this.getEstados();
      this.getMotivos(this.requerimiento.estado);
      this.spinner.hide();
      if(data.hasOwnProperty('errorMessage')){
        message = "Hubo un error al actualizar";
        Swal.fire({
          title: 'Error!',
          text: message,
          icon: 'error',
          confirmButtonText: 'Ok'
        })
      }else{
        if(this.requerimiento.estado != this.historicoCambios[this.historicoCambios.length-1].idEstado){ //envio de correo si el estado es diferente al ultimo
          this._emailService.getEmailDataById('2').subscribe(data => {
            console.log(data);
            if(data.hasOwnProperty('errorMessage')){
              message = "Hubo un error al enviar correo";
              Swal.fire({
                title: 'Error!',
                text: message,
                icon: 'error',
                confirmButtonText: 'Ok'
              })
            }else{
              let message = '<li> Actualización exitosa </li>';
              let dataEmail:any = data;
  
              let estadoAntiguo:string = this.historicoCambios[this.historicoCambios.length - 2].estado;
              let estadoNuevo:string = this.historicoCambios[this.historicoCambios.length - 1].estado;
              
              let mailBody:string = this.replaceEmailValues(dataEmail[0].body,"@{NombrePET}",this.requerimiento.nombre);
              let mailBody2:string = this.replaceEmailValues(mailBody,"@{Usuario}",this.usuario.user.nombres + ' '+ this.usuario.user.apellidoPaterno);
              let mailBody3:string = this.replaceEmailValues(mailBody2,"@{EstadoAntiguo}",estadoAntiguo);
              let mailBody4:string = this.replaceEmailValues(mailBody3,"@{EstadoNuevo}",estadoNuevo);
              
              let mailSubject:string = this.replaceEmailValues(dataEmail[0].subject,"@{NombrePET}",this.requerimiento.nombre);
  
              let toMail:string = this.replaceEmailValues(dataEmail[0].toEmail, "@{CorreoSolicitante}", this.requerimiento.solicitanteCorreo);
  
              this._emailService.sendEmail(mailSubject, mailBody4, toMail).subscribe(data => {
                let rest2:any = data;
                if(rest2.status == "error"){
                  console.log("error en envio de correo");
                  console.log(rest2);
                }else{
                  console.log(rest2);
                  message = message + '<li> Envio de correo exitoso </li>';
  
                  Swal.fire({
                    title: 'Exito!',
                    html: message,
                    icon: 'success',
                    confirmButtonText: 'Ok'
                  }).then(result => {
                    if(result.value){
                      /*action after pressing ok*/
                    }
                  });
                }
              });
              
            }
          });
        }
        else{
          let message = '<li> Actualización exitosa </li>';
          Swal.fire({
            title: 'Exito!',
            html: message,
            icon: 'success',
            confirmButtonText: 'Ok'
          }).then(result => {
            if(result.value){
              /*action after pressing ok*/
            }
          });
        }
      }
      
    });
    console.log("boton actualizar");
  }

  actualizarFechaInicioPrueba(fecha:string){
    let fecha2 =  new Date(fecha + ' 00:00:00');
    let dateF = this.datepipe.transform(fecha2, 'yyyy/MM/dd');
    this.requerimiento.fechaInicioPrueba = dateF;
  }

  actualizarFechaFinPrueba(fecha:string){
    
    let fecha2 =  new Date(fecha + ' 00:00:00');
    let dateF = this.datepipe.transform(fecha2, 'yyyy/MM/dd');
    this.requerimiento.fechaFinPrueba = dateF;
  }

  callSubtypes(idType:string){
    this.getSubTipos(idType);
    console.log("cambio");
  }

  regresarBandeja(){
    this.router.navigate(['bandejaRequerimientos']);
  }

  getArchivos(idReq:string){
    this._service.getFiles(idReq).subscribe(data => {
      let temp:any = [];
      temp = data;
      this.requerimiento.archivos = temp;
      console.log(this.requerimiento.archivos);
    });
  }

  onFileSelected(files:FileList) {
    if(files.length > 0) 
     {
      this.spinner.show();
      console.log(files[0].name);
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
        this.spinner.hide();
        messageFile = 'Extensión "'+fileExtension[0]+'" no válida';
        Swal.fire({
          title: 'Error!',
          text: messageFile,
          icon: 'error',
          confirmButtonText: 'Ok'
        }).then(result => {
        });
      }else{
        this._service.uploadFile(files[0], this.requerimiento.codigoSolicitud).subscribe(
          data => {
            let response:any = data;
            if(response.error == true){
              this.spinner.hide();
              Swal.fire({
                title: 'Error!',
                text: response.message,
                icon: 'error',
                confirmButtonText: 'Ok'
              })
            }else{
              let arc:any = data;
              let fecha2 =  new Date();
              let dateF = this.datepipe.transform(fecha2, 'yyyy/MM/dd HH:mm:ss');
              
              this._service.addFileLinkToDB(parseInt(this.requerimiento.id), arc.originalName,arc.filePath,dateF).subscribe(
                data => {
                  this.spinner.hide();
                  Swal.fire({
                    title: 'Exito!',
                    text: "Se subió correctamente",
                    icon: 'success',
                    confirmButtonText: 'Ok'
                  });
                  this.getArchivos(this.reqId);
                },
                error => {
                  this.spinner.hide();
                  Swal.fire({
                    title: 'Error!',
                    text: "Hubo un error al subir el archivo",
                    icon: 'error',
                    confirmButtonText: 'Ok'
                  })
                }
              );
            }
            
          },
          error => {
            console.log(error);
          }
        );
      }
     }
   }

   replaceEmailValues(rawMail:string,a:string,b:string){
    const str = rawMail;
    const removeStr = a; //variable
    const regex =  new RegExp(removeStr,'g'); // correct way
    const newstr = str.replace(regex,b); // it works
    console.log(newstr);
    return newstr;
   }

}
