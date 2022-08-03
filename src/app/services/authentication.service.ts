import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { map, tap } from "rxjs/operators";
import { BehaviorSubject, Observable } from "rxjs";
import { Usuario } from "../models/usuario";
import { Role } from "../models/role";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<Usuario>;
  public currentUser: Observable<Usuario>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<Usuario>(
      JSON.parse(localStorage.getItem("currentUser"))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get usuarioValue(): Usuario {
    return this.currentUserSubject.value;
  }

  // login(loginData: any) {
  //   const urlApiReq = environment.apiSeguridadUrl + "login";
  //   return this.http.post<any>(urlApiReq, {loginData })
  //     .pipe(
  //       map((user) => {
  //         localStorage.removeItem("currentUser");
  //         localStorage.setItem("currentUser", JSON.stringify(user));
  //         this.currentUserSubject.next(user);
  //         return user;
  //       })
  //     );
  // }


  login(loginData: Usuario) {
    const urlApiReq = environment.apiSeguridadUrl + "login";

    return this.http.post<any>(urlApiReq, loginData).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.user.token);
        localStorage.setItem('currentUser', JSON.stringify(resp));
      })
    );
  }


  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem("currentUser");
  }

  hasRole(role: Role) {
    let usuario = this.usuarioValue;
    if (usuario.user.rolId == role) {
      return true;
    } else {
      return false;
    }
  }
}
