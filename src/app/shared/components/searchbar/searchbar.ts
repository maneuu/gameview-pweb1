import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-searchbar',
  imports: [],
  templateUrl: './searchbar.html',
  styleUrls: ['./searchbar.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchbarComponent {}
