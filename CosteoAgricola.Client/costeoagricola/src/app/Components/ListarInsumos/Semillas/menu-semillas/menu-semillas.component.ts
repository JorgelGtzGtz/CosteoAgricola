import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-menu-semillas',
  templateUrl: './menu-semillas.component.html',
  styleUrls: ['./menu-semillas.component.css']
})
export class MenuSemillasComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  welcome()
  {
    this.router.navigate(['/welcome']);
  }
  alta()
  {
    this.router.navigate(['/alta-semillas']);
  }
}
