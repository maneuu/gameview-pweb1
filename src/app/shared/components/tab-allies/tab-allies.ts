import { ChangeDetectionStrategy, Component, OnInit, inject, input, signal } from '@angular/core';

import { Aliado } from '../../../core/models/aliado.model';
import { AliadoService } from '../../../core/services/aliado.service';
import { JogadorService } from '../../../core/services/jogador.service';

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
  private readonly jogadorService = inject(JogadorService);
  private readonly storageKey = 'gameview.auth.user';

  readonly isOwner = input(false);
  readonly playerId = input<number | null>(null);
  readonly isLoading = signal(true);
  readonly isCreateOpen = signal(false);
  readonly isDeleteOpen = signal(false);
  readonly targetId = signal<number | null>(null);
  readonly pendingDelete = signal<Aliado | null>(null);
  readonly createMessage = signal('');
  readonly alliesView = signal<Aliado[]>([]);

  // Carrega a lista inicial
  ngOnInit(): void {
    this.carregarAliados();
  }

  // Busca aliados do jogador atual
  carregarAliados(): void {
    const idJogador = this.getCurrentUserId();
    if (!idJogador) {
      this.alliesView.set([]);
      this.isLoading.set(false);
      return;
    }

    this.isLoading.set(true);
    this.aliadoService.getByJogador(idJogador).subscribe({
      next: (aliados) => {
        this.alliesView.set(aliados);
        this.isLoading.set(false);
      },
      error: () => {
        this.alliesView.set([]);
        this.isLoading.set(false);
      },
    });
  }

  // Abre modal de criacao
  abrirCriar(): void {
    this.targetId.set(null);
    this.createMessage.set('');
    this.isCreateOpen.set(true);
  }

  // Fecha modal de criacao
  fecharCriar(): void {
    this.isCreateOpen.set(false);
    this.createMessage.set('');
  }

  // Cria alianca simples
  criarAlianca(): void {
    const idJogador = this.getCurrentUserId();
    const alvo = this.targetId();
    if (!idJogador || !alvo) {
      this.createMessage.set('Informe o ID do jogador.');
      return;
    }
    if (alvo === idJogador) {
      this.createMessage.set('Voce nao pode se aliar a voce mesmo.');
      return;
    }
    if (this.jaExisteAlianca(alvo)) {
      this.createMessage.set('Alianca ja existe com esse jogador.');
      return;
    }

    this.jogadorService.getById(alvo).subscribe({
      next: (jogador) => {
        if (!jogador) {
          this.createMessage.set('Jogador nao encontrado.');
          return;
        }

        this.aliadoService
          .create({
            jogador: { idJogador },
            aliado: { idJogador: alvo },
          })
          .subscribe({
            next: () => {
              this.isCreateOpen.set(false);
              this.carregarAliados();
            },
            error: (err) => console.error('Erro ao criar alianca:', err),
          });
      },
      error: (err) => console.error('Erro ao buscar jogador:', err),
    });
  }

  // Abre confirmacao de remocao
  abrirRemover(ally: Aliado): void {
    this.pendingDelete.set(ally);
    this.isDeleteOpen.set(true);
  }

  // Fecha confirmacao de remocao
  fecharRemover(): void {
    this.pendingDelete.set(null);
    this.isDeleteOpen.set(false);
  }

  // Remove alianca
  removerAlianca(): void {
    const ally = this.pendingDelete();
    if (!ally) {
      return;
    }

    if (!ally.id) {
      console.error('Nao foi possivel localizar o id da alianca para remocao.', ally);
      return;
    }

    this.aliadoService.delete(ally.id).subscribe({
      next: () => {
        this.fecharRemover();
        this.carregarAliados();
      },
      error: (err) => console.error('Erro ao remover alianca:', err),
    });
  }

  // Resolve o jogador da tela
  private getCurrentUserId(): number | null {
    return this.isOwner() ? this.getStoredUserId() : this.playerId();
  }

  // Le o id do usuario logado (localstorage)
  private getStoredUserId(): number | null {
    const raw = localStorage.getItem(this.storageKey);
    if (!raw) {
      return null;
    }

    try {
      const parsed = JSON.parse(raw) as { idJogador?: number } | null;
      return typeof parsed?.idJogador === 'number' ? parsed.idJogador : null;
    } catch {
      return null;
    }
  }

  // Verifica se ja existe alianca
  private jaExisteAlianca(alvo: number): boolean {
    return this.alliesView().some(
      (item) =>
        item.fk_id_jogador_aliado === alvo ||
        item.aliado?.idJogador === alvo ||
        item.jogador?.idJogador === alvo,
    );
  }
}
