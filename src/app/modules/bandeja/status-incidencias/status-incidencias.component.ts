import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IncidenciasService } from '../../../services/incidencias.service';

@Component({
  selector: 'app-status-incidencias',
  templateUrl: './status-incidencias.component.html',
  styleUrls: ['./status-incidencias.component.sass']
})
export class StatusIncidenciasComponent implements OnInit {

  idSolicitud:number;
  resultado:any;

  constructor(private _activatedRoute: ActivatedRoute, private _service: IncidenciasService) { }

  ngOnInit() {
    this._activatedRoute.paramMap.subscribe(params => {
      this.idSolicitud = parseInt(params.get('idSolicitud'));
      this._service.getIncidencias(this.idSolicitud.toString()).subscribe((result: any[]) => {
        
      })
    });
  }

}
