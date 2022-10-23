import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  celular: string;
  constructor(
    private usuarioService: UsuarioService,
    private router: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) { }

  error: boolean = false
  isShow = true;

  ngOnInit() {
    this.usuarioForm = this.formBuilder.group({
      firma: [false, [Validators.required]],
    })
    this.celular = this.router.snapshot.params.celular;
  }



  obtenerTarjeta() {
    this.toastr.success(`Tarjeta aprobada`, "Solicitud exitosa");
  }

  cancelarTarjeta() {
    console.log(this.celular);
    this.usuarioService.aceptarOferta(this.celular)
    .subscribe(res => {
      const decodedToken = this.helper.decodeToken(res.token);
      this.toastr.error(`Tarjeta cancelada`, "Proceso cancelado");
    },
      error => {
        this.toastr.success(`Mensaje enviado al número ${this.celular}`, "Revisa tu whatsapp");
      })

  }

  featureHide() {
    this.isShow= false;
    window.open("https://web.whatsapp.com/send?phone=+14155238886&text=join%20world-busy", "_blank");
   };

   @HostListener('window:beforeunload', [ '$event' ])
   beforeUnloadHandler() {
    window.open("https://web.whatsapp.com/send?phone=+14155238886&text=join%20world-busy", "_blank");
   }


}
