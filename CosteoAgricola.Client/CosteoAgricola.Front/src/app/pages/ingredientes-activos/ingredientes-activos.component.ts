import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { UsersService } from '../../services/users/users.service';
import { IngredientesActivos } from '../../models/IngredientesActivos';
import { IngredientesActivosService } from '../../services/ingredientesActivos/ingredientes-activos.service';

@Component({
  selector: 'app-ingredientes-activos',
  templateUrl: './ingredientes-activos.component.html',
  styleUrls: ['./ingredientes-activos.component.css']
})
export class IngredientesActivosComponent implements OnInit {
  @ViewChild('editModal') editModal: ModalDirective;
  modalRef: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
  };
  pageActual: number = 1;
  
  public toastconfig: any = { timeOut: 0, extendedTimeOut: 0, preventDuplicates: true, maxOpened: 1, autoDismiss: false };
  nombreFilter: string = '';
  ingredienteStatus: boolean = false;
  ingActivos: any[] = [];
  tiposUnidades: any[] = [];
  ingActivo: IngredientesActivos = new IngredientesActivos();
  nuevoItem = true;
  constructor(private router: Router,private _userService: UsersService, private _ingActivosService: IngredientesActivosService, 
    private modalService: BsModalService, private toastr: ToastrService) {
    this._userService.loadStorage();
  }

  ngOnInit() {
    this.onBuscar();
  }

  onBuscar() {
    this._ingActivosService.getLista(this.nombreFilter,this.ingredienteStatus).subscribe(
      (data: any) => {
        this.ingActivos = data;
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
        this._ingActivosService.guardar(this.ingActivo)
        .subscribe(
          success => {
            this.toastr.success('Ingrediente guardado con exito.', 'Guardado!');
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
      text: 'Esta seguro que quiere eliminar el ingrediente, no se podra revertir!',
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
        this._ingActivosService.eliminar(id)
        .subscribe(
          success => {
            this.onBuscar();
            Swal.fire({
              title: 'Eliminado!',
              text: 'Ingrediente a sido eliminado con exito.',
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
    this.getTiposUnidades();
    this.ingActivo = new IngredientesActivos();
    if (id <= 0) {
      this.modalRef = this.modalService.show(template, this.config);
      this.ingActivo.ingredAct_status = true;
      this.nuevoItem=true;
      
    } else {
      this._ingActivosService.getIngredienteActivo(id)
    .subscribe(
      data => {
        this.nuevoItem=false;
        this.ingActivo = data;
        this.modalRef = this.modalService.show(template, this.config);
      },
      error => this.toastr.error(error.message, 'Error!') );
    }
  }

  getTiposUnidades() {
    this._ingActivosService.getTiposUnidades()
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
