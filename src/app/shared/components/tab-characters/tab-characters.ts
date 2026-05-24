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

  // AS DUAS PORTAS DE ENTRADA (INPUTS) QUE O SEU HTML ESTÁ A EXIGIR:
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
    6: 'Druida'
  };

  ngOnInit() {
    this.carregarPersonagens();
  }

  carregarPersonagens() {
    // Se for o dono, pega do localStorage. Se for visitante, pega o playerId que o pai injetou!
    const loggedInIdStr = localStorage.getItem('id_jogador');
    const loggedInId = loggedInIdStr ? parseInt(loggedInIdStr, 10) : null;
    
    const idFiltragem = this.isOwner() ? loggedInId : this.playerId();

    this.personagemService.getAll().subscribe({
      next: (lista) => {
        if (idFiltragem) {
          // Filtra a lista com base no ID que definimos acima
          this.personagens.set(lista.filter(p => p.fk_id_jogador === idFiltragem));
        } else {
          this.personagens.set(lista);
        }
      },
      error: (err) => console.error('Erro ao buscar personagens:', err)
    });
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
        error: (err) => console.error('Erro ao remover personagem:', err)
      });
    }
  }
}