import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

import { SearchbarComponent } from '../../shared/components/searchbar/searchbar';

import { JogadorService } from '../../core/services/jogador.service';
import { Jogador } from '../../core/models/jogador.model';

@Component({
  selector: 'SearchPlayerComponent',
  imports: [SearchbarComponent],
  templateUrl: './search-player.html',
  styleUrls: ['./search-player.css'],
})
export class SearchPlayerComponent {

  private readonly jogadorService = inject(JogadorService);
  private readonly router = inject(Router);

  resultados = signal<Jogador[]>([]);

  buscarJogador(termo: string): void {

    const id = Number(termo);

    if (!isNaN(id)) {

      this.jogadorService.getById(id).subscribe({
        next: (jogador) => {
          this.resultados.set(jogador ? [jogador] : []);
        }
      });

      return;
    }

    this.jogadorService.getByNome(termo).subscribe({
      next: (jogadores) => {
        this.resultados.set(jogadores);
      }
    });
  }
  abrirPerfil(idJogador: number): void {
    this.router.navigate(['/player', idJogador]);
  }
}
