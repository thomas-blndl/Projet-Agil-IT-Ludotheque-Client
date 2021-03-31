import {Component, Input, OnInit} from '@angular/core';
import {MessageService} from 'primeng/api';
import {AuthentificationService} from '../_services/authentification.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpHeaders, HttpClient} from '@angular/common/http';
import {GameDetailComponent} from '../game-detail/game-detail.component';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  currDate = new Date();
  displayModal: boolean = false;
  @Input() id: number;

  formulaireComment = new FormGroup({
    avis: new FormControl('', [Validators.required]),
    note: new FormControl('', [Validators.required, Validators.min(1), Validators.max(5), Validators.pattern('[0-9]')]),
  });

  constructor(private messageService: MessageService, public authService: AuthentificationService, private router: Router,
              private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  showModalDialog(): void {
    this.displayModal = true;
  }

  get avis(): AbstractControl {
    return this.formulaireComment.get('avis');
  }

  get note(): AbstractControl {
    return this.formulaireComment.get('note');
  }

  onSubmit(): void {
    this.displayModal = false;
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      })
    };
    this.http.post<any>('http://localhost:8000/api/commentaires', {
      commentaire: this.avis.value,
      date_com: this.currDate,
      jeu_id: this.id,
      note: this.note.value
    }, httpOptions).subscribe((rep) => {
      if (rep.success === true) {
        this.messageService.add({
          severity: 'success',
          summary: 'Commentaire ajouté',
          detail: `Votre commentaire a bien été ajouté !`,
          key: 'main'
        });
        this.router.navigate([`/games/${this.id}`]);
      }
    });
  }
}
