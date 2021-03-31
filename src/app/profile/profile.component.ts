import {Component, OnInit, Output} from '@angular/core';

import {UserService} from '../_services/user.service';
import {UserInfo} from '../_models/user-info';
import {Observable} from 'rxjs';
import {MessageService} from 'primeng/api';

import {ActivatedRoute, Params, Route, Router} from '@angular/router';

import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import * as moment from 'moment';
import {GamesService} from '../_services/games.service';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  loading: boolean;
  user: UserInfo;

  id: number;

  dateS: string;
  jeux: any[];


  constructor(private userService: UserService, private messageService: MessageService,
              private router: Router, private http: HttpClient, private gameService: GamesService) {
    this.loading = false;
  }

  displayModal: boolean;
  date: Date;
  boolDate: boolean;

  formulaire = new FormGroup({
    lieu: new FormControl('', [Validators.required]),
    jeu: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
    prix: new FormControl('', [Validators.required])
  });

  get lieu(): AbstractControl {
    return this.formulaire.get('lieu');
  }

  get jeu_id(): AbstractControl {
    return this.formulaire.get('jeu');
  }

  get prix(): AbstractControl {
    return this.formulaire.get('prix');
  }

  showModalDialog(): void {
    this.displayModal = true;
  }

  onSelectMethod(event): void {
    const d = new Date(Date.parse(event));
    this.date = d;
    this.dateS = moment(this.date).format('YYYY-MM-DD hh:mm:ss');
    this.boolDate = true;
  }

  ngOnInit(): void {

    this.loading = true;
    this.userService.getProfile().subscribe(
      user => {
        this.user = {...this.user, ...user};
        this.loading = false;
        this.id = this.user.id;
      },
      (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'impossible d\'obtenir le profil de l\'utilisateur',
          key: 'main'
        });
        this.loading = false;
        this.router.navigateByUrl('/');
      }
    );
    this.gameService.list().subscribe((g) => {
      this.jeux = g;
      console.log(g);
    });
  }

  redirect(route: string, id: number): void {
    this.router.navigate([route, { id: id }]);
  }

  onSubmit(): void {
    // this.newUser = this.formulaire.value;
    if (this.dateS == null) {
      this.dateS = moment().calendar(null, {
        sameDay: 'YYYY-MM-DD hh:mm:ss'
      });
    }
    console.log(this.lieu.value, this.dateS, this.prix.value);
    this.displayModal = false;
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      })
    };
    this.http.post<any>(`http://localhost:8000/api/users/` + this.user.id + `/achat`, {
      prix: this.prix.value,
      lieu: this.lieu.value,
      date_achat: this.dateS,
      jeu_id: 1,
    }, httpOptions).subscribe((rep) => {
      if (rep.data.value === 'Game successfully added') {
        this.router.navigate(['']);
      }
    });
  }
}
