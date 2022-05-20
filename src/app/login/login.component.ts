import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import {Router, RouterStateSnapshot} from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { first } from 'rxjs/operators';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass', './loginStyle.css']
})
export class LoginComponent implements OnInit {

  username:string;
  password:string;
  currentUser:any;

  constructor(private authentication: AuthenticationService, private router: Router,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    
  }

  onSubmit(){
    this.spinner.show();
    console.log('name ' +this.username);
    console.log('password ' + this.password);
    this.authentication.login(this.username, this.password)
      .pipe(first())
      .subscribe(
        data => {
          this.spinner.hide();
          Swal.fire('Inicio de Sesión', 'Bienvenid@ <br />' + this.authentication.usuarioValue.user.nombres + ' ' + this.authentication.usuarioValue.user.apellidoPaterno, 'success');
          this.router.navigate(['']);
          
        },
        error => {
          console.log(error);
          this.spinner.hide();
          Swal.fire('Inicio de Sesión', 'No se pudo iniciar Sesión', 'error');
        }
      );
  }
}
