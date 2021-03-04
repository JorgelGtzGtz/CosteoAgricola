import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { UsersService } from '../../services/users/users.service';
import { TipoAgroquimico } from '../../models/TipoAgroquimico';
import { TipoAgroquimicoService } from '../../services/tipoAgroquimico/tipo-agroquimico.service';


@Component({
  selector: 'app-tipo-agroquimico',
  templateUrl: './tipo-agroquimico.component.html',
  styleUrls: ['./tipo-agroquimico.component.css']
})
export class TipoAgroquimicoComponent implements OnInit {
  @ViewChild('editModal') editModal: ModalDirective;
  modalRef: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
  };
  pageActual: number = 1;
  
  public toastconfig: any = { timeOut: 0, extendedTimeOut: 0, preventDuplicates: true, maxOpened: 1, autoDismiss: false };
  nombreFilter: string = '';
  tipoAgroStatus: boolean = false;
  tipoAgros: any[] = [];
  //tiposUnidades: any[] = [];
  tipoAgro: TipoAgroquimico = new TipoAgroquimico();
  nuevoItem = true;
  constructor(private router: Router,private _userService: UsersService, private _tipoAgroService: TipoAgroquimicoService, 
    private modalService: BsModalService, private toastr: ToastrService) {
    this._userService.loadStorage();
  }

  ngOnInit() {
    this.onBuscar();
  }

  onBuscar() {
    this._tipoAgroService.getLista(this.nombreFilter,this.tipoAgroStatus).subscribe(
      (data: any) => {
        this.tipoAgros = data;
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
      this._tipoAgroService.guardar(this.tipoAgro)
    .subscribe(
      success => {
        this.toastr.success('Tipo agroquímico guardado con exito.', 'Guardado!');
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
      text: 'Esta seguro que quiere eliminar el tipo de agroquímico, no se podra revertir!',
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
        this._tipoAgroService.eliminar(id)
        .subscribe(
          success => {
            this.onBuscar();
            Swal.fire({
              title: 'Eliminado!',
              text: 'Tipo agroquímico a sido eliminado con exito.',
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
    
    this.tipoAgro = new TipoAgroquimico();
    if (id <= 0) {
      this.modalRef = this.modalService.show(template, this.config);
      this.tipoAgro.tipoAgroq_status = true;
      this.nuevoItem=true;
      
    } else {
      this._tipoAgroService.getTipoAgroquimico(id)
    .subscribe(
      data => {
        this.nuevoItem=false;
        this.tipoAgro = data;
        this.modalRef = this.modalService.show(template, this.config);
      },
      error => this.toastr.error(error.message, 'Error!') );
    }
  }

  mostrarToF(valor: boolean, op: number): string
    {
      var res = "";
      if(op == 1)
      {
        if(valor)
        {
          return res = "Si"
        }
        else
        {
          return res = "No"
        }
      }
      if(op == 2)
      {
        if(valor)
        {
          return res = "Activo"
        }
        else
        {
          return res = "Inactivo"
        }
      }
      
    }
    cerrar()
    {
      this.router.navigate(['/dashboard']);
    }
}
