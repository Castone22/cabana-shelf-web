import { TestBed, inject } from '@angular/core/testing';

import { BookData } from '../models';
import { BookBinderService } from './book-binder.service';

describe('BookBinderService', () => {
  const bookFixtures: Array<BookData> = [
    {
      id: 1,
      title: 'Hello World',
      description: 'Computer says hello.',
      read: false,
      pages_read: 22,
      google_id: '9x44'
    } as BookData,
    {
      id: 2,
      title: 'Ruby Rox: A shiny language',
      read: true,
      pages_read: 256,
      google_id: '955xx4',
      notes: ['Ruby is a dynamic language', 'Modules are like a building block for a class.']
    } as BookData
  ];
  let service: BookBinderService;
  beforeEach(() => {
    service = new BookBinderService();
  });
  it('should yield an empty array given no books were bound', () => {
    expect(service.getBooks()).toEqual([]);
  });
  it('should give back a book that was added', () => {
    service.addBook(bookFixtures[0]);
    expect(service.getBooks()).toEqual([bookFixtures[0]]);
  });
  it('should be able to fetch a single book', () => {
    service.addBooks(...bookFixtures);
    expect(service.getBook(1)).toEqual(bookFixtures[1]);
  });
  it('should contain both books if we add both of them',()=>{
    service.addBook(bookFixtures[0]);
    service.addBook(bookFixtures[1]);
    expect(service.getBooks()).toEqual([bookFixtures[0], bookFixtures[1]]);
  });
  it('add books can add multiple books',()=>{
    service.addBooks(bookFixtures[0], bookFixtures[1]);
    expect(service.getBooks()).toEqual([bookFixtures[0], bookFixtures[1]]);
  });
  it('add books can take any number of arguments and books are not unique',()=>{
    service.addBooks(bookFixtures[0], bookFixtures[1], bookFixtures[1]);
    expect(service.getBooks()).toEqual([bookFixtures[0], bookFixtures[1], bookFixtures[1]]);
  });
  it('will remove a book when removeBooks is called', ()=>{
    service.addBooks(bookFixtures[0], bookFixtures[1]);
    service.removeBook(bookFixtures[0]);
    expect(service.getBooks()).toEqual([bookFixtures[1]]);
  });

  it('can update the read status on a given book', ()=>{
    service.addBooks(bookFixtures[0], bookFixtures[1]);
    service.markRead(bookFixtures[1]);
    expect(service.getBook(1).read).toEqual(true);
    service.markUnRead(bookFixtures[1]);
    expect(service.getBook(1).read).toEqual(false);
  });

});
