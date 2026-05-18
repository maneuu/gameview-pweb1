import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

import { TabAlliesComponent } from '../tab-allies/tab-allies';
import { TabBattlesComponent } from '../tab-battles/tab-battles';
import { TabCharactersComponent } from '../tab-characters/tab-characters';
import { TabMissionsComponent } from '../tab-missions/tab-missions';
import { TabOverviewComponent } from '../tab-overview/tab-overview';

@Component({
  selector: 'app-player-overview',
  imports: [
    TabOverviewComponent,
    TabCharactersComponent,
    TabBattlesComponent,
    TabMissionsComponent,
    TabAlliesComponent,
  ],
  templateUrl: './player-overview.html',
  styleUrls: ['./player-overview.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerOverviewComponent {
  readonly isOwner = input(false);
  protected readonly activeTab = signal<
    'overview' | 'characters' | 'battles' | 'missions' | 'allies'
  >('overview');

  protected tabButtonClasses(
    tab: 'overview' | 'characters' | 'battles' | 'missions' | 'allies',
  ): string {
    const isActive = this.activeTab() === tab;

    return isActive ? 'gv-btn gv-btn-cyan gv-btn-sm' : 'gv-btn gv-btn-ghost gv-btn-sm';
  }

  protected setTab(tab: 'overview' | 'characters' | 'battles' | 'missions' | 'allies'): void {
    this.activeTab.set(tab);
  }
}
