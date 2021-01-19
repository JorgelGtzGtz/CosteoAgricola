import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-alta-lotes',
  templateUrl: './alta-lotes.component.html',
  styleUrls: ['./alta-lotes.component.css']
})
export class AltaLotesComponent implements OnInit {

  constructor(private router: Router, private service: NotificationsService) { }

  ngOnInit(): void {
  }
  retroceder()
  {
    this.router.navigate(['/menu-lotes']);
  }
  onSuccess(message)
  {
    this.service.success('Success',message,{ position: ['top'],timeOut: 2000, animate:'fade',showProgressBar: true});
  }
}
