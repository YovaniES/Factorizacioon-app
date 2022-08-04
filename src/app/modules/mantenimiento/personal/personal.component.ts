import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import { DatePipe } from "@angular/common";
import { Usuario } from "../../../models/usuario";
import { Role } from "../../../models/role";
import { MantenimientoService } from "../../../services/mantenimiento.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-appreqbandeja",
  templateUrl: "./personal.component.html",
  styleUrls: ["./personal.component.scss"],
})
export class PersonalComponent implements OnInit {
  /*FRANCIA*/
  informacionDeBaja: any;
  tituloDeBaja: any;
  tooltipDeBaja: any;
  estadoPersonal: any;
  page3: number = 1;
  page2: number = 1;
  recursoPersona2: Array<any> = [];
  recurso2: Array<any> = [];
  idPersonal: any;
  recursoPersona: Array<any> = [];
  recurso: Array<any> = [];
  codCorporativo: any;
  idEliminar: any;
  personal: Array<any> = [];
  @ViewChild("cerrarModal") cerrarModal: ElementRef;
  @ViewChild("btnGuardarPersonal") btnGuardarPersonal: ElementRef;
  @ViewChild("modalEliminar") modalEliminar: ElementRef;
  @ViewChild("modalEliminacionLogica") modalEliminacionLogica: ElementRef;
  fechanac: any;
  fechain: any;
  //proyectos:any;
  //perfiles:any;
  perfiles: Array<any> = [];
  proyectos: Array<any> = [];
  descProyecto: any;
  descPerfil: any;
  codProyecto: any;
  codPerfil: any;
  datosPersonal = {
    id: "",
    nombre: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    correo: "",
    dni: "",
    codCorporativo: "",
    codPerfil: "",
    codProyecto: "",
    fechaNacimiento: "",
    fechaIngreso: "",
  };

  /*busqueda*/
  busqueda = {
    nombre: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    correo: "",
    dni: "",
    codCorporativo: "",
    perfil: "",
    codProyecto: "",
    fechaIngresoInicio: "",
    fechaIngresoFin: "",
    estado: "",
    imei: "",
  };
  /*servicios: any;
  busqueda = {
    texto: '',
    servicio: '',
    estado:'',
    fechaInicio:'',
    fechaFin:''
  };*/
  totalBusqueda: number = 0;

  /*pagination*/
  offset: any;
  totalRequerimientos: number = 0;
  page: number = 1;
  usuario: Usuario;
  role = Role;

  /*export excel*/
  excelRequerimientos: Array<any> = [{ codigoPET: "gola" }];

  constructor(
    private _service: MantenimientoService,
    private spinner: NgxSpinnerService,
    public datepipe: DatePipe,
    private toastr: ToastrService
  ) {
    this.usuario = JSON.parse(localStorage.getItem("currentUser"));
  }

  ngOnInit() {
    this.spinner.hide();
    //this.getServicios();
    this.getCboProyectos();
    this.getCboPerfiles();
    //this.getListaPersonal('6--');
    this.getListaPersonal();
    //this.findReqsTotal();

    console.log(this.usuario);
    console.log("rol: " + this.role);
  }

  /*getServicios(){
    this._service.getAllServicio().subscribe(data => {
      let arrayD:any = data;

      let sortedArray = arrayD.sort((obja,objb) => {
        if(obja.idCorrelativo > objb.idCorrelativo){
          return 1;
        }else{
          return -1;
        }
      });

      console.log(sortedArray);
      this.servicios = sortedArray;
    });
  }*/

  /*actualizarFechaInicio(fecha:string){
    let fecha2 =  new Date(fecha + ' 00:00:00');
    let dateF = this.datepipe.transform(fecha2, 'yyyy/MM/dd');
    this.busqueda.fechaInicio = dateF;
  }

  actualizarFechaFin(fecha:string){
    let fecha2 =  new Date(fecha + ' 00:00:00');
    let dateF = this.datepipe.transform(fecha2, 'yyyy/MM/dd');
    this.busqueda.fechaFin = dateF;
  }*/

