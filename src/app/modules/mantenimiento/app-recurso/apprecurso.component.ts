import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import { DatePipe } from "@angular/common";
import { Usuario } from "../../../models/usuario";
import { MantenimientoService } from "../../../services/mantenimiento.service";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";

@Component({
  selector: "app-appreqbandeja",
  templateUrl: "./apprecurso.component.html",
  //styleUrls: ['./apprecurso.component.sass']
  styles: ["#icono{color:dodgerblue} #icono:hover {color:blue}"],
})
export class AppRecursoComponent implements OnInit {
  /*FRANCIA*/
  idEstadoBuscar;
  idTipoBuscar: any;
  idMarcaBuscar: any;
  serie: any;
  imei: any;
  datosTipo = {
    nombre: "",
    descripcion: "",
    idPadre: "",
  };
  datosMarca = {
    nombre: "",
    descripcion: "",
    idPadre: "",
  };
  idMarca: any;
  idTipo: any;
  marca: Array<any> = [];
  tipo: Array<any> = [];
  recurso: Array<any> = [];
  @ViewChild("modalEliminar") modalEliminar: ElementRef;
  @ViewChild("btnGuardarHardware") btnGuardarHardware: ElementRef;
  @ViewChild("btnGuardarTipo") btnGuardarTipo: ElementRef;
  @ViewChild("btnGuardarMarca") btnGuardarMarca: ElementRef;
  @ViewChild("cerrarModal") cerrarModal: ElementRef;
  @ViewChild("cerrarModalTipo") cerrarModalTipo: ElementRef;
  @ViewChild("cerrarModalMarca") cerrarModalMarca: ElementRef;
  @ViewChild("cboTipo") cboTipo: ElementRef;
  @ViewChild("cboMarca") cboMarca: ElementRef;
  idRecurso: any;
  datosHardware = {
    idTipo: "",
    idMarca: "",
    descripcion: "",
    modelo: "",
    serie: "",
    imei: "",
    observacion: "",
  };
  entidades: any;
  entidadTabla: any;
  totaltablas = {
    id: "",
  };

  /*busqueda*/
  totalBusqueda: number = 0;

  /*pagination*/
  offset: any;
  requerimientos: Array<any> = [];
  totalRequerimientos: number = 0;
  page: number = 1;
  usuario: Usuario;

  constructor(
    private _service: MantenimientoService,
    private spinner: NgxSpinnerService,
    public datepipe: DatePipe,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.usuario = JSON.parse(localStorage.getItem("currentUser"));
  }

  ngOnInit() {
    //this.spinner.hide();
    this.getListaRecurso();
    this.getListaTipo();
    this.getListaMarca();
  }

  getListaRecurso() {
    this.spinner.show();
    let arrayParametro: any[] = [
      {
        queryId: 15,
      },
    ];
    this._service.getListaMantenimientox(arrayParametro[0]).subscribe((data) => {
      //this.personal = data;
      const arrayData: any[] = Array.of(data);
      this.recurso = [];
      for (let index = 0; index < arrayData[0].list.length; index++) {
        this.recurso.push({
          id_recurso: arrayData[0].list[index].id_recurso,
          tipo: arrayData[0].list[index].tipo,
          marca: arrayData[0].list[index].marca,
          correo: arrayData[0].list[index].correo,
          equipo: arrayData[0].list[index].equipo,
          modelo: arrayData[0].list[index].modelo,
          serie: arrayData[0].list[index].serie,
          imei: arrayData[0].list[index].imei,
          persona_asignada: arrayData[0].list[index].nombres,
          codigo_corporativo: arrayData[0].list[index].codigo_corporativo,
          proyecto: arrayData[0].list[index].proyecto,
          estado_recurso: arrayData[0].list[index].estado_recurso,
          observaciON: arrayData[0].list[index].observaciON,
        });
      }
      this.spinner.hide();
    });
  }

