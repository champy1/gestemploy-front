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
    name: 'Mon planing',
    url: '/pages/my-planing',
    iconComponent: { name: 'cil-JustifyCenter' },
    role:"ALL"
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
    name: 'Fiche presence',
    url: '/pages/presence',
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
    name: 'Type planing',
    url: '/pages/type-planing',
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
export const navItemsUSER: IcustomNavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
    role:"ALL"
  
  },
  {
    name: 'Mon planing',
    url: '/pages/my-planing',
    iconComponent: { name: 'cil-JustifyCenter' },
    role:"ALL"
  },
];
