import {Component, OnInit, Output} from '@angular/core';
import {UserService} from '../_services/user.service';
import {UserInfo} from '../_models/user-info';
import {Observable} from 'rxjs';
import {MessageService} from 'primeng/api';
import {ActivatedRoute, Params, Route, Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  loading: boolean;
  user: UserInfo;
  id: number;

  constructor(private userService: UserService, private messageService: MessageService, private router: Router) {
    this.loading = false;
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
        this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'impossible d\'obtenir le profil de l\'utilisateur' , key: 'main'});
        this.loading = false;
        this.router.navigateByUrl('/');
      }
    );
  }

  redirect(route: string, id: number): void {
    this.router.navigate([route, { id: id }]);
  }

}
