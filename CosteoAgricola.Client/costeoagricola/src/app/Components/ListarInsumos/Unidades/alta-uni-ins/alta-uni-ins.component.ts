import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alta-uni-ins',
  templateUrl: './alta-uni-ins.component.html',
  styleUrls: ['./alta-uni-ins.component.css']
})
export class AltaUniInsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  retroceder()
  {
    this.router.navigate(['/menu-unidades']);
  }
}
