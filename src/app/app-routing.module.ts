import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AppreqdetailComponent } from "./modules/bandeja/appreqdetail/appreqdetail.component";
import { AppreqbandejaComponent } from "./modules/bandeja/appreqbandeja/appreqbandeja.component";
import { AppAddReqComponent } from "./modules/bandeja/app-add-req/app-add-req.component";
import { AuthGuard } from "./helpers/auth.guard";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { NewPasswordComponent } from "./new-password/new-password.component";
import { StatusSolicitudComponent } from "./status-solicitud/status-solicitud.component";
import { PuntosFuncionMaintenanceComponent } from "./puntos-funcion-maintenance/puntos-funcion-maintenance.component";
import { StatusIncidenciasComponent } from "./modules/bandeja/status-incidencias/status-incidencias.component";
import { PersonalComponent } from "./modules/mantenimiento/personal/personal.component";
import { RecursoComponent } from "./modules/mantenimiento/recurso/recurso.component";
import { RecursopersonalComponent } from "./modules/mantenimiento/recursopersonal/recursopersonal.component";
import { RecursohardwareComponent } from "./modules/mantenimiento/recursohardware/recursohardware.component";
import { RecursohardwaredetalleComponent } from "./modules/mantenimiento/recursohardwaredetalle/recursohardwaredetalle.component";
import { CuentaComponent } from "./modules/mantenimiento/cuenta/cuenta.component";
import { RecursocuentadetalleComponent } from "./modules/mantenimiento/recursocuentadetalle/recursocuentadetalle.component";
import { RecursocuentaComponent } from "./modules/mantenimiento/recursocuenta/recursocuenta.component";
// import { EntidadComponent } from "./modules/entidad/appentidad/entidad.component";
import { AppFacturacionComponent } from "./modules/facturacion/appregistrobandeja/appregistrobandeja.component";
import { AddRegistroComponent } from "./modules/facturacion/add-registro-audio/add-registro-audio.component";
import { EditFacturacionComponent } from "./modules/facturacion/edit-registro-audio/edit-registro-audio.component";
import { BaseComponent } from "./layout/base/base.component";
import { EntidadComponent } from "./modules/entidad/entidad.component";

const routes: Routes = [
  {
    path: "login",
    loadChildren: () =>
      import("./views/auth/auth.module").then((m) => m.AuthModule),
  },
  {
    path: "",
    component: BaseComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path:'home',
        loadChildren:()=>import('./views/pages/home/home.module').then(m=>m.HomeModule),
      },
      {
        path: "detalle/:id",
        component: AppreqdetailComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "bandejaRequerimientos",
        component: AppreqbandejaComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "agregarRequerimiento",
        component: AppAddReqComponent,
        canActivate: [AuthGuard],
      },
      { path: "statusSolicitud/:id", component: StatusSolicitudComponent },
      {
        path: "puntosFuncion/:idSolicitud",
        component: PuntosFuncionMaintenanceComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "incidencias/:idSolicitud",
        component: StatusIncidenciasComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "mantenimientoPersonal",
        component: PersonalComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "mantenimientoRecurso",
        component: RecursoComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "asignarRecurso/:idPersonal",
        component: RecursopersonalComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "recursoHardware/:idHardware",
        component: RecursohardwareComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "recursoHardwareDetalle",
        component: RecursohardwaredetalleComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "mantenimientoCuenta",
        component: CuentaComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "recursoCuentaDetalle",
        component: RecursocuentadetalleComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "recursoCuenta/:idCuenta",
        component: RecursocuentaComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "entidad",
        component: EntidadComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "mantenimientofacturacion",
        component: AppFacturacionComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "agregarRegistro",
        component: AddRegistroComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "editarRegistro/:id",
        component: EditFacturacionComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: '**', pathMatch: 'full', redirectTo: '/home' },
  { path: "forgotPassword", component: ForgotPasswordComponent },
  { path: "newPassword/:uid", component: NewPasswordComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