  /*buscar(){
    console.log(this.busqueda);
    this.spinner.show();
    this._service.findReqs(this.busqueda).subscribe(data => {
      console.log(data);
      this.page = 1;
      this.requerimientos = data.list;
      this.totalRequerimientos = this.requerimientos.length;
      this.totalBusqueda = this.requerimientos.length;
      console.log(data.list);
      this.spinner.hide();
    });
  }*/

  limpiarFiltro(){
    this.busqueda.apellidoPaterno = "",
    this.busqueda.apellidoMaterno = "",
    this.busqueda.correo          = "",
    this.busqueda.dni             = "",
    this.busqueda.codCorporativo  = "",
    this.busqueda.perfil          = "",
    this.busqueda.codProyecto = "",
    this.busqueda.fechaIngresoInicio = "",
    this.busqueda.fechaIngresoFin = "",
    this.busqueda.estado = "",
    this.busqueda.imei = "",

    this.getListaPersonal();
  }

  getListaPersonal() {
    this.spinner.show();
    let arrayParametro: any[] = [
      {
        queryId: 6,
      },
    ];
    this._service.getListaMantenimientox(arrayParametro[0]).subscribe((data) => {
      //this.personal = data;
      const arrayData: any[] = Array.of(data);
      this.personal = [];
      for (let index = 0; index < arrayData[0].list.length; index++) {
        this.personal.push({
          id                  : arrayData[0].list[index].id,
          nombres             : arrayData[0].list[index].nombres,
          apellidos           : arrayData[0].list[index].apellidos,
          correo              : arrayData[0].list[index].correo,
          dni                 : arrayData[0].list[index].dni,
          codigo_corporativo  : arrayData[0].list[index].codigo_corporativo,
          perfil              : arrayData[0].list[index].perfil,
          codigo_proyecto     : arrayData[0].list[index].codigo_proyecto,
          proyecto_descripcion: arrayData[0].list[index].proyecto_descripcion,
          fecha_ingreso       : arrayData[0].list[index].fecha_ingreso,
          estado              : arrayData[0].list[index].estado,
        });
      }
      this.spinner.hide();
    });
    this.getCboProyectos();
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

  getInfoProyecto(id: number) {
    this.datosPersonal.codProyecto = id.toString();
    let arrayParametro: any[] = [
      {
        queryId: 2,
        mapValue: {
          param_id_proyecto: id,
        },
      },
    ];
    this._service.getInfoProyecto(arrayParametro[0]).subscribe((data) => {
      const arrayData: any[] = Array.of(data);
      for (let index = 0; index < arrayData.length; index++) {
        this.descProyecto = arrayData[0].list[index].descripcion;
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

  getInfoPerfil(id: number) {
    this.datosPersonal.codPerfil = id.toString();
    let arrayParametro: any[] = [
      {
        queryId: 11,
        mapValue: {
          param_id_perfil: id,
        },
      },
    ];
    this._service.getInfoPerfiles(arrayParametro[0]).subscribe((data) => {
      const arrayData: any[] = Array.of(data);
      for (let index = 0; index < arrayData.length; index++) {
        this.descPerfil = arrayData[0].list[index].descripcion;
      }
    });
  }

  limpiarFormAgregarPersonal() {
    this.descProyecto = "";
    this.descPerfil = "";
    this.datosPersonal.nombre = "";
    this.datosPersonal.apellidoPaterno = "";
    this.datosPersonal.apellidoMaterno = "";
    this.datosPersonal.correo = "";
    this.datosPersonal.dni = "";
    this.datosPersonal.codCorporativo = "";
    this.datosPersonal.codPerfil = "";
    this.datosPersonal.codProyecto = "";
    this.fechanac = "";
    this.fechain = "";
    this.btnGuardarPersonal.nativeElement.disabled = false;
    this.getCboProyectos();
    this.getCboPerfiles();
  }

  addPersonal() {
    this.spinner.show();
    this.btnGuardarPersonal.nativeElement.disabled = true;
    let personalCodPerfil: any;
    if (this.datosPersonal.codPerfil == "0") {
      personalCodPerfil = "";
    } else {
      personalCodPerfil = this.datosPersonal.codPerfil;
    }
    let personalCodProyecto: any;
    if (this.datosPersonal.codProyecto == "0") {
      personalCodProyecto = "";
    } else {
      personalCodProyecto = this.datosPersonal.codProyecto;
    }
    let nombre = this.datosPersonal.nombre;
    let apellidoPaterno = this.datosPersonal.apellidoPaterno;
    let apellidoMaterno = this.datosPersonal.apellidoMaterno;
    let correo = this.datosPersonal.correo;
    let dni = this.datosPersonal.dni;
    let codCorporativo = this.datosPersonal.codCorporativo;
    let codPerfil = personalCodPerfil;
    let codProyecto = personalCodProyecto;
    let fechaNacimiento = this.fechanac;
    let fechaIngreso = this.fechain;

    let arrayParametro: any[] = [
      {
        queryId: 7,
        mapValue: {
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
          CONFIG_USER_ID: this.usuario.user.userId,
          CONFIG_OUT_MSG_ERROR: "",
          CONFIG_OUT_MSG_EXITO: "",
        },
      },
    ];

    this._service.addPersonal(arrayParametro[0]).subscribe((data) => {
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
      this.getListaPersonal();
    });
    this.spinner.hide();
    //window.location.reload();
  }

  eliminarPersonal(id: number) {
    this.spinner.show();

    let arrayParametro: any[] = [
      {
        queryId: 9,
        mapValue: {
          param_id_persona: id,
        },
      },
    ];

    this._service.deletePersonal(arrayParametro[0]).subscribe((data) => {
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
      this.getListaPersonal();
    });
    this.spinner.hide();
    //window.location.reload();
  }

  abrirEliminar(id: number, codCorporrativo: string, estado: string) {
    this.idEliminar = id;
    this.codCorporativo = codCorporrativo;
    if (estado == "Activo") {
      this.tituloDeBaja = "Dar de Baja a un personal";
      this.tooltipDeBaja = "Dar Baja";
      this.informacionDeBaja = "¿Desea dar de baja al personal?";
    }
    if (estado == "Inactivo") {
      this.tituloDeBaja = "Dar de Alta a un personal";
      this.tooltipDeBaja = "Dar Alta";
      this.informacionDeBaja = "¿Desea activar al personal?";
    }
  }

  confirmarEliminar() {
    this.eliminarPersonal(this.idEliminar);
  }

  cancelarEliminar() {
    this.modalEliminar.nativeElement.click();
    this.idEliminar = "";
    this.codCorporativo = "";
  }

  eliminacionLogicaPersonal(id: number) {
    this.spinner.show();

    let arrayParametro: any[] = [
      {
        queryId: 37,
        mapValue: {
          param_id_persona: id,
        },
      },
    ];

    this._service.deletePersonal(arrayParametro[0]).subscribe((data) => {
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
      this.modalEliminacionLogica.nativeElement.click();
      this.getListaPersonal();
    });
    this.spinner.hide();
    //window.location.reload();
  }

  confirmarEliminacionLogica() {
    this.eliminacionLogicaPersonal(this.idEliminar);
  }

  cancelarEliminacionLogica() {
    this.modalEliminacionLogica.nativeElement.click();
    this.idEliminar = "";
    this.codCorporativo = "";
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

  getListaRecurso() {
    this.spinner.show();
    let arrayParametro: any[] = [
      {
        queryId: 15,
      },
    ];
    this._service.getListaMantenimiento(arrayParametro[0]).subscribe((data) => {
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
          persona_asignada: arrayData[0].list[index].persona_asignada,
          codigo_corporativo: arrayData[0].list[index].codigo_corporativo,
          proyecto: arrayData[0].list[index].proyecto,
          estado_recurso: arrayData[0].list[index].estado_recurso,
          observaciON: arrayData[0].list[index].observaciON,
        });
      }
      this.spinner.hide();
    });
  }

  getListaRecursoSinPersonal() {
    //Para listar los recursos que no tiene el personal
    this.spinner.show();
    let arrayParametro: any[] = [
      {
        queryId: 15,
      },
    ];
    this._service.getListaMantenimiento(arrayParametro[0]).subscribe((data) => {
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
          persona_asignada: arrayData[0].list[index].persona_asignada,
          codigo_corporativo: arrayData[0].list[index].codigo_corporativo,
          proyecto: arrayData[0].list[index].proyecto,
          estado_recurso: arrayData[0].list[index].estado_recurso,
          observaciON: arrayData[0].list[index].observaciON,
        });
      }
      this.spinner.hide();
    });
  }

