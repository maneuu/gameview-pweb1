import { Classe } from './classe.model';
import { Jogador } from './jogador.model';

export interface Personagem {
  idPersonagem: number;
  nomePersonagem: string;
  fk_id_jogador: number;
  fk_id_classe: number;
  jogador?: Jogador;
  classe?: Classe;
  descricao: string;
  armaPrincipal: string;
  habilidades: string;
  raca: string;
}
