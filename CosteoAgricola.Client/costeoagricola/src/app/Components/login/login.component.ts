import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router) { }
  show=true;
  // tslint:disable-next-line:typedef
  ngOnInit() {
  }

  // tslint:disable-next-line: typedef
  iniciarSesion(){
    this.router.navigate(['/welcome']);

    // this.router.navigateByUrl('/home');
  }



}
