import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {ProfileComponent} from './profile/profile.component';
import {LpSolverTestComponent} from './lp-solver-test/lp-solver-test.component';
import {GamesListComponent} from './games-list/games-list.component';
import {AddGameComponent} from './add-game/add-game.component';
import {FormRegisterComponent} from './form-register/form-register.component';
import {GameDetailComponent} from './game-detail/game-detail.component';
import {UserGamesComponent} from './user-games/user-games.component';
import {SendGamesComponent} from './send-games/send-games.component';

const routes: Routes = [
  {path: '', component: GamesListComponent},
  {path: 'login', component: LoginComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'games', component: GamesListComponent},
  {path: 'games/:id', component: GameDetailComponent},
  {path: 'ro', component: LpSolverTestComponent},
  {path: 'addgame', component: AddGameComponent},
  {path: 'formuser', component: FormRegisterComponent},
  {path: 'profile/games', component: UserGamesComponent},
  {path: 'profile/send', component: SendGamesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
