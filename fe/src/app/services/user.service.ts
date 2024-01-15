import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Cart } from "./cart.service";

export interface User {
    id?: string;
    name: string;
    surname: string;
    address: string;
    city: string;
    email: string;
    date: Date;
    nickName: string;
    picture: string;
    phoneNumber: string;
    favouriteItems?: string[];
}

@Injectable()
export class UserService {

    
    static controlUser: User = {
        id: "",
        name: '',
        surname: '',
        address: '',
        city: '',
        email: '',
        date: new Date,
        nickName : '',
        picture: '',
        phoneNumber: "",
        favouriteItems: []
    };
    currentUser: User = UserService.controlUser;

    constructor(private http: HttpClient) {
        
    }
    
    public findAll() : Observable<HttpResponse<User[]>> {
        return this.http.get<User[]>("http://localhost:8080/users/findall", {observe: "response"});
    }
    public insert(user: User) : Observable<HttpResponse<User>> {
        this.currentUser = user;
        return this.http.post<User>("http://localhost:8080/users/insert", user , {observe: "response"});
    }
    public update(user: User) : Observable<HttpResponse<User>> {
        this.currentUser = user;
        return this.http.post<User>("http://localhost:8080/users/update", user , {observe: "response"});
    }
    public makeUser(name: string, surname: string, address: string, city: string, 
        email: string,  dateBirth: Date, picture: string, nickName: string, phoneNumber: string) : User{
            let user: User = { 
                name: name, 
                surname: surname,
                address: address, 
                city: city, 
                email: email,
                date: dateBirth,
                nickName: nickName,
                picture: picture,
                phoneNumber: phoneNumber 
            }
            return user;
    }

    public getUserByEmail(email: string) : Observable<HttpResponse<User>> {
        return this.http.get<User>("http://localhost:8080/users/findbyemail/"+email, {observe: "response"});
    }

    public deleteFavouriteItemByItemId(favourite: string){
        if(this.currentUser.favouriteItems === undefined || this.currentUser.favouriteItems === null){
            this.currentUser.favouriteItems = [];
        } else {
            let a = this.currentUser.favouriteItems.filter(f => f !== favourite  );
            if(a) {
                this.currentUser.favouriteItems = a;
                this.update(this.currentUser).subscribe(user => this.currentUser = user.body!)
            }
        }
        
    }

    public addFavouriteItemByItemId(favourite: string) {
        if(this.currentUser.favouriteItems === undefined || this.currentUser.favouriteItems === null){
            this.currentUser.favouriteItems = [];
            this.currentUser.favouriteItems.push(favourite);
        } else {
            this.currentUser.favouriteItems.push(favourite);
        }
        this.update(this.currentUser).subscribe(user => this.currentUser = user.body!)
    }
        




}