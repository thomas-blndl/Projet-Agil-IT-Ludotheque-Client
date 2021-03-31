import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import {GamesService} from '../_services/games.service';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.css']
})

export class GamesListComponent implements OnInit {
  games$: Observable<any[]>;

  constructor(private gamesService: GamesService, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.games$ = this.gamesService.list();
  }

  filterPlayerNb(nbJ: HTMLInputElement): boolean {
    if (nbJ.value.trim() !== '') {
      this.games$ = this.gamesService.filterByPlayers(nbJ.value.trim());
    }
    return false;
  }

  filterAge(age: HTMLInputElement): boolean {
    if (age.value.trim() !== '') {
      this.games$ = this.gamesService.filterByAge(age.value.trim());
    }
    return false;
  }

  sortNames(): boolean{
    this.games$ = this.gamesService.sortByName();
    return false;
  }

  sortNotes(): boolean{
    this.games$ = this.gamesService.sortByNote();
    return false;
  }
}
