import { GameHistoryComponent } from './game/gameHistory.component';
import { ModuleWithProviders } from '@angular/core';
import {Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './signup/signup.component';
import { GameLobbyComponent } from './gamelobby/gamelobby.component';
import { TopTenComponent } from './topten/topten.component';
import { BoardComponent } from './game/board.component';

export const router: Routes = [
    {path: '', component: AppComponent},
    {path: 'home', component: AppComponent},
    {path: 'about', component: AboutComponent},
    {path: 'login', component: LoginComponent},
    {path: 'signup', component: SignUpComponent},
    {path: 'gamelobby', component: GameLobbyComponent},
    {path: 'topten', component: TopTenComponent},
    {path: 'history', component: GameHistoryComponent},
    {path: 'board/:id' , component: BoardComponent }
    
];


export const routes: ModuleWithProviders = RouterModule.forRoot(router);