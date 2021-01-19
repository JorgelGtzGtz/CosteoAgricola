import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-alta-ciclo',
  templateUrl: './alta-ciclo.component.html',
  styleUrls: ['./alta-ciclo.component.css']
})
export class AltaCicloComponent implements OnInit {

  constructor(private router: Router,private service: NotificationsService) { }

  ngOnInit(): void {
  }
  retroceder()
  {
    this.router.navigate(['/menu-ciclo']);
  }
  onSuccess(message)
  {
    this.service.success('Success',message,{ position: ['top'],timeOut: 2000, animate:'fade',showProgressBar: true});
  }
}
