import {
  Component,
  OnInit,
  ViewEncapsulation,
  ViewChild,
  ElementRef,
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { EmailService } from "../../../services/email.service";
import { DatePipe } from "@angular/common";
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from "@angular/router";
import { Usuario } from "../../../models/usuario";
import { Role } from "../../../models/role";
import { MantenimientoService } from "../../../services/mantenimiento.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-recursopersonal",
  templateUrl: "./apprecursohardwaredetalle.component.html",
  styleUrls: ["./apprecursohardwaredetalle.component.sass"],
})
export class ApprecursohardwaredetalleComponent implements OnInit {
  paginaInicioT: number;
  paginaInicioM: number;
  totalItemsH: number;
  totalItemsP: number;
  marca: Array<any> = [];
  tipo: Array<any> = [];
  datosTipo = {
    nombre: "",
    descripcion: "",
  };
  datosMarca = {
    nombre: "",
    descripcion: "",
  };
  @ViewChild("btnGuardarTipo") btnGuardarTipo: ElementRef;
  @ViewChild("btnGuardarMarca") btnGuardarMarca: ElementRef;
  @ViewChild("cerrarModalTipo") cerrarModalTipo: ElementRef;
  @ViewChild("cerrarModalMarca") cerrarModalMarca: ElementRef;

  usuario: Usuario;
  role = Role;

  constructor(
    private _Activatedroute: ActivatedRoute,
    private _service: MantenimientoService,
    private _emailService: EmailService,
    public datepipe: DatePipe,
    private spinner: NgxSpinnerService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.usuario = JSON.parse(localStorage.getItem("currentUser"));
  }

  ngOnInit() {
    this.getListaTipo();
    this.getListaMarca();
  }

  nroPaginaT() {
    this.paginaInicioT = 1;
  }

  nroPaginaM() {
    this.paginaInicioT = 1;
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

  eliminarTipo(idTipo: number) {
    this.spinner.show();

    let arrayParametro: any[] = [
      {
        queryId: 36,
        mapValue: {
          param_id_tipo: idTipo,
          CONFIG_USER_ID: this.usuario.user.userId,
          CONFIG_OUT_MSG_ERROR: "",
          CONFIG_OUT_MSG_EXITO: "",
        },
      },
    ];

    this._service.desasignarRecurso(arrayParametro[0]).subscribe((data) => {
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
    });
    this.spinner.hide();
  }

  eliminarMarca(idMarca: number) {
    this.spinner.show();

    let arrayParametro: any[] = [
      {
        queryId: 35,
        mapValue: {
          param_id_marca: idMarca,
          CONFIG_USER_ID: this.usuario.user.userId,
          CONFIG_OUT_MSG_ERROR: "",
          CONFIG_OUT_MSG_EXITO: "",
        },
      },
    ];

    this._service.desasignarRecurso(arrayParametro[0]).subscribe((data) => {
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
    });
    this.spinner.hide();
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
    });
    //this.spinner.hide();
  }

  addTipo() {
    this.spinner.show();
    this.btnGuardarTipo.nativeElement.disabled = true;
    let nombre = this.datosTipo.nombre;
    let descripcion = this.datosTipo.descripcion;

    let arrayParametro: any[] = [
      {
        queryId: 21,
        mapValue: {
          param_nombre: nombre,
          param_descripcion: descripcion,
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
    this.spinner.hide();
  }

  addMarca() {
    this.spinner.show();
    this.btnGuardarMarca.nativeElement.disabled = true;
    let nombre = this.datosMarca.nombre;
    let descripcion = this.datosMarca.descripcion;

    let arrayParametro: any[] = [
      {
        queryId: 22,
        mapValue: {
          param_nombre: nombre,
          param_descripcion: descripcion,
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
    this.spinner.hide();
  }

  habilitarGuardar() {
    this.btnGuardarTipo.nativeElement.disabled = false;
    this.btnGuardarMarca.nativeElement.disabled = false;
  }

  limpiarTipo() {
    this.datosTipo.nombre = "";
    this.datosTipo.descripcion = "";
  }

  limpiarMarca() {
    this.datosMarca.nombre = "";
    this.datosMarca.descripcion = "";
  }

  regresarBandeja() {
    this.router.navigate(["mantenimientoRecurso"]);
  }
}
