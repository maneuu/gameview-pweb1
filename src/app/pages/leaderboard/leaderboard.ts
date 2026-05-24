import { Component, OnInit, inject, signal } from '@angular/core';

import { CardComponent } from '../../shared/components/card/card';

import { JogadorService } from '../../core/services/jogador.service';
import { Jogador } from '../../core/models/jogador.model';

@Component({
  selector: 'LeaderboardComponent',
  imports: [CardComponent],
  templateUrl: './leaderboard.html',
  styleUrl: './leaderboard.css',
})
export class LeaderboardComponent implements OnInit {

  private readonly jogadorService = inject(JogadorService);

  jogadores = signal<Jogador[]>([]);

  ngOnInit(): void {
    this.jogadorService.getTop10ByPontuacao().subscribe({
      next: (dados) => {
        this.jogadores.set(dados);
      },
      error: (erro) => {
        console.error('Erro ao carregar leaderboard', erro);
      }
    });
  }
}
