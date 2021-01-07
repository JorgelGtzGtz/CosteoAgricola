import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-uni-ins',
  templateUrl: './menu-uni-ins.component.html',
  styleUrls: ['./menu-uni-ins.component.css']
})
export class MenuUniInsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  retroceder()
{
  this.router.navigate(['/welcome']);
}
alta()
{
  this.router.navigate(['/alta-unidades']);
}
}
