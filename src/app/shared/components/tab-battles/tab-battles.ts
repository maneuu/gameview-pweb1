import { ChangeDetectionStrategy, Component, OnInit, inject, input, signal } from '@angular/core';

import { BatalhaRegistro } from '../../../core/models/batalha-registro.model';
import { BatalhaRegistroService } from '../../../core/services/batalha-registro.service';

@Component({
  selector: 'app-tab-battles',
  standalone: true,
  imports: [],
  templateUrl: './tab-battles.html',
  styleUrls: ['./tab-battles.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabBattlesComponent implements OnInit {
  private readonly batalhaRegistroService = inject(BatalhaRegistroService);

  readonly playerId = input<number | null>(null);
  readonly battlesView = signal<BatalhaRegistro[]>([]);
  readonly isLoading = signal(true);

  // Carrega ao iniciar
  ngOnInit(): void {
    this.carregarBatalhas();
  }

  // Busca batalhas e nomes de monstros
  carregarBatalhas(): void {
    const idJogador = this.playerId();
    if (idJogador === null) {
      this.battlesView.set([]);
      this.isLoading.set(false);
      return;
    }

    this.isLoading.set(true);
    this.batalhaRegistroService.getByJogador(idJogador).subscribe({
      next: (registros) => {
        this.battlesView.set(registros);
        this.isLoading.set(false);
      },
      error: () => {
        this.battlesView.set([]);
        this.isLoading.set(false);
      },
    });
  }
}
