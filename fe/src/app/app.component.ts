import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from './services/cart.service';
import { UserService } from './services/user.service';
import { AuthService } from '@auth0/auth0-angular';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'onlinebutikapp';
  badgeNumber: number = 0;
 

  constructor(public userService: UserService, 
              private router: Router,
              private cartService: CartService,
              public authService: AuthService,
              private cookieService: CookieService,
              private http: HttpClient){
   }

   
   ngOnInit() {
    this.cartService.obsNumber.subscribe(val => {
      this.badgeNumber = val;
      this.authService.user$.subscribe(v => {
        this.userService.getUserByEmail(v?.email!).subscribe(u => {
          this.userService.currentUser = u.body!;
        });
      });
    });
    
 
  }

  logOut() {
    this.userService.currentUser = UserService.controlUser;
    this.authService.logout({ returnTo: document.location.origin });
  }

  register() {
      this.authService.loginWithRedirect({ appState: { target: '/profile' } , screen_hint: 'signup'});  
  }

  login() {
    if(this.cartService.cart) this.cookieService.set('cart', this.cartService.cart!.id);
    this.authService.loginWithRedirect({appState: { target: '/profile' }});
  }
  
  openProfile(email: string){
    this.userService.getUserByEmail(email).subscribe(value => {
      if(value.body === null){
        this.router.navigate(['/register']);
      } else {
        this.userService.currentUser = value.body;
        this.router.navigate(['/profile']);
      }
    });
  }
}
