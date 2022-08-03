import { Component, OnInit } from "@angular/core";
import { Role } from "../../models/role";
import { Router } from "@angular/router";
declare var $: any;

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.sass"],
})
export class SidebarComponent implements OnInit {
  currentUser: any;
  userFullName: String = "";
  userProfile: String = "";
  role = Role;

  constructor(private router: Router) {}

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
    console.log("currentuser: ");
    console.log('USER', this.currentUser);
    console.log('ID_usuario',this.currentUser.user.userId);

    // this.userFullName = this.currentUser.user.nombres + "<br /> " + this.currentUser.user.apellidoPaterno;
    this.userFullName = `${this.currentUser.user.nombres}  ${ this.currentUser.user.apellidoPaterno}`

      this.userProfile = this.currentUser.user.rolName;
    // this.router.navigate(['/']);
    // window.location.reload();
    // $('[data-widget="treeview"]').Treeview('init');
  }
}
