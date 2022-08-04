import { HttpClient } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { BehaviorSubject } from "rxjs";

import { Router } from "@angular/router";
import { environment } from "src/environments/environment";

export class Usuario {
  id: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  token: string;
  user: any;
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  toggleUserPanel$ = new EventEmitter<boolean>();

  private currentUserSubject: BehaviorSubject<Usuario>;

  // private _usuario!: Users;

  constructor(private http: HttpClient, private router: Router) {}

  logout() {
    // this.router.navigateByUrl('public/qr');
    localStorage.clear();
  }

  getToken() {
    return localStorage.getItem("token");
  }

  /* OJO SERVCIO DE AUTENTICACION */
  login(usuario: string, password: string) {
    const urlApiReq = environment.apiSeguridadUrl + "login";
    return this.http
      .post<any>(urlApiReq, {
        username: usuario,
        password: password,
      })
      .pipe(
        map((user) => {
          localStorage.removeItem("currentUser");
          localStorage.setItem("currentUser", JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        })
      );
  }

  public get usuarioValue(): Usuario {
    return this.currentUserSubject.value;
  }
}
