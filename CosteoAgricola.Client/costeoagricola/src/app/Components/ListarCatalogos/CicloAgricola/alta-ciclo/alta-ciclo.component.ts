import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alta-ciclo',
  templateUrl: './alta-ciclo.component.html',
  styleUrls: ['./alta-ciclo.component.css']
})
export class AltaCicloComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  retroceder()
  {
    this.router.navigate(['/menu-ciclo']);
  }
}
