import { HttpClient, HttpParams, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

export interface Comment {
    id?: string,
    comment: string,
	stars: number,
	idItem: string,
	userEmail: string,
	date: Date
}

@Injectable()
export class CommentService {
    
    constructor(private http: HttpClient) {
        
    }

    public findAllByIdItem(idItem: string) : Observable<HttpResponse<Comment[]>>{
        let data = new HttpParams().set("idItem" , idItem)
        return this.http.get<Comment[]>("http://localhost:8080/comment/findallbyiditem",  {observe: "response", params: data});
    }

    public countStars(idItem: string) : Observable<HttpResponse<number>>{
        let data = new HttpParams().set("idItem" , idItem)
        return this.http.get<number>("http://localhost:8080/comment/countstars",  {observe: "response", params: data});
    }

    public addComment(commentText: string, stars: number, idItem: string, userEmail: string): Observable<HttpResponse<Comment>>{
        let date = new Date();
        let comment: Comment = {
            comment: commentText,
	        stars: stars,
	        idItem: idItem,
	        userEmail: userEmail,
	        date: date
        }
        return this.http.post<Comment>("http://localhost:8080/comment/insert", comment, {observe: "response"});
    }
}