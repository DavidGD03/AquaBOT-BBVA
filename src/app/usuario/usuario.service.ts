import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from './usuario';

@Injectable({
    providedIn: 'root'
})
export class UsuarioService {

    private backUrl: string = "https://jftppm4fz2.us-east-1.awsapprunner.com/"

    constructor(private http: HttpClient) { }

    userLogIn(usuario: string, contrasena: string): Observable<any> {
        return this.http.post<any>(`${this.backUrl}/login`, { "usuario": usuario, "contrasena": contrasena});
    }

    aceptarOferta(): Observable<any> {
      return this.http.post<any>(`${this.backUrl}/login`, { "usuario": "xd", "contrasena": "xd123"});
  }

    userSignUp(usuario: string, contrasena: string, admin: boolean): Observable<any> {
        console.log(admin)
        return this.http.post<any>(`${this.backUrl}/obtener`, { "usuario": usuario, "contrasena": contrasena, "admin": admin})
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
