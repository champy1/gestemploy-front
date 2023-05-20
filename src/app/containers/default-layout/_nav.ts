import { INavData } from '@coreui/angular';
export interface IcustomNavData extends INavData{
  role?:string
}
export const navItems: IcustomNavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
    role:"ALL"
  
  },
  {
    name: 'Mes infos',
    title: true
  },
  {
    name: 'Mon planing',
    url: '/pages/my-planing',
    iconComponent: { name: 'cil-JustifyCenter' },
    role:"ALL"
  },
  {
    name: 'Mes paiements',
    url: '/pages/my-paiement',
    iconComponent: { name: 'cil-Star' },
    role:"ALL"
  },
  {
    name: 'Mes absences',
    url: '/pages/my-absence',
    iconComponent: { name: 'cil-Tags' },
    role:"ALL"
  },
  {
    name: 'Mes heures suppl',
    url: '/pages/my-heuresuppl',
    iconComponent: { name: 'cil-Task' },
    role:"ALL"
  },
  {
    name: 'Communication',
    title: true
  },
  {
    name: 'Envoyer les mails',
    url: '/pages/send-mail',
    iconComponent: { name: 'cil-EnvelopeOpen' },
    role:"ALL"
  },
  {
    divider: true,
  },
  {
    name: 'Comptabilite',
    title: true
  },
  {
    name: 'Paiements',
    url: '/pages/paiement',
    iconComponent: { name: 'cil-Dollar' },
    role:"ADMIN"
  },
  {
    name: 'Operations',
    title: true
  },
  {
    name: 'Plage horaire',
    url: '/pages/plage-horaire',
    iconComponent: { name: 'cil-Speedometer' },
  },
  {
    name: 'Heure suppl',
    url: '/pages/heuresuppl',
    iconComponent: { name: 'cil-ReportSlash' },
  },
  // {
  //   name: 'Planings List',
  //   url: '/pages/planing-list',
  //   iconComponent: { name: 'cil-ListNumbered' },
  // },
  {
    name: 'Planings',
    url: '/pages/planing',
    iconComponent: { name: 'cil-file' },
  },
  {
    name: 'Planings Mois',
    url: '/pages/planing-month',
    iconComponent: { name: 'cil-file' },
  },
  {
    name: 'Parametre',
    title: true
  },
/*   {
    name: 'Personnels',
    url: '/pages/personnel',
    iconComponent: { name: 'cil-User' },
  }, */
  {
    name: 'Employes',
    url: '/pages/users',
    iconComponent: { name: 'cil-people' },
  },
  {
    name: 'Departement',
    url: '/pages/departements',
    iconComponent: { name: 'cil-Task' },
  },
   {
    name: 'Absences',
    url: '/pages/absence',
    iconComponent: { name: 'cil-Bookmark' },
  }, 
  {
    name: 'Fonctions',
    url: '/pages/fonctions',
    iconComponent: { name: 'cil-Layers' },
  },
  {
    name: 'Avantage',
    url: '/pages/avantages',
    iconComponent: { name: 'cil-Options' },
  },
];
export const navItemsComptable: IcustomNavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
    role:"ALL"
  
  },
  {
    name: 'Mes infos',
    title: true
  },
  {
    name: 'Mon planing',
    url: '/pages/my-planing',
    iconComponent: { name: 'cil-JustifyCenter' },
    role:"ALL"
  },
  {
    name: 'Mes paiements',
    url: '/pages/my-paiement',
    iconComponent: { name: 'cil-Star' },
    role:"ALL"
  },
  {
    name: 'Mes absences',
    url: '/pages/my-absence',
    iconComponent: { name: 'cil-Tags' },
    role:"ALL"
  },
  {
    name: 'Mes heures supplementaires',
    url: '/pages/my-heuresuppl',
    iconComponent: { name: 'cil-Task' },
    role:"ALL"
  },
  {
    divider: true,
  },
  {
    name: 'Comptabilite',
    title: true
  },
  {
    name: 'Paiements',
    url: '/pages/paiement',
    iconComponent: { name: 'cil-Dollar' },
    role:"ADMIN"
  },
  {
    name: 'Operations',
    title: true
  },
  {
    name: 'Absence',
    url: '/pages/absence',
    iconComponent: { name: 'cil-Speedometer' },
  },
  {
    name: 'Heure suppl',
    url: '/pages/heuresuppl',
    iconComponent: { name: 'cil-ReportSlash' },
  },

  {
    name: 'Planings',
    url: '/pages/planing',
    iconComponent: { name: 'cil-file' },
  },
  {
    name: 'Planings Mois',
    url: '/pages/planing-month',
    iconComponent: { name: 'cil-file' },
  },
];
export const navItemsUSER: IcustomNavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
    role:"ALL"
  
  },
  {
    name: 'Mes infos',
    title: true
  },
  {
    name: 'Mon planing',
    url: '/pages/my-planing',
    iconComponent: { name: 'cil-JustifyCenter' },
    role:"ALL"
  },
  {
    name: 'Mes paiements',
    url: '/pages/my-paiement',
    iconComponent: { name: 'cil-Star' },
    role:"ALL"
  },
  {
    name: 'Mes absences',
    url: '/pages/my-absence',
    iconComponent: { name: 'cil-Tags' },
    role:"ALL"
  },
  {
    name: 'Mes heures supplementaires',
    url: '/pages/my-heuresuppl',
    iconComponent: { name: 'cil-Task' },
    role:"ALL"
  },
  {
    divider: true,
  },
];
