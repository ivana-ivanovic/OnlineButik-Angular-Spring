import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Cart, CartService } from 'src/app/services/cart.service';
import { Comment, CommentService } from 'src/app/services/comment.service';
import { Item, ItemService } from 'src/app/services/item.service';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  slug: string = '';
  item!: Item;
  selectedSize!: string;
  message: boolean = false;
  itemsSimilar: Item[] = [];
  otherBought: Item[]= [];
  isFavourite: boolean = false;
  isLogged: boolean = false;
  isOrdered: boolean = false;
  ratingArr: number[] = [];
  @Input('rating') rating: number = 3;
  @Input('starCount') starCount: number = 5;
  commentArray: Comment[] = [];

  constructor(private itemService: ItemService,
              private cartService: CartService,
              private userService: UserService,  
              private commentService: CommentService,
              private orderService: OrderService,
              private route: ActivatedRoute,
              public authService: AuthService) { 
   
  }

  ngOnInit(): void {
    console.log(this.userService.currentUser)
    this.route.params.subscribe(queryParams => {
      this.slug = queryParams['slug'];
      this.itemService.findBySlug(this.slug).subscribe(value => {
        this.item = value.body as Item;
        this.itemService.getSimilarItems(this.item).subscribe( v => this.itemsSimilar = v.body!.filter(item => item.slug !== this.item.slug) );
        this.orderService.otherBoughtItems(this.item.slug).subscribe( v => this.otherBought = v.body!.filter(item => item.slug !== this.item.slug) );
        let b = this.userService.currentUser.favouriteItems?.find( f => f == this.item.id )
        if(b) this.isFavourite = true;
        else this.isFavourite = false;
        this.authService.user$.subscribe( v => this.isLogged = true );
        this.commentService.findAllByIdItem(this.item.id).subscribe( v=> this.commentArray = v.body! );
        this.orderService.isOrderedItemByEmalAndSlug(this.userService.currentUser.email, this.item.slug).subscribe(v => this.isOrdered = v.body!)
      });
    });

    for (let index = 0; index < this.starCount; index++) {
      this.ratingArr.push(index);
    }
  }

  onValChange(event: any){
    this.selectedSize = event.value;
  }
  addToCart(){
    if(this.selectedSize === undefined){
      this.message = true;
    } else {
      this.message = false;
      let b = false;
      this.item.amount.forEach(i => {
        if(i.name === this.selectedSize && i.amount < 1){b=true;}
      })
      if(!b){
        if(this.cartService.cart === undefined){
          this.cartService.createCart(this.item.id, this.selectedSize).subscribe(value => {
            this.cartService.cart = value.body as Cart;
            this.cartService.countItems();
          })
        } else {
          this.cartService.addToCart(this.cartService.cart.id,this.item.id, this.selectedSize).subscribe(value => {
            this.cartService.cart = value.body as Cart;
            this.cartService.countItems();
          })
        }
      } else {
        alert("Nemamo "+this.selectedSize+" velicinu na stanju.")
      }
    }
  }

  toggleFavourite(){
    if(this.isFavourite == true) {
      this.userService.deleteFavouriteItemByItemId(this.item.id.toString());
      this.isFavourite = false;
    } else {
      this.userService.addFavouriteItemByItemId(this.item.id.toString());
      this.isFavourite = true;
    }
  }

  onClick(rating:number) {
    this.rating = rating;
  }

  showIcon(index:number) {
    if (this.rating >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }

  onSubmit(form: NgForm){
    this.commentService.addComment(form.value.commentInput, this.rating, this.item.id, this.userService.currentUser.email).subscribe(v=>{
      this.commentArray.push(v.body!);
      this.commentService.countStars(this.item.id).subscribe(stars => {
        this.item.stars = stars.body!;
        this.itemService.updateItemStars(this.item).subscribe(item => this.item = item.body!);
      });
    });
  }

}