  addRecursoHardware() {
    this.spinner.show();
    let recursoIdTipo: any;
    if (this.idTipo == "0" || this.idTipo == undefined) {
      recursoIdTipo = "";
    } else {
      recursoIdTipo = this.idTipo;
    }
    let recursoIdMarca: any;
    if (this.idMarca == "0" || this.idMarca == undefined) {
      recursoIdMarca = "";
    } else {
      recursoIdMarca = this.idMarca;
    }

    let idTipo = recursoIdTipo;
    let idMarca = recursoIdMarca;
    let descripcion = this.datosHardware.descripcion;
    let modelo = this.datosHardware.modelo;
    let serie = this.datosHardware.serie;
    let imei = this.datosHardware.imei;
    let observacion = this.datosHardware.observacion;

    let validarTipo = 0;
    let validarMarca = 0;

    if (idTipo == "") {
      this.cboTipo.nativeElement.style.visibility = "visible";
    } else {
      this.cboTipo.nativeElement.style.visibility = "hidden";
      validarTipo = 1;
    }

    if (idMarca == "") {
      this.cboMarca.nativeElement.style.visibility = "visible";
    } else {
      this.cboMarca.nativeElement.style.visibility = "hidden";
      validarMarca = 1;
    }

    if (validarTipo == 1 && validarMarca == 1) {
      this.btnGuardarHardware.nativeElement.disabled = true;

      let arrayParametro: any[] = [
        {
          queryId: 16,
          mapValue: {
            param_id_tipo: idTipo,
            param_id_marca: idMarca,
            param_descripcion: descripcion,
            param_modelo: modelo,
            param_serie: serie,
            param_imei: imei,
            param_observacion: observacion,
            CONFIG_USER_ID: this.usuario.user.userId,
            CONFIG_OUT_MSG_ERROR: "",
            CONFIG_OUT_MSG_EXITO: "",
          },
        },
      ];

      this._service.addHardware(arrayParametro[0]).subscribe((data) => {
        const arrayData: any[] = Array.of(data);
        let msj = arrayData[0].exitoMessage;
        let msj2 = arrayData[0].errorMessage;
        if (msj == undefined) {
          msj = "";
        }
        if (msj2 == undefined) {
          msj2 = "";
        }
        if (msj != "") {
          this.showSuccess(msj);
        } else if (msj2 != "") {
          this.showError(msj2);
        } else {
          this.showError("Error");
        }
        this.cerrarModal.nativeElement.click();
        this.getListaRecurso();
      });
    }
    //window.location.reload();
    this.spinner.hide();
  }

  eliminarRecurso(idRecurso: number) {
    this.spinner.show();

    let arrayParametro: any[] = [
      {
        queryId: 18,
        mapValue: {
          param_id_hardware: idRecurso,
          CONFIG_USER_ID: this.usuario.user.userId,
          CONFIG_OUT_MSG_ERROR: "",
          CONFIG_OUT_MSG_EXITO: "",
        },
      },
    ];

    this._service.deleteRecurso(arrayParametro[0]).subscribe((data) => {
      const arrayData: any[] = Array.of(data);
      let msj = arrayData[0].exitoMessage;
      let msj2 = arrayData[0].errorMessage;
      if (msj == undefined) {
        msj = "";
      }
      if (msj2 == undefined) {
        msj2 = "";
      }
      if (msj != "") {
        this.showSuccess(msj);
      } else if (msj2 != "") {
        this.showError(msj2);
      } else {
        this.showError("Error");
      }
      this.modalEliminar.nativeElement.click();
      this.getListaRecurso();
    });
    this.spinner.hide();
    //window.location.reload();
  }

  getListaTipo() {
    //this.spinner.show();
    let arrayParametro: any[] = [
      {
        queryId: 32,
      },
    ];
    this._service.getListTipo(arrayParametro[0]).subscribe((data) => {
      const arrayData: any[] = Array.of(data);
      this.tipo = [];
      for (let index = 0; index < arrayData[0].list.length; index++) {
        this.tipo.push({
          id: arrayData[0].list[index].id,
          nombre: arrayData[0].list[index].nombre,
          descripcion: arrayData[0].list[index].descripcion,
        });
      }
      //this.spinner.hide();
    });
  }

