import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-tab-allies',
  imports: [],
  templateUrl: './tab-allies.html',
  styleUrls: ['./tab-allies.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabAlliesComponent {
  readonly isOwner = input(false);
}
