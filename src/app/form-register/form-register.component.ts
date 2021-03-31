import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../_models/user';
import {UserService} from '../_services/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthentificationService, httpOptions} from '../_services/authentification.service';
import {first} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-form-register',
  templateUrl: './form-register.component.html',
  styleUrls: ['./form-register.component.css'],
})
export class FormRegisterComponent implements OnInit {

  formulaire = new FormGroup({
    nom: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]),
    prenom: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]),
    pseudo: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]),
    mail: new FormControl('', [Validators.required, Validators.email]),
    mdp1: new FormControl('',[Validators.required, Validators.pattern('(?=^.{8,}$)((?=.*\\d))(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$')]),
    mdp2: new FormControl('',[Validators.required, Validators.pattern('(?=^.{8,}$)((?=.*\\d))(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$')]),
  });

  constructor(private serviceUser: UserService, private route: ActivatedRoute, private  router: Router, private http: HttpClient ) { }

  ngOnInit(): void {

  }

  get nom(): AbstractControl {
    return this.formulaire.get('nom');
  }

  get prenom(): AbstractControl {
    return this.formulaire.get('prenom');
  }

  get pseudo(): AbstractControl {
    return this.formulaire.get('pseudo');
  }

  get mail(): AbstractControl {
    return this.formulaire.get('mail');
  }

  get mdp1(): AbstractControl{
    return this.formulaire.get('mdp1');
  }

  get mdp2(): AbstractControl{
    return this.formulaire.get('mdp1');
  }

  checkPasswords(): boolean {
    const mdp1 = this.formulaire.get('mdp1').value;
    const mdp2 = this.formulaire.get('mdp2').value;
    return mdp1 === mdp2;
  }

  onSubmit(): void {
    //this.newUser = this.formulaire.value;
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      })
    };
    this.http.post<any>('http://localhost:8000/api/auth/register', {
      pseudo: this.pseudo.value,
      nom: this.nom.value,
      prenom: this.prenom.value,
      email: this.mail.value,
      password: this.mdp1.value
    }, httpOptions).subscribe((rep) => {
      if (rep.data.value === 'User successfully registered') { this.router.navigate(['']); }
    });
  }

}
