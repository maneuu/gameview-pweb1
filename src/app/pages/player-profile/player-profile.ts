import { ChangeDetectionStrategy, Component } from '@angular/core';

import { PlayerOverviewComponent } from '../../shared/components/player-overview/player-overview';

@Component({
  selector: 'PlayerProfileComponent',
  imports: [PlayerOverviewComponent],
  templateUrl: './player-profile.html',
  styleUrl: './player-profile.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerProfileComponent {}
