import { Component, OnInit, HostListener } from '@angular/core';
import { GameService } from '../game.service';
import {
    Board,
    Cell,
    BOARD_ELEMENT,
    SnakeCell,
    EmptyCell,
    FruitCell
} from '../model/board.model';
import { BOARD_SIZE, CONTROLS } from '../model/constants';

@Component({
    selector: 'app-board',
    templateUrl: './board.component.html',
    styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
    board: Board;
    private interval = 500;
    private snake = {
        direction: CONTROLS.UP,
        parts: []
    };
    tempDirection = CONTROLS.UP;

    @HostListener('window:keydown', ['$event']) onkeydown(
        event: KeyboardEvent
    ) {
        if (
            event.keyCode === CONTROLS.LEFT &&
            this.snake.direction !== CONTROLS.RIGHT
        ) {
            this.tempDirection = CONTROLS.LEFT;
        } else if (
            event.keyCode === CONTROLS.UP &&
            this.snake.direction !== CONTROLS.DOWN
        ) {
            this.tempDirection = CONTROLS.UP;
        } else if (
            event.keyCode === CONTROLS.RIGHT &&
            this.snake.direction !== CONTROLS.LEFT
        ) {
            this.tempDirection = CONTROLS.RIGHT;
        } else if (
            event.keyCode === CONTROLS.DOWN &&
            this.snake.direction !== CONTROLS.UP
        ) {
            this.tempDirection = CONTROLS.DOWN;
        }
        event.stopPropagation();
    }

    constructor(private gameService: GameService) {}

    ngOnInit() {
        this.board = this.buildBoard(BOARD_SIZE, BOARD_SIZE);
        this.snake.parts = this.findSnake();
        this.resetFruit();
        setTimeout(() => {
            this.move();
        }, this.interval);
    }

    isGameOver() {
        return this.gameService.isGameOver();
    }

    private buildBoard(rows: number, cols: number): Board {
        return new Board(rows, cols);
    }

    isSnake(cell: Cell) {
        return cell.type === BOARD_ELEMENT.SNAKE;
    }

    isFruit(cell: Cell) {
        return cell.type === BOARD_ELEMENT.FRUIT;
    }

    private findSnake() {
        const snakeParts = [];
        for (let i = 0; i < this.board.data.length; i++) {
            const row = this.board.data[i];
            for (let j = 0; j < row.length; j++) {
                if (this.isSnake(row[j])) {
                    snakeParts.push({ x: j, y: i });
                }
            }
        }

        return snakeParts;
    }

    move() {
        const newHead = this.repositionHead();

        const cell = this.board.data[newHead.y][newHead.x];
        if (cell.taken || this.boardCollision(cell)) {
            this.gameService.endGame();
            return;
        }

        if (this.isFruit(cell)) {
            this.eatFruit();
        } else {
            const oldTail = this.snake.parts.pop();
            this.board.data[oldTail.y][oldTail.x] = new EmptyCell();
        }

        this.snake.parts.unshift(newHead);
        this.board.data[newHead.y][newHead.x] = new SnakeCell();

        this.snake.direction = this.tempDirection;

        setTimeout(() => {
            if (!this.gameService.isGameOver()) {
                this.move();
            }
        }, this.interval);
    }

    private boardCollision(part: any): boolean {
        return (
            part.x === BOARD_SIZE ||
            part.x === -1 ||
            part.y === BOARD_SIZE ||
            part.y === -1
        );
    }

    private repositionHead(): any {
        const newHead = Object.assign({}, this.snake.parts[0]);

        if (this.tempDirection === CONTROLS.LEFT) {
            newHead.x -= 1;
        } else if (this.tempDirection === CONTROLS.RIGHT) {
            newHead.x += 1;
        } else if (this.tempDirection === CONTROLS.UP) {
            newHead.y -= 1;
        } else if (this.tempDirection === CONTROLS.DOWN) {
            newHead.y += 1;
        }

        return newHead;
    }

    private eatFruit() {
        this.gameService.addScore(1);
        this.resetFruit();
    }

    private randomNumber(): any {
        return Math.floor(Math.random() * BOARD_SIZE);
    }

    private resetFruit(): void {
        const x = this.randomNumber();
        const y = this.randomNumber();

        if (this.board.data[y][x].taken) {
            this.resetFruit();
        } else {
            this.board.data[y][x] = new FruitCell();
        }
    }
}
