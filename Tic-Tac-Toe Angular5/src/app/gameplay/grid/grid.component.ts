import {Component} from "@angular/core";
import {Cell, Grid} from '../grid';
import {EngineService} from '../engine.service';

@Component({
  selector: 'grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent {

  constructor(public engineService: EngineService) {
  }


  public toggleCell(x: number, y: number): void {
    this.engineService.toggleCell(x, y);
  }

  private content(cell: Cell): string {
    if (cell == Cell.EMPTY) {
      return "";
    } else if (cell == Cell.X) {
      return "clear";
    } else if (cell == Cell.O) {
      return "panorama_fish_eye";
    }
    return "";
  }

  public empty(cell: Cell): boolean {
    return cell == Cell.EMPTY;
  }
}
