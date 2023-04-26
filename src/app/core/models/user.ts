import { Role } from './role';

export class User {
  id: number | undefined;
  img: string | undefined;
  email: string | undefined;
  password: string | undefined;
  role: Role | undefined;
  token: string | undefined;
  username: string | undefined;
  firstname: string | undefined;
  lastname: string | undefined;
  phone: string | undefined;
  matricule: string | undefined;
  genre: string | undefined;
  etatCivil: string | undefined;
  compteIban: string | undefined;
  //role;
  departement_id: number | undefined;
  departement: string | undefined;
}
