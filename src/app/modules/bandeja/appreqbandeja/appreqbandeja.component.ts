import { Component, OnInit } from "@angular/core";
import { RequerimientoService } from "../../../services/requerimiento.service";
import { NgxSpinnerService } from "ngx-spinner";
import { DatePipe, formatDate } from "@angular/common";
import { Usuario } from "../../../models/usuario";
import { Role } from "../../../models/role";
import { Workbook } from "exceljs";
import * as fs from "file-saver";

@Component({
  selector: "app-appreqbandeja",
  templateUrl: "./appreqbandeja.component.html",
  styleUrls: ["./appreqbandeja.component.sass"],
})
export class AppreqbandejaComponent implements OnInit {
  /*busqueda*/
  servicios: any;
  estados: any;
  busqueda = {
    texto: "",
    servicio: "",
    estado: "",
    fechaInicio: "",
    fechaFin: "",
  };
  totalBusqueda: number = 0;

  /*pagination*/
  offset: any;
  requerimientos: Array<any> = [];
  totalRequerimientos: number = 0;
  page: number = 1;
  usuario: Usuario;
  role = Role;

  /*export excel*/
  excelRequerimientos: Array<any> = [{ codigoPET: "gola" }];

  constructor(
    private _service: RequerimientoService,
    private spinner: NgxSpinnerService,
    public datepipe: DatePipe
  ) {
    this.usuario = JSON.parse(localStorage.getItem("currentUser"));
  }

  ngOnInit() {
    this.spinner.hide();
    this.getServicios();
    this.getEstados();
    this.getReqList("0");
    this.findReqsTotal();

    console.log(this.usuario);
    console.log("rol: " + this.role);
  }

  getServicios() {
    this._service.getAllServicio().subscribe((data) => {
      let arrayD: any = data;

      let sortedArray = arrayD.sort((obja, objb) => {
        if (obja.idCorrelativo > objb.idCorrelativo) {
          return 1;
        } else {
          return -1;
        }
      });

      console.log(sortedArray);
      this.servicios = sortedArray;
    });
  }

  getEstados() {
    this._service.getEstados().subscribe((data) => {
      this.estados = data;
    });
  }

  actualizarFechaInicio(fecha: string) {
    let fecha2 = new Date(fecha + " 00:00:00");
    let dateF = this.datepipe.transform(fecha2, "yyyy/MM/dd");
    this.busqueda.fechaInicio = dateF;
  }

  actualizarFechaFin(fecha: string) {
    let fecha2 = new Date(fecha + " 00:00:00");
    let dateF = this.datepipe.transform(fecha2, "yyyy/MM/dd");
    this.busqueda.fechaFin = dateF;
  }

  buscar() {
    console.log(this.busqueda);
    this.spinner.show();
    this._service.findReqs(this.busqueda).subscribe((data) => {
      console.log(data);
      this.page = 1;
      this.requerimientos = data.list;
      this.totalRequerimientos = this.requerimientos.length;
      this.totalBusqueda = this.requerimientos.length;
      console.log(data.list);
      this.spinner.hide();
    });
  }

  getReqList(offset: string) {
    this.spinner.show();
    this._service.getListOfTen(offset).subscribe((data) => {
      this.requerimientos = data;
      this.spinner.hide();
    });
  }

  findReqsTotal() {
    this._service.findReqsTotal().subscribe((data) => {
      this.totalRequerimientos = data.mapValue;
    });
  }

  handlePageChange(event) {
    let offset = event * 10;
    this.spinner.show();

    if (this.totalBusqueda != this.totalRequerimientos) {
      this._service.getListOfTen(offset.toString()).subscribe((data) => {
        this.requerimientos = data;
        this.spinner.hide();
        console.log("totalrequerimientos: " + this.totalRequerimientos);
        console.log("totalBusqueda: " + this.totalBusqueda);
      });
    } else {
      this.spinner.hide();
    }
    this.page = event;
  }

  getAllReqs() {
    this._service.getAllReqs().subscribe((data) => {
      this.excelRequerimientos = data;
    });
  }

  exportExcel() {
    this.spinner.show();

    this._service.getAllReqs().subscribe(async (data) => {
      this.excelRequerimientos = data;
      await this.delay(1000);
      let json_data_string = JSON.stringify(this.excelRequerimientos);
      let json_data = JSON.parse(json_data_string);

      /* excel export */
      //create new excel work book
      let workbook = new Workbook();
      //add name to sheet
      let worksheet = workbook.addWorksheet("Solicitudes");
      //add column name
      let header = [
        "PET",
        "Nombre PET",
        "Código Único",
        "Tipología",
        "Subtipo",
        "Descripción",
        "Nombre del Solicitante",
        "Correo del Solicitante",
        "Complejidad",
        "Servicio",
        "Segmento",
        "Producto",
        "Estado",
        "Fecha de Creación",
        "Fecha de Inicio de Pruebas",
        "Fecha de Fin de Pruebas",
        "Estimación(Jornadas)",
        "Cantidad de Casos de Pruebas",
      ];
      let headerRow = worksheet.addRow(header);

      worksheet.getRow(1).alignment = { horizontal: "center", wrapText: true }; //autoajuste de solo cabecera

      let headerColumn = 1;
      header.forEach((header) => {
        headerRow.getCell(headerColumn).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "FF74E3C8" },
        };
        headerRow.getCell(headerColumn).border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };

        worksheet.getColumn(headerColumn).width = 30;
        worksheet.getColumn(headerColumn).alignment = { horizontal: "center" };
        headerColumn = headerColumn + 1;
      });

      for (let x1 of json_data) {
        let x2 = Object.keys(x1);
        let temp = [];
        for (let y of x2) {
          temp.push(x1[y]);
        }
        worksheet.addRow(temp);
      }

      //current date
      let fileDateRaw: Date = new Date();
      let fileDateFormated: String = this.datepipe.transform(
        fileDateRaw,
        "ddMMyyyy"
      );

      //add data and file name and download
      workbook.xlsx.writeBuffer().then((data) => {
        let blob = new Blob([data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        fs.saveAs(
          blob,
          "Listado de Requerimientos TDP" + "-" + fileDateFormated + ".xlsx"
        );
      });

      this.spinner.hide();
    });
  }

  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
