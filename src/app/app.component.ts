import { Component, OnInit } from '@angular/core';
import { GameService } from './game.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'snake';

    constructor(private gameService: GameService) {}
    ngOnInit() {
        this.gameService.startGame();
    }
}
