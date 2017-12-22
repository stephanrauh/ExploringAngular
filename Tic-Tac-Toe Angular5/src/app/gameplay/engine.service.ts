import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Cell, Grid } from './grid';
import { HistoryService } from './history.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

@Injectable()
export class EngineService {
  private static WIN = [
    [[1, 1, 1], [0, 0, 0], [0, 0, 0]],
    [[0, 0, 0], [1, 1, 1], [0, 0, 0]],
    [[0, 0, 0], [0, 0, 0], [1, 1, 1]],
    [[1, 0, 0], [0, 1, 0], [0, 0, 1]],
    [[0, 0, 1], [0, 1, 0], [1, 0, 0]],
    [[1, 0, 0], [1, 0, 0], [1, 0, 0]],
    [[0, 1, 0], [0, 1, 0], [0, 1, 0]],
    [[0, 0, 1], [0, 0, 1], [0, 0, 1]]
  ];

  public activePlayer = 'X';

  public humanPlayer = 'X';

  public grid = new Grid();

  public gameOver = false;

  constructor(private historyService: HistoryService, private snackBar: MatSnackBar) {}

  public changeSides(): void {
    if (this.humanPlayer === 'X') {
      this.humanPlayer = 'O';
    } else {
      this.humanPlayer = 'X';
    }
    if (this.humanPlayer !== this.activePlayer) {
      this.computerMove();
    }
  }

  private toggleActivePlayer() {
    if (this.activePlayer === 'X') {
      this.activePlayer = 'O';
    } else {
      this.activePlayer = 'X';
    }
  }

  public toggleCell(x: number, y: number) {
    if (this.gameOver) {
      this.showGameOverMessage('The game is already over. Do you want to start a new game?');
    } else {
      if (this.grid.row[y].cell[x] !== Cell.EMPTY) {
        const config = new MatSnackBarConfig();
        config.duration = 1000;
        const snackBarRef = this.snackBar.open('You cannot occupy this field.', 'Illegal move', config);
      } else {
        const activePlayersPiece = this.activePlayer === 'X' ? Cell.X : Cell.O;
        this.grid.row[y].cell[x] = activePlayersPiece;
        if (this.hasWon(activePlayersPiece)) {
          const msg = "You've won!";
          this.showGameOverMessage(msg);
          this.historyService.victoriesHuman++;
          this.gameOver = true;
        } else {
          this.toggleActivePlayer();
          this.computerMove();
        }
      }
    }
  }

  private showGameOverMessage(msg: string) {
    const config = new MatSnackBarConfig();
    config.duration = 5000;
    const snackBarRef = this.snackBar.open(msg, 'Game over', config);
  }

  public computerMove(): void {
    Observable.of(1)
      .delay(500)
      .subscribe((dummy: number) => {
        if (this.existsFreeCell()) {
          const activePlayersPiece = this.activePlayer === 'X' ? Cell.X : Cell.O;
          while (true) {
            const x = Math.floor(Math.random() * 3);
            const y = Math.floor(Math.random() * 3);
            if (this.grid.row[y].cell[x] === Cell.EMPTY) {
              this.grid.row[y].cell[x] = activePlayersPiece;
              break;
            }
          }
          if (this.hasWon(activePlayersPiece)) {
            this.historyService.victoriesComputer++;
            const msg = 'I have won!';
            this.showGameOverMessage(msg);
            this.gameOver = true;
          } else {
            if (this.existsFreeCell()) {
              this.toggleActivePlayer();
            } else {
              this.announceDraw();
            }
          }
        } else {
          this.announceDraw();
        }
      });
  }

  private announceDraw() {
    this.historyService.draw++;
    const msg = 'Draw!';
    this.showGameOverMessage(msg);
    this.gameOver = true;
  }

  public existsFreeCell(): boolean {
    let result = false;
    this.grid.row.forEach(r => {
      r.cell.forEach(c => {
        if (c === Cell.EMPTY) {
          result = true;
        }
      });
    });
    return result;
  }

  public hasWon(player: Cell): boolean {
    let won = false;
    EngineService.WIN.forEach(board => {
      won = won || this.matches(board, player);
    });

    return won;
  }

  public matches(board: number[][], player: Cell): boolean {
    let result = true;
    board.forEach((row, y) =>
      row.forEach((cell, x) => {
        console.log(cell);
        if (cell === 1 && player !== this.grid.row[y].cell[x]) {
          result = false;
        }
      })
    );
    return result;
  }

  public newGame(): void {
    this.grid.reset();
    this.activePlayer = 'X';
    this.gameOver = false;
    this.changeSides();
  }
}
