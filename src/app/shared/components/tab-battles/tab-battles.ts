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
  readonly battles = signal<BatalhaRegistro[]>([]);
  readonly isLoading = signal(true);

  ngOnInit(): void {
    // Carrega as batalhas do jogador.
    const idJogador = this.playerId();
    if (idJogador === null) {
      this.isLoading.set(false);
      return;
    }

    this.batalhaRegistroService.getByJogador(idJogador).subscribe({
      next: (registros) => {
        // Guarda as batalhas do jogador.
        this.battles.set(registros);
        this.isLoading.set(false);
      },
      error: () => {
        this.battles.set([]);
        this.isLoading.set(false);
      },
    });
  }
}
