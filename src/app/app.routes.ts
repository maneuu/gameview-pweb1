import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home';
import { LoginComponent } from './pages/login/login';
import { LeaderboardComponent } from './pages/leaderboard/leaderboard';
import { PlayerProfileComponent } from './pages/player-profile/player-profile';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Home' },
  { path: 'login', component: LoginComponent, title: 'Login' },
  { path: 'leaderboard', component: LeaderboardComponent, title: 'Leaderboard' },
  { path: 'player/:id', component: PlayerProfileComponent, title: 'Perfil do Jogador' },
  { path: '**', redirectTo: '' },
];
