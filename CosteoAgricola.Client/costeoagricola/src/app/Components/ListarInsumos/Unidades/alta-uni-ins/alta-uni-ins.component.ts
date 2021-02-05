import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-alta-uni-ins',
  templateUrl: './alta-uni-ins.component.html',
  styleUrls: ['./alta-uni-ins.component.css']
})
export class AltaUniInsComponent implements OnInit {

  constructor(private router: Router,private service: NotificationsService) { }

  ngOnInit(): void {
  }
  retroceder()
  {
    this.router.navigate(['/menu-unidades']);
  }
  onSuccess(message)
  {
    this.service.success('Success',message,{ position: ['top'],timeOut: 2000, animate:'fade',showProgressBar: true});
  }
}
