import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-agro',
  templateUrl: './menu-agro.component.html',
  styleUrls: ['./menu-agro.component.css']
})
export class MenuAgroComponent implements OnInit {
show=true;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

// tslint:disable-next-line: typedef
retroceder()
{
  this.router.navigate(['/home']);
}
}
