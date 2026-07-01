import { Component, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PersonagemService } from '../../../core/services/personagem.service';
import { Personagem } from '../../../core/models/personagem.model';

@Component({
  selector: 'app-form-character',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './form-character.html', // Sem o .component
  styleUrls: ['./form-character.css'], // Sem o .component
})
export class FormCharacterComponent {
  private personagemService = inject(PersonagemService);
  private readonly storageKey = 'gameview.auth.user';

  nome = signal<string>('');
  classeId = signal<number | null>(null);
  racaSelecionada = signal<string>('');
  descricaoText = signal<string>('');
  arma = signal<string>('');
  habilidadesText = signal<string>('');

  mensagem = signal<string>('');
  isSucesso = signal<boolean>(false);
  tentouSubmeter = signal<boolean>(false);

  classes = [
    { id: 1, nome: 'Guerreiro' },
    { id: 2, nome: 'Mago' },
    { id: 3, nome: 'Arqueiro' },
    { id: 4, nome: 'Ladino' },
    { id: 5, nome: 'Paladino' },
  ];

  racas = ['Humano', 'Elfo', 'Anão', 'Halfling', 'Orc', 'Tiefling', 'Draconato', 'Gnomo'];

  get nomeModel() {
    return this.nome();
  }

  set nomeModel(value: string) {
    this.nome.set(value);
  }

  get classeIdModel() {
    return this.classeId();
  }

  set classeIdModel(value: number | null) {
    this.classeId.set(value);
  }

  get racaModel() {
    return this.racaSelecionada();
  }

  set racaModel(value: string) {
    this.racaSelecionada.set(value);
  }

  get armaModel() {
    return this.arma();
  }

  set armaModel(value: string) {
    this.arma.set(value);
  }

  get habilidadesModel() {
    return this.habilidadesText();
  }

  set habilidadesModel(value: string) {
    this.habilidadesText.set(value);
  }

  get descricaoModel() {
    return this.descricaoText();
  }

  set descricaoModel(value: string) {
    this.descricaoText.set(value);
  }

  salvarPersonagem() {
    this.tentouSubmeter.set(true);
    this.mensagem.set('');

    if (!this.nome() || !this.classeId() || !this.racaSelecionada()) {
      this.mensagem.set('Preencha os campos obrigatórios!');
      this.isSucesso.set(false);
      return;
    }

    const fk_id_jogador = this.getStoredUserId();

    if (!fk_id_jogador) {
      this.mensagem.set('Erro: usuário não autenticado!');
      this.isSucesso.set(false);
      return;
    }

    const novoPersonagem = {
      nomePersonagem: this.nome(),
      fk_id_jogador,
      fk_id_classe: Number(this.classeId()),
      raca: this.racaSelecionada(),
      descricao: this.descricaoText(),
      armaPrincipal: this.arma(),
      habilidades: this.habilidadesText(),
    } as Personagem;

    this.personagemService.create(novoPersonagem).subscribe({
      next: () => {
        this.mensagem.set('Personagem forjado com sucesso!');
        this.isSucesso.set(true);
        this.limparFormulario();
      },
      error: (err) => {
        console.error('Erro ao criar personagem:', err);
        this.mensagem.set('Erro na criação! Verifique o console.');
        this.isSucesso.set(false);
      },
    });
  }

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

  limparFormulario() {
    this.tentouSubmeter.set(false);
    this.nome.set('');
    this.classeId.set(null);
    this.racaSelecionada.set('');
    this.descricaoText.set('');
    this.arma.set('');
    this.habilidadesText.set('');
  }
}
