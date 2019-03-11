import { observable, computed } from 'mobx';

export class MobxCell {
  @observable left: MobxCell;
  @observable right: MobxCell;

  @observable rootSeed: number;

  @computed get seed(): number {
    if (this.left) {
      return this.left.seed;
    }
    if (this.right) {
      return this.right.seed;
    }
    return this.rootSeed;
  }

  @computed get value(): number {
    if (this.left && this.right) {
      return this.left.value + this.right.value;
    }
    return this.seed;
  }
}

export class MobxState {
  triangle: MobxCell[][];

  @computed get sum(): number {
    let s = 0;
    if (this.triangle) {
      for (const r of this.triangle) {
        for (const c of r) {
          s += c.value;
        }
      }
    }
    return s;
  }

  constructor(height: number, seed: number) {
    this.constructTriangle(height, seed);
  }

  public constructTriangle(height: number, seed: number): void {
    this.triangle = new Array<Array<MobxCell>>();
    for (let row = 0; row < height; row++) {
      this.triangle.push(new Array<MobxCell>());
      for (let col = 0; col <= row; col++) {
        const c = new MobxCell();
        c.rootSeed = seed;
        if (row > 0) {
          if (col > 0) {
            c.left = this.triangle[row - 1][col - 1];
          }
          if (col < row) {
            c.right = this.triangle[row - 1][col];
          }
        }
        this.triangle[row].push(c);
      }
    }
  }
}
