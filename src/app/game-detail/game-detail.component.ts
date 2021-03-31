import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {GamesService} from '../_services/games.service';
import * as moment from 'moment';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.css']
})
export class GameDetailComponent implements OnInit {

  game;
  dateS: string;
  constructor(private route: ActivatedRoute, private gamesService: GamesService) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    // let div = document.createElement('div');
    this.gamesService.getGameById(id).subscribe((rep) => {
      this.game = rep;
      /*div.innerHTML = this.game.regles;
      this.game.regles = div.innerText;*/
    });
  }

  /*timeFrom(myDate: Date): string {
    this.dateS = moment(myDate).fromNow();
    return this.dateS;
  }*/
}
