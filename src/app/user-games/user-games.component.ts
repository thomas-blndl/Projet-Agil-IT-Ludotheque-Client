import {Component, Input, OnInit} from '@angular/core';
import {Observable, throwError} from "rxjs";
import {GamesService} from "../_services/games.service";
import {UserInfo} from "../_models/user-info";
import {environment} from "../../environments/environment";
import {catchError, map, switchMap} from "rxjs/operators";
import {HttpClient, HttpHeaders} from '@angular/common/http';
// import {httpOptions} from "../_services/authentification.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {UserService} from "../_services/user.service";
import {MessageService} from 'primeng/api';

const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  })
};

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

  constructor(private messageService: MessageService, private gameService: GamesService, private http: HttpClient, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.games$ = this.getUserGames();
    this.games$.subscribe(
      g => {
        this.games.push(g);
      }
    );
  }

  getUserGames(): Observable<any> {
    return this.http.get<any>(environment.apiUrl + `/users/${this.id}`, httpOptions)
      .pipe(
        map(rep => rep.data.item.jeux),
        catchError(err => throwError(err))
      );
  }

  suppGame(gameId: number, l, p, d): void {
    console.log(gameId);
    console.log(l);
    console.log(p);
    console.log(d);
    this.http.post<any>(`${environment.apiUrl}/users/${this.id}/vente`, {
      lieu: l,
      prix: p,
      date_achat: d,
      jeu_id:  gameId
    }, httpOptions).subscribe((rep) => {
      if (rep.success === true) {
        this.messageService.add({
          severity: 'success',
          summary: 'Jeu supprimé',
          detail: `Le jeu a bien été supprimé !`,
          key: 'main'
        });
        this.router.navigate(['/profile']);
      }
    });
  }
}
