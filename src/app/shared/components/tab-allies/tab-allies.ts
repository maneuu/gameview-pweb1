import { ChangeDetectionStrategy, Component, OnInit, inject, input, signal } from '@angular/core';

import { Aliado } from '../../../core/models/aliado.model';
import { AliadoService } from '../../../core/services/aliado.service';

@Component({
  selector: 'app-tab-allies',
  standalone: true,
  imports: [],
  templateUrl: './tab-allies.html',
  styleUrls: ['./tab-allies.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabAlliesComponent implements OnInit {
  private readonly aliadoService = inject(AliadoService);

  readonly isOwner = input(false);
  readonly playerId = input<number | null>(null);
  readonly allies = signal<Aliado[]>([]);
  readonly isLoading = signal(true);

  ngOnInit(): void {
    // Carrega os aliados do jogador.
    const idJogador = this.playerId();
    if (idJogador === null) {
      this.isLoading.set(false);
      return;
    }

    this.aliadoService.getByJogador(idJogador).subscribe({
      next: (aliados) => {
        // Guarda os aliados do jogador.
        this.allies.set(aliados);
        this.isLoading.set(false);
      },
      error: () => {
        this.allies.set([]);
        this.isLoading.set(false);
      },
    });
  }
}
