import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { RequerimientoService } from '../../../services/requerimiento.service';
import { NgxSpinnerService } from "ngx-spinner";
import { DatePipe, formatDate } from '@angular/common';
import { Usuario } from 'src/app/models/usuario';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import * as moment from 'moment';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

declare const $: any;



const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
@Component({
  selector: "app-appregistrobandeja",
  templateUrl: "./appregistrobandeja.component.html",
  styleUrls: ["./appregistrobandeja.component.css"],
})
export class AppFacturacionComponent implements OnInit, OnDestroy {
  title = "excel";

  usuario: Usuario;
  dtOptions: any = {};
  dtTrigger = new Subject();
  data: any;
  data_reporte_facturado: any;
  data_reporte_venta_declarado: any;

  busqueda = {
    codigo_incidencia: null,
    area: null,
    fechaRegistroInicio: null,
    fechaRegistroFin: null,
  };

  actualizacionmasiva = {
    idProyecto: 0,
    idEstado: 0,
    periodo: moment().add(-1, "M").format("YYYY-MM"),
  };

  duplicarregistro = {
    codigo_factura: "",
    periodo: moment(new Date()).format("YYYY"),
    mes: moment(new Date()).format("MM"),
    idLiquidacion: "",
    idProyecto: 0,
    subservicio: "",
    idGestor: 0,
    venta_declarada: "",
    idEstado: "",
    comentariosGenerales: "",
  };

  listaAreas: any;
  listaProyectos: any;
  listaEstado: any;
  idLastFacturacion: any;

  /*eliminacion*/
  @ViewChild("modalEliminacionLogica") modalEliminacionLogica: ElementRef;
  @ViewChild("cerrarmodalActualizacionMasiva")
  cerrarmodalActualizacionMasiva: ElementRef;
  @ViewChild("cerrarmodalduplicidadRegistro")
  cerrarmodalduplicidadRegistro: ElementRef;
  idEliminar: number;

  constructor(
    private _service: RequerimientoService,
    private spinner: NgxSpinnerService,
    public datepipe: DatePipe,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.usuario = JSON.parse(localStorage.getItem("currentUser"));
  }

