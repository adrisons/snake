import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
    constructor(private gameService: GameService) {}

    ngOnInit() {}

    startGame() {
        this.gameService.startGame();
    }
}
