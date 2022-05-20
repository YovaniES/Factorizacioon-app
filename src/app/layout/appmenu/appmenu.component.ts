import { Component, OnInit } from "@angular/core";
import { Role } from "../../models/role";
import { Router, ActivatedRoute } from "@angular/router";
declare var $: any;

@Component({
  selector: "app-appmenu",
  templateUrl: "./appmenu.component.html",
  styleUrls: ["./appmenu.component.sass"],
})
export class AppmenuComponent implements OnInit {
  currentUser: any;
  userFullName: String = "NA";
  userProfile: String = "NA";
  role = Role;

  constructor(private router: Router) {}

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
    console.log("currentuser: ");
    console.log(this.currentUser);
    console.log(this.currentUser.user.userId);
    this.userFullName =
      this.currentUser.user.nombres +
      " " +
      this.currentUser.user.apellidoPaterno;
    this.userProfile = this.currentUser.user.rolName;
    // this.router.navigate(['/']);
    // window.location.reload();
    // $('[data-widget="treeview"]').Treeview('init');
  }
}