  /* ngAfterViewInit() :void{
    $("#tabla_seguimiento").DataTable();

  }  */

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: "full_numbers",
      pageLength: 10,
      language: {
        url: "//cdn.datatables.net/plug-ins/1.11.3/i18n/es_es.json",
      },
      dom: "Bfrtip",
      buttons: [
        { extend: "copy", className: "btn-primary" },
        { extend: "excel", className: "btn-success" },
        { extend: "print", className: "btn-danger" },
      ],
    };

    this.getListaRegistroAudio();
    this.getatributoValoresAreas();
    this.getLastIdFacturacion();
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  getListaRegistroAudio() {
    this.spinner.show();

    let arrayParametro: any[] = [
      {
        queryId: 68,
        MapValue: {
          offset: 0,
        },
      },
    ];
    this._service.read(arrayParametro[0]).subscribe((res: any) => {
      this.data = res.list;
      console.log(res.list, "lista");
      this.dtTrigger.next();

      this.spinner.hide();
    });
  }

  irPagina() {
    this.router.navigate(["/agregarRegistro/"]);
  }

  buscar() {
    this.filtro();
  }
  filtro() {
    this.spinner.show();

    let FechaRegistroInicio: string = this.busqueda.fechaRegistroInicio;
    let FechaRegistroFin: string = this.busqueda.fechaRegistroFin;
    //
    console.log(
      this.busqueda.codigo_incidencia,
      this.busqueda.area,
      FechaRegistroInicio,
      FechaRegistroFin
    );
    // return false;
    let arrayParametro: any[] = [
      {
        queryId: 25,
        mapValue: {
          //
          p_id_area: this.busqueda.area,
          p_incidencia: this.busqueda.codigo_incidencia,
          p_inicio_registro: FechaRegistroInicio,
          p_fin_registro: FechaRegistroFin,
        },
      },
    ];

    this._service.read(arrayParametro[0]).subscribe((res: any) => {
      // console.log(res,arrayParametro);
      // this.data = res.list;
      //console.log(res.list);
      // this.dtTrigger.next();
      //const arrayData:any[] = Array.of(data);
      //this.listaRegistroAudio = [];
      //this.totalRegistros = arrayData[0].list.length;
      //this.totalBusqueda = arrayData[0].list.length;
      /* for (let index = 0; index < arrayData[0].list.length; index++) {
        this.listaRegistroAudio.push({
          id:arrayData[0].list[index].id,
          tipoRegistro:arrayData[0].list[index].tipoRegistro,
          canal:arrayData[0].list[index].canal,
          proveedor:arrayData[0].list[index].proveedor,
          producto:arrayData[0].list[index].producto,
          campana:arrayData[0].list[index].campana,
          segmento:arrayData[0].list[index].segmento,
          fechaRegistro:arrayData[0].list[index].fechaRegistro,
          fechaLlamada:arrayData[0].list[index].fechaLlamada,
          monitor:arrayData[0].list[index].monitor,
          estado:arrayData[0].list[index].estado,
          tmau:arrayData[0].list[index].tmau,
          grabacionId:arrayData[0].list[index].grabacionId,
          dimensionado:arrayData[0].list[index].dimensionado,
          telefonoPeticion:arrayData[0].list[index].telefonoPeticion,
          tipoCluster:arrayData[0].list[index].tipoCluster,
          productoAudio:arrayData[0].list[index].productoAudio,
          productoBase:arrayData[0].list[index].productoBase,
          tmo2:arrayData[0].list[index].tmo2,
          tipoGestion:arrayData[0].list[index].tipoGestion,
          dataUnicoCliente:arrayData[0].list[index].dataUnicoCliente,
          comentarioGenerales:arrayData[0].list[index].comentariosGenerales,
          idUsuarioActualiza:arrayData[0].list[index].idUsuarioActualiza
        });
      } */
      this.spinner.hide();
    });
  }

  limpiarBusqueda() {
    this.busqueda = {
      codigo_incidencia: "",
      area: "",
      fechaRegistroInicio: "",
      fechaRegistroFin: "",
    };
  }

  // cargar data fiiltro

  getatributoValoresAreas() {
    let arrayParametro: any[] = [
      {
        queryId: 31,
        MapValue: {
          idTabla: 31,
        },
      },
    ];
    this._service.read(arrayParametro[0]).subscribe((data) => {
      const arrayData: any[] = Array.of(data);
      this.listaAreas = [];
      for (let index = 0; index < arrayData[0].list.length; index++) {
        this.listaAreas.push({
          idEntidad: arrayData[0].list[index].id_entidad,
          idTabla: arrayData[0].list[index].id_tabla,
          idCorrelativo: arrayData[0].list[index].id_correlativo,
          valorTexto1: arrayData[0].list[index].valor_texto_1,
          valorTexto2: arrayData[0].list[index].valor_texto_2,
          idPadre: arrayData[0].list[index].idPadre,
          valorSeleccionado: 0,
        });
      }
      console.log(this.listaAreas);
    });
  }

  editar(idreg: number) {
    this.router.navigate(["/editarRegistro/" + idreg]);
    console.log("idreg", idreg);
  }

  abrirEliminar(id: number) {
    console.log(id, "iddd");
    this.idEliminar = id;
  }

  confirmarEliminacion() {
    this.eliminarValoresAtributos(this.idEliminar);
  }

  eliminarValoresAtributos(id: number) {
    // this.spinner.show();
    let arrayParametro: any[] = [
      {
        queryId: 69,
        mapValue: {
          p_id: id,
        },
      },
    ];
    this._service.update(arrayParametro[0]).subscribe((data) => {
      //this.eliminarRegistroAudio(id);
      this.modalEliminacionLogica.nativeElement.click();
      window.location.reload();
      //this.getListaRegistroAudio();
    });
  }

  cancelarEliminacion() {
    this.modalEliminacionLogica.nativeElement.click();
  }

  // Actualizacion Masiva

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

  cargarmodalActualizacionMasiva() {
    this.getValoresProyectos();
    this.getValoresEstados();

    // console.log( moment().add(-1, 'M').format('YYYY-MM'))
  }

  editarActualizacionMasiva() {
    console.log(this.actualizacionmasiva);
    let arrayParametro: any[] = [
      {
        queryId: 81,
        mapValue: {
          p_idproyecto: this.actualizacionmasiva.idProyecto,
          p_idestado: this.actualizacionmasiva.idEstado,
          p_periodo: moment().add(-1, "M").format("YYYY-MM-DD"),
          p_fecha_actualizacion: moment(new Date()).format(
            "YYYY-MM-DD HH:mm:ss"
          ),
          p_usuario: this.usuario.user.userId,
        },
      },
    ];

    this._service.update(arrayParametro[0]).subscribe((data) => {
      this.cerrarmodalActualizacionMasiva.nativeElement.click();
      window.location.reload();
    });
  }

  cargarmodalduplicarRegistro(idRegistro) {
    this.getValoresProyectos();

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

      this.duplicarregistro = {
        // evento
        codigo_factura: res.list[0].idFactura,
        periodo: res.list[0].anio,
        mes: res.list[0].mes,
        idLiquidacion: res.list[0].idLiquidacion,
        idProyecto: res.list[0].idProyecto,
        subservicio: res.list[0].subServicio,
        idGestor: res.list[0].idGestor,
        venta_declarada: res.list[0].venta_declarada,
        idEstado: res.list[0].idEstado,
        comentariosGenerales: res.list[0].Comentarios,
      };
      // this.getValoresGestores(res.list[0].idProyecto)
    });
  }

  editarduplicidadRegistro() {
    //this.getLastIdFacturacion();
    //this.idfact =  this.idLastFacturacion;

    //console.log(idlastfact ,"this.idfact");

    let arrayParametro: any[] = [
      {
        queryId: 86,
        MapValue: {
          //  "p_id_factura"          : idRegistro,
          p_periodo: `${this.duplicarregistro.periodo}-${this.duplicarregistro.mes}-01`,
          p_id_proyecto: this.duplicarregistro.idProyecto,
          p_id_liquidacion: this.duplicarregistro.idLiquidacion,
          p_subservicio: this.duplicarregistro.subservicio,
          p_id_gestor: this.duplicarregistro.idGestor
            ? this.duplicarregistro.idGestor
            : null,
          p_venta_declarada: this.duplicarregistro.venta_declarada,
          p_id_estado: this.duplicarregistro.idEstado,
          p_comentariosGenerales: this.duplicarregistro.comentariosGenerales,
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

      this.toastr.success("Registro Duplicado Exitoso ", "Resultado", {
        timeOut: 2000,
      });
      // this.idfact = this.getLastIdFacturacion() ;
      // console.log("idfact", this.idfact,  this.getLastIdFacturacion())
      this.cerrarmodalduplicidadRegistro.nativeElement.click();
      let idlastfact = this.idLastFacturacion + 1;
      this.router.navigate(["/editarRegistro/" + idlastfact]);
      //window.location.reload();

      /*  this.registroAudio = {
          codigo_factura      : '',
          periodo             : '',
          mes                 : '',
          idProyecto          : 0,
          idLiquidaciones     : 0,
          subservicio         : '',
          idGestor            : '',
          venta_declarada     : '',
          idEstado            : 0,
          orden_compra        : '',
          certificacion       : '',
          factura             : '',
          monto_facturado     : '',
          comentariosGenerales: ''
      }; */
      this.duplicarregistro = {
        codigo_factura: "",
        periodo: "",
        mes: "",
        idLiquidacion: "",
        idProyecto: 0,
        subservicio: "",
        idGestor: 0,
        venta_declarada: "",
        idEstado: "",
        comentariosGenerales: "",
      };
    });
  }

  // Exportar excel
  reportefacturados() {
    //this.spinner.show();

    let arrayParametro: any[] = [
      {
        queryId: 87,
        MapValue: {
          offset: 0,
        },
      },
    ];
    this._service.read(arrayParametro[0]).subscribe((res: any) => {
      this.data_reporte_facturado = res.list;
      let header = [
        {
          A: "ID_FACTURA",
          B: "PERIÓDO",
          C: "PROYECTO",
          D: "LIQUIDACIÓN",
          E: "SUBSERVICIO",
          F: "GESTOR",
          G: "ESTADO",
          H: "IMPORTE",
          I: "OC",
          J: "FACTURADO",
          K: "CERTIFICACION",
          L: "ESTADO FACTURACIÓN",
          M: "FACTURA",
          N: "FECHA FACTURACIÓN",
          O: "COMENTARIO",
        },
      ];

      this.exportAsExcelFile(
        this.data_reporte_facturado,
        header,
        "reporte-facturados"
      );

      //this.spinner.hide();
    });
  }
  reporteventadeclarada() {
    //this.spinner.show();

    let arrayParametro: any[] = [
      {
        queryId: 88,
        MapValue: {
          offset: 0,
        },
      },
    ];
    this._service.read(arrayParametro[0]).subscribe((res: any) => {
      this.data_reporte_venta_declarado = res.list;
      let header = [
        {
          A: "ID_FACTURA",
          B: "PERIODO",
          C: "PROYECTO",
          D: "LIQUIDACIÓN",
          E: "SUBSERVICIO",
          F: "GESTOR",
          G: "ESTADO",
          H: "IMPORTE",
          I: "PERIODO VENTA DECLARADA",
          J: "VENTA DECLARADA",
          K: "COMENTARIO",
        },
      ];

      this.exportAsExcelFile(
        this.data_reporte_venta_declarado,
        header,
        "reporte-venta-declarado"
      );

      //this.spinner.hide();
    });
  }

  public exportAsExcelFile(
    json: any[],
    headerText: any[],
    excelFileName: string
  ): void {
    var worksheet = XLSX.utils.json_to_sheet(headerText, {
      header: [],
      skipHeader: true,
    });

    XLSX.utils.sheet_add_json(worksheet, json, {
      skipHeader: true,
      origin: "A2",
    });

    const workbook: XLSX.WorkBook = {
      Sheets: { data: worksheet },
      SheetNames: ["data"],
    };

    const excelBuffer: any = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE,
    });
    FileSaver.saveAs(
      data,
      fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
    );
  }
}







