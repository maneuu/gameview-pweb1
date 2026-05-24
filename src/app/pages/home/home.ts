import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { PlayerOverviewComponent } from '../../shared/components/player-overview/player-overview';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'HomeComponent',
  imports: [PlayerOverviewComponent, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  readonly authService = inject(AuthService);

  readonly isLoggedIn = this.authService.isLoggedIn;
  readonly user = this.authService.user;
}
