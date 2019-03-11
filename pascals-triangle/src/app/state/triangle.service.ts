import { Injectable } from '@angular/core';
import { State } from './state';
import { MobxState } from './mobx-state';

@Injectable({
  providedIn: 'root'
})
export class TriangleService {
  public state: State = new State(150, 1);
  public mobxstate: MobxState = new MobxState(250, 1);
  public mobxDuration: number;

  private _seed = 1;

  public get seed() {
    return this._seed;
  }

  public set seed(s: number) {
    this._seed = +s;
    this.state.seed = +s;
    const t0 = performance.now();
    this.mobxstate.triangle[0][0].rootSeed = +s;
    console.log(this.mobxstate.sum);
    const t1 = performance.now();
    this.mobxDuration = Math.round(1000 * (t1 - t0)) / 1000;
  }

  constructor() {}
}
