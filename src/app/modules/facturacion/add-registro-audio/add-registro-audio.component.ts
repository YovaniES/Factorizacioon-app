import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { RequerimientoService } from "../../../services/requerimiento.service";
import { DatePipe } from "@angular/common";
import { Router, ActivatedRoute } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { Usuario } from "src/app/models/usuario";
import { ToastrService } from "ngx-toastr";
import * as moment from "moment";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-add-registro-audio",
  templateUrl: "./add-registro-audio.component.html",
  styleUrls: ["./add-registro-audio.component.sass"],
})
export class AddRegistroComponent implements OnInit {
  nombreTipo: string;
  usuario: Usuario;
  inicioRegistro: boolean = true;
  topPosToStartShowing = 100;
  time: number = 0;
  today: any;
  tipoRegistro: number = 0;
  interval;
  botonTiempoRegistro: string = "Inicio";
  isPause: boolean = false;
  registroAudio = {
    codigo_factura: "",
    periodo: moment(new Date()).format("YYYY"),
    mes: moment(new Date()).format("MM"),
    idProyecto: 0,
    idLiquidaciones: 676,
    subservicio: "",
    idGestor: 0,
    venta_declarada: "",
    idEstado: 177,
    orden_compra: "",
    certificacion: "",
    factura: "",
    monto_facturado: "",
    comentariosGenerales: "",
  };

  listaEstado: any;
  listaLiquidaciones: any;
  listaProyectos: any;
  listaGestores: any;

  idLastFacturacion: any;
  idfact: any;
  file: any;

  @ViewChild("modalRegreso") modalRegreso: ElementRef;

  constructor(
    public datepipe: DatePipe,
    private router: Router,
    private spinner: NgxSpinnerService,
    private _service: RequerimientoService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private http: HttpClient
  ) {
    this.usuario = JSON.parse(localStorage.getItem("currentUser"));
  }

  ngOnInit() {
    this.getValoresProyectos();
    this.getValoresEstados();
    this.getValoresLiquidaciones();
    this.getLastIdFacturacion();
    this.getValoresGestores();
  }

  guardarRegistro() {
    // console.log(this.listaAtributos);
    this.inicioRegistro = true;
    this.pauseTimer();
    this.gotoTop();
    this.addRegistroAudio();
  }

  gotoTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }

  pauseTimer() {
    clearInterval(this.interval);
  }

  getValoresProyectos() {
    let arrayParametro: any[] = [
      {
        queryId: 65,
        MapValue: {
          idTabla: 1,
        },
      },
    ];
    this._service.read(arrayParametro[0]).subscribe((data) => {
      const arrayData: any[] = Array.of(data);
      this.listaProyectos = [];
      for (let index = 0; index < arrayData[0].list.length; index++) {
        this.listaProyectos.push({
          idEntidad: arrayData[0].list[index].id,
          idTabla: arrayData[0].list[index].id_tabla,
          idCorrelativo: arrayData[0].list[index].id,
          valorTexto1: arrayData[0].list[index].valor_texto_1,
          valorTexto2: arrayData[0].list[index].valor_texto_2,
          idPadre: arrayData[0].list[index].idPadre,
          valorSeleccionado: 0,
        });
      }
      console.log(this.listaProyectos, "listaProyectos");
    });
  }

  getValoresEstados() {
    let arrayParametro: any[] = [
      {
        queryId: 63,
        MapValue: {
          idTabla: 7,
        },
      },
    ];
    this._service.read(arrayParametro[0]).subscribe((data) => {
      const arrayData: any[] = Array.of(data);
      this.listaEstado = [];
      for (let index = 0; index < arrayData[0].list.length; index++) {
        this.listaEstado.push({
          idEntidad: arrayData[0].list[index].id,
          idTabla: arrayData[0].list[index].id_tabla,
          idCorrelativo: arrayData[0].list[index].id,
          valorTexto1: arrayData[0].list[index].valor_texto_1,
          valorTexto2: arrayData[0].list[index].valor_texto_2,
          idPadre: arrayData[0].list[index].idPadre,
          valorSeleccionado: 0,
        });
      }
      console.log(this.listaEstado, "listaEstado");
    });
  }
  getValoresLiquidaciones() {
    let arrayParametro: any[] = [
      {
        queryId: 82,
        MapValue: {
          idTabla: 7,
        },
      },
    ];
    this._service.read(arrayParametro[0]).subscribe((data) => {
      const arrayData: any[] = Array.of(data);
      this.listaLiquidaciones = [];
      for (let index = 0; index < arrayData[0].list.length; index++) {
        this.listaLiquidaciones.push({
          idEntidad: arrayData[0].list[index].id,
          idTabla: arrayData[0].list[index].id_tabla,
          idCorrelativo: arrayData[0].list[index].id,
          valorTexto1: arrayData[0].list[index].valor_texto_1,
          valorTexto2: arrayData[0].list[index].valor_texto_2,
          idPadre: arrayData[0].list[index].idPadre,
          valorSeleccionado: 0,
        });
      }
      console.log(this.listaLiquidaciones, "listaliqui");
    });
  }
  getValoresGestores() {
    let arrayParametro: any[] = [
      {
        queryId: 89,
        MapValue: {
          idTabla: 7,
        },
      },
    ];
    this._service.read(arrayParametro[0]).subscribe((data) => {
      const arrayData: any[] = Array.of(data);
      this.listaGestores = [];
      for (let index = 0; index < arrayData[0].list.length; index++) {
        this.listaGestores.push({
          idEntidad: arrayData[0].list[index].id,
          idTabla: arrayData[0].list[index].id_tabla,
          idCorrelativo: arrayData[0].list[index].id,
          valorTexto1: arrayData[0].list[index].valor_texto_1,
          valorTexto2: arrayData[0].list[index].valor_texto_2,
          idPadre: arrayData[0].list[index].idPadre,
          valorSeleccionado: 0,
        });
      }
      console.log(this.listaGestores, "listaliqui");
    });
  }

  /* Inicio - Código de combos anidados */

  /* getValoresGestores(idproyecto: number) {
    let arrayParametro: any[] = [
      {
        queryId: 83,
        MapValue: {
          p_idproyecto: idproyecto,
        },
      },
    ];
    this._service.read(arrayParametro[0]).subscribe((res: any) => {
      this.listaGestores = res.list;
      return this.listaGestores;
    });

  }
  onSelect(id: number) {
    this.getValoresGestores(id);
  } */

  /* Fin - Código de combos anidados */

  addRegistroAudio() {
    //this.getLastIdFacturacion();
    //this.idfact =  this.idLastFacturacion;

    //console.log(idlastfact ,"this.idfact");
    //this.guardararchivo();

    let arrayParametro: any[] = [
      {
        queryId: 70,
        MapValue: {
          //  "p_id_factura"          : idRegistro,
          p_periodo: `${this.registroAudio.periodo}-${this.registroAudio.mes}-01`,
          p_id_proyecto: this.registroAudio.idProyecto,
          p_id_liquidacion: this.registroAudio.idLiquidaciones,
          p_subservicio: this.registroAudio.subservicio,
          //p_id_gestor: <HTMLInputElement>document.getElementById("id_gestor") ? (<HTMLInputElement>document.getElementById("id_gestor")).value: "",
          p_id_gestor: this.registroAudio.idGestor,
          p_venta_declarada: this.registroAudio.venta_declarada,
          p_id_estado: this.registroAudio.idEstado,
          p_orden_compra: this.registroAudio.orden_compra,
          p_certificacion: this.registroAudio.certificacion,
          p_factura: this.registroAudio.factura,
          p_monto_facturado: this.registroAudio.monto_facturado,
          p_comentariosGenerales: this.registroAudio.comentariosGenerales,
          p_user_creacion: this.usuario.user.userId,
          p_fecha_creacion: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
          CONFIG_OUT_ID: this.usuario.user.userId,
        },
      },
    ];
    this._service.create(arrayParametro[0]).subscribe((data) => {
      console.log(data, "data");
      const arrayData: any[] = Array.of(data);
      console.log("inserting registro audio");
      console.log(arrayData[0]);
      //this.idfact = this.getLastIdFacturacion() ;
      //console.log( this.idfact," this.idfact",this.getLastIdFacturacion() );

      this.toastr.success("Registro Exitoso ", "Resultado", { timeOut: 2000 });
      // this.idfact = this.getLastIdFacturacion() ;
      // console.log("idfact", this.idfact,  this.getLastIdFacturacion())
      let idlastfact = this.idLastFacturacion + 1;
      this.router.navigate(["/editarRegistro/" + idlastfact]);

      // return false
      // this.addAtributos(arrayData[0].exitoMessage);

      /* let v=arrayData[0].exitoMessage.split(',');


      if(arrayData[0].hasOwnProperty("exitoMessage")){



        if( v[1] == 1 ){
          this.toastr.warning('Id grabación duplicado', 'Alerta',{timeOut: 2000});
          //this.toastr.success('Registro Exitoso', 'Resultado',{timeOut: 2000});
        }else{
          this.toastr.success('Registro Exitoso ', 'Resultado',{timeOut: 2000});
           this.router.navigate(['/mantenimientofacturacion']);
        }

      }
      else{
        this.toastr.error('Error al Registrar', 'Resultado',{timeOut: 2000});
      } */
      this.registroAudio = {
        codigo_factura: "",
        periodo: "",
        mes: "",
        idProyecto: 0,
        idLiquidaciones: 0,
        subservicio: "",
        idGestor: 0,
        venta_declarada: "",
        idEstado: 0,
        orden_compra: "",
        certificacion: "",
        factura: "",
        monto_facturado: "",
        comentariosGenerales: "",
      };
    });
  }

  cancelarRegreso() {
    this.modalRegreso.nativeElement.click();
  }

  regresar() {
    this.modalRegreso.nativeElement.click();
    this.router.navigate(["/mantenimientofacturacion"]);
  }

  /* Retornar al ultimo id de facturacion */
  getLastIdFacturacion() {
    let arrayParametro: any[] = [
      {
        queryId: 85,
      },
    ];
    this._service.read(arrayParametro[0]).subscribe((res: any) => {
      this.idLastFacturacion = res.list[0].last_idfacturacion;
      //console.log(res.list[0].last_idfacturacion,"idLastFacturacio");
      // console.log( this.idLastFacturacion," this.idLastFacturacion");
      return this.idLastFacturacion;
    });
    // console.log(this.idLastFacturacion,"idLastFacturacionnn");
  }

  handleFiles(event: any) {
    this.file = event.target.files[0];
    console.log("filed", this.file);

    /*  this.uploadService.upload(file).subscribe((res) => {
      console.log(res);
      //this.image = res.url;
    }); */
  }

  guardararchivo() {
    let form = new FormData();
    form.append("file", this.file);
    this.http
      .post("http://localhost:8080/files/", form)
      .subscribe((response) => {});
  }
}
