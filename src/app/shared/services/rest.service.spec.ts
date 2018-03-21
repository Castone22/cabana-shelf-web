import {
  async,
  getTestBed,
  TestBed
} from '@angular/core/testing';
import {
  BaseRequestOptions,
  Http, RequestMethod,
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
    { title: 'Ruby II: Back and Shinier than ever', read: true, pages_read: 0, googleId: 'x553', id: 1},
    { title: 'Ruby III: Sharper than C', read: true, pages_read: 34, google_id: '5913x', id: 2},
    { title: 'Javascript for Foobars', read: true, pages_read: 34, google_id: 'xxt52f', id: 3}
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
      } else if(connection.request.method === RequestMethod.Delete || connection.request.method === RequestMethod.Post){
        const responseOptions = new ResponseOptions(options);
        const response = new Response(responseOptions);

        connection.mockRespond(response);
      }
    });
  }

  it('should parse responses correctly', () => {
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
