import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { Item } from "./item.service";

export interface CartItem {
    itemId: string;
    size: string;
    amount: number;
    forPayment: number;
}

export interface Cart {
    id: string;
    status: string;
    userId: string;
    lastModified: Date;
    orderDate: Date;
    totalPrice: number;
    items: CartItem[];
}

@Injectable()
export class CartService {

    cart: Cart | undefined;
    cartNumber:number = 0;
    obsNumber: Subject<number>;
    payment: number = 0;
    obsPayment: Subject<number>;
    items:  {item: Item, size: string, amount: number }[] = []


    constructor(private http: HttpClient) { 
        this.obsNumber = new Subject();
        this.obsPayment = new Subject();
    }

    findById(cartId: string): Observable<HttpResponse<Cart>> {
        return this.http.get<Cart>("http://localhost:8080/cart/findbyid/"+ cartId , {observe: "response"});
    }

    getAmount(cart: Cart): Observable<HttpResponse<number>> {
        return this.http.post<number>("http://localhost:8080/cart/getamount", cart , {observe: "response"});
    }

    forPayment(cart: Cart): Observable<HttpResponse<number>> {
        return this.http.post<number>("http://localhost:8080/cart/forpayment", cart , {observe: "response"});
    }

    addToCart(cartId: string,  itemId: string,  size: string): Observable<HttpResponse<Cart>> {
        let requestData = {
            "cartId": cartId,
            "itemId": itemId,
            "size": size
        }
        return this.http.post<Cart>("http://localhost:8080/cart/addtocart", requestData , {observe: "response"});
    }

    removeFromCart(cartId: string,  itemId: string, size: string): Observable<HttpResponse<Cart>> {
        let data = {
            "cartId": cartId,
            "itemId": itemId,
            "size": size
        }
        //console.log(data);
        return this.http.post<Cart>("http://localhost:8080/cart/removefromcart", data , {observe: "response"});
        
    }

    createCart(  itemId: string,  size: string): Observable<HttpResponse<Cart>> {
        let data = {
            "itemId": itemId,
            "size": size
        }
         return this.http.post<Cart>("http://localhost:8080/cart/createcart", data , {observe: "response"});
    }

    emptyCart(cart: Cart): Observable<HttpResponse<Cart>> {
        this.cart = undefined;
        this.cartNumber = 0;
        this.payment = 0;
        this.items = [];
        this.obsNumber.next(0);
        this.obsPayment.next(0);
        return this.http.post<Cart>("http://localhost:8080/cart/emptycart", cart , {observe: "response"});
    }

    updateOrderedCart(cart: Cart): Observable<HttpResponse<Cart>> {
        this.cart = undefined;
        this.cartNumber = 0;
        this.payment = 0;
        this.items = [];
        this.obsNumber.next(0);
        this.obsPayment.next(0);
        return this.http.post<Cart>("http://localhost:8080/cart/updateorderedcart", cart , {observe: "response"});
    }
    
    findAllItems(cart: Cart): Observable<HttpResponse<Item[]>> {
        return this.http.post<Item[]>("http://localhost:8080/cart/findallitems", cart , {observe: "response"});
    }

    countItems(): number {
        let a = 0;
        let b = 0;
        if(this.cart?.items !== []){
            this.cart?.items.forEach(i => {
                a += i.amount;
                b += i.amount*i.forPayment;
            }); 
        }
    
        this.cartNumber = a;
        this.payment = b;
        this.obsNumber.next(this.cartNumber);
        this.obsPayment.next(this.payment);
        return a;
    }







}