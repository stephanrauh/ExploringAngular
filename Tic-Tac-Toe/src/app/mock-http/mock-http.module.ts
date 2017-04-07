import {Inject, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MockBackend, MockConnection} from "@angular/http/testing";
import {
  BaseRequestOptions, Connection, Http, HttpModule, RequestMethod, Response, ResponseOptions, ResponseType,
  XHRBackend
} from '@angular/http';
import 'rxjs/Rx';
import {Observable} from "rxjs";

import {OpaqueToken} from "@angular/core";
export const REAL_HTTP = new OpaqueToken("real http service");


export function mockHttpFactory(mockBackend, options) {
  return new Http(mockBackend, options);
}

export function realHttpFactory(xhrBackend, options) {
  return new Http(xhrBackend, options);
}

@NgModule({
  imports: [
    CommonModule,
    HttpModule
  ],
  providers: [
    {
      provide: Http,
      useFactory: mockHttpFactory,
      deps: [MockBackend, BaseRequestOptions]
    },
    {provide: REAL_HTTP, useFactory: realHttpFactory, deps: [XHRBackend, BaseRequestOptions]},
    MockBackend,
    XHRBackend,
    BaseRequestOptions
  ]
})
export class MockHttpModule {

  constructor(mockBackend: MockBackend, @Inject(REAL_HTTP) realHttp: Http) {
    mockBackend.connections
      .delay(500)
      .flatMap((connection: MockConnection) => {
        return this.deviateRequestToAssetsFolder(connection, realHttp);
      }).subscribe();
  }

  private deviateRequestToAssetsFolder(connection: MockConnection, realHttp: Http) {

    let url = connection.request.url;
    if (!!url) {
      if (url.startsWith("https://example.com/rest/")) {
        url = "/assets/mock/" + url.substring("https://example.com/rest/".length);
        let methodname= RequestMethod[connection.request.method];
        url += "/" + methodname + ".json";
      }
    }
    const responseObservable: Observable<void> = realHttp.get(url).map(
      response => {
        MockHttpModule.onSuccess(connection, response);
      },
      error => {
        MockHttpModule.onSuccess(connection, error)
      }
    );
    return responseObservable;
  }

  private static onSuccess(connection: MockConnection, response: Response): void {
    connection.mockRespond(response);
  }

  private static onError(connection: MockConnection, response: Response): void {
    const response2 = new Response(new ResponseOptions({
      type: response.type,
      status: response.status,
      statusText: response.statusText,
      url: response.url,
      body: response.text()
    }));
    connection.mockRespond(response2);
  }
}
