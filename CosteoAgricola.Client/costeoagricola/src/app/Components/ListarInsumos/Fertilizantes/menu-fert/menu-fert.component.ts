import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-fert',
  templateUrl: './menu-fert.component.html',
  styleUrls: ['./menu-fert.component.css']
})
export class MenuFertComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

retroceder()
{
  this.router.navigate(['/welcome']);
}
alta()
{
  this.router.navigate(['/alta-fertilizantes']);
}
}
