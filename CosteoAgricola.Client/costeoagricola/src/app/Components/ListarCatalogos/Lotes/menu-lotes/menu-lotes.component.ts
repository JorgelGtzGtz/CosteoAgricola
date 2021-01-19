import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-lotes',
  templateUrl: './menu-lotes.component.html',
  styleUrls: ['./menu-lotes.component.css']
})
export class MenuLotesComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  retroceder()
  {
    this.router.navigate(['/welcome']);
  }
  alta()
  {
    this.router.navigate(['/alta-lotes']);
  }
}
