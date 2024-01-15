import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { RegisterComponent } from './auth/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { RoutingModule } from './routing.module';
import { UserService } from './services/user.service';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { ProfileComponent } from './auth/profile/profile.component';
import { ItemsComponent } from './product/items/items.component';
import { ItemComponent } from './product/item/item.component';
import { ItemFilterComponent } from './product/item-filter/item-filter.component';
import { ItemService } from './services/item.service';
import { CartComponent } from './product/cart/cart.component';
import { CartService } from './services/cart.service';
import { OrderComponent } from './product/order/order.component';
import { AuthModule } from '@auth0/auth0-angular';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthHttpInterceptor } from '@auth0/auth0-angular';
import { OrderService } from './services/order.service';
import { EditOrderComponent } from './product/edit-order/edit-order.component';
import { CommentService } from './services/comment.service';
import { CookieService } from 'ngx-cookie-service';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    HomeComponent,
    LoginComponent,
    ProfileComponent,
    ItemsComponent,
    ItemComponent,
    ItemFilterComponent,
    CartComponent,
    OrderComponent,
    EditOrderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    RoutingModule,
    HttpClientModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    AuthModule.forRoot({
      domain: "dev-s2l3n3j7.us.auth0.com",
      clientId: "dbGVrOgDT5cvgwzBvWxaZgnA9qL3JSfF",
      redirectUri: window.location.origin,
      audience: "http://localhost:8080/online_butik",
      httpInterceptor: {
        allowedList: ['http://localhost:8080/cart/updateorderedcart',
                      'http://localhost:8080/comment/insert',
                      'http://localhost:8080/order/insert',
                      'http://localhost:8080/order/update',
                      'http://localhost:8080/order/isordereditembyemalandslug',
                      'http://localhost:8080/users/insert',
                      'http://localhost:8080/users/update'
                    ],
      }
    })
  ],
  providers: [
    UserService,
    ItemService,
    CartService,
    OrderService,
    CommentService,
    HttpClientModule,
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
