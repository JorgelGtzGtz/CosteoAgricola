import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-alta-semillas',
  templateUrl: './alta-semillas.component.html',
  styleUrls: ['./alta-semillas.component.css']
})
export class AltaSemillasComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  // tslint:disable-next-line: typedef
  retroceder()
  {
    this.router.navigate(['/menu-semillas']);
  }
}
