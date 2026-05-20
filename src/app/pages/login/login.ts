import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
})
export class LoginComponent {
  authService = inject(AuthService);

  idJogador = '';
  senha = '';
  errorMessage: string | null = null;
  loading = false;

  submit(): void {
    this.errorMessage = null;

    const idValue = this.idJogador.trim();
    const senhaValue = this.senha.trim();
    const idNumero = Number(idValue);

    if (!idValue || !senhaValue) {
      this.errorMessage = 'Informe um ID válido e a senha.';
      return;
    }

    this.loading = true;

    this.authService.login(idNumero, senhaValue).subscribe((result) => {
      this.loading = false;

      if (!result.ok) {
        this.errorMessage = result.message ?? 'Falha no login.';
        return;
      }

      this.senha = '';
    });
  }

  logout(): void {
    this.authService.logout();
    this.idJogador = '';
    this.senha = '';
    this.errorMessage = null;
  }
}
