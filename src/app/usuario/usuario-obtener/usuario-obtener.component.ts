import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt";
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from '../usuario.service';


@Component({
  selector: 'app-usuario-obtener',
  templateUrl: './usuario-obtener.component.html',
  styleUrls: ['./usuario-obtener.component.css']
})
export class UsuarioLoginComponent implements OnInit {

  helper = new JwtHelperService();
  usuarioForm: FormGroup;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) { }

  error: boolean = false

  ngOnInit() {
    this.usuarioForm = this.formBuilder.group({
      firma: [false, [Validators.required]],
    })
  }

  onLogInUsuario(usuario: string, contrasena: string) {
    this.error = false

    this.usuarioService.userLogIn(usuario, contrasena)
      .subscribe(res => {
        const decodedToken = this.helper.decodeToken(res.token);
        this.router.navigate([`/eventos/${decodedToken.sub}/${res.token}`])
      },
        () => {
          this.error = true
        })
  }

  obtenerTarjeta() {
    this.toastr.success(`Tarjeta aprobada`, "Solicitud exitosa");
  }

  cancelarTarjeta() {
    this.toastr.error(`Tarjeta cancelada`, "Proceso cancelado");
    this.usuarioService.aceptarOferta()
    .subscribe(res => {
      const decodedToken = this.helper.decodeToken(res.token);
      this.router.navigate([`/eventos/${decodedToken.sub}/${res.token}`])
    },
      () => {
        this.error = true
      })
  }
}
