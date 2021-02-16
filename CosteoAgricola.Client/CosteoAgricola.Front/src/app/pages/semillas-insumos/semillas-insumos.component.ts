import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { UsersService } from '../../services/users/users.service';
import { Semillas } from '../../models/Semillas';
import { SemillasInsumosService } from '../../services/semillasInsumos/semillas-insumos.service';

@Component({
  selector: 'app-semillas-insumos',
  templateUrl: './semillas-insumos.component.html',
  styleUrls: ['./semillas-insumos.component.css']
})
export class SemillasInsumosComponent implements OnInit {
  @ViewChild('editModal') editModal: ModalDirective;
  modalRef: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
  };
  public toastconfig: any = { timeOut: 0, extendedTimeOut: 0, preventDuplicates: true, maxOpened: 1, autoDismiss: false };
  semillaFilter: string = '';
  semillaStatus: boolean = false;
  semillaIn: boolean = false;
  semillas: any[] = [];
  semilla: Semillas = new Semillas();
  mostrarExistencia = 0;
  mostrarCosto = 0;
  //inventariable = [{ID: 1, Nombre: 'Si', Tipo: true}, {ID: 2, Nombre: 'No', Tipo: false}];
  tiposMedidas:  any[] = [];
  constructor(private _userService: UsersService, private _semillasService: SemillasInsumosService, 
    private modalService: BsModalService, private toastr: ToastrService) {
    this._userService.loadStorage();
  }

  ngOnInit() {
    this.onBuscar();
  }

  onBuscar() {
    this._semillasService.getLista(this.semillaFilter, this.semillaIn, this.semillaStatus).subscribe(
      (data: any) => {
        this.semillas = data;
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
      this._semillasService.guardar(this.semilla)
    .subscribe(
      success => {
        this.toastr.success('Semilla guardada con exito.', 'Guardado!');
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
      text: 'Esta seguro que quiere eliminar la semilla, no se podra revertir!',
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
        this._semillasService.eliminar(id)
        .subscribe(
          success => {
            this.onBuscar();
            Swal.fire({
              title: 'Eliminado!',
              text: 'Semilla a sido eliminada con exito.',
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
    this.getTiposMedidas();
    this.semilla = new Semillas();
    if (id <= 0) {
      this.modalRef = this.modalService.show(template, this.config);
    } else {
      this._semillasService.getSemilla(id)
    .subscribe(
      data => {
        this.semilla = data;
        this.mostrarExistenciaCosto(this.semilla);
        this.modalRef = this.modalService.show(template, this.config);
      },
      error => this.toastr.error(error.message, 'Error!') );
    }
  }

  mostrarExistenciaCosto(valor)
  {
    if(valor.sem_inventariable == true)
    {
      this.mostrarExistencia = valor.sem_existencia;
      this.mostrarCosto = valor.sem_costoProm;
    }
    else
    {
      this.mostrarExistencia = 0;
      this.mostrarCosto = 0;
    }
   }
  getTiposMedidas() {
    this._semillasService.getTiposMedidas()
      .subscribe(
        data => {
          this.tiposMedidas = data;
        },
        error => this.toastr.error(error.message, 'Error!') );
    }
}
