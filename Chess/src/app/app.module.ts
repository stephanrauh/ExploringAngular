import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import {CapturedPiecesComponent} from "../captured-pieces/capturedpiecescomponent";
import {ChessAppComponent} from "../chess-app/chess.component";
import {ChessBoardComponent} from "../chessboard/chessboardcomponent";
import {ChessEngineAPI} from "../engine/chessboardUI"
import ChessboardUI = ChessEngineAPI.ChessboardUI;
import {FieldComponent} from "../field/fieldcomponent";
import {HistoryComponent} from "../history/historycomponent";
import {SettingsComponent} from "../settings/settingscomponent";
import {RowComponent} from "../row/rowcomponent";

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
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    { provide: CapturedPiecesComponent,   useClass:    CapturedPiecesComponent },
    { provide: ChessAppComponent,   useClass:    ChessAppComponent },
    { provide: ChessBoardComponent,   useClass:    ChessBoardComponent },
    { provide: ChessboardUI,   useClass:    ChessboardUI },
    { provide: FieldComponent,   useClass:    FieldComponent },
    { provide: RowComponent,   useClass:    RowComponent },
    { provide: HistoryComponent,   useClass:    HistoryComponent },
    { provide: SettingsComponent,   useClass:    SettingsComponent }
  ],
  bootstrap: [ChessAppComponent]
})
export class AppModule { }
