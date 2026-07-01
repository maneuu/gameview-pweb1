import { Jogador } from './jogador.model';
import { Monstro } from './monstro.model';

export interface BatalhaRegistro {
  idBatalha: number;
  fk_id_jogador: number;
  fk_id_monstro: number;
  jogador?: Jogador;
  monstro?: Monstro;
  resultadoBatalha: string;
}
