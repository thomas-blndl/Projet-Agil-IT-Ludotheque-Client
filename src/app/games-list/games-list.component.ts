import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Observable, of} from 'rxjs';
import {GamesService} from '../_services/games.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.css']
})

export class GamesListComponent implements OnInit {
  games$: Observable<any[]>;

  @ViewChild('nbJ') nbJ: ElementRef;
  formulaire = new FormGroup({
    nbJ: new FormControl('')
  });

  constructor(private gamesService: GamesService, private router: Router) { }

  ngOnInit(): void {
    this.games$ = this.gamesService.list();
  }

  filterPlayerNb(nbJ: HTMLInputElement): boolean {
    if (nbJ.value.trim() !== '') {
      this.games$ = this.gamesService.filterByPlayers(nbJ.value.trim());
    }
    return false;
  }
}
