import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-ciclo',
  templateUrl: './menu-ciclo.component.html',
  styleUrls: ['./menu-ciclo.component.css']
})
export class MenuCicloComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  retroceder()
  {
    this.router.navigate(['/welcome']);
  }
  alta()
{
  this.router.navigate(['/alta-ciclo']);
}
}
