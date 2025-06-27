export type Pokemon = {
  id: string; // UUID of the pokemon
  name: string; // Name of the pokemon
  nickname: string;
  pokedex_number: number;
  move1: string;
  move2: string;
  move3: string;
  move4: string;
  shiny: boolean;
  ability: string;
  trainerId: string; // UUID of the user who caught the pokemon
  teamId: string; // UUID of the team this pokemon belongs to

};

export type Team = {
  id: number;
  name: string;
  pokemon1: number;
  pokemon2: number;
  pokemon3?: number;
  pokemon4?: number;
  pokemon5?: number;
  pokemon6?: number;
  userId: string; // UUID of the user who owns the team
};

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  
};