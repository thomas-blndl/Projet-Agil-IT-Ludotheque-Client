import {Component, Input, OnInit} from '@angular/core';
import {Observable, throwError} from "rxjs";
import {GamesService} from "../_services/games.service";
import {UserInfo} from "../_models/user-info";
import {environment} from "../../environments/environment";
import {catchError, map, switchMap} from "rxjs/operators";
import {HttpClient} from '@angular/common/http';
import {httpOptions} from "../_services/authentification.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {UserService} from "../_services/user.service";

@Component({
  selector: 'app-user-games',
  templateUrl: './user-games.component.html',
  styleUrls: ['./user-games.component.css']
})
export class UserGamesComponent implements OnInit {

  game: any[];
  games$: Observable<any[]>;
  games: any[] = [];
  user$: Observable<UserInfo>;
  displayedColumns: string[] = ['id', 'nom', 'description', 'regles', 'langue', 'url_media', 'age', 'poids', 'nombre_joueurs', 'categorie', 'duree', 'theme', 'editeur'];
  @Input() id: number;

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
  }

  getUserGames(): Observable<any> {
    return this.http.get<any>(environment.apiUrl + `/users/${this.id}`, httpOptions)
      .pipe(
        map(rep => rep.data.item.jeux),
        catchError(err => throwError(err))
      );
  }

  suppGame(gameId: number): void {
    this.http.post<any>(`${environment.apiUrl}/users/${this.id}/achat`, {
      jeu_id: gameId,
    }, httpOptions);
  }
}
