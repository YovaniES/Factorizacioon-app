import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { first } from "rxjs/operators";
import { AuthenticationService } from "src/app/services/authentication.service";
import Swal from "sweetalert2/dist/sweetalert2.js";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = this.fb.group({
    username: ["jjsoto", [Validators.required]],
    password: ["jjsoto", [Validators.required, Validators.minLength(6)]],
  });
  constructor(
    private authentication: AuthenticationService,
    private router: Router,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {}

  onSubmit() {
    this.spinner.show();

    this.authentication
      .loginx(this.loginForm.value)
      .pipe(first())
      .subscribe(
        (resp) => {
          console.log("AUTH", resp);

          this.spinner.hide();
          Swal.fire(
            "Inicio de Sesión",
            "Bienvenid@ <br />" +
              `${resp.user.nombres} ${resp.user.apellidoPaterno}`,
            "success"
          );
          this.router.navigate([""]);
        },
        (error) => {
          console.log(error);
          this.spinner.hide();
          Swal.fire("Inicio de Sesión", "No se pudo iniciar Sesión", "error");
        }
      );
  }

  campoNoValido(campo: string): any {
    // if (this.loginForm.get(campo)?.invalid && this.loginForm.get(campo)?.touched) {
    //   return true;
    // } else {
    //   return false;
    // }
  }
}
