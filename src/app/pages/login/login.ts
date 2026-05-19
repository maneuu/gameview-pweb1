import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { take } from 'rxjs';

import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'LoginComponent',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private readonly authService = inject(AuthService);

  readonly user = this.authService.user;
  readonly isLoggedIn = this.authService.isLoggedIn;
  readonly idJogador = signal('');
  readonly senha = signal('');
  readonly errorMessage = signal<string | null>(null);
  readonly loading = signal(false);

  submit(): void {
    this.errorMessage.set(null);

    const idValue = this.idJogador().trim();
    const senhaValue = this.senha().trim();
    const idJogador = Number(idValue);

    if (!idValue || !senhaValue || !Number.isFinite(idJogador)) {
      this.errorMessage.set('Informe um ID valido e a senha.');
      return;
    }

    this.loading.set(true);
    this.authService
      .login(idJogador, senhaValue)
      .pipe(take(1))
      .subscribe((result) => {
        this.loading.set(false);
        if (!result.ok) {
          this.errorMessage.set(result.message ?? 'Falha no login.');
          return;
        }

        this.senha.set('');
      });
  }

  logout(): void {
    this.authService.logout();
    this.idJogador.set('');
    this.senha.set('');
    this.errorMessage.set(null);
  }
}
