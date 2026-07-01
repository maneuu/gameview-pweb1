import { ChangeDetectionStrategy, Component, OnInit, inject, input, signal } from '@angular/core';

import { MissaoRegistro } from '../../../core/models/missao-registro.model';
import { MissaoRegistroService } from '../../../core/services/missao-registro.service';

@Component({
  selector: 'app-tab-missions',
  standalone: true,
  imports: [],
  templateUrl: './tab-missions.html',
  styleUrls: ['./tab-missions.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabMissionsComponent implements OnInit {
  private readonly missaoRegistroService = inject(MissaoRegistroService);

  readonly playerId = input<number | null>(null);
  readonly missionsView = signal<MissaoRegistro[]>([]);
  readonly isLoading = signal(true);

  // Carrega ao iniciar
  ngOnInit(): void {
    this.carregarMissoes();
  }

  // Busca missoes e detalhes
  carregarMissoes(): void {
    const idJogador = this.playerId();
    if (idJogador === null) {
      this.missionsView.set([]);
      this.isLoading.set(false);
      return;
    }

    this.isLoading.set(true);
    this.missaoRegistroService.getByJogador(idJogador).subscribe({
      next: (registros) => {
        this.missionsView.set(registros);
        this.isLoading.set(false);
      },
      error: () => {
        this.missionsView.set([]);
        this.isLoading.set(false);
      },
    });
  }
}
