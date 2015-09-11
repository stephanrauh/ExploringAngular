/// <reference path="../typings/angular2/angular2.d.ts" />

import {Injectable} from 'angular2/angular2';

export module Engine {
    @Injectable() export class ChessboardUI {
        selectedPieceRow: number;
        selectedPieceCol: number;
        isPieceSelected: boolean = false;

        private chessboard: Chessboard = new Chessboard();

        get fields(): number[][] {
            return this.chessboard.fields;
        }

        onclick(row: number, col: number): void {
            if (!this.isPieceSelected)
                this.setSelectedPiece(row, col);
            else {
                this.isPieceSelected = false;
                if (this.chessboard.isLegalMove(this.selectedPieceRow, this.selectedPieceCol, row, col)) {
                    this.chessboard.move(this.selectedPieceRow, this.selectedPieceCol, row, col);
                }
            }
        }

        setSelectedPiece(row: number, col: number): void {
            if (this.chessboard.fields[row][col] != 0) {
                this.isPieceSelected = true
                this.selectedPieceRow = row
                this.selectedPieceCol = col
            }
        }

        isLegalMove2(toRow: number, toCol: number): boolean {
            if (!this.isPieceSelected)
                return false;
            return this.chessboard.isLegalMove(this.selectedPieceRow, this.selectedPieceCol, toRow, toCol)
        }

    }

    class Chessboard {
        constructor() {
            console.log("new Chessboard!")
        }
        private _fields: number[][] = [
            [-2, -3, -4, -5, -6, -4, -3, -2],
            [-1, -1, -1, -1, -1, -1, -1, -1],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [1, 1, 1, 1, 1, 1, 1, 1],
            [2, 3, 4, 5, 6, 4, 3, 2]
        ];

        get fields(): number[][] {
            return this._fields;
        }

        isLegalMove(fromRow, fromCol, toRow, toCol: number): boolean {
            var piece: number = this.fields[fromRow][fromCol]
            var targetPiece: number = this.fields[toRow][toCol]
            if (targetPiece > 0 && piece > 0)
                return false;
            if (targetPiece < 0 && piece < 0)
                return false;
            return true;
        }

        move(fromRow, fromCol, toRow, toCol: number): void {
            var piece: number = this.fields[fromRow][fromCol]
            var targetPiece: number = this.fields[toRow][toCol]
            this.fields[fromRow][fromCol] = 0;
            this.fields[toRow][toCol] = piece;
        }
    }
}
