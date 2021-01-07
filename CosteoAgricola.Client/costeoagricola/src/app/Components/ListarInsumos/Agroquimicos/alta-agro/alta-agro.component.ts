import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alta-agro',
  templateUrl: './alta-agro.component.html',
  styleUrls: ['./alta-agro.component.css']
})
export class AltaAgroComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  retroceder()
  {
    this.router.navigate(['/menu-agroquimicos']);
  }
}
