import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { ProfileComponent } from './auth/profile/profile.component';


import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './product/cart/cart.component';
import { ItemComponent } from './product/item/item.component';
import { ItemsComponent } from './product/items/items.component';
import { AuthGuard } from '@auth0/auth0-angular';

const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'login', component: LoginComponent},
    {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
    {path: 'item/:slug', component: ItemComponent},
    {path: 'items/:category/:type', component: ItemsComponent},
    {path: 'cart', component: CartComponent}
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})


export class RoutingModule {

}