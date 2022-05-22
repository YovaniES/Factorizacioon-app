import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import Swal from 'sweetalert2';

import { first } from 'rxjs/operators';
import { NgxSpinnerService } from "ngx-spinner";
import { AuthService } from '../../auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  username:string;
  password:string;
  currentUser:any;


  public myLoginForm: FormGroup = this.fb.group({
    username: [localStorage.getItem('username') || 'incamelo', [Validators.required]],
    password: ['incamelo', [Validators.required, Validators.minLength(4)]],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,

    private spinner:NgxSpinnerService
  ) {}

  ngOnInit(): void {}

  /* login() {
    const { username, password } = this.myLoginForm.value;

    this.authService.login(username, password).subscribe((ok) => {
      console.log('VALOR :', ok);
      if (ok === true) {
        this.router.navigateByUrl('/home');
      } else {
        Swal.fire('Error', 'Credenciales Erroneas', 'error');
      }
    });
  } */

  onSubmit(){
    this.spinner.show();
    console.log('name ' +this.username);
    console.log('password ' + this.password);

    this.authService.login(this.username, this.password)
      .pipe(first())
      .subscribe(
        data => {
          this.spinner.hide();
          // Swal.fire('Inicio de Sesión', 'Bienvenid@ <br />' + this.authService.usuarioValue.user.nombres + ' ' + this.authService.usuarioValue.user.apellidoPaterno, 'success');
          this.router.navigate(['']);

        },
        error => {
          console.log(error);
          this.spinner.hide();
          // Swal.fire('Inicio de Sesión', 'No se pudo iniciar Sesión', 'error');
        }
      );
  }

  campoNoValido(campo: string): boolean {
    if (
      this.myLoginForm.get(campo).invalid &&
      this.myLoginForm.get(campo).touched
    ) {
      return true;
    } else {
      return false;
    }
  }
}