  listarRecursos(id: number, codCorp: string) {
    this.idPersonal = id;
    this.codCorporativo = codCorp;
    this.recursoPersona = [];
    this.getListaRecurso();
  }

  agregarRecurso(idRecurso: number) {
    this.recursoPersona.push({
      idPersonal: this.idPersonal,
      CodCorporativo: this.codCorporativo,
      idRecurso: idRecurso,
    });
    console.log(this.recurso);
    this.recurso2 = [];
    for (let index = 0; index < this.recurso.length; index++) {
      if (idRecurso != this.recurso[index].id_recurso) {
        //delete this.recurso[index]
        this.recurso2.push({
          id_recurso: this.recurso[index].id_recurso,
          tipo: this.recurso[index].tipo,
          marca: this.recurso[index].marca,
          correo: this.recurso[index].correo,
          equipo: this.recurso[index].equipo,
          modelo: this.recurso[index].modelo,
          serie: this.recurso[index].serie,
          imei: this.recurso[index].imei,
          persona_asignada: this.recurso[index].persona_asignada,
          codigo_corporativo: this.recurso[index].codigo_corporativo,
          proyecto: this.recurso[index].proyecto,
          estado_recurso: this.recurso[index].estado_recurso,
          observaciON: this.recurso[index].observaciON,
        });
      }
    }
    this.recurso = this.recurso2;
  }

