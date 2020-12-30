import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-uni-ins',
  templateUrl: './menu-uni-ins.component.html',
  styleUrls: ['./menu-uni-ins.component.css']
})
export class MenuUniInsComponent implements OnInit {
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
