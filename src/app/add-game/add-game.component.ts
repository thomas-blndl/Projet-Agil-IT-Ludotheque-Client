import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {Jeu} from '../_models/jeu';
import {GamesService} from '../_services/games.service';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {MecaniquesService} from '../_services/mecaniques.service';

@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.css']
})
export class AddGameComponent implements OnInit {

  games$: Observable<any[]>;
  game: Jeu;
  games: Jeu[];

  readonly categories: any[] = [];
  readonly mecaniques: string[] = [];
  readonly editeurs: any[] = [];
  readonly themes: any[] = [];
  readonly langues: string[] = [];

  formulaire = new FormGroup({
    nom: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]),
    description: new FormControl('', [Validators.required]),
    theme: new FormControl('', [Validators.required]),
    editeur: new FormControl('', [Validators.required]),
    mecanique: new FormControl('', [Validators.required]),
    url_media: new FormControl('', []),
    categorie: new FormControl('', [Validators.required]),
    regles: new FormControl('', [Validators.required]),
    langue: new FormControl('', [Validators.required]),
    nbJoueur: new FormControl('', [Validators.required, Validators.min(2), Validators.max(8)]),
    ageMin: new FormControl('', [Validators.required, Validators.min(1), Validators.max(16)]),
    poids: new FormControl('', [Validators.required, Validators.min(0.100), Validators.max(5.00)]),
    duree: new FormControl('', [Validators.required])

  });


  constructor(private mecaService: MecaniquesService, private gameService: GamesService, private route: ActivatedRoute, private router: Router, private http: HttpClient) {
    const id = +this.route.snapshot.paramMap.get('id');
    this.games$ = gameService.list();
  }

  ngOnInit(): void {
    this.games$.subscribe(
      game => {
        game.forEach(g => {
          this.game = g;
          if (this.langues.indexOf(g.langue) === -1) {
            this.langues.push(g.langue.valueOf());
          }
          this.addEditeur(g.editeur_id);
          if (this.categories.indexOf(g.categorie) === -1) {
            this.categories.push(g.categorie.valueOf());
          }
          this.addTheme(g.theme_id);
        });
      }
    );
    this.mecaService.getMeca().subscribe(
      meca => {
        console.log('le meca', meca);
        meca.forEach(m => {
            this.mecaniques.push(m.nom);
          }
        );
      });
  }


  get nom()
    :
    AbstractControl {
    return this.formulaire.get('nom');
  }

  get description()
    :
    AbstractControl {
    return this.formulaire.get('description');
  }

  get theme()
    :
    AbstractControl {
    return this.formulaire.get('theme');
  }

  get editeur()
    :
    AbstractControl {
    return this.formulaire.get('editeur');
  }

  get mecanique()
    :
    AbstractControl {
    return this.formulaire.get('mecanique');
  }

  get url_media()
    :
    AbstractControl {
    return this.formulaire.get('url_media');
  }

  get categorie()
    :
    AbstractControl {
    return this.formulaire.get('categorie');
  }

  get regles()
    :
    AbstractControl {
    return this.formulaire.get('regles');
  }

  get langue(): AbstractControl {
    return this.formulaire.get('langue');
  }

  get nbJoueur()
    :
    AbstractControl {
    return this.formulaire.get('nbJoueur');
  }

  get ageMin()
    :
    AbstractControl {
    return this.formulaire.get('ageMin');
  }

  get poids()
    :
    AbstractControl {
    return this.formulaire.get('poids');
  }

  get duree()
    :
    AbstractControl {
    return this.formulaire.get('duree');
  }
  addEditeur(editeur: any): void {
    const breakException = {};
    try{
      this.editeurs.forEach(e => {
        if (e.id === editeur.id) {
          throw breakException;
        }
      });
    }
    catch (e){
      if (e === breakException){
        return;
      }
    }
    this.editeurs.push(editeur);
  }
  addTheme(theme: any): void {
    const breakException = {};
    try{
      this.themes.forEach(t => {
        if (t.id === theme.id) {
          throw breakException;
        }
      });
    }
    catch (e){
      if (e === breakException){
        return;
      }
    }
    this.themes.push(theme);
  }
  onSubmit(): void {
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      })
    };

    this.http.post<any>('http://localhost:8000/api/jeux', {
      nom: this.nom.value,
      description: this.description.value,
      theme: this.theme.value,
      editeur: this.editeur.value,
      langue: this.langue.value,
      age: this.ageMin.value,
      poids: this.poids.value,
      nombre_joueurs: this.nbJoueur.value,
      categorie: this.categorie.value,
      duree: this.duree.value,
      regles: this.regles.value,

    }, httpOptions).subscribe((rep) => {
      if (rep.data.value === 'User successfully registered') {
        this.router.navigate(['']);
      }
    });
  }
}
