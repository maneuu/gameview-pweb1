import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home';
import { LoginComponent } from './pages/login/login';
import { LeaderboardComponent } from './pages/leaderboard/leaderboard';
import { PlayerProfileComponent } from './pages/player-profile/player-profile';
import { SearchPlayerComponent } from './pages/search-player/search-player';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Home' },
  { path: 'login', component: LoginComponent, title: 'Login' },
  { path: 'leaderboard', component: LeaderboardComponent, title: 'Leaderboard' },
  { path: 'search', component: SearchPlayerComponent, title: 'Buscar Jogador' },
  { path: 'player/:id', component: PlayerProfileComponent, title: 'Perfil do Jogador' },
  { path: '**', redirectTo: '' },
];
