import { ChangeDetectionStrategy, Component } from '@angular/core';

import { CardComponent } from '../../shared/components/card/card';
import { SearchbarComponent } from '../../shared/components/searchbar/searchbar';

@Component({
  selector: 'SearchPlayerComponent',
  imports: [CardComponent, SearchbarComponent],
  templateUrl: './search-player.html',
  styleUrls: ['./search-player.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchPlayerComponent {}
