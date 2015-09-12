/// <reference path="../typings/angular2/angular2.d.ts" />

import {Injectable} from 'angular2/angular2';
import {Move} from './move';
import {Moves} from './moves';

export module Engine {
    @Injectable() export class ChessboardUI {
        selectedPieceRow: number;
        selectedPieceCol: number;
        isPieceSelected: boolean = false;

        private chessboard: Chessboard = new Chessboard(new Array<Move>());

        get fields(): number[][] {
            return this.chessboard.fields;
        }

        get isWhitePlaying(): boolean { return this.chessboard.isWhitePlaying }

        get capturedPieces(): Array<number> { return this.chessboard.capturedPieces }

        onclick(row: number, col: number): void {
            if (!this.isPieceSelected)
                this.setSelectedPiece(row, col);
            else {
                this.isPieceSelected = false;
                if (this.chessboard.isLegalMove(this.selectedPieceRow, this.selectedPieceCol, row, col)) {
                    this.chessboard.move(this.selectedPieceRow, this.selectedPieceCol, row, col, this.isWhitePlaying?5:-5);
                }
            }
        }

        setSelectedPiece(row: number, col: number): void {
            var piece = this.chessboard.fields[row][col];
            if (this.isWhitePlaying) {
                if (piece <= 0) return;
            } else {
                if (piece >= 0) return;
            }

            this.isPieceSelected = true
            this.selectedPieceRow = row
            this.selectedPieceCol = col
        }


        isLegalMove2(toRow: number, toCol: number): boolean {
            if (!this.isPieceSelected)
                return false;
            return this.chessboard.isLegalMove(this.selectedPieceRow, this.selectedPieceCol, toRow, toCol)
        }

    }

    export class Chessboard {
        constructor(public moveHistory: Array<Move>, executeMove: boolean = false) {
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

        capturedPieces: Array<number> = new Array<number>();

        private _isWhitePlaying: boolean = true;

        whiteKingHasMoved: boolean = false;
        whiteLeftRookHasMoved: boolean = false;
        whiteRightRookHasMoved: boolean = false;
        blackKingHasMoved: boolean = false;
        blackLeftRookHasMoved: boolean = false;
        blackRightRookHasMoved: boolean = false;
        enPassantCol = -1;

        private _moves: Moves = new Moves(this);

        get isWhitePlaying(): boolean { return this._isWhitePlaying }

        get fields(): number[][] {
            return this._fields;
        }

        isLegalMove(fromRow, fromCol, toRow, toCol: number): boolean {
            var piece: number = this.fields[fromRow][fromCol]
            if (this.isWhitePlaying) {
                if (piece < 0) return false;
            } else {
                if (piece > 0) return false;
            }

            var targetPiece: number = this.fields[toRow][toCol]
            if (this.isWhitePlaying) {
                if (targetPiece > 0) return false;
            } else {
                if (targetPiece < 0) return false;
            }
            if (targetPiece > 0 && piece > 0)
                return false;
            if (targetPiece < 0 && piece < 0)
                return false;

            return this._moves.isLegalMove(fromRow, fromCol, toRow, toCol);
        }

        move(fromRow, fromCol, toRow, toCol: number, promotion: number): void {
            var piece: number = this.fields[fromRow][fromCol]
            var targetPiece: number = this.fields[toRow][toCol]
            this.fields[fromRow][fromCol] = 0;
            this.fields[toRow][toCol] = piece;
            this._isWhitePlaying = !this._isWhitePlaying
            this._moves = new Moves(this) // clear the list of legal moves

            if (piece==1 && fromRow==1 && toRow==0) {
              this.fields[toRow][toCol] = promotion;
            }
            else if (piece==-1 && fromRow==6 && toRow==7) {
              this.fields[toRow][toCol] = promotion;
            } else promotion=0

            this.enPassantCol = -1
            if (piece == 1 && fromRow - toRow == 2) {
                this.enPassantCol = toCol;
            }
            // check for en passant capturing
            if ((piece == 1 || piece == -1) && targetPiece == 0 && fromCol != toCol) {
                targetPiece = this.fields[fromRow][toCol]
                this.fields[fromRow][toCol] = 0
            }



            if (piece == -1 && fromRow - toRow == -2) {
                this.enPassantCol = toCol;
            }
            if (piece == 6) {
                this.whiteKingHasMoved = true;
                if (fromCol - toCol == 2) {
                    this.fields[fromRow][0] = 0;
                    this.fields[fromRow][3] = 2;
                } else if (fromCol - toCol == -2) {
                    this.fields[fromRow][7] = 0;
                    this.fields[fromRow][5] = 2;
                }
            }
            if (piece == -6) {
                this.blackKingHasMoved = true;
                if (fromCol - toCol == 2) {
                    this.fields[fromRow][0] = 0;
                    this.fields[fromRow][3] = -2;
                } else if (fromCol - toCol == -2) {
                    this.fields[fromRow][7] = 0;
                    this.fields[fromRow][5] = -2;
                }
            }
            if (piece == 2 && fromRow == 7 && fromCol == 0) this.whiteLeftRookHasMoved = true;
            if (piece == 2 && fromRow == 7 && fromCol == 7) this.whiteRightRookHasMoved = true;
            if (piece == -2 && fromRow == 0 && fromCol == 0) this.blackLeftRookHasMoved = true;
            if (piece == -2 && fromRow == 0 && fromCol == 7) this.blackRightRookHasMoved = true;
            if (0 != targetPiece) {
              this.capturedPieces.push(targetPiece)
              this.moveHistory.push(new Move(fromRow, fromCol, toRow, toCol, promotion, targetPiece))
            }
        }
    }
}
