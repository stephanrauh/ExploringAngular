import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ChessAppComponent } from './chess-app/chess-app.component';
import { SettingsComponent } from './settings/settings.component';
import { ChessBoardComponent } from './chessboard/chessboard.component';
import { CapturedPiecesComponent } from './captured-pieces/captured-pieces.component';
import { RowComponent } from './row/row.component';
import { FieldComponent } from './field/field.component';
import { HistoryComponent } from './history/history.component';
import { ChessboardUI } from './engine/chessboardUI';

@NgModule({
  declarations: [
    ChessAppComponent,
    SettingsComponent,
    ChessBoardComponent,
    CapturedPiecesComponent,
    RowComponent,
    FieldComponent,
    HistoryComponent
  ],
  imports: [BrowserModule, FormsModule],
  providers: [ChessboardUI],
  bootstrap: [ChessAppComponent]
})
export class AppModule {}
