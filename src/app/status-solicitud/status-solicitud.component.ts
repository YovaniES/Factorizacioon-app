import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { StatusRequerimientoService } from '../services/status-requerimiento.service';

@Component({
  selector: 'app-status-solicitud',
  templateUrl: './status-solicitud.component.html',
  styleUrls: ['./status-solicitud.component.sass']
})
export class StatusSolicitudComponent implements OnInit {

  public resultado: object;
  public idProyecto: object;
  public cantidad: number;
  public avance: number;
  public nombre: string;
  public passrate: number = 0;
  public pendiente: number;
  public corregido: number;
  public desestimado: number;
  public cancelado: number;
  public error: number;
  public bloqueado: number;
  public hllcnt: number = 0;
  public hallazgo: object;
  public caspru: object;
  public casprux: object;
  closeResult: string;

  constructor(private _Activatedroute: ActivatedRoute, private http: HttpClient, 
      private _spinner: NgxSpinnerService, private _router: Router, private _service: StatusRequerimientoService) { }

  ngOnInit() {
    this._spinner.show();
    this._Activatedroute.paramMap.subscribe(params => {
      let param1:string = params.get('id');

      this._service.getReqData(param1).subscribe((result: any[]) => {
        this.resultado = result;
        console.log(result);
          let counters = result.reduce((p, n) => {
              if (p[n.llave]) { p[n.llave] += n.Q; }
              else { p[n.llave] = n.Q; }
              return p;
          }, []);

        this.nombre = result[0].codigo_pet;
        this.idProyecto = result[0].pr_id;
        this.cantidad = result.reduce((acc, val) => acc += val.Q, 0);
        this.desestimado = result.reduce((acc, val) => acc += val.Desestimado, 0);
        this.cantidad = this.cantidad - this.desestimado;
        this.pendiente = result.reduce((acc, val) => acc += val.Pendiente, 0);
        this.error = result.reduce((acc, val) => acc += val.Errores, 0);
        this.bloqueado = result.reduce((acc, val) => acc += val.Bloqueado, 0);
        this.avance = 100 * (this.cantidad - this.pendiente  - this.bloqueado) / this.cantidad;
        if((100 * (this.cantidad - this.pendiente - this.bloqueado - this.error) / (this.cantidad - this.pendiente  - this.bloqueado)) > 0){
          this.passrate = 100 * (this.cantidad - this.pendiente - this.bloqueado - this.error) / (this.cantidad - this.pendiente  - this.bloqueado);
        }else{
          this.passrate = 0;
        }

        console.log("avance: " + this.avance);

        /*DETALLE*/
        this._service.getCasosPruebaData(String(this.idProyecto)).subscribe((result: any[]) => {
          this._spinner.hide();
          this.caspru = result;

          var groups = result.reduce(function (obj, item) {
            obj[item.pf] = obj[item.pf] || [];
            obj[item.pf].push(item);
            return obj;
          }, {});
          var myArray = Object.keys(groups).map(function (key) {
            return { torneo: key, requerimientos: groups[key] };
          });
          this.casprux = myArray;
          console.log(this.casprux);
        }, error => console.error(error));


        /*GET HALLAZGOS*/
        this._service.getHallazgoData(String(this.idProyecto)).subscribe((result: any[]) => {
  
          this.hallazgo = result;
          this.hllcnt = result.length;
          if( result.length > 0){
            this.hllcnt = result.length;
          }else{
            this.hllcnt = 0;
          }
          var difficult_tasks = result.filter((result) => result.estado == "Cerrada");
          if( difficult_tasks.length > 0){
            this.corregido = difficult_tasks.length;
          }else{
            this.corregido = 0;
          }

          var difficult_tasks2 = result.filter((result) => result.estado == "Cancelado");
          if( difficult_tasks2.length > 0){
            this.cancelado = difficult_tasks2.length;
          }else{
            this.cancelado = 0;
          }

          
          console.log(difficult_tasks);

        }, error => console.error(error));

      }, error => console.error(error));
    });

    
  }

  regresarBandeja(){
    this._router.navigate(['bandejaRequerimientos']);
  }


}