  getListaMarca() {
    //this.spinner.show();
    let arrayParametro: any[] = [
      {
        queryId: 33,
      },
    ];
    this._service.getListMarca(arrayParametro[0]).subscribe((data) => {
      const arrayData: any[] = Array.of(data);
      this.marca = [];
      for (let index = 0; index < arrayData[0].list.length; index++) {
        this.marca.push({
          id: arrayData[0].list[index].id,
          nombre: arrayData[0].list[index].nombre,
          descripcion: arrayData[0].list[index].descripcion,
        });
      }
      //this.spinner.hide();
    });
  }

  addTipo() {
    this.btnGuardarTipo.nativeElement.disabled = true;
    let nombre = this.datosTipo.nombre;
    let descripcion = this.datosTipo.descripcion;
    let idPadre = this.datosTipo.idPadre;

    let arrayParametro: any[] = [
      {
        queryId: 21,
        mapValue: {
          param_nombre: nombre,
          param_descripcion: descripcion,
          param_id_padre: idPadre,
          CONFIG_USER_ID: this.usuario.user.userId,
          CONFIG_OUT_MSG_ERROR: "",
          CONFIG_OUT_MSG_EXITO: "",
        },
      },
    ];

    this._service.addTipo(arrayParametro[0]).subscribe((data) => {
      const arrayData: any[] = Array.of(data);
      let msj = arrayData[0].exitoMessage;
      let msj2 = arrayData[0].errorMessage;
      if (msj == undefined) {
        msj = "";
      }
      if (msj2 == undefined) {
        msj2 = "";
      }
      if (msj != "") {
        this.showSuccess(msj);
      } else if (msj2 != "") {
        this.showError(msj2);
      } else {
        this.showError("Error");
      }
      this.getListaTipo();
      this.cerrarModalTipo.nativeElement.click();
    });
  }

  addMarca() {
    this.btnGuardarMarca.nativeElement.disabled = true;
    let nombre = this.datosMarca.nombre;
    let descripcion = this.datosMarca.descripcion;
    let idPadre = this.datosMarca.idPadre;

    let arrayParametro: any[] = [
      {
        queryId: 22,
        mapValue: {
          param_nombre: nombre,
          param_descripcion: descripcion,
          param_id_padre: idPadre,
          CONFIG_USER_ID: this.usuario.user.userId,
          CONFIG_OUT_MSG_ERROR: "",
          CONFIG_OUT_MSG_EXITO: "",
        },
      },
    ];

    this._service.addMarca(arrayParametro[0]).subscribe((data) => {
      const arrayData: any[] = Array.of(data);
      let msj = arrayData[0].exitoMessage;
      let msj2 = arrayData[0].errorMessage;
      if (msj == undefined) {
        msj = "";
      }
      if (msj2 == undefined) {
        msj2 = "";
      }
      if (msj != "") {
        this.showSuccess(msj);
      } else if (msj2 != "") {
        this.showError(msj2);
      } else {
        this.showError("Error");
      }
      this.getListaMarca();
      this.cerrarModalMarca.nativeElement.click();
    });
  }

  btnAgregarHardware() {
    this.cboMarca.nativeElement.style.visibility = "hidden";
    this.cboTipo.nativeElement.style.visibility = "hidden";
    this.btnGuardarHardware.nativeElement.disabled = false;
    this.datosHardware.modelo = "";
    this.datosHardware.serie = "";
    this.datosHardware.imei = "";
    this.datosHardware.descripcion = "";
    this.datosHardware.observacion = "";
  }

  btnAgregarTipo() {
    this.btnGuardarTipo.nativeElement.disabled = false;
    this.datosTipo.nombre = "";
    this.datosTipo.descripcion = "";
    this.datosTipo.idPadre = "";
    this.totaltablas.id = "";
  }

