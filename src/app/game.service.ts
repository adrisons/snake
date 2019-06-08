import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class GameService {
    private active = new BehaviorSubject<boolean>(false);
    private active$ = this.active.asObservable();

    private bestScoreKey = 'best_score';
    private bestScoreNum = 0;
    private bestScore = new BehaviorSubject<number>(this.bestScoreNum);
    private bestScore$ = this.bestScore.asObservable();

    private scoreNum = 0;
    private score = new BehaviorSubject<number>(this.scoreNum);
    private score$ = this.score.asObservable();

    endGame() {
        this.active.next(false);
        this.updateBestScore();
    }

    startGame() {
        this.active.next(true);
        this.score.next(0);
        this.bestScore.next(this.bestScoreNum);
    }

    isGameOver(): Observable<boolean> {
        return this.active$.pipe(map(a => !a));
    }

    getScore(): Observable<number> {
        return this.score$;
    }

    addScore(n: number) {
        this.scoreNum += n;
        this.score.next(this.scoreNum);
    }

    getBestScore(): Observable<number> {
        return this.bestScore$;
    }

    private updateBestScore() {
        if (this.bestScoreNum < this.scoreNum) {
            this.bestScoreNum = this.scoreNum;
            this.bestScore.next(this.scoreNum);
        }
    }

    private initBestScore(value: number) {
        this.setToLocalStorage(this.bestScoreKey, value);
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
