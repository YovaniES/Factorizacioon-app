import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
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
  templateUrl: "./apprecursopersonal.component.html",
  styleUrls: ["./apprecursopersonal.component.sass"],
})
export class ApprecursopersonalComponent implements OnInit {
  datosPersonalEditar = {
    id: "",
    nombre: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    correo: "",
    dni: "",
    fechaNacimiento: "",
    codCorporativo: "",
    perfil: "",
    codPerfil: "",
    proyecto: "",
    codProyecto: "",
    proyectoDescripcion: "",
    fechaIngreso: "",
    estado: "",
  };
  idPersonal: any = 0;
  listaHardwareAsignado: Array<any> = [];
  listaCuentaAsignado: Array<any> = [];
  listaHardwareDisponible: Array<any> = [];
  listaCuentaDisponible: Array<any> = [];
  listaHistoricoProyectos: Array<any> = [];
  paginaInicioH: number;
  paginaInicioP: number;
  totalItemsH: number;
  totalItemsP: number;
  @ViewChild("cerrarModalCuenta") cerrarModalCuenta: ElementRef;
  @ViewChild("cerrarModalHardware") cerrarModalHardware: ElementRef;
  @ViewChild("btnEditarPersonal") btnEditarPersonal: ElementRef;
  proyectos: any;
  perfiles: any;
  serie: any;
  tipo: any;
  marca: any;
  cuentaUsuario: any;
  idTipo: any;
  idMarca: any;

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
      this.idPersonal = params.get("idPersonal");
      //this.getListaHardwareDisponible();
      //this.getListaCuentaDisponible();
      this.getCboProyectos();
      this.getCboPerfiles();
      this.getListaMarca();
      this.getListaTipo();
      this.getPersonalId();
      this.getListaCuentaAsignado();
      this.getListaHardwareAsignado();
      this.getHistoricoProyectos();
    });
  }

  getHistoricoProyectos() {
    this.spinner.show();
    let arrayParametro: any[] = [
      {
        queryId: 57,
        mapValue: {
          param_id_persona: this.idPersonal,
        },
      },
    ];
    this._service
      .getHistoricoPersonaProyectos(arrayParametro[0])
      .subscribe((data) => {
        this.spinner.hide();
        const arrayData: any[] = Array.of(data);
        this.listaHistoricoProyectos = [];
        for (let index = 0; index < arrayData[0].list.length; index++) {
          this.listaHistoricoProyectos.push({
            id_persona: arrayData[0].list[index].id_persona,
            id_proyecto: arrayData[0].list[index].id_proyecto,
            proyecto_codigo: arrayData[0].list[index].proyecto_codigo,
            proyecto_descripcion: arrayData[0].list[index].proyecto_descripcion,
            fecha_asignacion: arrayData[0].list[index].fecha_asignacion,
            id_usuario_asignacion:
              arrayData[0].list[index].id_usuario_asignacion,
            nombre_usuario_asignacion:
              arrayData[0].list[index].nombre_usuario_asignacion,
          });
        }
      });
  }

  getListaHardwareDisponible() {
    this.spinner.show();
    this.serie = "";
    this.idTipo = "";
    this.idMarca = "";
    this.getListaMarca();
    this.getListaTipo();
    let arrayParametro: any[] = [
      {
        queryId: 23,
      },
    ];
    this._service
      .getListHardwareDisponible(arrayParametro[0])
      .subscribe((data) => {
        const arrayData: any[] = Array.of(data);
        this.listaHardwareDisponible = [];
        for (let index = 0; index < arrayData[0].list.length; index++) {
          this.listaHardwareDisponible.push({
            id: arrayData[0].list[index].id,
            tipo: arrayData[0].list[index].tipo,
            marca: arrayData[0].list[index].marca,
            descripcion: arrayData[0].list[index].descripcion,
            modelo: arrayData[0].list[index].modelo,
            serie: arrayData[0].list[index].serie,
            imei: arrayData[0].list[index].imei,
            observacion: arrayData[0].list[index].observacion,
          });
        }
      });
    this.spinner.hide();
  }

  getListaCuentaDisponible() {
    this.spinner.show();
    this.cuentaUsuario = "";
    let arrayParametro: any[] = [
      {
        queryId: 24,
      },
    ];
    this._service
      .getListCuentaDisponible(arrayParametro[0])
      .subscribe((data) => {
        const arrayData: any[] = Array.of(data);
        this.listaCuentaDisponible = [];
        for (let index = 0; index < arrayData[0].list.length; index++) {
          this.listaCuentaDisponible.push({
            id: arrayData[0].list[index].id,
            usuario: arrayData[0].list[index].usuario,
            password: arrayData[0].list[index].password,
            tipo: arrayData[0].list[index].tipo,
            fechaUltimaRenovacion:
              arrayData[0].list[index].fecha_ultima_renovacion,
            fechaProximaRenovacion:
              arrayData[0].list[index].fecha_proxima_renovacion,
          });
        }
        this.spinner.hide();
      });
  }

  nroPaginaH() {
    this.paginaInicioH = 1;
  }

  nroPaginaP() {
    this.paginaInicioP = 1;
  }

  asignarRecusoPersona(idRecurso: number, tipo: string) {
    this.spinner.show();

    if (this.datosPersonalEditar.estado == "Activo") {
      let arrayParametro: any[] = [
        {
          queryId: 25,
          mapValue: {
            param_id_persona: this.idPersonal,
            param_id_recurso: idRecurso,
            CONFIG_USER_ID: this.usuario.user.userId,
            CONFIG_OUT_MSG_ERROR: "",
            CONFIG_OUT_MSG_EXITO: "",
          },
        },
      ];

      this._service
        .asignarRecusoPersona(arrayParametro[0])
        .subscribe((data) => {
          const arrayData: any[] = Array.of(data);
          let msj = arrayData[0].exitoMessage;
          this.showSuccess(msj);
          if (tipo == "h") {
            this.cerrarModalHardware.nativeElement.click();
          }
          if (tipo == "c") {
            this.cerrarModalCuenta.nativeElement.click();
          }
          this.ngOnInit();
        });
    } else {
      this.showError("No se puede asignar cuando el personal esta de baja");
    }

    this.spinner.hide();
  }

  getListaHardwareAsignado() {
    this.spinner.show();
    let arrayParametro: any[] = [
      {
        queryId: 27,
        mapValue: {
          param_id_persona: this.idPersonal,
        },
      },
    ];
    this._service.getListCuentaAsignado(arrayParametro[0]).subscribe((data) => {
      const arrayData: any[] = Array.of(data);
      this.listaHardwareAsignado = [];
      for (let index = 0; index < arrayData[0].list.length; index++) {
        this.listaHardwareAsignado.push({
          id: arrayData[0].list[index].id,
          tipo: arrayData[0].list[index].tipo,
          marca: arrayData[0].list[index].marca,
          descripcion: arrayData[0].list[index].descripcion,
          modelo: arrayData[0].list[index].modelo,
          serie: arrayData[0].list[index].serie,
          imei: arrayData[0].list[index].imei,
          observacion: arrayData[0].list[index].observacion,
        });
      }
      this.spinner.hide();
    });
  }

  getListaCuentaAsignado() {
    this.spinner.show();
    let arrayParametro: any[] = [
      {
        queryId: 28,
        mapValue: {
          param_id_persona: this.idPersonal,
        },
      },
    ];
    this._service.getListCuentaAsignado(arrayParametro[0]).subscribe((data) => {
      const arrayData: any[] = Array.of(data);
      this.listaCuentaAsignado = [];
      for (let index = 0; index < arrayData[0].list.length; index++) {
        this.listaCuentaAsignado.push({
          id: arrayData[0].list[index].id,
          usuario: arrayData[0].list[index].usuario,
          password: arrayData[0].list[index].password,
          tipo: arrayData[0].list[index].tipo,
          fechaUltimaRenovacion:
            arrayData[0].list[index].fecha_ultima_renovacion,
          fechaProximaRenovacion:
            arrayData[0].list[index].fecha_proxima_renovacion,
        });
      }
      this.spinner.hide();
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

  quitarRecurso(idRecurso: number) {
    this.spinner.show();

    let arrayParametro: any[] = [
      {
        queryId: 26,
        mapValue: {
          param_id_persona: this.idPersonal,
          param_id_recurso: idRecurso,
          CONFIG_USER_ID: this.usuario.user.userId,
          CONFIG_OUT_MSG_ERROR: "",
          CONFIG_OUT_MSG_EXITO: "",
        },
      },
    ];

    this._service.desasignarRecurso(arrayParametro[0]).subscribe((data) => {
      const arrayData: any[] = Array.of(data);
      let msj = arrayData[0].exitoMessage;
      this.showSuccess(msj);
      this.ngOnInit();
    });

    this.spinner.hide();
  }

  getPersonalId() {
    this.spinner.show();
    let arrayParametro: any[] = [
      {
        queryId: 31,
        mapValue: {
          param_id_persona: this.idPersonal,
        },
      },
    ];
    this._service.getPersonalId(arrayParametro[0]).subscribe((data) => {
      const arrayData: any[] = Array.of(data);
      for (let index = 0; index < arrayData[0].list.length; index++) {
        this.datosPersonalEditar.id = arrayData[0].list[index].id;
        this.datosPersonalEditar.nombre = arrayData[0].list[index].nombres;
        this.datosPersonalEditar.apellidoPaterno =
          arrayData[0].list[index].apellido_paterno;
        this.datosPersonalEditar.apellidoMaterno =
          arrayData[0].list[index].apellido_materno;
        this.datosPersonalEditar.correo = arrayData[0].list[index].correo;
        this.datosPersonalEditar.dni = arrayData[0].list[index].dni;
        this.datosPersonalEditar.codCorporativo =
          arrayData[0].list[index].codigo_corporativo;
        this.datosPersonalEditar.perfil = arrayData[0].list[index].perfil;
        this.datosPersonalEditar.codPerfil = arrayData[0].list[index].id_perfil;
        this.datosPersonalEditar.proyecto =
          arrayData[0].list[index].codigo_proyecto;
        this.datosPersonalEditar.codProyecto =
          arrayData[0].list[index].id_codigo_proyecto;
        this.datosPersonalEditar.proyectoDescripcion =
          arrayData[0].list[index].proyecto_descripcion;
        //this.datosPersonalEditar.fechaNacimiento = arrayData[0].list[index].fecha_nacimiento;

        //this.datosPersonalEditar.fechaIngreso = arrayData[0].list[index].fecha_ingreso;
        //this.datosPersonalEditar.fechaNacimiento = arrayData[0].list[index].fecha_nacimiento;

        if (
          arrayData[0].list[index].fecha_ingreso != "null" &&
          arrayData[0].list[index].fecha_ingreso != ""
        ) {
          let fechaI = arrayData[0].list[index].fecha_ingreso;
          const str = fechaI.split("/");
          const year = Number(str[2]);
          const month = Number(str[1]);
          const date = Number(str[0]);
          this.datosPersonalEditar.fechaIngreso = this.datepipe.transform(
            new Date(year, month - 1, date),
            "yyyy-MM-dd"
          );
          console.log(this.datosPersonalEditar.fechaIngreso);
        }
        if (
          arrayData[0].list[index].fecha_nacimiento != "null" &&
          arrayData[0].list[index].fecha_nacimiento != ""
        ) {
          let fechaN = arrayData[0].list[index].fecha_nacimiento;
          const str2 = fechaN.split("/");
          const year2 = Number(str2[2]);
          const month2 = Number(str2[1]);
          const date2 = Number(str2[0]);
          this.datosPersonalEditar.fechaNacimiento = this.datepipe.transform(
            new Date(year2, month2 - 1, date2),
            "yyyy-MM-dd"
          );
          console.log(this.datosPersonalEditar.fechaNacimiento);
        }
        this.datosPersonalEditar.estado = arrayData[0].list[index].estado;
        //console.log('fecha ingreso arrayData - ' + this.datepipe.transform(arrayData[0].list[index].fecha_ingreso,'dd/MM/yyyy'));
        //console.log('fecha ingreso arrayData - ' + this.datepipe.transform(arrayData[0].list[index].fecha_nacimiento,'dd/MM/yyyy'));
      }
      this.spinner.hide();
    });
  }

  getCboProyectos() {
    let arrayParametro: any[] = [
      {
        queryId: 1,
      },
    ];

    this._service.getProyectos(arrayParametro[0]).subscribe((data) => {
      //this.proyectos = data;
      const arrayData: any[] = Array.of(data);
      this.proyectos = [];
      for (let index = 0; index < arrayData[0].list.length; index++) {
        this.proyectos.push({
          id: arrayData[0].list[index].id,
          codigo: arrayData[0].list[index].codigo,
          descripcion: arrayData[0].list[index].descripcion,
        });
      }
    });
  }

  getCboPerfiles() {
    let arrayParametro: any[] = [
      {
        queryId: 10,
      },
    ];

    this._service.getPerfiles(arrayParametro[0]).subscribe((data) => {
      //this.proyectos = data;
      const arrayData: any[] = Array.of(data);
      this.perfiles = [];
      for (let index = 0; index < arrayData[0].list.length; index++) {
        this.perfiles.push({
          id: arrayData[0].list[index].id,
          nombre: arrayData[0].list[index].nombre,
          descripcion: arrayData[0].list[index].descripcion,
        });
      }
    });
  }

  getInfoProyecto(codProyecto: any) {
    this.datosPersonalEditar.codProyecto = codProyecto;
    console.log("codigo proy: " + codProyecto);
  }

  getInfoPerfil(codPerfil: any) {
    this.datosPersonalEditar.codPerfil = codPerfil;
  }

  updatePersonal() {
    this.spinner.show();
    this.btnEditarPersonal.nativeElement.disabled = true;
    let nombre = this.datosPersonalEditar.nombre;
    let apellidoPaterno = this.datosPersonalEditar.apellidoPaterno;
    let apellidoMaterno = this.datosPersonalEditar.apellidoMaterno;
    let correo = this.datosPersonalEditar.correo;
    let dni = this.datosPersonalEditar.dni;
    let codCorporativo = this.datosPersonalEditar.codCorporativo;
    let codPerfil = this.datosPersonalEditar.codPerfil;
    let codProyecto = this.datosPersonalEditar.codProyecto;
    let fechaNacimiento = this.datosPersonalEditar.fechaNacimiento;
    let fechaIngreso = this.datosPersonalEditar.fechaIngreso;
    let estadoPersonal: any;
    if (this.datosPersonalEditar.estado == "Activo") {
      estadoPersonal = 1;
    } else {
      estadoPersonal = 0;
    }
    //this.datepipe.transform(this.busqueda.fechaIngresoInicio,'yyyy/MM/dd')
    let arrayParametro: any[] = [
      {
        queryId: 8,
        mapValue: {
          param_id_persona: this.idPersonal,
          param_codigo_corporativo: codCorporativo,
          param_nombres: nombre,
          param_apellido_paterno: apellidoPaterno,
          param_apellido_materno: apellidoMaterno,
          param_dni: dni,
          param_correo: correo,
          param_fecha_ingreso: fechaIngreso,
          param_fecha_nacimiento: fechaNacimiento,
          param_id_proyecto: codProyecto,
          param_id_perfil: codPerfil,
          param_estado: estadoPersonal,
          CONFIG_USER_ID: this.usuario.user.userId,
          CONFIG_OUT_MSG_ERROR: "",
          CONFIG_OUT_MSG_EXITO: "",
        },
      },
    ];

    this._service.updatePersonal(arrayParametro[0]).subscribe((data) => {
      this.spinner.hide();
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
      this.getHistoricoProyectos();
    });
    //window.location.reload();
    this.btnEditarPersonal.nativeElement.disabled = false;
  }

  actualizarFechaIngreso(fecha: string) {
    this.datosPersonalEditar.fechaIngreso = this.datepipe.transform(
      fecha,
      "yyyy-MM-dd"
    );
  }

  actualizarFechaNacimiento(fecha: string) {
    this.datosPersonalEditar.fechaNacimiento = this.datepipe.transform(
      fecha,
      "yyyy-MM-dd"
    );
  }

  buscarRecursoHardware() {
    this.spinner.show();

    if (this.serie == undefined) {
      this.serie = "";
    }

    if (this.idTipo == undefined || this.idTipo == "0") {
      this.idTipo = "";
    }

    if (this.idMarca == undefined || this.idMarca == "0") {
      this.idMarca = "";
    }

    if (this.serie == "" && this.idTipo == "" && this.idMarca == "") {
      this.getListaHardwareDisponible();
    } else {
      let arrayParametro: any[] = [
        {
          queryId: 29,
          mapValue: {
            param_serie: this.serie,
            param_id_tipo: this.idTipo,
            param_id_marca: this.idMarca,
          },
        },
      ];
      this._service
        .buscarRecursoHardware(arrayParametro[0])
        .subscribe((data) => {
          const arrayData: any[] = Array.of(data);
          this.listaHardwareDisponible = [];
          for (let index = 0; index < arrayData[0].list.length; index++) {
            this.listaHardwareDisponible.push({
              id: arrayData[0].list[index].id_recurso,
              tipo: arrayData[0].list[index].tipo,
              marca: arrayData[0].list[index].marca,
              descripcion: arrayData[0].list[index].equipo,
              modelo: arrayData[0].list[index].modelo,
              serie: arrayData[0].list[index].serie,
              imei: arrayData[0].list[index].imei,
              observacion: arrayData[0].list[index].observacion,
            });
          }
        });
    }
    this.spinner.hide();
  }

  buscarRecursoCuenta() {
    this.spinner.show();
    if (this.cuentaUsuario == "" || this.cuentaUsuario == undefined) {
      this.getListaCuentaDisponible();
    } else {
      let arrayParametro: any[] = [
        {
          queryId: 44,
          mapValue: {
            param_usuario: this.cuentaUsuario,
          },
        },
      ];
      this._service.buscarCuenta(arrayParametro[0]).subscribe((data) => {
        const arrayData: any[] = Array.of(data);
        this.listaCuentaDisponible = [];
        for (let index = 0; index < arrayData[0].list.length; index++) {
          this.listaCuentaDisponible.push({
            id: arrayData[0].list[index].id,
            usuario: arrayData[0].list[index].usuario,
            password: arrayData[0].list[index].password,
            tipo: arrayData[0].list[index].tipo,
            fechaUltimaRenovacion:
              arrayData[0].list[index].fecha_ultima_renovacion,
            fechaProximaRenovacion:
              arrayData[0].list[index].fecha_proxima_renovacion,
          });
        }
        this.spinner.hide();
      });
    }
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
      //this.spinner.hide();
    });
  }

  getInfoTipo(id: number) {
    this.idTipo = id;
  }

  getInfoMarca(id: number) {
    this.idMarca = id;
  }

  regresarBandeja() {
    this.router.navigate(["mantenimientoPersonal"]);
  }
}
