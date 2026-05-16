import { ChangeDetectionStrategy, Component } from '@angular/core';

import { PlayerOverviewComponent } from '../../shared/components/player-overview/player-overview';

@Component({
  selector: 'HomeComponent',
  imports: [PlayerOverviewComponent],
  templateUrl: './home.html',
  styleUrl: './home.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}
