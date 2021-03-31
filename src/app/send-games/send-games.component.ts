import {Component, OnInit} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {environment} from '../../environments/environment';
import {httpOptions} from '../_services/authentification.service';
import {catchError, map} from 'rxjs/operators';
import {GamesService} from '../_services/games.service';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {MessageService} from 'primeng/api';


declare var solver: any;

@Component({
  selector: 'app-send-games',
  templateUrl: './send-games.component.html',
  styleUrls: ['./send-games.component.css']
})
export class SendGamesComponent implements OnInit {



  constructor(private gameService: GamesService, private http: HttpClient, private route: ActivatedRoute,
              private messageService: MessageService) {
  }

  get poidsMax(): AbstractControl {
    return this.formulaire.get('poidsMax');
  }

  games$: Observable<any[]>;
  games: any[] = [];
  id: number;
  isChecked: boolean;
  selectedGames: any[] = [];
  private checkedGames: any[] = [];
  formulaire = new FormGroup({
    poidsMax: new FormControl('', [Validators.required]),
  });
  probleme = {
    variables: {
    },
    ints: {},
    binaries: {},
    constraints: {

    },
    opType: 'max',
    optimize: 'poids',
  };

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.games$ = this.getUserGames();
    this.games$.subscribe(
      g => {
        this.games.push(g);
      }
    );
    this.games$.subscribe(console.log);
    console.log('le jeu', this.games);
    this.updateProbleme();
  }

  getUserGames(): Observable<any> {
    return this.http.get<any>(environment.apiUrl + `/users/${this.id}`, httpOptions)
      .pipe(
        map(rep => rep.data.item.jeux),
        catchError(err => throwError(err))
      );
  }

  addGame(g: any): void {
    if (this.checkedGames.indexOf(g) === -1){
      this.checkedGames.push(g);
    } else {
      this.checkedGames.splice(this.checkedGames.indexOf(g), 1);
    }
    console.log('les jeux selec : ', this.selectedGames);
  }

  updateProbleme(): void {
    const newProb = this.probleme;
    let variables = '';
    let binaries = '';
    for (let i = 0; i < this.checkedGames.length; i++){
      variables += `o${i}: {poids: ${this.checkedGames[i].poids}}, `;
      binaries += `o${i}: 1, `;
    }
    newProb.variables = variables;
    newProb.binaries = binaries;
    newProb.constraints = `poids: {max: ${this.poidsMax.value}},`;

    this.probleme = newProb;
    console.log('le probleme : ', this.probleme);
    // this.resolutionProbleme(this.checkedGames.length);
  }

  /*resolutionProbleme(nbObj: number): void {  // le JSON ne fonctionne pas(mauvais format), donc le solveur ne peut pas fonctionner
    const resultat = solver.Solve(this.probleme);
    console.log('res : ', resultat);
    let details = '';
    let objetsGardes = [];
    for (let i = 0; i < nbObj; i++) {
      if (resultat.variables[i]) {
        objetsGardes.push(resultat.variables[i]);
        console.log('je garde : ', objetsGardes);
      }

      details += `Objet${i}: ${resultat.o1}`;
    }
    const nbO1 = resultat.o1; // constante de base (doit etre changées pour être automatisées (tentative en haut)
    const nbO2 = resultat.o2;
    const nbO3 = resultat.o3;
    const nbO4 = resultat.o4;
    const nbO5 = resultat.o5;
    const nbO6 = resultat.o6;

    this.messageService.add({
      key: 'main',
      severity: 'info',
      detail: `${`Solution : Objet 1 :  ${nbO1 ? nbO1 : '0'},
       Objet 2 : ${nbO2 ? nbO1 : '0'},
       Objet 2 : ${nbO2 ? nbO2 : '0'},
       Objet 3 : ${nbO3 ? nbO3 : '0'},
       Objet 4 : ${nbO4 ? nbO4 : '0'},
       Objet 5 : ${nbO5 ? nbO5 : '0'},
       Objet 6 : ${nbO6 ? nbO6 : '0'},
       Bénéfice : ${resultat.result}`}`,

    });
  }*/
}
