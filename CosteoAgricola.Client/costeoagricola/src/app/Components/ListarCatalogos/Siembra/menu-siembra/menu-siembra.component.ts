import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-siembra',
  templateUrl: './menu-siembra.component.html',
  styleUrls: ['./menu-siembra.component.css']
})
export class MenuSiembraComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  retroceder()
  {
    this.router.navigate(['/welcome']);
  }
  alta()
{
  this.router.navigate(['/alta-siembra']);
}
}
