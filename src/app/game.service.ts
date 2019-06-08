import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class GameService {
    private active = new Subject<boolean>();
    private active$ = this.active.asObservable();

    private bestScore = 'best_score';

    private scoreNum: number = 0;
    private score = new Subject<number>();
    private score$ = this.score.asObservable();

    endGame() {
        this.active.next(false);
        this.getScore()
            .pipe(take(1))
            .subscribe(n => {
                const bestScore = this.getBestScoreFromStorage() + n;
                this.updateBestScore(bestScore);
            });
    }

    startGame() {
        this.active.next(true);
        this.score.next(this.scoreNum);
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

    private updateBestScore(s: number) {
        const score = this.getBestScoreFromStorage();
        if (score < s) {
            this.setToLocalStorage(this.bestScore, s);
        }
    }

    private getBestScoreFromStorage(): number {
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
