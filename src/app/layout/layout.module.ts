import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { LayoutRoutingModule } from "./layout-routing.module";
import { BaseComponent } from "./base/base.component";
import { AppfooterComponent } from "./appfooter/appfooter.component";
import { sidebarComponent } from "./sidebar/sidebar.component";
import { headerComponent } from "./header/header.component";

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
  ],
  imports: [CommonModule, LayoutRoutingModule],
})
export class LayoutModule {}
