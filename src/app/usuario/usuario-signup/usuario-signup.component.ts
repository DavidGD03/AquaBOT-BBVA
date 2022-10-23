import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt";
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-usuario-signup',
  templateUrl: './usuario-signup.component.html',
  styleUrls: ['./usuario-signup.component.css']
})
export class UsuarioSignupComponent implements OnInit {

  helper = new JwtHelperService();
  usuarioForm: FormGroup;

  constructor(
    private usuarioService: UsuarioService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.usuarioForm = this.formBuilder.group({
      nombre: ["", [Validators.required, Validators.maxLength(50)]],
      apellidos: ["", [Validators.required, Validators.maxLength(50)]],
      sexo: ["",  [Validators.required]],
      nacimiento: ["", [Validators.required]],
      expedicion: ["", [Validators.required]],
      cedula: ["", [Validators.required, Validators.maxLength(50)]],
      celular: ["", [Validators.required, Validators.maxLength(50)]],
      correo: ["", [Validators.required, Validators.maxLength(50), Validators.email]],
      tratamiento: [false, [Validators.required]],
    })
  }

  registrarUsuario() {
    this.usuarioService.userSignUp(this.usuarioForm.get('nombre')?.value, this.usuarioForm.get('apellidos')?.value,
      this.usuarioForm.get('sexo')?.value, this.usuarioForm.get('correo')?.value, this.usuarioForm.get('nacimiento')?.value, this.usuarioForm.get('cedula')?.value,
      this.usuarioForm.get('celular')?.value, this.usuarioForm.get('expedicion')?.value)
      .subscribe(res => {
        const decodedToken = this.helper.decodeToken(res.token);
        this.router.navigate([`/obtener/${this.usuarioForm.get('nombre')?.value}/${this.usuarioForm.get('apellidos')?.value}/${this.usuarioForm.get('sexo')?.value}/${this.usuarioForm.get('nacimiento')?.value}/${this.usuarioForm.get('expedicion')?.value}/${this.usuarioForm.get('cedula')?.value}/${this.usuarioForm.get('celular')?.value}/${this.usuarioForm.get('correo')?.value}`])
        this.showSuccess()
      },
        error => {
          this.showError(`Ha ocurrido un error: ${error.message}`)
        })
    this.router.navigate([`/obtener/${this.usuarioForm.get('nombre')?.value}/${this.usuarioForm.get('apellidos')?.value}/${this.usuarioForm.get('sexo')?.value}/${this.usuarioForm.get('nacimiento')?.value}/${this.usuarioForm.get('expedicion')?.value}/${this.usuarioForm.get('cedula')?.value}/${this.usuarioForm.get('celular')?.value}/${this.usuarioForm.get('correo')?.value}`])

  }
  /*
  registrarUsuario() {
    this.usuarioService.userSignUp(this.usuarioForm.get('usuario')?.value, this.usuarioForm.get('password')?.value, this.usuarioForm.get('admin')?.value)
      .subscribe(res => {
        const decodedToken = this.helper.decodeToken(res.token);
        this.router.navigate([`/eventos/${decodedToken.sub}/${res.token}`])
        this.showSuccess()
      },
        error => {
          this.showError(`Ha ocurrido un error: ${error.message}`)
        })
  }
  */

  showError(error: string) {
    this.toastr.error(error, "Error")
  }


  showSuccess() {
    this.toastr.success(`Estamos procesando tu oferta`, "Solicitud exitosa");
  }

}
