import { Component, OnInit } from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {environment} from "../../environments/environment";
import {httpOptions} from "../_services/authentification.service";
import {catchError, map} from "rxjs/operators";
import {GamesService} from "../_services/games.service";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-send-games',
  templateUrl: './send-games.component.html',
  styleUrls: ['./send-games.component.css']
})
export class SendGamesComponent implements OnInit {
  games$: Observable<any[]>;
  games: any[] = [];
  id: number;

  constructor(private gameService: GamesService, private http: HttpClient, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.games$ = this.getUserGames();
    this.games$.subscribe(
      g => {
        this.games.push(g);
      }
    );
    this.games$.subscribe( console.log);
    console.log('le jeu', this.games);
  }

  getUserGames(): Observable<any> {
    return this.http.get<any>(environment.apiUrl + `/users/${this.id}`, httpOptions)
      .pipe(
        map(rep => rep.data.item.jeux),
        catchError(err => throwError(err))
      );
  }


}
