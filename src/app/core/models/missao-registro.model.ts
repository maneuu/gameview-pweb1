import { Jogador } from './jogador.model';
import { Missao } from './missao.model';

export interface MissaoRegistro {
  idMissaoRegistro: number;
  fk_id_jogador: number;
  fk_id_missao: number;
  jogador?: Jogador;
  missao?: Missao;
  status: string;
}
