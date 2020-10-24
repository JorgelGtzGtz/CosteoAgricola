import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-produ-insu',
  templateUrl: './menu-produ-insu.component.html',
  styleUrls: ['./menu-produ-insu.component.css']
})
export class MenuProduInsuComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
// tslint:disable-next-line: typedef
altaProductos(){
  this.router.navigate(['/alta-productos']);
}
// tslint:disable-next-line: typedef
retroceder()
{
  this.router.navigate(['/home']);
}
}
