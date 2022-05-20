import { Component, OnInit } from "@angular/core";
import { PuntoFuncion } from "./../models/puntoFuncion";
import Swal from "../../../node_modules/sweetalert2/dist/sweetalert2.js";
import { NgxSpinnerService } from "ngx-spinner";
import { PuntoFuncionService } from "./../services/punto-funcion.service";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";

@Component({
  selector: "app-puntos-funcion-maintenance",
  templateUrl: "./puntos-funcion-maintenance.component.html",
  styleUrls: ["./puntos-funcion-maintenance.component.sass"],
})
export class PuntosFuncionMaintenanceComponent implements OnInit {
  puntoFuncion: PuntoFuncion = {
    id: null,
    numero: null,
    nombre: null,
  };
  idSolicitud: number;
  codigoSolicitud: string;
  ListaSolicitudes: any;
  ListaPF: Array<PuntoFuncion>;

  isActualizar: boolean = false;

  constructor(
    private _spinner: NgxSpinnerService,
    private _pfService: PuntoFuncionService,
    private _Activatedroute: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit() {
    this._Activatedroute.paramMap.subscribe((params) => {
      this.idSolicitud = parseInt(params.get("idSolicitud"));
      this.cargarPF();
    });
    this._pfService.getAllIdSolicitudes().subscribe((data) => {
      this._spinner.hide();
      this.ListaSolicitudes = data;
      console.log(this.ListaSolicitudes);
    });
  }

  cargarPF() {
    this._spinner.show();
    this._pfService
      .getPuntosFuncionByIdSolicitud(this.idSolicitud)
      .subscribe((data) => {
        this._spinner.hide();
        console.log(data);
        this.ListaPF = data;
      });
  }

  agregarPuntoFuncion() {
    this._spinner.show();
    console.log(this.puntoFuncion);
    this._pfService
      .addPuntoFuncion(
        this.idSolicitud,
        this.puntoFuncion.numero,
        this.puntoFuncion.nombre
      )
      .subscribe((data) => {
        console.log(data);
        this._pfService
          .getPuntosFuncionByIdSolicitud(this.idSolicitud)
          .subscribe((data2) => {
            this._spinner.hide();
            this.ListaPF = data2;
            this.puntoFuncion = {
              id: null,
              numero: null,
              nombre: null,
            };
          });
      });
  }

  editarPuntoFuncion(idPuntoFuncion: number) {
    this.isActualizar = true;
    console.log(idPuntoFuncion);
    this._spinner.show();
    this._pfService.getPuntoFuncionById(idPuntoFuncion).subscribe((data) => {
      this._spinner.hide();
      this.puntoFuncion.id = data[0].id;
      this.puntoFuncion.numero = data[0].idPf;
      this.puntoFuncion.nombre = data[0].nombre;
    });
  }

  actualizarPuntoFuncion() {
    this._spinner.show();
    this._pfService
      .addPuntoFuncion(
        this.idSolicitud,
        this.puntoFuncion.numero,
        this.puntoFuncion.nombre
      )
      .subscribe((data) => {
        console.log(data);
        this._pfService
          .getPuntosFuncionByIdSolicitud(this.idSolicitud)
          .subscribe((data2) => {
            this._spinner.hide();
            this.puntoFuncion = {
              id: null,
              numero: null,
              nombre: null,
            };
            this.ListaPF = data2;
            this.isActualizar = false;
          });
      });
  }

  eliminarPuntoFuncion(idPuntoFuncion: number) {
    Swal.fire({
      title: "Confirme eliminación",
      text: "Seguro que desea eliminar este Punto Función",
      type: "warning",
      showCancelButton: true,
      cancelButtonText: "No",
      confirmButtonText: "Si",
    }).then((result) => {
      if (result.value) {
        this._spinner.show();
        this._pfService
          .deletePuntoFuncionById(idPuntoFuncion)
          .subscribe((data) => {
            console.log(data);
            this._pfService
              .getPuntosFuncionByIdSolicitud(this.idSolicitud)
              .subscribe((data2) => {
                this._spinner.hide();
                this.ListaPF = data2;
              });
          });
      }
    });
  }

  regresarBandeja() {
    this._router.navigate(["bandejaRequerimientos"]);
  }
}
