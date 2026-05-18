import { ChangeDetectionStrategy, Component } from '@angular/core';

import { SearchbarComponent } from '../../shared/components/searchbar/searchbar';

@Component({
  selector: 'SearchPlayerComponent',
  imports: [SearchbarComponent],
  templateUrl: './search-player.html',
  styleUrls: ['./search-player.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchPlayerComponent {}
