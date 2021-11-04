class Tictactoe {

    private readonly boardSize = 9;
    private readonly player1 = 'X';
    private readonly player2 = 'O';
    private winner: 'X' | 'O' | '_';
    private status: 'O' | 'D' | 'C';

    private board: string[];

    private get playsCount() {
        return this.board.filter(value => value !== undefined).length;
    }

    private get currentPlayer() {
        return this.playsCount % 2 === 0 ? this.player1 : this.player2;
    }

    private findWinner(x: number, y: number, index: number) {

        // at least 5 plays must have been made
        // for there to be a winner
        if(this.playsCount < 5) {
            return false;
        }

        const player = this.board[index];
        const verticalWinner = [0, 1, 2].every(xd => player === this.board[(xd * 3 + y) % this.boardSize]);
        const horizontalWinner = [0, 1, 2].every(yd => player === this.board[(x * 3 + yd) % this.boardSize]);

        if(verticalWinner || horizontalWinner) {
            return true;
        }

        if((x + y) % 2 !== 0) {
            return false;
        }

        const diagonal1Winner = [0, 1, 2].every(d => player === this.board[(d * 3 + d)]);
        const diagonal2Winner = [0, 1, 2].every(d => player === this.board[((2 - d) * 3 + d)]);
        return diagonal1Winner || diagonal2Winner;
    }

    private updateStatus(x: number, y: number, index: number) {

        switch(true) {
            case this.findWinner(x, y, index): {
                this.winner = this.board[index] as 'O' | 'X';
                this.status = 'C';
                break;
            }
            case this.playsCount === this.boardSize: {
                this.status = 'D';
                break;
            }
        }
    }

    constructor(){
        this.board = new Array(this.boardSize).fill(undefined);
        this.winner = '_';
        this.status = 'O';
    }

    play(x: number, y: number) {
        if(this.status !== 'O') {
            throw new Error('Cannot play a game that is done');
        }
        if(x < 0 || x > 2 || y < 0 || y > 2) {
            throw new Error('Cannot play a position that is out of bounds');
        }
        const index = (x * 3) + y;
        if(this.board[index]) {
            throw new Error('Cannot play a position that has already been played');
        }
        this.board[index] = this.currentPlayer;
        this.updateStatus(x, y, index);
    }

    toString(){
         return [
             this.status, 
             this.winner,
             this.board
            .map(value => value === undefined ? '_' : value)
            .join('')
         ].join(':')
    }

}

export default Tictactoe;