import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from './usuario';

@Injectable({
    providedIn: 'root'
})
export class UsuarioService {

    private backUrl: string = "https://jftppm4fz2.us-east-1.awsapprunner.com/";

    constructor(private http: HttpClient) { }

    userLogIn(usuario: string, contrasena: string): Observable<any> {
        return this.http.post<any>(`${this.backUrl}/login`, { "usuario": usuario, "contrasena": contrasena});
    }

    aceptarOferta(celular: string): Observable<any> {
      console.log(this.backUrl);
      console.log("celular: " + celular);
      return this.http.post<any>(`${this.backUrl}/login`, { "celular": celular });
  }

    aceptarPermisos(): Observable<any> {
    console.log("xd");
    return this.http.get<any>(`${this.backUrl}/signin`);
    }


    userSignUp(nombre: string, apellidos: string, sexo: string, email: string, nacimiento: string, cedula: string, celular: string, expedicion: string): Observable<any> {
      console.log(this.backUrl);
      console.log("xd");
      return this.http.post<any>(`${this.backUrl}/signin`, { "email": email, "nombre": nombre, "apellidos": apellidos, "sexo": sexo, "nacimiento": nacimiento, "expedicion": expedicion, "celular": celular, "cedula": cedula });
    }

    getUsuario(token: string, usuarioId: number): Observable<any> {
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
          })
        return this.http.get<any>(`${this.backUrl}/usuario/${usuarioId}`, { headers: headers });
    }

    setDinero(token: string, usuarioId: number, usuario: Usuario): Observable<any> {
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
          })
        return this.http.put<any>(`${this.backUrl}/usuario/${usuarioId}/dinero`, usuario, { headers: headers });
    }
}
