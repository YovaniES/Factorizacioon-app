import { BrowserModule } from "@angular/platform-browser";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AppreqdetailComponent } from "./modules/bandeja/appreqdetail/appreqdetail.component";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { AppreqbandejaComponent } from "./modules/bandeja/appreqbandeja/appreqbandeja.component";
import { DatePipe } from "@angular/common";
import { AppAddReqComponent } from "./modules/bandeja/app-add-req/app-add-req.component";
import { NgxSpinnerModule } from "ngx-spinner";
import { NgxPaginationModule } from "ngx-pagination";
import { OrderModule } from "ngx-order-pipe";

import { ServicesModule } from "./services/services.module";
import { DirectivesModule } from "./directives/directives.module";

import { LoginComponent } from "./login/login.component";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { NewPasswordComponent } from "./new-password/new-password.component";
import { DataTablesModule } from "angular-datatables";
import { StatusSolicitudComponent } from "./status-solicitud/status-solicitud.component";
import { PuntosFuncionMaintenanceComponent } from "./puntos-funcion-maintenance/puntos-funcion-maintenance.component";
import { StatusIncidenciasComponent } from "./modules/bandeja/status-incidencias/status-incidencias.component";
import { AppPersonalComponent } from "./modules/mantenimiento/app-personal/apppersonal.component";
import { AppRecursoComponent } from "./modules/mantenimiento/app-recurso/apprecurso.component";
import { ToastrModule } from "ngx-toastr";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ConfirmationPopoverModule } from "angular-confirmation-popover";
//import { ConfirmationModalModule } from 'ng-confirmation-modal';
import { ApprecursopersonalComponent } from "./modules/mantenimiento/apprecursopersonal/apprecursopersonal.component";
import { ApprecursohardwareComponent } from "./modules/mantenimiento/apprecursohardware/apprecursohardware.component";
import { ApprecursohardwaredetalleComponent } from "./modules/mantenimiento/apprecursohardwaredetalle/apprecursohardwaredetalle.component";
import { AppCuentaComponent } from "./modules/mantenimiento/app-cuenta/appcuenta.component";
import { ApprecursocuentadetalleComponent } from "./modules/mantenimiento/apprecursocuentadetalle/apprecursocuentadetalle.component";
import { ApprecursocuentaComponent } from "./modules/mantenimiento/apprecursocuenta/apprecursocuenta.component";
import { AppEntidadComponent } from "./modules/entidades/appentidad/appentidad.component";

import { AppFacturacionComponent } from "./modules/facturacion/appregistrobandeja/appregistrobandeja.component";
import { AddRegistroComponent } from "./modules/facturacion/add-registro-audio/add-registro-audio.component";
import { EditFacturacionComponent } from "./modules/facturacion/edit-registro-audio/edit-registro-audio.component";
import { AuthModule } from "./views/auth/auth.module";
import { LayoutModule } from "./layout/layout.module";
import { HomeModule } from "./views/pages/home/home.module";

@NgModule({
  declarations: [
    AppComponent,
    AppreqdetailComponent,
    AppreqbandejaComponent,
    AppAddReqComponent,
    LoginComponent,
    ForgotPasswordComponent,
    NewPasswordComponent,
    StatusSolicitudComponent,
    PuntosFuncionMaintenanceComponent,
    StatusIncidenciasComponent,
    AppPersonalComponent, //FRANCIA 02/06/2021
    AppRecursoComponent, //FRANCIA 02/06/2021
    ApprecursopersonalComponent, //FRANCIA 02/06/2021
    ApprecursohardwareComponent, //FRANCIA 02/06/2021
    ApprecursohardwaredetalleComponent, //FRANCIA 02/06/2021
    AppCuentaComponent, //FRANCIA 02/06/2021
    ApprecursocuentadetalleComponent, //FRANCIA 02/06/2021
    ApprecursocuentaComponent, //FRANCIA 02/06/2021
    AppEntidadComponent, //FRANCIA 02/06/2021,
    AppFacturacionComponent,
    AddRegistroComponent,
    EditFacturacionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxSpinnerModule,
    NgxPaginationModule,
    ServicesModule,
    DirectivesModule,
    OrderModule,
    ToastrModule.forRoot(), //FRANCIA
    DataTablesModule,
    BrowserAnimationsModule, //FRANCIA
    ConfirmationPopoverModule.forRoot({ confirmButtonType: "danger" }), //FRANCIA

    // AuthModule,
    LayoutModule,
    HomeModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
