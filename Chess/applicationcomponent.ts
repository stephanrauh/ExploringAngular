/// <reference path="typings/angular2/angular2.d.ts" />
/// <reference path="chessboard.ts" />
import {Component, View, bootstrap, NgIf} from 'angular2/angular2';
import {ChessBoardComponent} from "./chessboardcomponent";
import {CapturedPiecesComponent} from './capturedpiecescomponent';
import {ChessEngineAPI} from "./engine/chessboardUI";
import {Move} from "./engine/move";
import {HistoryComponent} from './historycomponent';

// Annotation section
@Component({
    selector: 'application',
    bindings: [ChessEngineAPI.ChessboardUI]
})
@View({
    templateUrl: 'ApplicationComponent.html',
    directives: [ChessBoardComponent, HistoryComponent, CapturedPiecesComponent, NgIf]
})
// Component controller
class ApplicationComponent {
    constructor(private chessboard: ChessEngineAPI.ChessboardUI) { }

    public suggestedMove: Move = null

    public get suggestedMoveText(): string {
        if (null == this.suggestedMove)
            return "";
        else
            return this.suggestedMove.toString()
    }

    public get title(): String {
        var result = this.chessboard.isWhitePlaying ? "White move " : "Black move "
        if (this.chessboard.checkMate)
            result += " Checkmate!";
        else if (this.chessboard.check)
            result += " Check!";
        else if (this.chessboard.ownCheckMate)
            result += " Player is checkmate!";
        else if (this.chessboard.ownCheck)
            result += " Player is in check!";
        return result
    }

    public suggestMove(): boolean {
        this.suggestedMove = this.chessboard.suggestMove();
        return false;
    }

    public turnSides(): boolean {
        this.suggestedMove = null
        var move = this.chessboard.suggestMove()
        this.chessboard.move(move)
        return false;
    }

    public revertLastMove(): boolean {
        this.suggestedMove = null
        this.chessboard.revertLastMove();
        return false;
    }
}

bootstrap(ApplicationComponent);
