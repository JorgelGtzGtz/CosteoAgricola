import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { UsersService } from '../../services/users/users.service';
import { Productos } from '../../models/Productos';
import { ProductosInsumosService } from '../../services/productosInsumos/productos-insumos.service';


@Component({
  selector: 'app-productos-insumos',
  templateUrl: './productos-insumos.component.html',
  styleUrls: ['./productos-insumos.component.css']
})
export class ProductosInsumosComponent implements OnInit {

  @ViewChild('editModal') editModal: ModalDirective;
  modalRef: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
  };
  pageActual: number = 1;
  
  public toastconfig: any = { timeOut: 0, extendedTimeOut: 0, preventDuplicates: true, maxOpened: 1, autoDismiss: false };
  productoFilter: string = '';
  productoStatus: boolean = false;
  productoIn: boolean = false;
  productos: any[] = [];
  producto: Productos = new Productos();
  mostrarExistencia = 0;
  mostrarCosto = 0;
  nuevoItem = true;
  
  tiposUnidades:  any[] = [];

  constructor(private router: Router, private _userService: UsersService, private _productosService: ProductosInsumosService, 
    private modalService: BsModalService, private toastr: ToastrService) {
    this._userService.loadStorage();
  }

  
  ngOnInit() {
    this.onBuscar();
  }

  onBuscar() {
    this._productosService.getLista(this.productoFilter, this.productoIn, this.productoStatus).subscribe(
      (data: any) => {
        this.productos = data;
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
      this._productosService.guardar(this.producto)
    .subscribe(
      success => {
        this.toastr.success('Producto guardado con exito.', 'Guardado!');
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
      text: 'Esta seguro que quiere eliminar el producto, no se podra revertir!',
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
        this._productosService.eliminar(id)
        .subscribe(
          success => {
            this.onBuscar();
            Swal.fire({
              title: 'Eliminado!',
              text: 'Producto a sido eliminada con exito.',
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
    this.producto = new Productos();
    if (id <= 0) {
      this.nuevoItem = true;
      this.modalRef = this.modalService.show(template, this.config);
      this.producto.prod_status = true;
    } else {
      this._productosService.getProducto(id)
    .subscribe(
      data => {
        this.nuevoItem = false;
        this.producto = data;
        this.mostrarExistenciaCosto(this.producto);
        this.modalRef = this.modalService.show(template, this.config);
      },
      error => this.toastr.error(error.message, 'Error!') );
    }
  }

  mostrarExistenciaCosto(valor)
  {
      if(valor.prod_inventariable == true)
      {
        this.mostrarExistencia = valor.prod_existencia;
        this.mostrarCosto = valor.prod_costoProm;
      }
      else
      {
        this.mostrarExistencia = 0;
        this.mostrarCosto = 0;
      }
   }
  getTiposUnidades() {
    this._productosService.getTiposUnidades()
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
      if(op == 3)
      {
        if(valor)
        {
          return res = "Directo"
        }
        else
        {
          return res = "Indirecto"
        }
      }
      
    }
    
    cerrar()
    {
      this.router.navigate(['/dashboard']);
    }

}
