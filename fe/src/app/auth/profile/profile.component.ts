import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { EditOrderComponent } from 'src/app/product/edit-order/edit-order.component';
import { CartService } from 'src/app/services/cart.service';
import { Item, ItemService } from 'src/app/services/item.service';
import { Order, OrderService } from 'src/app/services/order.service';
import { User, UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @ViewChild('favouriteItemsPaginator', {static: true}) paginatorFavouriteItems!: MatPaginator;
  @ViewChild('orderPaginator', {static: true}) paginatorOrders!: MatPaginator;


  isEditing: boolean = false;
  profileInput: User = this.userService.currentUser;
  birthDate: Date = new Date(this.profileInput.date);

  favouriteItems: Item[] = [];
  obsFavouriteItems!: Observable<any>;
  dataSourceFavouriteItems!: MatTableDataSource<Item>;

  orderArray: Order[] = [];
  dataSourceOrders!: MatTableDataSource<Order>;
  obsOrders!: Observable<any>;

  constructor(public authService: AuthService, 
              public itemService: ItemService,
              public userService: UserService,
              public orderService: OrderService,
              private cartService: CartService,
              private changeDetectorRefFavouriteItems: ChangeDetectorRef,
              private changeDetectorRefOrders: ChangeDetectorRef,
              private cookieService: CookieService,
              public router: Router,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.authService.user$.subscribe(v => {
      this.userService.getUserByEmail(v?.email!).subscribe(u => {
        if(u.body !== null) {
          this.userService.currentUser = u.body;
          this.profileInput = this.userService.currentUser;
          if(this.cookieService.check('cart')){
            let idCart = this.cookieService.get('cart');
            this.cartService.findById(idCart).subscribe(v => {
              this.cartService.cart = v.body!;
              this.cartService.getAmount(this.cartService.cart!).subscribe(v => this.cartService.obsNumber.next(v.body!));
            });
            this.cookieService.delete('cart');
          }
          
          this.itemService.getFavouriteItems(this.userService.currentUser).subscribe(v => {
            this.favouriteItems = v.body!;
            this.dataSourceFavouriteItems = new MatTableDataSource<Item>(this.favouriteItems);
            this.obsFavouriteItems = this.dataSourceFavouriteItems.connect();
            this.dataSourceFavouriteItems.paginator = this.paginatorFavouriteItems;
            this.changeDetectorRefFavouriteItems.detectChanges();
      
            this.orderService.findAllByUserId(this.userService.currentUser.email).subscribe(c => {
              this.orderArray = c.body!;
              this.dataSourceOrders = new MatTableDataSource<Order>(this.orderArray);
              this.obsOrders = this.dataSourceOrders.connect();
              this.dataSourceOrders.paginator = this.paginatorOrders;
              this.changeDetectorRefOrders.detectChanges();
            });
          });
        } else {
          this.router.navigate(['/register']);
        }
      });
    });

  }

  finishEditing(f: NgForm){
    var user: User = this.userService.makeUser(f.value.name, f.value.surname, f.value.address, f.value.city, 
                                              this.userService.currentUser.email, f.value.dateBirth, 
                                              this.userService.currentUser.nickName, 
                                              this.userService.currentUser.picture, f.value.phoneNumber);
    user.id = this.userService.currentUser.id;
    this.userService.update(user).subscribe(v => {
      this.router.navigate(['/profile']);
      this.isEditing = false;
    });
  }

  deleteFavourite(f: Item) {
    this.favouriteItems = this.favouriteItems.filter(fI=> fI.id !== f.id);
    this.dataSourceFavouriteItems.data = this.favouriteItems;
    this.userService.deleteFavouriteItemByItemId(f.id);
  }

  doFilter(event: any) {this.dataSourceOrders.filter = event.target.value.trim().toLowerCase();  } 

  getOrderStatus(order: Order){return order.status; }

  openDialog(order: Order){
    const dialogRef = this.dialog.open(EditOrderComponent, {
      width: '600px',
      data: order
    });
    dialogRef.afterClosed().subscribe(result => {
      this.dataSourceOrders.data = this.orderArray;
    });
  }

  deleteOrder(order: Order){
     this.orderService.deleteOrder(order).subscribe(v => {
      this.orderArray = this.orderArray.filter(e => e.id !== order.id);
      this.dataSourceOrders.data = this.orderArray;
     });
  }

}
