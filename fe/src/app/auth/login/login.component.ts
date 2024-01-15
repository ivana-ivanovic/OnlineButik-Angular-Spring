import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
// import { AuthService } from 'src/app/services/auth.service';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorExists = false;
  errorText = "";

  constructor(private authService: AuthService, http: HttpClient, private router: Router) { }

  ngOnInit(): void {
  }
  onSubmit(form: NgForm) {
    let credentials = { username: form.value.email, password: form.value.password };
    // this.authService.authenticate(credentials, () => {
    //   this.router.navigateByUrl('/');
    // });
    this.authService.loginWithRedirect()
    return false;
  }
}
