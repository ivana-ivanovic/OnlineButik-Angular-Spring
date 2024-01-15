import { HttpClient, HttpParams, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "./user.service";

export interface Size {
    name: string;
    amount: number;

}


export interface Item {
    id: string;
    name: string;
    image: string;
    category: string;
    type: string;
    amount: Size[];
    stars: number;
    price: number;
    description: string;
    country: string,
    slug: string
}

@Injectable()
export class ItemService {

    constructor(private http: HttpClient) {
        
    }

    public findAllByCategoryAndType(category: string, type: string) : Observable<HttpResponse<Item[]>> { 
        let data = new HttpParams().set("category" , category).set("type", type);
        return this.http.get<Item[]>("http://localhost:8080/items/findallbycategoryandtype", {observe: "response", params: data});
    }

    public findBySlug(slug: string) : Observable<HttpResponse<Item>>{
        let data = new HttpParams().set("slug" , slug);
        return this.http.get<Item>("http://localhost:8080/items/findbyslug/"+slug, {observe: "response"});
    }

    public findById(id: string) : Observable<HttpResponse<Item>>{
        return this.http.get<Item>("http://localhost:8080/items/findbyid/"+id, {observe: "response"});
    }

    public getFavouriteItems(user: User) : Observable<HttpResponse<Item[]>>{
        return this.http.post<Item[]>("http://localhost:8080/items/getfavouriteitems", user, {observe: "response"});
    }

    public updateItemAmount(  itemId: string, size: string,  amount: number): Observable<HttpResponse<Item>> {
        let data = {
            "itemId": itemId,
            "amount": amount,
            "size": size
        }
         return this.http.post<Item>("http://localhost:8080/items/updateitemamount", data , {observe: "response"});
    }

    public updateItemStars(  item: Item ): Observable<HttpResponse<Item>> {
         return this.http.post<Item>("http://localhost:8080/items/updateitemstars", item , {observe: "response"});
    }

    public getSimilarItems(item: Item) : Observable<HttpResponse<Item[]>> {
        return this.http.get<Item[]>("http://localhost:8080/items/getsimilaritems/"+item.id, {observe: "response"});
    }
}