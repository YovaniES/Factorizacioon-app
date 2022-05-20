import { Component, OnInit } from "@angular/core";
import Swal from "../../../node_modules/sweetalert2/dist/sweetalert2.js";
import { ChangePasswordService } from "../services/change-password.service";
import { EmailService } from "../services/email.service";
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from "@angular/router";

@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.component.html",
  styleUrls: ["./forgot-password.component.sass"],
})
export class ForgotPasswordComponent implements OnInit {
  email: string = "";

  constructor(
    private _resetPassword: ChangePasswordService,
    private _mail: EmailService,
    private spinner: NgxSpinnerService,
    private _router: Router
  ) {}

  ngOnInit() {}

  sendResetMail() {
    this.spinner.show();
    this._resetPassword.getUsuarioIdByemail(this.email).subscribe((data) => {
      console.log(data);
      let emaildata: any = data;
      if (emaildata == "undefined" || emaildata.length == 0) {
        this.spinner.hide();
        Swal.fire({
          title: "Error!",
          text: "Correo no registrado",
          icon: "error",
          confirmButtonText: "Ok",
        });
      } else {
        if (data[0].hasOwnProperty("userId")) {
          let usuarioData: any = data;

          this._resetPassword.getEmailToken(this.email).subscribe((data) => {
            if (data.hasOwnProperty("token")) {
              let result: any = data;
              console.log(result);
              this._resetPassword
                .saveResetLink(result.token, usuarioData[0].userId)
                .subscribe((data) => {
                  this._mail.getEmailDataById("3").subscribe((data) => {
                    console.log(data);
                    if (data.hasOwnProperty("errorMessage")) {
                      let message = "Hubo un error al enviar correo";
                      Swal.fire({
                        title: "Error!",
                        text: message,
                        icon: "error",
                        confirmButtonText: "Ok",
                      });
                    } else {
                      let dataEmail: any = data;

                      let mailBody: string = this.replaceEmailValues(
                        dataEmail[0].body,
                        "@{Link}",
                        "http://dynamob2b.indratools.net/newPassword/" +
                          result.token
                      );

                      let toMail: string = this.replaceEmailValues(
                        dataEmail[0].toEmail,
                        "@{CorreoIngresado}",
                        this.email
                      );

                      this._mail
                        .sendEmail(dataEmail[0].subject, mailBody, toMail)
                        .subscribe((data) => {
                          this.spinner.hide();
                          let rest2: any = data;
                          if (rest2.status == "error") {
                            console.log("error en envio de correo");
                            console.log(rest2);
                          } else {
                            console.log(rest2);
                            let message = "<li> Envio de correo exitoso </li>";

                            Swal.fire({
                              title: "Exito!",
                              html: message,
                              icon: "success",
                              confirmButtonText: "Ok",
                            }).then((result) => {
                              if (result.value) {
                                this._router.navigate(["login"]);
                              }
                            });
                          }
                        });
                    }
                  });
                });
            }
          });
        } else {
          Swal.fire({
            title: "Error!",
            text: "No se ha encontrado correo",
            icon: "error",
            confirmButtonText: "Ok",
          });
        }
      }
    });
  }

  replaceEmailValues(rawMail: string, a: string, b: string) {
    const str = rawMail;
    const removeStr = a; //variable
    const regex = new RegExp(removeStr, "g"); // correct way
    const newstr = str.replace(regex, b); // it works
    console.log(newstr);
    return newstr;
  }
}
