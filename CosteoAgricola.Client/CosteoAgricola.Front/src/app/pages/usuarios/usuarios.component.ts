import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { UsersService } from '../../services/users/users.service';
import { Usuario } from '../../models/Usuario';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  @ViewChild('editModal') editModal: ModalDirective;
  modalRef: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
  };
  public toastconfig: any = { timeOut: 0, extendedTimeOut: 0, preventDuplicates: true, maxOpened: 1, autoDismiss: false };
  usuarioFilter: string = '';
  usuarios: any[] = [];
  usuario: Usuario = new Usuario();
  generos = [{ID: 1, Nombre: 'Masculino', Tipo: 'M'}, {ID: 2, Nombre: 'Femenino', Tipo: 'F'}];
  tiposUsuario:  any[] = [];


  public imagePath;
  imgURL: any;
  public message: string;

  constructor(private router: Router,private _userService: UsersService, private modalService: BsModalService, private toastr: ToastrService) {
    this._userService.loadStorage();
  }

  ngOnInit() {
    this.imgURL = 'assets/images/default-upload.png';
    this.onBuscar();
  }
  
  onBuscar() {
    this._userService.getLista(this.usuarioFilter).subscribe(
      (data: any) => {
        this.usuarios = data;
      },
      (error) => {
        Swal.fire({
          title: 'Error!',
          text: String(error.message),
          type: 'error',
          focusConfirm: false,
          focusCancel: false,
          allowEnterKey: false
        });
      }
    );
  }

  onSubmit(FormData) {
    if (FormData.valid) {
      this._userService.guardar(this.usuario)
    .subscribe(
      success => {
        this.toastr.success('Usuario guardado con exito.', 'Guardado!');
        this.onBuscar();
        FormData.resetForm();
        this.modalRef.hide();
      },
      error => {
        this.toastr.error(error.message, 'Error!');
      });
    }
  }

  onDelete(id: number) {
    Swal.fire({
      title: 'Esta seguro?',
      text: 'Esta seguro que quiere eliminar el usuario, no se podra revertir!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!',
      focusConfirm: false,
      focusCancel: false,
      allowEnterKey: false
    }).then((result) => {
      if (result.value) {
        this._userService.eliminar(id)
        .subscribe(
          success => {
            this.onBuscar();
            Swal.fire({
              title: 'Eliminado!',
              text: 'Usuario a sido eliminado con exito.',
              type: 'success',
              confirmButtonText: 'Aceptar'
            });
          },
          error => {
            this.toastr.error(error.message, 'Error!');
          });
      }
    });
  }
  
  onShow(id: number, template: TemplateRef<any>) {
    this.getTiposUsuario();
    this.usuario = new Usuario();
    if (id <= 0) {
      this.modalRef = this.modalService.show(template, this.config);
    } else {
      this._userService.getUsuario(id)
    .subscribe(
      data => {
        this.usuario = data;
        this.modalRef = this.modalService.show(template, this.config);
      },
      error => this.toastr.error(error.message, 'Error!') );
    }
    
  }

  getTiposUsuario() {
  this._userService.getTiposUsuarios()
    .subscribe(
      data => {
        this.tiposUsuario = data;
      },
      error => this.toastr.error(error.message, 'Error!') );
  }
  preview(files) {
  if (files.length === 0) {
    return;
  }

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = 'Only images are supported.';
      return;
    }

    const reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    // tslint:disable-next-line: variable-name
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
  }
  cerrar()
  {
    this.router.navigate(['/dashboard']);
  }
}
