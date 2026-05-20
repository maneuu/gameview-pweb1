import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PersonagemService } from '../../../core/services/personagem.service';
import { Personagem } from '../../../core/models/personagem.model';

@Component({
  selector: 'app-form-character',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './form-character.html', // Sem o .component
  styleUrls: ['./form-character.css']   // Sem o .component
})
export class FormCharacterComponent {
  // Sinais de estado dos inputs
  nome = signal<string>('');
  classeId = signal<number | null>(null);
  racaSelecionada = signal<string>('');
  descricaoText = signal<string>('');
  arma = signal<string>('');
  habilidadesText = signal<string>('');

  // Sinais de controle do formulário
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

  // Injeção do seu PersonagemService via construtor
  constructor(private personagemService: PersonagemService) {}

  salvarPersonagem() {
    this.tentouSubmeter.set(true);
    this.mensagem.set('');

    // 1. Validação
    if (!this.nome() || !this.classeId() || !this.racaSelecionada()) {
      this.mensagem.set('Preencha os campos obrigatórios!');
      this.isSucesso.set(false);
      return;
    }

    // 2. Resgatar Jogador
    const idJogadorStr = localStorage.getItem('id_jogador');
    const fk_id_jogador = idJogadorStr ? parseInt(idJogadorStr, 10) : 1;

    // 3. Montar Objeto (MÁGICA AQUI: Omitimos o id_personagem de propósito!)
    // Se não mandarmos o ID, o backend do Supabase gera ele corretamente.
    const novoPersonagem = {
      nome_personagem: this.nome(),
      fk_id_jogador: fk_id_jogador,
      fk_id_classe: Number(this.classeId()),
      raca: this.racaSelecionada(),
      descricao: this.descricaoText(),
      arma_principal: this.arma(),
      habilidades: this.habilidadesText()
    } as Personagem;

    // 4. Utilizando explicitamente o método create() do seu serviço
    this.personagemService.create(novoPersonagem).subscribe({
      next: (resposta) => {
        console.log('Personagem salvo no Supabase:', resposta);
        this.mensagem.set('Personagem forjado com sucesso!');
        this.isSucesso.set(true);
        this.limparFormulario();
      },
      error: (err) => {
        console.error('Erro exato ao chamar o serviço:', err);
        this.mensagem.set('Erro na criação! Aperte F12 e veja o Console.');
        this.isSucesso.set(false);
      }
    });
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