import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import { DatePipe } from "@angular/common";
import { Usuario } from "../../../models/usuario";
import { MantenimientoService } from "../../../services/mantenimiento.service";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";

@Component({
  selector: "app-appcuenta",
  templateUrl: "./cuenta.component.html",
  //styleUrls: ['./recurso.component.scss']
  styles: ["#icono{color:dodgerblue} #icono:hover {color:blue}"],
})
export class CuentaComponent implements OnInit {

  datosTipo = {
    nombre: "",
    descripcion: "",
    idPadre: "",
  };
  idMarca: any;
  idTipo: any;
  marca: Array<any> = [];
  tipo: Array<any> = [];
  listaCuenta: any[] = [];

  @ViewChild("modalEliminar") modalEliminar: ElementRef;
  @ViewChild("btnGuardarCuenta") btnGuardarCuenta: ElementRef;
  @ViewChild("btnGuardarTipo") btnGuardarTipo: ElementRef;
  @ViewChild("cerrarModal") cerrarModal: ElementRef;
  @ViewChild("cerrarModalTipo") cerrarModalTipo: ElementRef;
  @ViewChild("cboTipo") cboTipo: ElementRef;
  idRecurso: any;
  datosCuenta = {
    usuario: "",
    password: "",
    idTipo: "",
  };
  cuentaUsuario: any;
  idEstadoBuscar: any;
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
    console.log("idUser: " + this.usuario.user.userId);
  }

  ngOnInit() {
    this.getListaCuenta();
    this.getListaTipo();
  }

  getListaCuenta() {
    this.spinner.show();
    let parametro: any[] = [{ queryId: 38 }];
    this._service.getListaMantenimiento(parametro[0]).subscribe((resp) => {
      // const arrayData: any[] = Array.of(resp);
      this.listaCuenta = resp;
      // for (let index = 0; index < arrayData[0].list.length; index++) {
      //   this.listaCuenta.push({
      //     id                    : arrayData[0].list[index].id,
      //     usuario               : arrayData[0].list[index].usuario,
      //     password              : arrayData[0].list[index].password,
      //     tipo                  : arrayData[0].list[index].tipo,
      //     fechaUltimaRenovacion : arrayData[0].list[index].fecha_ultima_renovacion,
      //     fechaProximaRenovacion: arrayData[0].list[index].fecha_proxima_renovacion,
      //     estado                : arrayData[0].list[index].estado,
      //     nombres               : arrayData[0].list[index].nombres,
      //   });
      // }
      this.spinner.hide();
    });
  }

  addRecursoCuenta() {
    this.spinner.show();
    let recursoIdTipo: any;
    if (this.idTipo == "0" || this.idTipo == undefined) {
      recursoIdTipo = "";
    } else {
      recursoIdTipo = this.idTipo;
    }

    let usuario = this.datosCuenta.usuario;
    let password = this.datosCuenta.password;
    let idTipo = recursoIdTipo;

    let validarTipo = 0;

    if (idTipo == "") {
      this.cboTipo.nativeElement.style.visibility = "visible";
    } else {
      this.cboTipo.nativeElement.style.visibility = "hidden";
      validarTipo = 1;
    }

    if (validarTipo == 1) {
      this.btnGuardarCuenta.nativeElement.disabled = true;

      let arrayParametro: any[] = [
        {
          queryId: 19,
          mapValue: {
            param_usuario: usuario,
            param_password: password,
            param_id_tipo: idTipo,
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
        this.getListaCuenta();
      });
    }
    //window.location.reload();
    this.spinner.hide();
  }

  eliminarRecurso(idRecurso: number) {
    this.spinner.show();

    let arrayParametro: any[] = [
      {
        queryId: 42,
        mapValue: {
          param_id_cuenta: idRecurso,
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
      this.getListaCuenta();
    });
    this.spinner.hide();
    //window.location.reload();
  }

  getListaTipo() {
    //this.spinner.show();
    let arrayParametro: any[] = [
      {
        queryId: 40,
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

  addTipo() {
    this.btnGuardarTipo.nativeElement.disabled = true;
    let nombre = this.datosTipo.nombre;
    let descripcion = this.datosTipo.descripcion;
    let idPadre = this.datosTipo.idPadre;

    let arrayParametro: any[] = [
      {
        queryId: 50,
        mapValue: {
          param_nombre: nombre,
          param_descripcion: descripcion,
          param_id_padre: idPadre,
          param_id_tabla: 5,
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

  getInfoEstadoBuscar(id: any) {
    this.idEstadoBuscar = id;
  }

  buscarRecursoCuenta() {
    this.spinner.show();

    if (this.cuentaUsuario == "" || this.cuentaUsuario == undefined) {
      this.cuentaUsuario = "";
    }
    if (
      this.idEstadoBuscar == "" ||
      this.idEstadoBuscar == undefined ||
      this.idEstadoBuscar == "1000"
    ) {
      this.idEstadoBuscar = "";
    }
    if (this.cuentaUsuario == "" && this.idEstadoBuscar == "") {
      this.getListaCuenta();
    } else {
      let arrayParametro: any[] = [
        {
          queryId: 46,
          mapValue: {
            param_usuario: this.cuentaUsuario,
            param_id_estado: this.idEstadoBuscar,
          },
        },
      ];
      this._service.buscarCuenta(arrayParametro[0]).subscribe((data) => {
        const arrayData: any[] = Array.of(data);
        this.listaCuenta = [];
        for (let index = 0; index < arrayData[0].list.length; index++) {
          this.listaCuenta.push({
            id: arrayData[0].list[index].id,
            usuario: arrayData[0].list[index].usuario,
            password: arrayData[0].list[index].password,
            tipo: arrayData[0].list[index].tipo,
            fechaUltimaRenovacion:
              arrayData[0].list[index].fecha_ultima_renovacion,
            fechaProximaRenovacion:
              arrayData[0].list[index].fecha_proxima_renovacion,
            estado: arrayData[0].list[index].estado,
            nombres: arrayData[0].list[index].nombres,
          });
        }
        this.spinner.hide();
      });
    }
    this.spinner.hide();
  }

  limpiarFiltro() {
    this.cuentaUsuario = "";
    this.idEstadoBuscar = "";
    this.getListaCuenta();
  }

  btnAgregarHardware() {
    this.cboTipo.nativeElement.style.visibility = "hidden";
    this.btnGuardarCuenta.nativeElement.disabled = false;
    this.datosCuenta.usuario = "";
    this.datosCuenta.password = "";
  }

  btnAgregarTipo() {
    this.btnGuardarTipo.nativeElement.disabled = false;
    this.datosTipo.nombre = "";
    this.datosTipo.descripcion = "";
    this.datosTipo.idPadre = "";
  }

  getInfoTipo(id: number) {
    this.idTipo = id;
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
    this.router.navigate(["recursoCuentaDetalle"]);
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

  getEntidadesTabla(id: any) {
    this.datosTipo.idPadre = id;
  }

  limpiar() {
    this.datosTipo.idPadre = "";
    this.totaltablas.id = "";
    this.getEntidades(1000);
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
            this.listaCuenta.push({
              id: arrayData[0].list[index].id,
              usuario: arrayData[0].list[index].usuario,
              password: arrayData[0].list[index].password,
              tipo: arrayData[0].list[index].tipo,
              fechaUltimaRenovacion:
                arrayData[0].list[index].fecha_ultima_renovacion,
              fechaProximaRenovacion:
                arrayData[0].list[index].fecha_proxima_renovacion,
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