  quitarRecurso(idPersonal: number, idRecurso: number) {
    let arrayParametro: any[] = [
      {
        queryId: 15,
      },
    ];
    this._service.getListaMantenimiento(arrayParametro[0]).subscribe((data) => {
      //this.personal = data;
      const arrayData: any[] = Array.of(data);
      //this.recurso = [];
      for (let index = 0; index < arrayData[0].list.length; index++) {
        if (idRecurso == arrayData[0].list[index].id_recurso) {
          this.recurso.push({
            id_recurso: arrayData[0].list[index].id_recurso,
            tipo: arrayData[0].list[index].tipo,
            marca: arrayData[0].list[index].marca,
            correo: arrayData[0].list[index].correo,
            equipo: arrayData[0].list[index].equipo,
            modelo: arrayData[0].list[index].modelo,
            serie: arrayData[0].list[index].serie,
            imei: arrayData[0].list[index].imei,
            persona_asignada: arrayData[0].list[index].persona_asignada,
            codigo_corporativo: arrayData[0].list[index].codigo_corporativo,
            proyecto: arrayData[0].list[index].proyecto,
            estado_recurso: arrayData[0].list[index].estado_recurso,
            observaciON: arrayData[0].list[index].observaciON,
          });
        }
      }
    });

    this.recursoPersona2 = [];
    for (let index = 0; index < this.recursoPersona.length; index++) {
      if (
        idRecurso != this.recursoPersona[index].idRecurso &&
        idPersonal == this.recursoPersona[index].idPersonal
      ) {
        //delete this.recurso[index]
        this.recursoPersona2.push({
          idPersonal: this.recursoPersona[index].idPersonal,
          CodCorporativo: this.recursoPersona[index].CodCorporativo,
          idRecurso: this.recursoPersona[index].idRecurso,
        });
      }
    }
    this.recursoPersona = this.recursoPersona2;
  }

  verHardwarePerfil(idPersonal: number, codCorporativo: string) {
    this.codCorporativo = codCorporativo;
  }

