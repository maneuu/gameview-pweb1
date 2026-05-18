import { ChangeDetectionStrategy, Component } from '@angular/core';

import { PlayerOverviewComponent } from '../../shared/components/player-overview/player-overview';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'HomeComponent',
  imports: [PlayerOverviewComponent, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}
