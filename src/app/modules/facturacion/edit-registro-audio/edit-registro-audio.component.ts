import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { RequerimientoService } from "../../../services/requerimiento.service";
import { NgxSpinnerService } from "ngx-spinner";
import { Router, ActivatedRoute } from "@angular/router";
import { Usuario } from "src/app/models/usuario";
import { Subject } from "rxjs";
import * as moment from "moment";

@Component({
  selector: "app-edit-registro-audio",
  templateUrl: "./edit-registro-audio.component.html",
  styleUrls: ["./edit-registro-audio.component.sass"],
})
export class EditFacturacionComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger1 = new Subject();
  dtTrigger2 = new Subject();

  //dtElement: DataTableDirective;
  data_facturacion: any;
  data_venta_declarada: any;

  data: any;
  usuario: Usuario;
  idRegistro: number = 0;
  tipoRegistro: number = 0;
  nombreTipo: string;
  inicioRegistro: boolean = true;

  registroAudio = {
    // evento
    codigo_factura: "",
    periodo: 0,
    mes: 0,
    idProyecto: 0,
    idLiquidaciones: 0,
    subservicio: "",
    id_gestor: 0,
    venta_declarada: "",
    idEstado: 0,
    orden_compra: "",
    certificacion: "",
    factura: "",
    monto_facturado: "",
    comentariosGenerales: "",
  };

  datosFacturacion = {
    idfactura: 0,
    orde_compra: "",
    importe: "",
    certificacion: "",
    idEstado: null,
    factura: "",
    fecha_facturacion: "",
    comentario: "",
  };

  datosVentaDeclarada = {
    idFactVenta: 0,
    idfactura: 0,
    periodoanio: moment(new Date()).format("YYYY"),
    periodomes: moment(new Date()).format("MM"),
    venta_declarada: "",
    comentario: "",
  };

  idFactCertificacion: number;

  listaProyectos: any;
  listaGestores: any;
  listaEstado: any;
  listaEstadoFacturacion: any;
  listaLiquidaciones: any;

  @ViewChild("modalRegreso") modalRegreso: ElementRef;

  @ViewChild("btnGuardarFacturacion") btnGuardarFacturacion: ElementRef;
  @ViewChild("cerrarModalFacturacion") cerrarModalFacturacion: ElementRef;
  @ViewChild("cerrarModalEditarFacturacion")
  cerrarModalEditarFacturacion: ElementRef;
  @ViewChild("btnEditarFacturacion") btnEditarFacturacion: ElementRef;

  @ViewChild("btnGuardarVentaDeclarada") btnGuardarVentaDeclarada: ElementRef;
  @ViewChild("cerrarModalVentaDeclarada") cerrarModalVentaDeclarada: ElementRef;
  @ViewChild("cerrarModalEditarVentaDeclarada")
  cerrarModalEditarVentaDeclarada: ElementRef;
  @ViewChild("btnEditarVentaDeclarada") btnEditarVentaDeclarada: ElementRef;

  constructor(
    private _service: RequerimientoService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) {
    this.usuario = JSON.parse(localStorage.getItem("currentUser"));
  }

  /*  ngAfterViewInit(): void {
    this.dtTrigger1.next();
    this.dtTrigger2.next();
  } */

  ngOnInit() {
    //this.dtTrigger2.unsubscribe();
    this.activatedRoute.paramMap.subscribe((params) => {
      this.idRegistro = parseInt(params.get("id"));
      console.log("id: " + this.idRegistro);
      this.cargarRegistroBase(this.idRegistro);
      this.getValoresProyectos();
      this.getValoresEstados();
      this.getValoresLiquidaciones();
      this.getValoresGestores();
      this.ListaHistorialCambios(this.idRegistro);

      this.dtOptions = {
        destroy: true,
        pagingType: "full_numbers",
        pageLength: 5,
        language: {
          url: "//cdn.datatables.net/plug-ins/1.11.3/i18n/es_es.json",
        },
        responsive: true,
      };

      this.cargarFacturacionCertificada(this.idRegistro);
      this.cargarFacturacionVentaDeclarada(this.idRegistro);
    });
  }
  /*  ngAfterViewInit(): void {
    this.dtTrigger1.next();
    this.dtTrigger2.next();
  } */
  /*   ngOnDestroy(): void {
    this.dtTrigger1.unsubscribe();
    this.dtTrigger2.unsubscribe();
  } */

  cargarRegistroBase(idRegistro: number) {
    //this.spinner.show();
    let arrayParametro: any[] = [
      {
        queryId: 64,
        MapValue: {
          p_id: idRegistro,
        },
      },
    ];
    this._service.read(arrayParametro[0]).subscribe((res: any) => {
      console.log(res, "base");

      this.registroAudio = {
        // evento
        codigo_factura: res.list[0].idFactura,
        periodo: res.list[0].anio,
        mes: res.list[0].mes,
        idProyecto: res.list[0].idProyecto,
        idLiquidaciones: res.list[0].idLiquidacion,
        subservicio: res.list[0].subServicio,
        id_gestor: res.list[0].idGestor,
        venta_declarada: res.list[0].venta_declarada,
        idEstado: res.list[0].idEstado,
        orden_compra: res.list[0].orden_compra,
        certificacion: res.list[0].cod_certificacion,
        factura: res.list[0].factura,
        monto_facturado: res.list[0].monto_facturado,
        comentariosGenerales: res.list[0].Comentarios,
      };
      //this.getValoresGestores(res.list[0].idProyecto);
    });
  }
  ListaHistorialCambios(idRegistro: number) {
    this.spinner.show();

    let arrayParametro: any[] = [
      {
        queryId: 67,
        MapValue: {
          p_id: idRegistro,
        },
      },
    ];
    this._service.read(arrayParametro[0]).subscribe((res: any) => {
      this.data = res.list;
      console.log(res.list, "lista");
      this.spinner.hide();
    });
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
  getValoresEstadosFacturacion() {
    let arrayParametro: any[] = [
      {
        queryId: 84,
        MapValue: {
          idTabla: 7,
        },
      },
    ];
    this._service.read(arrayParametro[0]).subscribe((data) => {
      const arrayData: any[] = Array.of(data);
      this.listaEstadoFacturacion = [];
      for (let index = 0; index < arrayData[0].list.length; index++) {
        this.listaEstadoFacturacion.push({
          idEntidad: arrayData[0].list[index].id,
          idTabla: arrayData[0].list[index].id_tabla,
          idCorrelativo: arrayData[0].list[index].id,
          valorTexto1: arrayData[0].list[index].valor_texto_1,
          valorTexto2: arrayData[0].list[index].valor_texto_2,
          idPadre: arrayData[0].list[index].idPadre,
          valorSeleccionado: 0,
        });
      }
      console.log(this.listaEstadoFacturacion, "listaEstadoFacturacion");
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

  /*  getValoresGestores(idproyecto:number){
    let arrayParametro:any[] = [{
      "queryId": 83,
     "MapValue": {
         "p_idproyecto": idproyecto
      }
    }];
    this._service.read(arrayParametro[0]).subscribe((res: any) => {
      this.listaGestores = res.list;
      return  this.listaGestores;
    });
    //


  }
  //let listaGestoresfiltrado;
  onSelect(id:number){
    this.getValoresGestores(id);
  } */
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

  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  actualizarRegistro() {
    // console.log("this.idRegistro",this.idRegistro);
    this.updateRegistro(this.idRegistro);
    /*  this.updateAtributos(this.idRegistro);
    this.updateCamposNoVentas(this.idRegistro); */
  }

  cancelarRegreso() {
    this.modalRegreso.nativeElement.click();
  }

  regresar() {
    this.modalRegreso.nativeElement.click();
    this.router.navigate(["/mantenimientofacturacion"]);
  }
  updateRegistro(idRegistro: number) {
    this.spinner.show();
    let arrayParametro: any[] = [
      {
        queryId: 66,
        MapValue: {
          p_id_factura: idRegistro,
          p_periodo: `${this.registroAudio.periodo}-${this.registroAudio.mes}-01`,
          p_id_proyecto: this.registroAudio.idProyecto,
          p_id_liquidacion: this.registroAudio.idLiquidaciones,
          p_subservicio: this.registroAudio.subservicio,
          p_id_gestor: this.registroAudio.id_gestor,
          p_venta_declarada: this.registroAudio.venta_declarada,
          p_id_estado: this.registroAudio.idEstado,
          p_orden_compra: this.registroAudio.orden_compra,
          p_certificacion: this.registroAudio.certificacion,
          p_factura: this.registroAudio.factura,
          p_monto_facturado: this.registroAudio.monto_facturado,
          p_comentariosGenerales: this.registroAudio.comentariosGenerales,
          p_fecha_actualizacion: moment(new Date()).format(
            "YYYY-MM-DD HH:mm:ss"
          ),
          p_user_actualizacion: this.usuario.user.userId,
        },
      },
    ];
    this._service.update(arrayParametro[0]).subscribe((data) => {
      /*  const arrayData:any[] = Array.of(data);
      console.log("updating registro audio");
      console.log(arrayData[0]);
      this.updateAtributos(arrayData[0].exitoMessage);
      this.updateCamposNoVentas(arrayData[0].exitoMessage);
      this.spinner.hide(); */
      this.router.navigate(["/mantenimientofacturacion"]);
    });
  }

  /************   Facturacion ******************/

  cargarFacturacionCertificada(idRegistro: number) {
    // this.spinner.show();

    let arrayParametro: any[] = [
      {
        queryId: 71,
        MapValue: {
          p_id: idRegistro,
        },
      },
    ];
    this._service.read(arrayParametro[0]).subscribe((res: any) => {
      this.data_facturacion = res.list;
      console.log(res.list, "listafacturacion actuali");
    });
  }
  // Limpiar caja de tecto de facturacion
  limpiarfacturacion() {
    this.getValoresEstadosFacturacion();
    this.datosFacturacion.fecha_facturacion = "";
    this.datosFacturacion.importe = "";
    this.datosFacturacion.orde_compra = "";
    this.datosFacturacion.certificacion = "";
    this.datosFacturacion.idEstado = 0;
    this.datosFacturacion.factura = "";
    this.datosFacturacion.comentario = "";
  }

  addFacturacion(idRegistro: any) {
    /*
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger2.next();
    }); */
    this.spinner.show();
    //this.btnGuardarFacturacion.nativeElement.disabled = true;
    let id_factura = idRegistro;
    let fecha_facturacion = this.datosFacturacion.fecha_facturacion;
    let importe = this.datosFacturacion.importe;
    let orde_compra = this.datosFacturacion.orde_compra;
    let certificacion = this.datosFacturacion.certificacion;
    let idEstado = this.datosFacturacion.idEstado;
    let factura = this.datosFacturacion.factura;
    let comentario = this.datosFacturacion.comentario;

    let arrayParametro: any[] = [
      {
        queryId: 73,
        mapValue: {
          param_id_factura: id_factura,
          param_fecha_facturacion: fecha_facturacion
            ? moment(fecha_facturacion).format("YYYY-MM-DD HH:mm:ss")
            : moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
          param_importe: importe ? importe : 0,
          param_orde_compra: orde_compra ? orde_compra : "-",
          param_certificacion: certificacion ? certificacion : "-",
          param_id_estado: idEstado ? idEstado : null,
          param_factura: factura ? factura : "-",
          param_fecha_creacion: moment(new Date()).format(
            "YYYY-MM-DD HH:mm:ss"
          ),
          param_comentario: comentario ? comentario : "-",
          param_usuario_creacion: this.usuario.user.userId,
          /*  "CONFIG_OUT_MSG_ERROR"   : '',
        "CONFIG_OUT_MSG_EXITO"   : '' */
        },
      },
    ];

    this._service.create(arrayParametro[0]).subscribe((data) => {
      const arrayData: any[] = Array.of(data);
      console.log(arrayData[0]);
      this.cerrarModalFacturacion.nativeElement.click();
      //this.cargarFacturacionCertificada(id_factura);
      this.cargarFacturacionCertificada(id_factura);
    });

    this.spinner.hide();
  }

  modalEditarFacturacion(idfac: number) {
    this.getValoresEstadosFacturacion();
    let arrayParametro: any[] = [
      {
        queryId: 74,
        MapValue: {
          p_id: idfac,
        },
      },
    ];
    this._service.read(arrayParametro[0]).subscribe((res: any) => {
      console.log(res);

      this.datosFacturacion = {
        // evento
        fecha_facturacion: res.list[0].f_facturacion,
        importe: res.list[0].importe,
        orde_compra: res.list[0].oc,
        certificacion: res.list[0].certificacion,
        idEstado: res.list[0].idEstado,
        factura: res.list[0].factura,
        comentario: res.list[0].comentario,
        idfactura: res.list[0].idFactura,
        //comentariosGenerales  :  res.list[0].Comentarios
      };
      this.idFactCertificacion = res.list[0].idFactCertificacion;
    });
  }

  editarFacturacion() {
    this.spinner.show();

    let arrayParametro: any[] = [
      {
        queryId: 75,
        mapValue: {
          p_idFactCertificacion: (<HTMLInputElement>(
            document.getElementById("idFactCertificacion")
          )).value,
          p_fecha_facturacion: this.datosFacturacion.fecha_facturacion,
          p_importe: this.datosFacturacion.importe
            ? this.datosFacturacion.importe
            : 0,
          p_oc: this.datosFacturacion.orde_compra
            ? this.datosFacturacion.orde_compra
            : "-",
          p_certificacion: this.datosFacturacion.certificacion
            ? this.datosFacturacion.certificacion
            : "-",
          p_idEstado: this.datosFacturacion.idEstado
            ? this.datosFacturacion.idEstado
            : null,
          p_factura: this.datosFacturacion.factura
            ? this.datosFacturacion.factura
            : "-",
          p_fecha_actualizacion: moment(new Date()).format(
            "YYYY-MM-DD HH:mm:ss"
          ),
          p_comentario: this.datosFacturacion.comentario
            ? this.datosFacturacion.comentario
            : "-",
          p_usuario: this.usuario.user.userId,
          /*  "CONFIG_USER_ID":this.usuario.user.userId,
        "CONFIG_OUT_MSG_ERROR":'',
        "CONFIG_OUT_MSG_EXITO":'' */
        },
      },
    ];

    this._service.update(arrayParametro[0]).subscribe((data) => {
      this.cerrarModalEditarFacturacion.nativeElement.click();
      //this.router.navigate(['/mantenimientofacturacion']);

      this.cargarFacturacionCertificada(this.datosFacturacion.idfactura);
    });
    this.spinner.hide();
  }

  eliminarFacturacion(idfacturaciondetalle: number, idfactura: number) {
    // this.spinner.show();
    let arrayParametro: any[] = [
      {
        queryId: 76,
        mapValue: {
          p_id: idfacturaciondetalle,
        },
      },
    ];
    this._service.delete(arrayParametro[0]).subscribe((data) => {
      console.log(idfactura, "datadata");
      this.cargarFacturacionCertificada(idfactura);
      //this.eliminarRegistroAudio(id);
      //this.getListaRegistroAudio();
    });
  }

  /************   Venta declarada  ******************/

  cargarFacturacionVentaDeclarada(idRegistro: number) {
    this.spinner.show();

    let arrayParametro: any[] = [
      {
        queryId: 72,
        MapValue: {
          p_id: idRegistro,
        },
      },
    ];
    this._service.read(arrayParametro[0]).subscribe((res: any) => {
      this.data_venta_declarada = res.list;
      console.log(res.list, "listaventadeclarada");
      this.dtTrigger1.next();
      this.spinner.hide();
    });
  }

  modalEditarVentaDeclarada(idfac: number) {
    let arrayParametro: any[] = [
      {
        queryId: 77,
        MapValue: {
          p_id: idfac,
        },
      },
    ];
    this._service.read(arrayParametro[0]).subscribe((res: any) => {
      console.log(res);

      this.datosVentaDeclarada = {
        // evento
        idFactVenta: res.list[0].idFactVenta,
        idfactura: res.list[0].idFactura,
        periodoanio: moment(res.list[0].f_periodo).format("YYYY"),
        periodomes: moment(res.list[0].f_periodo).format("MM"),
        venta_declarada: res.list[0].venta_declarada,
        comentario: res.list[0].comentario,
        //comentariosGenerales  :  res.list[0].Comentarios
      };
      //  this.idFactCertificacion = res.list[0].idFactCertificacion;
    });
  }

  editarVentaDeclarada() {
    let arrayParametro: any[] = [
      {
        queryId: 78,
        mapValue: {
          p_idfacturaventa: this.datosVentaDeclarada.idFactVenta,
          p_periodo: `${this.datosVentaDeclarada.periodoanio}-${this.datosVentaDeclarada.periodomes}-01`,
          p_venta_declara: this.datosVentaDeclarada.venta_declarada
            ? this.datosVentaDeclarada.venta_declarada
            : 0,
          p_comentario: this.datosVentaDeclarada.comentario
            ? this.datosVentaDeclarada.comentario
            : "-",
          p_fecha_actualizacion: moment(new Date()).format(
            "YYYY-MM-DD HH:mm:ss"
          ),
          p_usuario: this.usuario.user.userId,
        },
      },
    ];

    this._service.update(arrayParametro[0]).subscribe((data) => {
      this.cerrarModalEditarVentaDeclarada.nativeElement.click();
      //this.router.navigate(['/mantenimientofacturacion']);

      this.cargarFacturacionVentaDeclarada(this.datosVentaDeclarada.idfactura);
    });
  }

  eliminarVentaDeclarada(idfacturaventa: number, idfactura: number) {
    // this.spinner.show();
    let arrayParametro: any[] = [
      {
        queryId: 79,
        mapValue: {
          p_id: idfacturaventa,
        },
      },
    ];
    this._service.delete(arrayParametro[0]).subscribe((data) => {
      this.cargarFacturacionVentaDeclarada(idfactura);
    });
  }

  limpiarventadeclarada() {
    /*  this.datosVentaDeclarada.periodoanio         = '';
      this.datosVentaDeclarada.periodomes         = ''; */
    this.datosVentaDeclarada.venta_declarada = "";
    this.datosVentaDeclarada.comentario = "";
  }

  addVentaDeclarada(idRegistro: any) {
    /*
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger2.next();
    }); */
    this.spinner.show();
    //this.btnGuardarFacturacion.nativeElement.disabled = true;
    let id_factura = idRegistro;
    let periodo = `${this.datosVentaDeclarada.periodoanio}-${this.datosVentaDeclarada.periodomes}-01`;
    let venta_declarada = this.datosVentaDeclarada.venta_declarada;
    let comentario = this.datosVentaDeclarada.comentario;

    let arrayParametro: any[] = [
      {
        queryId: 80,
        mapValue: {
          param_id_factura: id_factura,
          param_periodo: periodo
            ? moment(periodo).format("YYYY-MM-DD HH:mm:ss")
            : moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
          param_venta_declarada: venta_declarada ? venta_declarada : 0,
          param_comentario: comentario ? comentario : "-",
          param_fecha_creacion: moment(new Date()).format(
            "YYYY-MM-DD HH:mm:ss"
          ),
          param_usuario_creacion: this.usuario.user.userId,
        },
      },
    ];

    this._service.create(arrayParametro[0]).subscribe((data) => {
      const arrayData: any[] = Array.of(data);
      console.log(arrayData[0]);
      this.cerrarModalVentaDeclarada.nativeElement.click();
      //this.cargarFacturacionCertificada(id_factura);
      this.cargarFacturacionVentaDeclarada(id_factura);
    });

    this.spinner.hide();
  }
}
