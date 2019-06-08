import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    score: Observable<number>;
    bestScore: Observable<number>;
    gameEnded: Observable<boolean>;

    constructor(gameService: GameService) {
        this.gameEnded = gameService.isGameOver();
        this.score = gameService.getScore();

        this.bestScore = gameService.getBestScore();
    }

    ngOnInit() {}
}
