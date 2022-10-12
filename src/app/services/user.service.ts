import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8080';
  constructor(private httpClient: HttpClient) { }

  public registrarUsuario(user: any){
    return this.httpClient.post(this.baseUrl+'/usuarios/', user);
  }
}
