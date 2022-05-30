import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  cadastro(body) {
    return this.http.post(environment.urlApi + '/usuario', body);
  }

  login(body) {
    return this.http.post(environment.urlApi + '/usuario/login', body);
  }

}
