/// <reference path="typings/angular2/angular2.d.ts" />
import {Component, View, NgFor, bootstrap, Query, QueryList} from 'angular2/angular2';
import {FieldComponent} from './fieldcomponent';
import {Engine} from './engine/chessboard'

//export module ChessUI {
    // Annotation section
    @Component({
        selector: 'chessboard'
        ,viewBindings: [FieldComponent]
    })
    @View({
        directives: [NgFor, FieldComponent],
        templateUrl: 'chessboard.html'
    })
    // Component controller

    export class ChessBoardComponent {
      public static singleton:ChessBoardComponent;

      board_ : Engine.ChessBoard = new Engine.ChessBoard()

      get board(): Engine.ChessBoard { return this.board_}

      get fields() { return this.board.fields }

      selectedPieceRow: number;
      selectedPieceCol: number;
      isPieceSelected: boolean=false;

      setSelectedPiece(row:number, col:number): void {
        this.isPieceSelected=true
        this.selectedPieceRow=row
        this.selectedPieceCol=col
        console.log("Set selected piece")
      }

      isLegalMove(toRow, toCol: number): boolean {
        if (!this.isPieceSelected)
          return false;
        return this.board.isLegalMove(this.selectedPieceRow, this.selectedPieceCol, toRow, toCol)
      }

      constructor() {
        ChessBoardComponent.singleton=this;
      }
    }
//}
