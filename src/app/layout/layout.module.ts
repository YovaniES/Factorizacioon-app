import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { LayoutRoutingModule } from "./layout-routing.module";
import { BaseComponent } from "./base/base.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { HeaderComponent } from "./header/header.component";
import { MaterialModule } from "../material/material.module";
import { FooterComponent } from "./footer/footer.component";

@NgModule({
  declarations: [
    BaseComponent,
    FooterComponent,
    HeaderComponent,
    SidebarComponent,


  ],
  exports:[
    BaseComponent,
    FooterComponent,
    HeaderComponent,
    SidebarComponent,

    MaterialModule
  ],
  imports: [CommonModule, LayoutRoutingModule],
})
export class LayoutModule {}
