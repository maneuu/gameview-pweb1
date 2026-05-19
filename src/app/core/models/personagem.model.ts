export interface Personagem {
  id_personagem: number;
  nome_personagem: string;
  fk_id_jogador: number;
  fk_id_classe: number;
  descricao: string;
  arma_principal: string;
  habilidades: string;
  raca: string;
}
