import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-alta-siembra',
  templateUrl: './alta-siembra.component.html',
  styleUrls: ['./alta-siembra.component.css']
})
export class AltaSiembraComponent implements OnInit {

  constructor(private router: Router,private service: NotificationsService) { }

  ngOnInit(): void {
  }
  retroceder()
  {
    this.router.navigate(['/menu-siembra']);
  }
  onSuccess(message)
  {
    this.service.success('Success',message,{ position: ['top'],timeOut: 2000, animate:'fade',showProgressBar: true});
  }
}
