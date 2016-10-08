import {Component} from '@angular/core';
import {Input} from "@angular/core";
import {ChessBoardComponent} from '../chessboard/chessboardcomponent';
import {ChessEngineAPI} from '../engine/chessboardUI'


@Component({
  selector: 'row',
  templateUrl: './RowComponent.html',
  inputs: ['row'],
  outputs: ['row']
})
export class RowComponent {
  public _row: number;

  public set row(index:number) {
    this._row=index;
    console.log("RowComponent.setRow(" + index + ")")
  }

  public get row() {
    console.log("getting row" + this._row)
    return this._row;
  }

//  private chessboard: ChessEngineAPI.ChessboardUI
  constructor(private chessboard: ChessEngineAPI.ChessboardUI) {
  }
}
