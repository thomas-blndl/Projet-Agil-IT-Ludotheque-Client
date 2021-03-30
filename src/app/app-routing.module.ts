import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {ProfileComponent} from './profile/profile.component';
import {LpSolverTestComponent} from './lp-solver-test/lp-solver-test.component';
import {GamesListComponent} from './games-list/games-list.component';
import {AddGameComponent} from './add-game/add-game.component';

const routes: Routes = [
  {path: '', component: GamesListComponent},
  {path: 'login', component: LoginComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'games', component: GamesListComponent},
  {path: 'ro', component: LpSolverTestComponent},
  {path: 'ro', component: LpSolverTestComponent},
  {path: 'addgame', component: AddGameComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
