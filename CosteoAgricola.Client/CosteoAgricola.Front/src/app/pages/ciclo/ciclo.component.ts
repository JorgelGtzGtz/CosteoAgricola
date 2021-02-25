import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

import { UsersService } from '../../services/users/users.service';
import { Ciclo } from '../../models/Ciclo';
import { CiclosService } from '../../services/ciclos/ciclos.service';
import {NgbDate, NgbCalendar, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ciclo',
  templateUrl: './ciclo.component.html',
  styleUrls: ['./ciclo.component.css']
})

export class CicloComponent implements OnInit {
  @ViewChild('editModal') editModal: ModalDirective;
  modalRef: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
  };

  hoveredDate: NgbDate | null = null;

  fromDate: NgbDate | null;
  toDate: NgbDate | null;



  public toastconfig: any = { timeOut: 0, extendedTimeOut: 0, preventDuplicates: true, maxOpened: 1, autoDismiss: false };
  cicloFilter: string = '';
  cicloStatus: boolean = false;
  ciclos: any[] = [];
  close = false;
  //tiposUnidades: any[] = [];
  ciclo: Ciclo = new Ciclo();
  nuevoItem = true;
  constructor(private router: Router,private _userService: UsersService, 
    private _ciclosService: CiclosService, 
    private modalService: BsModalService, private toastr: ToastrService,
    private calendar: NgbCalendar, public formatter: NgbDateParserFormatter) 
    {
    this._userService.loadStorage();
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }

  ngOnInit() {
    this.onBuscar();
  }
  cleanDate()
  {
    this.hoveredDate = null;
    this.fromDate= null;
    this.toDate=null;
  }
  onBuscar() {
    this._ciclosService.getLista(this.cicloFilter,this.cicloStatus).subscribe(
      (data: any) => {
        this.ciclos = data;
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
      this.ciclo.ciclo_fechaIni = new Date(this.fromDate.year,this.fromDate.month-1,this.fromDate.day);
      this.ciclo.ciclo_fechaFin = new Date(this.toDate.year,this.toDate.month-1,this.toDate.day);
      
    if(!this.close)
      { 
          this._ciclosService.guardar(this.ciclo)
        .subscribe(
          success => {
            this.toastr.success('Ciclo guardado con exito.', 'Guardado!');
            this.onBuscar();
           // this.getTiposUnidad();
            FormData.resetForm();
            this.modalRef.hide();
            this.cleanDate();
            
          },
          error => {
            this.toastr.error(error.message, 'Error!');
          });
          
      }
      else
      {
        this.toastr.error('Cambios no guardados!');
        this.close = false;
      }
    }
  }

  onDelete(id: number) {
    Swal.fire({
      title: 'Esta seguro?',
      text: 'Esta seguro que quiere eliminar dl ciclo, no se podra revertir!',
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
        this._ciclosService.eliminar(id)
        .subscribe(
          success => {
            this.onBuscar();
            Swal.fire({
              title: 'Eliminado!',
              text: 'Ciclo a sido eliminada con exito.',
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
    this.ciclo = new Ciclo();
    if (id <= 0) {
      this.modalRef = this.modalService.show(template, this.config);
      this.ciclo.ciclo_status = true;
      this.nuevoItem=true;
      this.cleanDate();
    } else {
      this._ciclosService.getCiclo(id)
    .subscribe(
      data => {
        this.nuevoItem=false;
        this.ciclo = data;
         
        var fDate = new Date(this.ciclo.ciclo_fechaIni);  
        var tDate = new Date(this.ciclo.ciclo_fechaFin);  
        /*
        console.log("Dia new: "+ newDate.getDate());
        console.log("Mes new: "+ newDate.getMonth());
        console.log("Mes new+: "+ this.mostrarMes(newDate.getMonth()));
        console.log("Año new: "+ newDate.getFullYear());
         
        var dateIni = new Date(newDate.getDate(),this.mostrarMes(newDate.getMonth()),newDate.getFullYear());
        */
        this.fromDate = new NgbDate (fDate.getFullYear(),fDate.getMonth()+1,fDate.getDate());
        this.toDate = new NgbDate (tDate.getFullYear(),tDate.getMonth()+1,tDate.getDate());
        //this.cleanDate();
        this.modalRef = this.modalService.show(template, this.config);
      },
      error => this.toastr.error(error.message, 'Error!') );
    }
  }
  mostrarMes(value: number): number
  {
    switch(value)
    {
      case 0 : return 12; break;
      case 1 : return 1; break;
      case 2 : return 2; break;
      case 3 : return 3; break;
      case 4 : return 4; break;
      case 5 : return 5; break;
      case 6 : return 6; break;
      case 7 : return 7; break;
      case 8 : return 8; break;
      case 9 : return 9; break;
      case 10 : return 10; break;
      case 11 : return 11; break;
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

    onDateSelection(date: NgbDate) {
      if (!this.fromDate && !this.toDate) {
        this.fromDate = date;
      } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
        this.toDate = date;
      } else {
        this.toDate = null;
        this.fromDate = date;
      }
    }
  
    isHovered(date: NgbDate) {
      return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
    }
  
    isInside(date: NgbDate) {
      return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
    }
  
    isRange(date: NgbDate) {
      return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
    }
  
    validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
      const parsed = this.formatter.parse(input);
      return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
    }
}
