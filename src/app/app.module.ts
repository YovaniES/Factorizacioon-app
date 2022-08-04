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

import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { NewPasswordComponent } from "./new-password/new-password.component";
import { DataTablesModule } from "angular-datatables";
import { StatusSolicitudComponent } from "./status-solicitud/status-solicitud.component";
import { PuntosFuncionMaintenanceComponent } from "./puntos-funcion-maintenance/puntos-funcion-maintenance.component";
import { StatusIncidenciasComponent } from "./modules/bandeja/status-incidencias/status-incidencias.component";
import { RecursoComponent } from "./modules/mantenimiento/recurso/recurso.component";
import { ToastrModule } from "ngx-toastr";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ConfirmationPopoverModule } from "angular-confirmation-popover";
import { RecursopersonalComponent } from "./modules/mantenimiento/recursopersonal/recursopersonal.component";
import { RecursohardwareComponent } from "./modules/mantenimiento/recursohardware/recursohardware.component";
import { RecursohardwaredetalleComponent } from "./modules/mantenimiento/recursohardwaredetalle/recursohardwaredetalle.component";
import { CuentaComponent } from "./modules/mantenimiento/cuenta/cuenta.component";
import { RecursocuentadetalleComponent } from "./modules/mantenimiento/recursocuentadetalle/recursocuentadetalle.component";
import { RecursocuentaComponent } from "./modules/mantenimiento/recursocuenta/recursocuenta.component";

import { AppFacturacionComponent } from "./modules/facturacion/appregistrobandeja/appregistrobandeja.component";
import { AddRegistroComponent } from "./modules/facturacion/add-registro-audio/add-registro-audio.component";
import { EditFacturacionComponent } from "./modules/facturacion/edit-registro-audio/edit-registro-audio.component";
import { LayoutModule } from "./layout/layout.module";
import { HomeModule } from "./views/pages/home/home.module";
import { PersonalComponent } from "./modules/mantenimiento/personal/personal.component";
import { EntidadComponent } from "./modules/entidad/entidad.component";

@NgModule({
  declarations: [
    AppComponent,
    AppreqdetailComponent,
    AppreqbandejaComponent,
    AppAddReqComponent,
    ForgotPasswordComponent,
    NewPasswordComponent,
    StatusSolicitudComponent,
    PuntosFuncionMaintenanceComponent,
    StatusIncidenciasComponent,
    PersonalComponent,
    RecursoComponent,
    RecursopersonalComponent,
    RecursohardwareComponent,
    RecursohardwaredetalleComponent,
    CuentaComponent,
    RecursocuentadetalleComponent,
    RecursocuentaComponent,
    EntidadComponent,
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
    ToastrModule.forRoot(),
    DataTablesModule,
    BrowserAnimationsModule,
    ConfirmationPopoverModule.forRoot({ confirmButtonType: "danger" }),

    // AuthModule,
    LayoutModule,
    HomeModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
