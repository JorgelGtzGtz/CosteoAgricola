import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alta-fert',
  templateUrl: './alta-fert.component.html',
  styleUrls: ['./alta-fert.component.css']
})
export class AltaFertComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  // tslint:disable-next-line: typedef
  retroceder()
  {
    this.router.navigate(['/home']);
  }
}
