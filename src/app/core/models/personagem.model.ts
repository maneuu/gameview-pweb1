export interface Personagem {
  idPersonagem: number;
  nomePersonagem: string;
  fk_id_jogador: number;
  fk_id_classe: number;
  descricao: string;
  armaPrincipal: string;
  habilidades: string;
  raca: string;
}
