import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-fert',
  templateUrl: './menu-fert.component.html',
  styleUrls: ['./menu-fert.component.css']
})
export class MenuFertComponent implements OnInit {
show = true;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

// tslint:disable-next-line: typedef
retroceder()
{
  this.router.navigate(['/home']);
}
}
