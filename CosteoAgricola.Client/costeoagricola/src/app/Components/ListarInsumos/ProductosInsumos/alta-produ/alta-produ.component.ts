import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alta-produ',
  templateUrl: './alta-produ.component.html',
  styleUrls: ['./alta-produ.component.css']
})
export class AltaProduComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  // tslint:disable-next-line: typedef
  retroceder()
  {
    this.router.navigate(['/menu-productos']);
  }
}
