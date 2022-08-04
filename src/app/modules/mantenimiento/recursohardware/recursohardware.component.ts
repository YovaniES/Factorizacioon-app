import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { DatePipe } from "@angular/common";
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from "@angular/router";
import { Usuario } from "../../../models/usuario";
import { Role } from "../../../models/role";
import { MantenimientoService } from "../../../services/mantenimiento.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-recursopersonal",
  templateUrl: "./recursohardware.component.html",
  styleUrls: ["./recursohardware.component.scss"],
})
export class RecursohardwareComponent implements OnInit {
  idHardware: any = 0;
  //@ViewChild('cerrarModalCuenta') cerrarModalCuenta:ElementRef;
  //@ViewChild('cerrarModalHardware') cerrarModalHardware:ElementRef;
  //@ViewChild('btnEditarHardware') btnEditarHardware:ElementRef;
  tipo: any;
  marca: any;
  datosHardware = {
    tipo: "",
    marca: "",
    idTipo: "",
    idMarca: "",
    descripcion: "",
    modelo: "",
    serie: "",
    imei: "",
    observacion: "",
  };

  usuario: Usuario;
  role = Role;

  constructor(
    private _Activatedroute: ActivatedRoute,
    private _service: MantenimientoService,
    public datepipe: DatePipe,
    private spinner: NgxSpinnerService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.usuario = JSON.parse(localStorage.getItem("currentUser"));
  }

  ngOnInit() {
    this._Activatedroute.paramMap.subscribe((params) => {
      this.idHardware = params.get("idHardware");
      this.getRecursoId();
      this.getCboTipo();
      this.getCboMarca();
    });
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

  getRecursoId() {
    this.spinner.show();
    let arrayParametro: any[] = [
      {
        queryId: 34,
        mapValue: {
          param_id_hardware: this.idHardware,
        },
      },
    ];
    this._service.getHardwareId(arrayParametro[0]).subscribe((data) => {
      const arrayData: any[] = Array.of(data);
      for (let index = 0; index < arrayData[0].list.length; index++) {
        this.datosHardware.tipo        = arrayData[0].list[index].tipo;
        this.datosHardware.marca       = arrayData[0].list[index].marca;
        this.datosHardware.idTipo      = arrayData[0].list[index].id_tipo;
        this.datosHardware.idMarca     = arrayData[0].list[index].id_marca;
        this.datosHardware.descripcion = arrayData[0].list[index].descripcion;
        this.datosHardware.modelo      = arrayData[0].list[index].modelo;
        this.datosHardware.serie       = arrayData[0].list[index].serie;
        this.datosHardware.imei        = arrayData[0].list[index].imei;
        this.datosHardware.observacion = arrayData[0].list[index].observacion;
      }
      this.spinner.hide();
    });
  }

  getCboTipo() {
    let arrayParametro: any[] = [
      {
        queryId: 32,
      },
    ];

    this._service.getProyectos(arrayParametro[0]).subscribe((data) => {
      //this.proyectos = data;
      const arrayData: any[] = Array.of(data);
      this.tipo = [];
      for (let index = 0; index < arrayData[0].list.length; index++) {
        this.tipo.push({
          id: arrayData[0].list[index].id,
          nombre: arrayData[0].list[index].nombre,
          descripcion: arrayData[0].list[index].descripcion,
        });
      }
    });
  }

  getCboMarca() {
    let arrayParametro: any[] = [
      {
        queryId: 33,
      },
    ];

    this._service.getPerfiles(arrayParametro[0]).subscribe((data) => {
      //this.proyectos = data;
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
  }

  getInfoTipo(idTipo: any) {
    this.datosHardware.idTipo = idTipo;
  }

  getInfoMarca(idMarca: any) {
    this.datosHardware.idMarca = idMarca;
  }

  updateRecursoHardware() {
    this.spinner.show();
    let idTipo      = this.datosHardware.idTipo;
    let idMarca     = this.datosHardware.idMarca;
    let descripcion = this.datosHardware.descripcion;
    let modelo      = this.datosHardware.modelo;
    let serie       = this.datosHardware.serie;
    let imei        = this.datosHardware.imei;
    let observacion = this.datosHardware.observacion;

    let arrayParametro: any[] = [
      {
        queryId: 17,
        mapValue: {
          param_id_recurso: this.idHardware,
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
    });
    this.spinner.hide();
  }

  regresarBandeja() {
    this.router.navigate(["mantenimientoRecurso"]);
  }
}
