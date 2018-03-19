import {AfterViewInit, Component} from '@angular/core';
import {BookBinderService} from "../shared/services/book-binder.service";
import {RestService} from "../shared/services/rest.service";
import {BookData} from "../shared/models";
import {$} from "jquery";

@Component({
  selector: 'app-shelf',
  templateUrl: './shelf.component.html',
  styleUrls: ['./shelf.component.css']
})
export class ShelfComponent implements AfterViewInit {

  books: BookData[] = [];
  restService: RestService;

  constructor(private bookBinderService: BookBinderService, restService: RestService) {
    restService.getBooks().subscribe((books: BookData[]) => {
      this.bookBinderService.addBooks(...books);
      this.books = bookBinderService.getBooks();
    });
    this.restService = restService
  }

  unshelfBook(book: BookData) {
    this.restService.removeBook(book).subscribe(null, (error: any) => {console.log(error)}, ()=>{
      this.bookBinderService.removeBook(book);
      this.bookBinderService.getBooks();
    });


  }

  ngAfterViewInit() {
    $('.collapsible').collapsible();
  }

}
