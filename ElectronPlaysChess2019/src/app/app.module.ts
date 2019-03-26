import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ChessAppComponent } from './chess-app/chess.component';
import { SettingsComponent } from './settings/settingscomponent';
import { ChessBoardComponent } from './chessboard/chessboardcomponent';
import { CapturedPiecesComponent } from './captured-pieces/capturedpiecescomponent';
import { RowComponent } from './row/rowcomponent';
import { FieldComponent } from './field/fieldcomponent';
import { HistoryComponent } from './history/historycomponent';

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
  imports: [BrowserModule],
  providers: [],
  bootstrap: [ChessAppComponent]
})
export class AppModule {}
