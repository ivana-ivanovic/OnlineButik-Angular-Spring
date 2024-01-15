import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { CookieService } from 'ngx-cookie-service';
import { Cart, CartService } from 'src/app/services/cart.service';
import { Item, ItemService } from 'src/app/services/item.service';
import { User, UserService } from 'src/app/services/user.service';
import { OrderComponent } from '../order/order.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  dataSource!: MatTableDataSource<{item: Item, size: string, amount: number }>;
  payment!: number;
  currentUser!: User;
  displayedColumns: string[] = ['image', 'name', 'size', 'amount', 'price', 'delete'];
  cart!: Cart;

  constructor( private cartService: CartService, 
               private userService: UserService,
               public itemService: ItemService, 
               public dialog: MatDialog,
               private router: Router, 
               private cookieService: CookieService,
               public authService: AuthService) { 
                  this.currentUser = userService.currentUser;
               }

  ngOnInit(): void {
    
    let tableData: {item: Item, size: string, amount: number }[] = [];
    if(this.cartService.cart === undefined ){
      this.payment =0;
    } else {
      
      this.cartService.findById(this.cartService.cart.id).subscribe(i => {
        if(i.body) this.cart = i.body;
        let items: Item[] = [];
        this.cartService.findAllItems(this.cart!).subscribe(i => {
          if(i.body)  items = i.body;
          items.forEach(item => {
            if(this.cartService.cart) {
              let cartItem = this.cartService.cart.items.filter(i => i.itemId === item.id && i);
              if(cartItem){   
                cartItem.forEach(ci => {
                  let itemRow: {item: Item, size: string, amount: number } = {
                    item: item,
                    amount: ci.amount,
                    size: ci.size
                  };
                  //console.log(cartItem)
                  tableData.push(itemRow);
                })
                
              }
            }

            this.cartService.obsPayment.subscribe(value => {
              this.payment = value 
            });

          });

          //console.log(tableData)
          if(!this.dataSource) {
            this.cartService.items = tableData;
            this.dataSource = new MatTableDataSource<{item: Item, size: string, amount: number }>(tableData);
            //console.log(this.dataSource.data)
          }
        })
      })


      this.cartService.forPayment(this.cartService.cart).subscribe(value => {
        if(value.body)this.payment = value.body;
      });
      
    }
    
  }

  delete(element: {item: Item, size: string, amount: number }){
    if(this.cartService.cart !== undefined )
      this.cartService.removeFromCart(this.cartService.cart.id, element.item.id, element.size).subscribe(value => {
        if(value.body){
          this.cartService.cart = value.body;
          let a = this.cartService.countItems();
          if(a === 0) {
            this.emptyCart();
            this.cartService.cart.totalPrice = 0;
            this.cartService.items = [];
            this.dataSource.data = [];
          } else {
            this.payment = this.cartService.cart.totalPrice;
            this.dataSource.data = this.dataSource.data.filter(s => {
              if(s.item.id === element.item.id && s.size == element.size) return false;
              else return true;
            });
            this.cartService.items = this.dataSource.data;
          }
          
        }
      });
  }

  openDialog(email: string){
    console.log(this.authService.user$)
    this.userService.getUserByEmail(email).subscribe(value => {
      //console.log(value);
      if(value.body === null){
        this.router.navigate(['/register']);
      } else {
        this.userService.currentUser = value.body;
        const dialogRef = this.dialog.open(OrderComponent, {
          width: '600px',
          data: email
        });
      }
    })
   
  }

  emptyCart(){
    if(this.cartService.cart !== undefined ) this.cartService.emptyCart(this.cartService.cart);
    this.cartService.cart = undefined;
    this.payment = 0;
    this.cartService.items = [];
  }  

  login() {
    this.cookieService.set('cart', this.cart.id);
    this.authService.loginWithRedirect({appState: { target: '/profile' }});
  }


}
