import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { UsersService } from '../../services/users/users.service';
import { Fertilizantes } from '../../models/Fertilizantes';
import { FertilizantesService } from '../../services/Fertilizantes/Fertilizantes.service';

@Component({
  selector: 'app-fertilizantes',
  templateUrl: './fertilizantes.component.html',
  styleUrls: ['./fertilizantes.component.css']
})
export class FertilizantesComponent implements OnInit {

  @ViewChild('editModal') editModal: ModalDirective;
  modalRef: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
  };
  pageActual: number = 1;
  
  public toastconfig: any = { timeOut: 0, extendedTimeOut: 0, preventDuplicates: true, maxOpened: 1, autoDismiss: false };
  nombreFilter: string = '';
  estadoFert: string = '';
  fertStatus: boolean = false;
  fertIn: boolean = false;
  fertilizantes: any[] = [];
  fertilizante: Fertilizantes = new Fertilizantes();
  mostrarExistencia = 0;
  mostrarCosto = 0;
  nuevoItem = true;

  tiposUnidades: any[] = [];

  estados = [{ID: 1, Nombre: 'Solido', Tipo: 1}, {ID: 2, Nombre: 'Liquido', Tipo: 2},
  {ID: 3, Nombre: 'Gaseoso', Tipo: 3}];
  
  constructor(private router: Router, private _userService: UsersService, private _fertilizantesService: FertilizantesService, 
    private modalService: BsModalService, private toastr: ToastrService) {
    this._userService.loadStorage();
  }

  ngOnInit() {
    this.onBuscar();
    
  }

  onBuscar() {
    if(this.estadoFert == null)
    {
      this.estadoFert = '';
    }
    this._fertilizantesService.getLista(this.nombreFilter, this.estadoFert, this.fertStatus,this. fertIn).subscribe(
      (data: any) => {
        this.fertilizantes = data;
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
      this._fertilizantesService.guardar(this.fertilizante)
    .subscribe(
      success => {
        this.toastr.success('Fertilizante guardado con exito.', 'Guardado!');
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
      text: 'Esta seguro que quiere eliminar el fertilizante, no se podra revertir!',
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
        this._fertilizantesService.eliminar(id)
        .subscribe(
          success => {
            this.onBuscar();
            Swal.fire({
              title: 'Eliminado!',
              text: 'Fertilizante a sido eliminada con exito.',
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
    this.fertilizante = new Fertilizantes();

    if (id <= 0) {
      this.nuevoItem = true;
      this.modalRef = this.modalService.show(template, this.config);
      this.fertilizante.fert_status = true;
    } else {
      this._fertilizantesService.getFertilizante(id)
    .subscribe(
      data => {
        this.nuevoItem = false;
        this.fertilizante = data;
        this.mostrarExistenciaCosto(this.fertilizante);
        this.modalRef = this.modalService.show(template, this.config);
      },
      error => this.toastr.error(error.message, 'Error!') );
    }
  }
  
  getTiposUnidades() {
    this._fertilizantesService.getTiposUnidades()
      .subscribe(
        data => {
          this.tiposUnidades = data;
        },
        error => this.toastr.error(error.message, 'Error!') );
    }

  mostrarExistenciaCosto(valor)
  {
      if(valor.fert_inventariable == true)
      {
        this.mostrarExistencia = valor.fert_existencia;
        this.mostrarCosto = valor.fert_costoProm;
      }
      else
      {
        this.mostrarExistencia = 0;
        this.mostrarCosto = 0;
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

    mostrarEstado(valor: number): string
    {
      var res = "";
      if(valor == 1)
      {
        return res ="Solido"
      }
      if(valor == 2)
      {
        return res ="Líquido"
      }
      if(valor == 3)
      {
        return res ="Gaseoso"
      }
      if(valor == 4)
      {
        return res ="coloide"
      }
      
    }
    
    cerrar()
    {
      this.router.navigate(['/dashboard']);
    }

}
