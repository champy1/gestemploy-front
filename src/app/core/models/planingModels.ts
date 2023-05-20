import { MakePlaning } from "./makePlaning";

export class PlaningModel{
    user_id: number | undefined;
    user: string | undefined;
    user_name: string | undefined;
    type_planing_string: string | undefined;
    type_planing: number | undefined;
    date_debut: string | undefined;
    date_fin: string | undefined;
    total_heure: number| undefined;
    fonction: string | undefined;
    heure_debut: string | undefined;
    heure_fin: string | undefined;
    makeplanings: MakePlaning[] | undefined;
}
