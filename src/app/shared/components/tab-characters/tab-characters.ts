import { ChangeDetectionStrategy, Component, input, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormCharacterComponent } from '../form-character/form-character';
import { PersonagemService } from '../../../core/services/personagem.service';
import { Personagem } from '../../../core/models/personagem.model';

@Component({
  selector: 'app-tab-characters',
  standalone: true,
  imports: [CommonModule, FormCharacterComponent],
  templateUrl: './tab-characters.html',
  styleUrls: ['./tab-characters.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabCharactersComponent implements OnInit {
  private personagemService = inject(PersonagemService);
  private readonly storageKey = 'gameview.auth.user';

  readonly isOwner = input(false);
  readonly playerId = input<number | null>(null);

  readonly isModalOpen = signal(false);
  readonly personagemSelecionado = signal<Personagem | null>(null);
  readonly personagens = signal<Personagem[]>([]);

  readonly classesMap: { [key: number]: string } = {
    1: 'Guerreiro',
    2: 'Mago',
    3: 'Arqueiro',
    4: 'Ladino',
    5: 'Paladino',
    6: 'Druida',
  };

  ngOnInit() {
    this.carregarPersonagens();
  }

  carregarPersonagens() {
    const loggedInId = this.getStoredUserId();
    const idFiltragem = this.isOwner() ? loggedInId : this.playerId();

    if (idFiltragem) {
      this.personagemService.getByJogador(idFiltragem).subscribe({
        next: (lista) => this.personagens.set(lista),
        error: (err) => console.error('Erro ao buscar personagens:', err),
      });
    } else {
      this.personagens.set([]);
    }
  }

  private getStoredUserId(): number | null {
    const raw = localStorage.getItem(this.storageKey);
    if (!raw) {
      return null;
    }

    try {
      const parsed = JSON.parse(raw) as { id_jogador?: number } | null;
      return typeof parsed?.id_jogador === 'number' ? parsed.id_jogador : null;
    } catch {
      return null;
    }
  }

  abrirModal() {
    this.isModalOpen.set(true);
  }

  fecharModal() {
    this.isModalOpen.set(false);
    this.carregarPersonagens();
  }

  verDetalhes(personagem: Personagem) {
    this.personagemSelecionado.set(personagem);
  }

  fecharDetalhes() {
    this.personagemSelecionado.set(null);
  }

  removerPersonagem(id: number) {
    if (confirm('Deseja realmente deletar este personagem?')) {
      this.personagemService.delete(id).subscribe({
        next: () => this.carregarPersonagens(),
        error: (err) => console.error('Erro ao remover personagem:', err),
      });
    }
  }
}
