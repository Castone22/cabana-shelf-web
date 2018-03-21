import { Injectable } from '@angular/core';
import { BookData } from '../models'

@Injectable()
export class BookBinderService {
  private books: BookData[] = [];

  constructor() { }
  getBook(int: number) {return this.books[int]}
  getBooks() { return this.books }
  addBook(book: BookData) {this.books.push(book)}

  addBooks(...args: BookData[]) {
    args.forEach(book => {
      this.addBook(book)
    })
  }

  removeBook(book: BookData){
    const index = this.books.indexOf(book);
    if(index !== -1) {
      this.books.splice(index, 1)
    }
  }

  markRead(book: BookData) {
    const index = this.books.indexOf(book);
    if(index !== -1) {
      this.books[index].read = true;
    }
  }

  markUnRead(book: BookData) {
    const index = this.books.indexOf(book);
    if(index !== -1) {
      this.books[index].read = false;
    }
  }
}
