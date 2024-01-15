import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { User, UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  errorExists = false;
  errorText = "";

  users: User[] = [];
    constructor( private userService: UserService, private router: Router, public authService: AuthService) { }

  ngOnInit(): void {
    this.findAll();
    console.log(this.authService.isAuthenticated$);
  }

  private findAll(): any {
    return this.userService.findAll().subscribe(value => {
      this.users = value.body as User[];
      console.log(this.users);});
  }
  onSubmit(form: NgForm){
    let a = false;
    this.userService.getUserByEmail(form.value.email).subscribe(value => {
      if(value.body === null) {
        this.errorExists = false;
        let user = this.userService.makeUser(form.value.name, form.value.surname, 
          form.value.address, form.value.city, form.value.email,  
          form.value.birthDate, form.value.picture, form.value.nickName, form.value.phoneNumber);
          console.log(user);
        this.userService.insert(user).subscribe(value => {
          console.log(value.body)
          if(value.body !== null) this.userService.currentUser = value.body;
          else {
            this.errorText = "Pokusajte ponovo kasnije";
            this.errorExists = true;
          }
        });
        this.router.navigate(['']);
      } else {
        this.errorText = "Korisnik sa ovom mail adresom vec postoji";
        this.errorExists = true;
      }
      
    });
  }


}