  btnAgregarMarca() {
    this.btnGuardarMarca.nativeElement.disabled = false;
    this.datosMarca.nombre = "";
    this.datosMarca.descripcion = "";
    this.datosMarca.idPadre = "";
    this.totaltablas.id = "";
  }

  getInfoTipo(id: number) {
    this.idTipo = id;
  }

  getInfoMarca(id: number) {
    this.idMarca = id;
  }

  abrirEliminar(idRecurso: number) {
    this.idRecurso = idRecurso;
  }

  cancelarEliminar() {
    this.modalEliminar.nativeElement.click();
  }

  confirmarEliminar() {
    this.eliminarRecurso(this.idRecurso);
  }

  showSuccess(msj: string) {
    this.toastr.success(msj, "", { timeOut: 2000 });
  }

  showError(msj: string) {
    this.toastr.error(msj, "", { timeOut: 2000 });
  }

  showWarning(msj: string) {
    this.toastr.warning(msj, "", { timeOut: 2000 });
  }

  irHacia() {
    this.router.navigate(["recursoHardwareDetalle"]);
  }

  getInfoTipoBuscar(id: number) {
    this.idTipoBuscar = id;
  }

  getInfoMarcaBuscar(id: number) {
    this.idMarcaBuscar = id;
  }

  getInfoEstadoBuscar(id: number) {
    this.idEstadoBuscar = id;
  }

  buscarRecursoHardware() {
    this.spinner.show();

    if (this.serie == undefined) {
      this.serie = "";
    }

    if (this.idTipoBuscar == undefined || this.idTipoBuscar == "0") {
      this.idTipoBuscar = "";
    }

    if (this.idMarcaBuscar == undefined || this.idMarcaBuscar == "0") {
      this.idMarcaBuscar = "";
    }

    if (this.idEstadoBuscar == undefined || this.idEstadoBuscar == "1000") {
      this.idEstadoBuscar = "";
    }

    if (this.imei == undefined) {
      this.imei = "";
    }

    if (
      this.serie == "" &&
      this.idTipoBuscar == "" &&
      this.idMarcaBuscar == "" &&
      this.idEstadoBuscar == "" &&
      this.imei == ""
    ) {
      this.getListaRecurso();
    } else {
      let arrayParametro: any[] = [
        {
          queryId: 45,
          mapValue: {
            param_serie: this.serie,
            param_id_tipo: this.idTipoBuscar,
            param_id_marca: this.idMarcaBuscar,
            param_id_estado: this.idEstadoBuscar,
            param_imei: this.imei,
          },
        },
      ];
      this._service
        .buscarRecursoHardware(arrayParametro[0])
        .subscribe((data) => {
          const arrayData: any[] = Array.of(data);
          this.recurso = [];
          for (let index = 0; index < arrayData[0].list.length; index++) {
            this.recurso.push({
              id_recurso: arrayData[0].list[index].id_recurso,
              tipo: arrayData[0].list[index].tipo,
              marca: arrayData[0].list[index].marca,
              correo: arrayData[0].list[index].correo,
              equipo: arrayData[0].list[index].equipo,
              modelo: arrayData[0].list[index].modelo,
              serie: arrayData[0].list[index].serie,
              imei: arrayData[0].list[index].imei,
              persona_asignada: arrayData[0].list[index].nombres,
              codigo_corporativo: arrayData[0].list[index].codigo_corporativo,
              proyecto: arrayData[0].list[index].proyecto,
              estado_recurso: arrayData[0].list[index].estado_recurso,
              observaciON: arrayData[0].list[index].observaciON,
            });
          }
        });
    }
    this.spinner.hide();
  }

  getCboEntidadesTabla(idTabla: any) {
    let arrayParametro: any[] = [
      {
        queryId: 52,
        mapValue: {
          param_id_tabla: idTabla,
        },
      },
    ];

    this._service.getCboEntTabla(arrayParametro[0]).subscribe((data) => {
      const arrayData: any[] = Array.of(data);
      this.entidadTabla = [];
      for (let index = 0; index < arrayData[0].list.length; index++) {
        this.entidadTabla.push({
          id: arrayData[0].list[index].id,
          nombre: arrayData[0].list[index].nombre,
        });
      }
    });
  }

