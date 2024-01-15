import { HttpClient, HttpParams, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {  CartService } from "./cart.service";
import { Item, ItemService } from "./item.service";
import { UserService } from "./user.service";

export interface OrderItem {
    item: Item;
    size: string;
    amount: number;
    forPayment: number;
}

export interface Order {

    id?: string;
    status: string;
    userId: string;
    orderDate: Date;
    totalPrice: number;
    items:  OrderItem[];
    address: string;
    city: string;
    stars?: number;

}

@Injectable()
export class OrderService {
    

    constructor(private http: HttpClient, private userService: UserService, 
                private cartService: CartService, private itemService: ItemService) {
        
    }

    public insert(order: Order) : Observable<HttpResponse<Order>> {
        return this.http.post<Order>("http://localhost:8080/order/insert", order , {observe: "response"});
    }

    public deleteOrder(order: Order) :  Observable<HttpResponse<void>> {
        return this.http.get<void>("http://localhost:8080/order/delete/"+order.id, {observe: "response"});
    }

    public findAllByUserId(email: string) : Observable<HttpResponse<Order[]>>{
        return this.http.get<Order[]>("http://localhost:8080/order/findallbyiduser/"+email,  {observe: "response"});
    }

    public otherBoughtItems(slug: string) : Observable<HttpResponse<Item[]>>{
        return this.http.get<Item[]>("http://localhost:8080/order/otherboughtitems/"+slug,  {observe: "response"});
    }

    public makeOrder(  payment: number,  addres: string, city: string) : void {
        let order: Order = {
            totalPrice: payment,
            userId: this.userService.currentUser.email,
            orderDate: new Date(),
            address: addres,
            city: city,
            status: "going",
            items:[]
        }
        this.cartService.items.forEach(v => {
            let oi: OrderItem = {
                item: v.item,
                size: v.size,
                amount: v.amount,
                forPayment: v.amount*v.item.price
            }
            order.items.push(oi);
            this.itemService.updateItemAmount(v.item.id,v.size,v.amount).subscribe(v => {
                console.log(v.body);
            });
        });
        this.insert(order).subscribe(v => {
            this.cartService.updateOrderedCart(this.cartService.cart!).subscribe(c=>console.log(c));
        })

    }

    public updateOrderWithoutStars(order: Order): Observable<HttpResponse<Order>> {
        console.log(order);
        return this.http.post<Order>("http://localhost:8080/order/update", order , {observe: "response"});
    }
    public updateOrderWithStars(order: Order, stars: number): Observable<HttpResponse<Order>> {
        console.log(order);
        order.stars = stars;
        console.log(order);
        return this.http.post<Order>("http://localhost:8080/order/update", order , {observe: "response"});
    }

    public isOrderedItemByEmalAndSlug(email: string, slug: string): Observable<HttpResponse<boolean>> {
        let data = {
            "email": email,
            "slug": slug
        }
        console.log(data);
        return  this.http.post<boolean>("http://localhost:8080/order/isordereditembyemalandslug", data , {observe: "response"});
    }



}

