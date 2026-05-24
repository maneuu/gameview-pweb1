import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AuthService } from '../../core/services/auth.service';
import { JogadorService } from '../../core/services/jogador.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
})
export class LoginComponent {
  authService = inject(AuthService);
  jogadorService = inject(JogadorService); // Necessário para a criação

  // Controle de estado
  isLoginMode = signal<boolean>(true);

  // Variáveis vinculadas ao HTML ([(ngModel)])
  idJogador = '';
  nomeUsuario = '';
  email = '';
  senha = '';
  
  errorMessage: string | null = null;
  loading = false;

  // Função para alternar entre as telas e limpar os dados
  toggleMode(): void {
    this.isLoginMode.update(m => !m);
    this.errorMessage = null;
    this.idJogador = '';
    this.nomeUsuario = '';
    this.email = '';
    this.senha = '';
  }

  submit(): void {
    this.errorMessage = null;
    this.loading = true;

    if (this.isLoginMode()) {
      const idValue = this.idJogador.trim();
      const senhaValue = this.senha.trim();
      const idNumero = Number(idValue);

      if (!idValue || !senhaValue) {
        this.errorMessage = 'Informe um ID válido e a senha.';
        this.loading = false;
        return;
      }

      this.authService.login(idNumero, senhaValue).subscribe((result) => {
        this.loading = false;

        if (!result.ok) {
          this.errorMessage = result.message ?? 'Falha no login.';
          return;
        }

        this.senha = '';
      });
      
    } else {
      const nomeValue = this.nomeUsuario.trim();
      const emailValue = this.email.trim();
      const senhaValue = this.senha.trim();

      if (!nomeValue || !emailValue || !senhaValue) {
        this.errorMessage = 'Preencha todos os campos para cadastrar.';
        this.loading = false;
        return;
      }

      const novoJogador = {
        nome_usuario: nomeValue,
        email: emailValue,
        senha: senhaValue,
        nivel: 1,
        experiencia: 0,
        pontuacao: 0
      };

      this.jogadorService.create(novoJogador).subscribe({
        next: (jogadorCriado) => {
          this.loading = false;
          if (jogadorCriado) {
            // Mostra o ID gerado para que ele saiba como logar depois
            alert(`Conta criada com sucesso! Seu ID de acesso é: ${jogadorCriado.id_jogador}`);
            this.toggleMode(); // Retorna automaticamente para a aba de login
          }
        },
        error: (err) => {
          this.loading = false;
          this.errorMessage = 'Erro ao criar conta. Tente outro nome ou e-mail.';
          console.error(err);
        }
      });
    }
  }

  logout(): void {
    this.authService.logout();
    this.idJogador = '';
    this.senha = '';
    this.errorMessage = null;
  }
}