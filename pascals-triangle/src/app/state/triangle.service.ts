import { Injectable } from '@angular/core';
import { State } from './state';

@Injectable({
  providedIn: 'root'
})
export class TriangleService {
  public state: State = new State(100, 1);

  constructor() {}
}
