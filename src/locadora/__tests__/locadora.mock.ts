import { FilmEntity } from "../entity/locadora.entity";

export const filmEntityMock: FilmEntity = {
  id: 8,
  title: "um novo filme",
  sinopse: "mais do mesmo",
  director: "desconhecido",
  actors: "desconhecido",
  release_date: new Date(),
  created_at: new Date(),
  updated_at: new Date(),
}