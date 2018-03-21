import { Injectable } from '@angular/core';
import {
  Http,
  Response
} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { BookData } from '../models'
import {environment} from "../../../environments/environment";

@Injectable()
export class RestService {
  constructor(private http: Http) { }

  getBooks() {
    return this.http.get(`${environment.endpoints.booksApi}/books.json`)
      .map((response) => {
        if(response.ok){
          return response.json() as BookData[]
        } else {
          return this.logError(response)
        }});
  }

  removeBook(book: BookData) {
    return this.http.delete(`${environment.endpoints.booksApi}/books/${book.id}`)
  }

  updateBookRead(book: BookData, status: boolean) {
    return this.http.post(`${environment.endpoints.booksApi}/books/${book.id}`,{read_status: status})
      .map((response) =>{
        if(response.ok) {
          return response.json() as BookData;
        } else {
          return this.logError(response);
        }});
  }

  private logError(error: any){
    console.error(error);
    return Observable.throw(error);
  }

}
