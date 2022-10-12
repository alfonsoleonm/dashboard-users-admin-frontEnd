import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private baseUrl = 'http://localhost:8080';
  public loginStatusSubject = new Subject<boolean>();

  constructor(private httpClient: HttpClient) { }

  //generamos el token
  public generateToken(loginData: any) {
    return this.httpClient.post(this.baseUrl + "/generate-token", loginData);
  }

  //iniciamos sesion y establecemos el token en el localstorage
  public loginUser(token: any) {
    localStorage.setItem('token', token);
  }

  public isLoggedIn() {
    let tokenStr = localStorage.getItem('token');
    if (tokenStr == undefined || tokenStr == '' || tokenStr == null) {
      return false;
    } else {
      return true;
    }
  }

  //cerramos sesion y eliminamos el token del localStorage
  public logoutUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  //obtenemos el token
  public getToken() {
    return localStorage.getItem('token');
  }

  //establecer un usuario, el de logout()
  public setUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getUser() {
    let userStr = localStorage.getItem('user');
    if (userStr != null) {
      return JSON.parse(userStr);
    } else {
      this.logoutUser();
      return null;
    }
  }

  public getUserRoles() {
    let user = this.getUser();
    return user.authorities[0].authority;
  }

  public getCurrentUser() {
    return this.httpClient.get(this.baseUrl + "/actual-usuario");
  }
}
