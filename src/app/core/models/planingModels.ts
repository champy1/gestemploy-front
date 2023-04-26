import { MakePlaning } from "./makePlaning";

export class PlaningModel{
    user_id: number | undefined;
    user: string | undefined;
    total_heure: number| undefined;
    makeplanings: MakePlaning[] | undefined;
}
