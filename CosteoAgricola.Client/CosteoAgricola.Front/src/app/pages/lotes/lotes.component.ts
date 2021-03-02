import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { UsersService } from '../../services/users/users.service';
import { Lotes } from '../../models/Lotes';
import { LotesService } from '../../services/lotes/lotes.service';


@Component({
  selector: 'app-lotes',
  templateUrl: './lotes.component.html',
  styleUrls: ['./lotes.component.css']
})
export class LotesComponent implements OnInit {
  @ViewChild('editModal') editModal: ModalDirective;
  modalRef: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
  };
  pageActual: number = 1;
  
  public toastconfig: any = { timeOut: 0, extendedTimeOut: 0, preventDuplicates: true, maxOpened: 1, autoDismiss: false };
  hectarea1Filter: string = '';
  hectarea2Filter: string = '';
  loteStatus: boolean = false;
  lotes: any[] = [];
 // tiposUnidades: any[] = [];
  lote: Lotes = new Lotes();
  nuevoItem = true;
  constructor(private router: Router,private _userService: UsersService, private _lotesService: LotesService, 
    private modalService: BsModalService, private toastr: ToastrService) {
    this._userService.loadStorage();
  }

  ngOnInit() {
    this.onBuscar();
  }
  onBuscar() {
    this._lotesService.getLista(this.loteStatus,this.hectarea1Filter,this.hectarea2Filter).subscribe(
      (data: any) => {
        this.lotes = data;
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
      this._lotesService.guardar(this.lote)
    .subscribe(
      success => {
        this.toastr.success('Lote guardado con exito.', 'Guardado!');
        this.onBuscar();
        //this.getTiposUnidad();
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
      text: 'Esta seguro que quiere eliminar el lote, no se podra revertir!',
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
        this._lotesService.eliminar(id)
        .subscribe(
          success => {
            this.onBuscar();
            Swal.fire({
              title: 'Eliminado!',
              text: 'Lote a sido eliminado con exito.',
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
    //this.getTiposUnidad();
    this.lote = new Lotes();
    if (id <= 0) {
      this.modalRef = this.modalService.show(template, this.config);
      this.lote.lote_status = true;
      this.nuevoItem=true;
      
    } else {
      this._lotesService.getLote(id)
    .subscribe(
      data => {
        this.nuevoItem=false;
        this.lote = data;
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