  buscarPersona() {
    this.spinner.show();
    let codProyecto: any;
    if (this.busqueda.codProyecto == "0") {
      codProyecto = "";
    } else {
      codProyecto = this.busqueda.codProyecto;
    }
    let arrayParametro: any[] = [
      {
        queryId: 30,
        mapValue: {
          nombre: this.busqueda.nombre + " " + this.busqueda.apellidoPaterno,
          dni: this.busqueda.dni,
          codigo_proyecto: codProyecto,
          inicio: this.datepipe.transform(
            this.busqueda.fechaIngresoInicio,
            "yyyy/MM/dd"
          ),
          fin: this.datepipe.transform(
            this.busqueda.fechaIngresoFin,
            "yyyy/MM/dd"
          ),
        },
      },
    ];
    this._service.buscarPersona(arrayParametro[0]).subscribe((data) => {
      const arrayData: any[] = Array.of(data);
      this.personal = [];
      for (let index = 0; index < arrayData[0].list.length; index++) {
        this.personal.push({
          id: arrayData[0].list[index].id,
          nombres: arrayData[0].list[index].nombres,
          apellidos: arrayData[0].list[index].apellidos,
          correo: arrayData[0].list[index].correo,
          dni: arrayData[0].list[index].dni,
          codigo_corporativo: arrayData[0].list[index].codigo_corporativo,
          perfil: arrayData[0].list[index].perfil,
          codigo_proyecto: arrayData[0].list[index].codigo_proyecto,
          proyecto_descripcion: arrayData[0].list[index].proyecto_descripcion,
          fecha_ingreso: arrayData[0].list[index].fecha_ingreso,
          estado: arrayData[0].list[index].estado,
        });
      }
      this.spinner.hide();
    });
  }

  /*findReqsTotal(){
    this._service.findReqsTotal().subscribe(data => {
      this.totalRequerimientos = data.mapValue;
    });
  }*/

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
            this.personal.push({
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

  /*getAllReqs(){
    this._service.getAllReqs().subscribe(
      data => {
        this.excelRequerimientos = data;
      }
    );
  }*/

  /*exportExcel(){
    this.spinner.show();

    this._service.getAllReqs().subscribe(
      async data => {
        this.excelRequerimientos = data;
        await this.delay(1000);
        let json_data_string = JSON.stringify(this.excelRequerimientos);
        let json_data = JSON.parse(json_data_string);

        //excel export
        //create new excel work book
        let workbook = new Workbook();
        //add name to sheet
        let worksheet = workbook.addWorksheet("Solicitudes");
        //add column name
        let header = ["PET","Nombre PET","Código Único","Tipología","Subtipo","Descripción",
                      "Nombre del Solicitante","Correo del Solicitante", "Complejidad", "Servicio",
                      "Segmento", "Producto", "Estado", "Fecha de Creación", "Fecha de Inicio de Pruebas",
                      "Fecha de Fin de Pruebas", "Estimación(Jornadas)", "Cantidad de Casos de Pruebas"]
        let headerRow = worksheet.addRow(header);

        worksheet.getRow(1).alignment = {horizontal: 'center', wrapText: true}; //autoajuste de solo cabecera

        let headerColumn = 1;
        header.forEach(header => {
          headerRow.getCell(headerColumn).fill = {type: 'pattern', pattern: 'solid', fgColor: { argb: "FF74E3C8"}};
          headerRow.getCell(headerColumn).border = {top: {style:'thin'},
            left: {style:'thin'},
            bottom: {style:'thin'},
            right: {style:'thin'}
          }

          worksheet.getColumn(headerColumn).width = 30;
          worksheet.getColumn(headerColumn).alignment = {horizontal: 'center'};
          headerColumn = headerColumn + 1;
        });

        for (let x1 of json_data)
        {
          let x2=Object.keys(x1);
          let temp=[]
          for(let y of x2)
          {
            temp.push(x1[y])
          }
          worksheet.addRow(temp)

        }

        //current date
        let fileDateRaw:Date =  new Date();
        let fileDateFormated:String = this.datepipe.transform(fileDateRaw, 'ddMMyyyy');

        //add data and file name and download
        workbook.xlsx.writeBuffer().then((data) => {
          let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
          fs.saveAs(blob, "Listado de Requerimientos TDP"+'-'+fileDateFormated+'.xlsx');
        });

        this.spinner.hide();
      }
    );


  }*/

  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
