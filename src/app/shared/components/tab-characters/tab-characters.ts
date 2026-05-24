import { ChangeDetectionStrategy, Component, OnInit, inject, input, signal } from '@angular/core';

import { Personagem } from '../../../core/models/personagem.model';
import { PersonagemService } from '../../../core/services/personagem.service';
import { FormCharacterComponent } from '../form-character/form-character';

@Component({
  selector: 'app-tab-characters',
  standalone: true,
  imports: [FormCharacterComponent], // Adicionado aqui!
  templateUrl: './tab-characters.html',
  styleUrls: ['./tab-characters.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabCharactersComponent implements OnInit {
  private readonly personagemService = inject(PersonagemService);

  readonly isOwner = input(false);
  readonly playerId = input<number | null>(null);
  readonly characters = signal<Personagem[]>([]);
  readonly isLoading = signal(true);

  // Signal para controlar a exibição do modal (inicia fechado)
  readonly isModalOpen = signal(false);

  // Abre o modal de personagem.
  abrirModal() {
    this.isModalOpen.set(true);
  }

  // Fecha o modal de personagem.
  fecharModal() {
    this.isModalOpen.set(false);
  }

  ngOnInit(): void {
    // Carrega os personagens do jogador.
    const idJogador = this.playerId();
    if (idJogador === null) {
      this.isLoading.set(false);
      return;
    }

    this.personagemService.getByJogador(idJogador).subscribe({
      next: (personagens) => {
        // Guarda a lista de personagens.
        this.characters.set(personagens);
        this.isLoading.set(false);
      },
      error: () => {
        this.characters.set([]);
        this.isLoading.set(false);
      },
    });
  }
}
