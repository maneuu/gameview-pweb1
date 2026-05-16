import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-tab-characters',
  imports: [],
  templateUrl: './tab-characters.html',
  styleUrls: ['./tab-characters.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabCharactersComponent {
  readonly isOwner = input(false);
}
