import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'LoginComponent',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {}
