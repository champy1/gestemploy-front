export class Paiement{
    id: number | undefined;
    datePaie: string | undefined;
    total_jour: number | undefined;
    month: number | undefined;
    year: number | undefined;
    code_paiement: string | undefined;
    precomptePro: number | undefined;
    cotisationCnss: number | undefined;
    retenu_retraite: number | undefined;
    retenu_chomage: number | undefined;
    retenu_total: number | undefined;
    cnss_retenue: number | undefined;
    suppl_transport: number | undefined;
    prime_HS: number | undefined;
    prime_prestation: number | undefined;
    prime_equipe: number | undefined;
    total_brut: number | undefined;
    total_prime: number | undefined;
    total_impossable: number | undefined;
    total_net: number | undefined;
    user_name: string | undefined;
    user_matricule: string | undefined;
}