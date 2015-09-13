import {Move} from './move';
import {Chessboard} from './chessboard';

export class Suggestor {
    constructor(public chessboard: Chessboard) { }

    suggestMove(): Move {
      return null;
    }
}
