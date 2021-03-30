import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {environment} from '../../environments/environment';
import {UserService} from '../_services/user.service';
import {GamesService} from '../_services/games.service';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.css']
})
export class GamesListComponent implements OnInit {
  games$: Observable<any[]>;

  constructor(private gamesService: GamesService) { }

  ngOnInit(): void {
    this.games$ = this.gamesService.list();
  }
}
