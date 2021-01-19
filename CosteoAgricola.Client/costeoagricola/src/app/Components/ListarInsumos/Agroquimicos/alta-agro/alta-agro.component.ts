import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-alta-agro',
  templateUrl: './alta-agro.component.html',
  styleUrls: ['./alta-agro.component.css']
})
export class AltaAgroComponent implements OnInit {

  constructor(private router: Router,private service: NotificationsService) { }

  ngOnInit(): void {
  }

  retroceder()
  {
    this.router.navigate(['/menu-agroquimicos']);
  }
  onSuccess(message)
  {
    this.service.success('Success',message,{ position: ['top'],timeOut: 2000, animate:'fade',showProgressBar: true});
  }
}
