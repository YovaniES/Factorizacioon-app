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
import "sweetalert2/src/sweetalert2.scss";
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from "@angular/router";
import { Usuario } from "../../../models/usuario";
import { Role } from "../../../models/role";
import { MantenimientoService } from "../../../services/mantenimiento.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-recursocuenta",
  templateUrl: "./apprecursocuenta.component.html",
  styleUrls: ["./apprecursocuenta.component.sass"],
})
export class ApprecursocuentaComponent implements OnInit {
  idCuenta: any = 0;
  //@ViewChild('cerrarModalCuenta') cerrarModalCuenta:ElementRef;
  //@ViewChild('cerrarModalHardware') cerrarModalHardware:ElementRef;
  //@ViewChild('btnEditarHardware') btnEditarHardware:ElementRef;
  tipo: any;
  datosCuenta = {
    id: "",
    usuario: "",
    password: "",
    idTipo: "",
    tipo: "",
    fechaUltimaRenovacion: "",
    fechaProximaRenovacion: "",
  };

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
    this._Activatedroute.paramMap.subscribe((params) => {
      this.idCuenta = params.get("idCuenta");
      this.getRecursoId();
      this.getCboTipo();
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
        queryId: 43,
        mapValue: {
          param_id_cuenta: this.idCuenta,
        },
      },
    ];
    this._service.getCuentaId(arrayParametro[0]).subscribe((data) => {
      const arrayData: any[] = Array.of(data);
      for (let index = 0; index < arrayData[0].list.length; index++) {
        this.datosCuenta.id = arrayData[0].list[index].id;
        this.datosCuenta.tipo = arrayData[0].list[index].tipo;
        this.datosCuenta.idTipo = arrayData[0].list[index].id_tipo;
        this.datosCuenta.usuario = arrayData[0].list[index].usuario;
        this.datosCuenta.password = arrayData[0].list[index].password;
        this.datosCuenta.fechaUltimaRenovacion =
          arrayData[0].list[index].fecha_ultima_renovacion;
        this.datosCuenta.fechaProximaRenovacion =
          arrayData[0].list[index].fecha_proxima_renovacion;
      }
      this.spinner.hide();
    });
  }

  getCboTipo() {
    let arrayParametro: any[] = [
      {
        queryId: 40,
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

  getInfoTipo(idTipo: any) {
    this.datosCuenta.idTipo = idTipo;
  }

  updateRecursoHardware() {
    this.spinner.show();
    let id = this.idCuenta;
    let idTipo = this.datosCuenta.idTipo;
    let usuario = this.datosCuenta.usuario;
    let password = this.datosCuenta.password;
    let fechaUltimaRenovacion = this.datosCuenta.fechaUltimaRenovacion;
    let fechaProximaRenovacion = this.datosCuenta.fechaProximaRenovacion;

    let arrayParametro: any[] = [
      {
        queryId: 20,
        mapValue: {
          param_id_recurso: id,
          param_usuario: usuario,
          param_password: password,
          param_id_tipo: idTipo,
          param_fecha_ultima_renovacion: fechaUltimaRenovacion,
          param_fecha_proxima_renovacion: fechaProximaRenovacion,
          CONFIG_USER_ID: this.usuario.user.userId,
          CONFIG_OUT_MSG_ERROR: "",
          CONFIG_OUT_MSG_EXITO: "",
        },
      },
    ];

    this._service.updateCuenta(arrayParametro[0]).subscribe((data) => {
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
    this.router.navigate(["mantenimientoCuenta"]);
  }
}
