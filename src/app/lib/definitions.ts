export type Pokemon = {
  id: number;
  name: string;
  image: string;
  types1: string;
  types2: string;

};

export type Team = {
  name: string;
  pokemon: Pokemon[];
};

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  teams: Team[];
};