import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../../services/authentication.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.sass"],
})
export class headerComponent implements OnInit {
  constructor(
    private authentication: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {}

  logout() {
    this.authentication.logout();
    this.router.navigate(["login"]);
  }
}
