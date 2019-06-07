import { SNAKE_INIT_SIZE } from './constants';

export const BOARD_ELEMENT = {
    NONE: 0,
    SNAKE: 1,
    FRUIT: 2
};

export interface Cell {
    taken: boolean;
    type: number;
}

export class SnakeCell implements Cell {
    taken = true;
    type = BOARD_ELEMENT.SNAKE;
}

export class FruitCell implements Cell {
    taken = false;
    type = BOARD_ELEMENT.FRUIT;
}

export class EmptyCell implements Cell {
    taken = false;
    type = BOARD_ELEMENT.NONE;
}

export class Board {
    rows: number;
    cols: number;
    data: Cell[][];

    constructor(rowsNum: number, colsNum: number) {
        this.rows = rowsNum;
        this.cols = colsNum;
        this.data = [];
        for (let col = 0; col < colsNum; col++) {
            this.data[col] = [];
            for (let row = 0; row < rowsNum; row++) {
                this.data[col][row] = new EmptyCell();
            }
        }
        this.createSnake(rowsNum, colsNum);
    }

    private createSnake(rowsNum: number, colsNum: number) {
        if (rowsNum > SNAKE_INIT_SIZE && colsNum > SNAKE_INIT_SIZE) {
            const midRow = Math.trunc(rowsNum / 2);
            const snakeCols = [colsNum - 1, colsNum - 2, colsNum - 3];
            for (const c of snakeCols) {
                this.data[c][midRow] = new SnakeCell();
            }
        }
    }
}
