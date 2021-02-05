import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-alta-semillas',
  templateUrl: './alta-semillas.component.html',
  styleUrls: ['./alta-semillas.component.css']
})
export class AltaSemillasComponent implements OnInit {

  constructor(private router: Router, private service: NotificationsService) { }

  ngOnInit(): void {
  }
  // tslint:disable-next-line: typedef
  retroceder()
  {
    this.router.navigate(['/menu-semillas']);
  }

  onSuccess(message)
  {
    this.service.success('Success',message,{ position: ['top'],timeOut: 2000, animate:'fade',showProgressBar: true});
  }
}

  