  getEntidades(id: any) {
    this.totaltablas.id = id;
    this.getCboEntidadesTabla(id);
  }

  getEntidadesTabla(id: any, infoEntidad: any) {
    if (infoEntidad == "T") {
      this.datosTipo.idPadre = id;
    }
    if (infoEntidad == "M") {
      this.datosMarca.idPadre = id;
    }
  }

  limpiar() {
    this.getEntidades(1000);
  }

  addInfoEntidad(infoEntidad: any) {
    this.spinner.show();

    let nombre: any;
    let descripcion: any;
    let idPadre: any;

    if (infoEntidad == "T") {
      this.btnGuardarTipo.nativeElement.disabled = true;
      nombre = this.datosTipo.nombre;
      descripcion = this.datosTipo.descripcion;
      idPadre = this.datosTipo.idPadre;
    }

    if (infoEntidad == "M") {
      this.btnGuardarMarca.nativeElement.disabled = true;
      nombre = this.datosMarca.nombre;
      descripcion = this.datosMarca.descripcion;
      idPadre = this.datosMarca.idPadre;
    }

    let arrayParametro: any[] = [
      {
        queryId: 50,
        mapValue: {
          param_nombre: nombre,
          param_descripcion: descripcion,
          param_id_padre: idPadre,
          param_id_tabla: this.totaltablas.id,
          CONFIG_USER_ID: this.usuario.user.userId,
          CONFIG_OUT_MSG_ERROR: "",
          CONFIG_OUT_MSG_EXITO: "",
        },
      },
    ];

    this._service.addTipo(arrayParametro[0]).subscribe((data) => {
      const arrayData: any[] = Array.of(data);
      let msj = arrayData[0].exitoMessage;
      let msj2 = arrayData[0].errorMessage;
      if (msj == undefined) {
        msj = "";
      }
      if (msj2 == undefined) {
        msj2 = "";
      }
      if (msj != "") {
        this.showSuccess(msj);
      } else if (msj2 != "") {
        this.showError(msj2);
      } else {
        this.showError("Error");
      }

      if (infoEntidad == "T") {
        this.getListaTipo();
        this.cerrarModalTipo.nativeElement.click();
      }
      if (infoEntidad == "M") {
        this.getListaMarca();
        this.cerrarModalMarca.nativeElement.click();
      }
    });
    this.spinner.hide();
  }

  handlePageChange(event) {
    let offset = event * 10;
    this.spinner.show();

    if (this.totalBusqueda != this.totalRequerimientos) {
      this._service
        .getListaMantenimiento(offset.toString())
        .subscribe((data) => {
          //this.personal = data;
          /*FRANCIA INICIO*/
          const arrayData: any[] = Array.of(data);

          for (let index = 0; index < arrayData[0].list.length; index++) {
            this.recurso.push({
              id: arrayData[0].list[index].id,
              nombres: arrayData[0].list[index].nombres,
              apellidos: arrayData[0].list[index].apellidos,
              correo: arrayData[0].list[index].correo,
              dni: arrayData[0].list[index].dni,
              codigo_corporativo: arrayData[0].list[index].codigo_corporativo,
              perfil: arrayData[0].list[index].perfil,
              codigo_proyecto: arrayData[0].list[index].codigo_proyecto,
              fecha_ingreso: arrayData[0].list[index].fecha_ingreso,
              estado: arrayData[0].list[index].estado,
            });
          }
          /*FRANCIA FIN*/
          this.spinner.hide();
          console.log("totalrequerimientos: " + this.totalRequerimientos);
          console.log("totalBusqueda: " + this.totalBusqueda);
        });
    } else {
      this.spinner.hide();
    }
    this.page = event;
  }

  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
