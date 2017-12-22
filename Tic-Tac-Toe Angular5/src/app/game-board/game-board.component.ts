import { Component, OnInit } from '@angular/core';
import {EngineService} from '../gameplay/engine.service';
import {HistoryService} from '../gameplay/history.service';

@Component({
  selector: 'playground',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss']
})
export class GameBoardComponent implements OnInit {

  constructor(public engineService: EngineService, private historyService: HistoryService) { }

  ngOnInit() {
  }

  public startNewGame(): void {
    this.engineService.newGame();
  }

  public changeSides(): void {
    this.engineService.changeSides();
  }

  public description(party: string): string {
    if (this.engineService.humanPlayer === party) {
      return "(human player)";
    } else if (party === "-") {
      return "(draw)";
    } else {
      return "(computer player)";
    }
  }

  public victories(party: string): number {
    if ("(human player)" === party) {
      return this.historyService.victoriesHuman;
    }
    if ("(computer player)" === party) {
      return this.historyService.victoriesComputer;
    }
    return this.historyService.draw;
  }

}
