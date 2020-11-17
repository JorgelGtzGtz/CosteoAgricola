import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-menu-semillas',
  templateUrl: './menu-semillas.component.html',
  styleUrls: ['./menu-semillas.component.css']
})
export class MenuSemillasComponent implements OnInit {
  // para mostrar solo la pantalla de altas cuando le da en nuevo
  show = true;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  // tslint:disable-next-line: typedef
  home()
  {
    this.router.navigate(['/home']);
  }
}
