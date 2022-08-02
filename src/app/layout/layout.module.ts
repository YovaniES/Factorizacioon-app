import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { LayoutRoutingModule } from "./layout-routing.module";
import { BaseComponent } from "./base/base.component";
import { AppfooterComponent } from "./appfooter/appfooter.component";
import { sidebarComponent } from "./sidebar/sidebar.component";
import { headerComponent } from "./header/header.component";
import { MaterialModule } from "../material/material.module";

@NgModule({
  declarations: [
    BaseComponent,
    AppfooterComponent,
    headerComponent,
    sidebarComponent,


  ],
  exports:[
    BaseComponent,
    AppfooterComponent,
    headerComponent,
    sidebarComponent,

    MaterialModule
  ],
  imports: [CommonModule, LayoutRoutingModule],
})
export class LayoutModule {}
