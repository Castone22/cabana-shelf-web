import {
  async,
  getTestBed,
  TestBed
} from '@angular/core/testing';
import {
  BaseRequestOptions,
  Http,
  Response,
  ResponseOptions,
  XHRBackend
} from '@angular/http';
import {
  MockBackend,
  MockConnection
} from '@angular/http/testing';

import { RestService } from './rest.service';
import { BookData } from '../models'
import {environment} from "../../../environments/environment";

describe('Rest Service', () => {
  let backend: MockBackend;
  let service: RestService;
  const testBooks = [
    { title: 'Ruby II: Back and Shinier than ever', read: true, pagesRead: 0, googleId: 'x553'},
    { title: 'Ruby III: Sharper than C', read: true, pagesRead: 34, googleId: '5913x'},
    { title: 'Javascript for Foobars', read: true, pagesRead: 34, googleId: 'xxt52f'}
  ];

  beforeEach(async(()=>{
    TestBed.configureTestingModule({
      providers: [
        BaseRequestOptions,
        MockBackend,
        RestService,
        {
          deps: [
            MockBackend,
            BaseRequestOptions
          ],
          provide: Http,
          useFactory: (backend: XHRBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backend, defaultOptions);
          }
        }
      ]
    });
    const testbed = getTestBed();
    backend = testbed.get(MockBackend);
    service = testbed.get(RestService);
  }));

  function setupConnections(backend: MockBackend, options: any) {
    backend.connections.subscribe((connection: MockConnection) => {
      if(connection.request.url === `${environment.endpoints.booksApi}/books.json`){
        const responseOptions = new ResponseOptions(options);
        const response = new Response(responseOptions);

        connection.mockRespond(response);
      }
    });
  }

  it('should retrieve a list of books from the server on a success', () => {
    setupConnections(backend, {body: testBooks, status: 200});
    let response = [];
    service.getBooks().subscribe((data: BookData[]) => {
      response = data;
    });
    expect(response.length).toBe(3);
    response.forEach( (it, index) => {expect(it.title).toBe(testBooks[index].title)});
  });

  it('should log an error should something go wrong', () => {
    setupConnections(backend, {
      body: { error: 'Something just broke. I\'m terribly sorry.' },
      status: 500,
    });
    spyOn(console, 'error');

    service.getBooks().subscribe(null, () => {
    });
    expect(console.error).toHaveBeenCalled()

  })

});
