import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class GameService {
    private gameOver = 'game_over';
    private bestScore = 'best_score';

    public endGame() {
        this.setToLocalStorage(this.gameOver, true);
    }

    public startGame() {
        this.setToLocalStorage(this.gameOver, false);
    }

    public isGameOver(): boolean {
        const gameOver = this.getFromLocalStorage(this.gameOver);
        if (gameOver == null) {
            this.endGame();
            return false;
        }
        return gameOver;
    }

    public addScore(n: number) {
        const store = this.getScore();
        this.updateScore(store + n);
    }

    public updateScore(s: number) {
        const score = this.getScore();
        if (score < s) {
            this.setToLocalStorage(this.bestScore, s);
        }
    }

    public getScore(): number {
        const score = this.getFromLocalStorage(this.bestScore);
        if (score == null) {
            this.initScore(0);
            return 0;
        }
        return score;
    }

    private initScore(value: number) {
        this.setToLocalStorage(this.bestScore, value);
    }
    private setToLocalStorage(key: string, data: any) {
        localStorage.setItem(key, JSON.stringify({ key: data }));
    }

    private getFromLocalStorage(key: string) {
        const storage = JSON.parse(localStorage.getItem(key));
        if (storage) {
            return storage[key];
        } else {
            return null;
        }
    }
}
