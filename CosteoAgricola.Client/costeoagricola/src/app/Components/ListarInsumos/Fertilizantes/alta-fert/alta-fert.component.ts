import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-alta-fert',
  templateUrl: './alta-fert.component.html',
  styleUrls: ['./alta-fert.component.css']
})
export class AltaFertComponent implements OnInit {

  constructor(private router: Router,private service: NotificationsService) { }

  ngOnInit(): void {
  }
  retroceder()
  {
    this.router.navigate(['/menu-fertilizantes']);
  }
  onSuccess(message)
  {
    this.service.success('Success',message,{ position: ['top'],timeOut: 2000, animate:'fade',showProgressBar: true});
  }
}
