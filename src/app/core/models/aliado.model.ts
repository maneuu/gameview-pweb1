import { Jogador } from './jogador.model';

export interface Aliado {
  id: number;
  fk_id_jogador: number;
  fk_id_jogador_aliado: number;
  jogador?: Partial<Jogador>;
  aliado?: Partial<Jogador>;
}
