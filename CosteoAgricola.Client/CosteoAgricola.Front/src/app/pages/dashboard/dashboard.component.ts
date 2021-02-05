import { Component, OnInit } from '@angular/core';
import { UsersService, DashboardService } from 'src/app/services/service.index';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  fraccionamientoSelected:any;
  lista: any[] = [];
  radioPrefix = 'control_';
  constructor(private _userService: UsersService, private _dashboardService: DashboardService) { 
    this._userService.loadStorage();
  }

  ngOnInit() {

  }
}
