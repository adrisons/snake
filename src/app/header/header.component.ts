import { Component, OnInit, OnDestroy } from '@angular/core';
import { GameService } from '../game.service';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
    score: number;
    gameEnded: Observable<boolean>;

    constructor(private gameService: GameService) {
        this.gameEnded = gameService.isGameOver();
        gameService
            .getScore()
            // .pipe(takeUntil(this.gameEnded))
            .subscribe(score => (this.score = score));
    }

    ngOnInit() {}

    ngOnDestroy(): void {}
}
