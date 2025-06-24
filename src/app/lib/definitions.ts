export type Pokemon = {
  id: number;
  name: string;
  image: string;
  types1: string;
  types2: string;

};

export type Team = {
  id: string;
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