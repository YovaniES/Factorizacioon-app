import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppreqdetailComponent } from './modules/bandeja/appreqdetail/appreqdetail.component';
import { AppreqbandejaComponent } from './modules/bandeja/appreqbandeja/appreqbandeja.component';
import { AppAddReqComponent } from './modules/bandeja/app-add-req/app-add-req.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './helpers/auth.guard';
import { MainComponent } from './modules/main/main.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import { StatusSolicitudComponent } from './status-solicitud/status-solicitud.component';
import { PuntosFuncionMaintenanceComponent } from './puntos-funcion-maintenance/puntos-funcion-maintenance.component';
import { StatusIncidenciasComponent } from './modules/bandeja/status-incidencias/status-incidencias.component';
import { AppPersonalComponent } from './modules/mantenimiento/app-personal/apppersonal.component';
import { AppRecursoComponent } from './modules/mantenimiento/app-recurso/apprecurso.component';
import { ApprecursopersonalComponent } from './modules/mantenimiento/apprecursopersonal/apprecursopersonal.component';
import { ApprecursohardwareComponent } from './modules/mantenimiento/apprecursohardware/apprecursohardware.component';
import { ApprecursohardwaredetalleComponent } from './modules/mantenimiento/apprecursohardwaredetalle/apprecursohardwaredetalle.component';
import { AppCuentaComponent } from './modules/mantenimiento/app-cuenta/appcuenta.component';
import { ApprecursocuentadetalleComponent } from './modules/mantenimiento/apprecursocuentadetalle/apprecursocuentadetalle.component';
import { ApprecursocuentaComponent } from './modules/mantenimiento/apprecursocuenta/apprecursocuenta.component';
import { AppEntidadComponent } from './modules/entidades/appentidad/appentidad.component';
import { AppFacturacionComponent } from './modules/facturacion/appregistrobandeja/appregistrobandeja.component';
import { AddRegistroComponent } from './modules/facturacion/add-registro-audio/add-registro-audio.component';
import { EditFacturacionComponent } from './modules/facturacion/edit-registro-audio/edit-registro-audio.component';

const routes: Routes = [
  { path: '', component: MainComponent, canActivate: [AuthGuard],
      children: [
        { path: 'detalle/:id', component: AppreqdetailComponent, canActivate: [AuthGuard] },
        { path: 'bandejaRequerimientos', component: AppreqbandejaComponent, canActivate: [AuthGuard] },
        { path: 'agregarRequerimiento', component: AppAddReqComponent, canActivate: [AuthGuard] },
        { path: 'statusSolicitud/:id', component: StatusSolicitudComponent },
        { path: 'puntosFuncion/:idSolicitud', component: PuntosFuncionMaintenanceComponent, canActivate: [AuthGuard] },
        { path: 'incidencias/:idSolicitud', component:StatusIncidenciasComponent, canActivate: [AuthGuard]},
        { path: 'mantenimientoPersonal', component: AppPersonalComponent, canActivate: [AuthGuard] },//FRANCIA 02/06/2021
        { path: 'mantenimientoRecurso', component: AppRecursoComponent, canActivate: [AuthGuard] },//FRANCIA 02/06/2021
        { path: 'asignarRecurso/:idPersonal', component: ApprecursopersonalComponent, canActivate: [AuthGuard] },//FRANCIA 02/06/2021
        { path: 'recursoHardware/:idHardware', component: ApprecursohardwareComponent, canActivate: [AuthGuard] },//FRANCIA 02/06/2021
        { path: 'recursoHardwareDetalle', component: ApprecursohardwaredetalleComponent, canActivate: [AuthGuard] },//FRANCIA 02/06/2021
        { path: 'mantenimientoCuenta', component: AppCuentaComponent, canActivate: [AuthGuard] },//FRANCIA 02/06/2021
        { path: 'recursoCuentaDetalle', component: ApprecursocuentadetalleComponent, canActivate: [AuthGuard] },//FRANCIA 02/06/2021
        { path: 'recursoCuenta/:idCuenta', component: ApprecursocuentaComponent, canActivate: [AuthGuard] },//FRANCIA 02/06/2021
        { path: 'entidad', component: AppEntidadComponent, canActivate: [AuthGuard] },//FRANCIA 02/06/2021
        { path: 'mantenimientofacturacion', component: AppFacturacionComponent, canActivate: [AuthGuard] },
        { path: 'agregarRegistro', component: AddRegistroComponent, canActivate: [AuthGuard]  },
        { path: 'editarRegistro/:id', component: EditFacturacionComponent, canActivate: [AuthGuard]  },
      ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'forgotPassword', component: ForgotPasswordComponent },
  { path: 'newPassword/:uid', component: NewPasswordComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
