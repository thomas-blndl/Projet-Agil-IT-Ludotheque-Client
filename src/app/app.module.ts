import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import localeFr from '@angular/common/locales/fr';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthentificationService} from './_services/authentification.service';
import {MessagesModule} from 'primeng/messages';
import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';
import {registerLocaleData} from '@angular/common';
import {MomentModule} from 'ngx-moment';
import 'moment/locale/fr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {JwtInterceptorService} from './_services/jwt-interceptor.service';
import {ProfileComponent} from './profile/profile.component';
import {UserService} from './_services/user.service';
import {LpSolverTestComponent} from './lp-solver-test/lp-solver-test.component';
import {MarkdownModule} from 'ngx-markdown';
import {MenubarModule} from 'primeng/menubar';
import {ButtonModule} from 'primeng/button';
import {GamesListComponent} from './games-list/games-list.component';
import {CardModule} from 'primeng/card';
import {AddGameComponent} from './add-game/add-game.component';
import {DropdownModule} from 'primeng/dropdown';
import {GameDetailComponent} from './game-detail/game-detail.component';
import {FormRegisterComponent} from './form-register/form-register.component';
import { UserGamesComponent } from './user-games/user-games.component';
import {DialogModule} from 'primeng/dialog';
import {CalendarModule} from 'primeng/calendar';
import { CommentComponent } from './comment/comment.component';
import { SendGamesComponent } from './send-games/send-games.component';
import {TableModule} from 'primeng/table';
import {CheckboxModule} from 'primeng/checkbox';

registerLocaleData(localeFr, 'fr');

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    LpSolverTestComponent,
    AddGameComponent,
    GamesListComponent,
    FormRegisterComponent,
    GamesListComponent,
    GameDetailComponent,
    UserGamesComponent,
    UserGamesComponent,
    CommentComponent,
    SendGamesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MarkdownModule.forRoot(),
    AppRoutingModule,
    MomentModule,
    MessagesModule,
    ToastModule,
    HttpClientModule,
    ReactiveFormsModule,
    MenubarModule,
    ButtonModule,
    CardModule,
    DropdownModule,
    DialogModule,
    CalendarModule,
    TableModule,
    CheckboxModule,
    FormsModule,
  ],
  providers: [AuthentificationService, MessageService,
    {provide: LOCALE_ID, useValue: 'fr-FR'},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true},
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
