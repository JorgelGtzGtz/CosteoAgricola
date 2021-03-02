import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { UsersService } from '../../services/users/users.service';
import { Siembra } from '../../models/Siembra';
import { SiembraService } from '../../services/siembra/siembra.service';
import {NgbDate, NgbCalendar, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-siembra',
  templateUrl: './siembra.component.html',
  styleUrls: ['./siembra.component.css']
})
export class SiembraComponent implements OnInit {
  @ViewChild('editModal') editModal: ModalDirective;
  modalRef: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
  };
  hoveredDate: NgbDate | null = null;

  fromDate: NgbDate | null;
  toDate: NgbDate | null;
  pageActual: number = 1;
  
  public toastconfig: any = { timeOut: 0, extendedTimeOut: 0, preventDuplicates: true, maxOpened: 1, autoDismiss: false };
  descripcionFilter: string = '';
  siembraStatusFilter: boolean = false;
  siembraLoteFilter: string = ' ';
  siembraCicloFilter: string = '';
  siembraSemillaFilter: string = '';

  siembras: any[] = [];
  siembra: Siembra = new Siembra();

  //mostrarExistencia = 0;
  //mostrarCosto = 0;
  nuevoItem = true;
  //inventariable = [{ID: 1, Nombre: 'Si', Tipo: true}, {ID: 2, Nombre: 'No', Tipo: false}];
  getLote:  any[] = [];
  getCiclo:  any[] = [];
  getSemilla:  any[] = [];

  constructor(private router: Router, private _userService: UsersService, private _siembraService: SiembraService,
    private modalService: BsModalService, private toastr: ToastrService,
    private calendar: NgbCalendar, public formatter: NgbDateParserFormatter) {
    this._userService.loadStorage();
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }

  ngOnInit() {
    this.onBuscar();
    this.getLotes();
    this.getSemillas();
    this.getCiclos();
    
  }
  cleanDate()
  {
    this.hoveredDate = null;
    this.fromDate= null;
    this.toDate=null;
  }

  onBuscar() {
    this.checkCombos();
    this._siembraService.getLista(this.descripcionFilter,this.siembraCicloFilter,this.siembraStatusFilter,this.siembraLoteFilter,this.siembraSemillaFilter).subscribe(
      (data: any) => {
        this.siembras = data;
        
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
  checkCombos()
  {
    if(this.siembraLoteFilter == null)
    {
      this.siembraLoteFilter = ' ';
    }
    if(this.siembraSemillaFilter == null)
    {
      this.siembraSemillaFilter = ' ';
    }
    if(this.siembraCicloFilter == null)
    {
      this.siembraCicloFilter = ' ';
    }
  }
  onSubmit(FormData) {
    if (FormData.valid) {

      this.siembra.siembra_fechaIni = new Date(this.fromDate.year,this.fromDate.month-1,this.fromDate.day);
      this.siembra.siembra_fechaFin = new Date(this.toDate.year,this.toDate.month-1,this.toDate.day);
      
      this._siembraService.guardar(this.siembra)
    .subscribe(
      success => {
        this.toastr.success('Siembra guardada con exito.', 'Guardado!');
        this.onBuscar();
        FormData.resetForm();
        this.cleanDate();
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
      text: 'Esta seguro que quiere eliminar la siembra, no se podra revertir!',
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
        this._siembraService.eliminar(id)
        .subscribe(
          success => {
            this.onBuscar();
            Swal.fire({
              title: 'Eliminado!',
              text: 'Siembra a sido eliminada con exito.',
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
    this.getLotes();
    this.getSemillas();
    this.getCiclos();

    this.siembra = new Siembra();

    if (id <= 0) {
      this.nuevoItem = true;
      this.modalRef = this.modalService.show(template, this.config);
      this.siembra.siembra_status = true;
      this.cleanDate();
    } else {
      this._siembraService.getSiembra(id)
    .subscribe(
      data => {
        this.nuevoItem = false;
        this.siembra = data;

        var fDate = new Date(this.siembra.siembra_fechaIni);  
        var tDate = new Date(this.siembra.siembra_fechaFin); 

        this.fromDate = new NgbDate (fDate.getFullYear(),fDate.getMonth()+1,fDate.getDate());
        this.toDate = new NgbDate (tDate.getFullYear(),tDate.getMonth()+1,tDate.getDate());
        //this.mostrarExistenciaCosto(this.semilla);
        this.modalRef = this.modalService.show(template, this.config);
      },
      error => this.toastr.error(error.message, 'Error!') );
    }
  }
  
  getCiclos() {
    this._siembraService.getCiclos()
      .subscribe(
        data => {
          this.getCiclo = data;
        },
        error => this.toastr.error(error.message, 'Error!') );

      
  }

  getLotes() {
    this._siembraService.getLotes()
      .subscribe(
        data => {
          this.getLote = data;
        },
        error => this.toastr.error(error.message, 'Error!') );
  }

  getSemillas() {
    this._siembraService.getSemillas()
      .subscribe(
        data => {
          this.getSemilla = data;
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
