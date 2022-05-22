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

  /*   get usuario() {
    return { ...this._usuario };
  }

  loginHISPAN(username: string, password: string) {
    const url =
      'https://aks-hispam-dev.eastus.cloudapp.azure.com/third/v1/api/login';
    const body = { username, password };

    return this.http.post<AuthResponse>(url, body).pipe(
      tap((resp) => {
        if (resp.logged) {
          localStorage.setItem('token', resp.token!);
          this._usuario = {
            username: resp.username!,
            password: resp.password!,
          };
        }
      }),
      map((valid) => valid.logged),
      catchError((err) => of(err.error.msg))
    );
  } */

  logout() {
    // this.router.navigateByUrl('public/qr');
    localStorage.clear();
  }

  /*   getUsername() {
    const decodedToken: any = this.decodeToken();
    return decodedToken ? decodedToken.displayname : '';
  } */

  /*   decodeToken() {
    const token = this.getToken();
    if (token) {
      return jwt_decode(token);
    } else {
      return null;
    }
  } */

  getToken() {
    return localStorage.getItem("token");
  }

  /*   isLoggedIn(): boolean {
    const token = this.getToken();
    let validSession = false;
    let decodedToken: any = null;

    try {
      if (token) {
        decodedToken = jwt_decode(token);
      }

      if (
        decodedToken &&
        decodedToken.exp &&
        decodedToken.exp > Date.now() / 1000
      ) {
        validSession = true;
      }
      return validSession;
    } catch (err) {
      return false;
    }
  } */

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
