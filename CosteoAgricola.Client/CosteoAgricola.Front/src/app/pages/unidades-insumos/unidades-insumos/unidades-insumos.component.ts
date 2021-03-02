import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { UsersService } from '../../../services/users/users.service';
import { Unidades } from '../../../models/Unidades';
import { UnidadesInsumosService } from '../../../services/unidadesInsumos/unidades-insumos.service';


@Component({
  selector: 'app-unidades-insumos',
  templateUrl: './unidades-insumos.component.html',
  styleUrls: ['./unidades-insumos.component.css']
})
export class UnidadesInsumosComponent implements OnInit {
  @ViewChild('editModal') editModal: ModalDirective;
  modalRef: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
  };
  pageActual: number = 1;
  
  public toastconfig: any = { timeOut: 0, extendedTimeOut: 0, preventDuplicates: true, maxOpened: 1, autoDismiss: false };
  unidadFilter: string = '';
  unidadStatus: boolean = false;
  unidades: any[] = [];
  tiposUnidades: any[] = [];
  unidad: Unidades = new Unidades();
  nuevoItem = true;
  constructor(private router: Router,private _userService: UsersService, private _unidadesService: UnidadesInsumosService, 
    private modalService: BsModalService, private toastr: ToastrService) {
    this._userService.loadStorage();
  }

  ngOnInit() {
    this.onBuscar();
  }

  onBuscar() {
    this._unidadesService.getLista(this.unidadFilter,this.unidadStatus).subscribe(
      (data: any) => {
        this.unidades = data;
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
      this._unidadesService.guardar(this.unidad)
    .subscribe(
      success => {
        this.toastr.success('Unidad guardada con exito.', 'Guardado!');
        this.onBuscar();
        this.getTiposUnidad();
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
      text: 'Esta seguro que quiere eliminar la unidad, no se podra revertir!',
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
        this._unidadesService.eliminar(id)
        .subscribe(
          success => {
            this.onBuscar();
            Swal.fire({
              title: 'Eliminado!',
              text: 'Unidad a sido eliminada con exito.',
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
    this.getTiposUnidad();
    this.unidad = new Unidades();
    if (id <= 0) {
      this.modalRef = this.modalService.show(template, this.config);
      this.unidad.unidad_status = true;
      this.nuevoItem=true;
      
    } else {
      this._unidadesService.getUnidad(id)
    .subscribe(
      data => {
        this.nuevoItem=false;
        this.unidad = data;
        this.modalRef = this.modalService.show(template, this.config);
      },
      error => this.toastr.error(error.message, 'Error!') );
    }
  }

  getTiposUnidad() {
    this._unidadesService.getTiposUnidades()
      .subscribe(
        data => {
          this.tiposUnidades = data;
        },
        error => this.toastr.error(error.message, 'Error!') );
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
