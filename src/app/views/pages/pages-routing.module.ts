import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guard/auth.guard';
import { Role } from 'src/app/core/models/role';
import { AvantageComponent } from './avantage/avantage.component';
import { DepartementComponent } from './departement/departement.component';
import { FonctionComponent } from './fonction/fonction.component';
import { HeureSupplComponent } from './heure-suppl/heure-suppl.component';
import { MyHeuresuppComponent } from './my-heuresupp/my-heuresupp.component';
import { MyPaiementComponent } from './my-paiement/my-paiement.component';
import { MyPlaningComponent } from './my-planing/my-planing.component';
import { MyPresenceComponent } from './my-presence/my-presence.component';
import { PaiementMakeComponent } from './paiement-make/paiement-make.component';
import { PaiementComponent } from './paiement/paiement.component';
import { PersonnelComponent } from './personnel/personnel.component';
import { PlaningListComponent } from './planing-list/planing-list.component';
import { PlaningComponent } from './planing/planing.component';
import { PresenceComponent } from './presence/presence.component';
import { ProfilComponent } from './profil/profil.component';
import { TypePlaningComponent } from './type-planing/type-planing.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {
    path: 'my-profil',
    component: ProfilComponent,
    data: {
      title: 'Mon profil',
      
    }
    
  },
  {
    path: 'my-planing',
    component: MyPlaningComponent,
    data: {
      title: 'Mon planing'
    }
  },
  {
    path: 'my-presence',
    component: MyPresenceComponent,
    data: {
      title: 'Mes presences'
    }
  },
  {
    path: 'my-paiement',
    component: MyPaiementComponent,
    data: {
      title: 'Mes paiements'
    }
  },
  {
    path: 'my-heuresuppl',
    component: MyHeuresuppComponent,
    data: {
      title: 'Mes heures supplementaires'
    }
  },
  {
    path: 'personnel',
    canActivate: [AuthGuard],
    component: PersonnelComponent,
    data: {
      title: 'Personnels',
      role: [Role.Admin],
    }
  },
  {
    path: 'heuresuppl',
    canActivate: [AuthGuard],
    component: HeureSupplComponent,
    data: {
      title: 'heure suppl',
      role: [Role.Admin,Role.Comptable],
    }
  },
  {
    path: 'presence',
    canActivate: [AuthGuard],
    component: PresenceComponent,
    data: {
      title: 'presences',
      role: [Role.Admin,Role.Comptable],
    }
  },
  {
    path: 'planing',
    canActivate: [AuthGuard],
    component: PlaningComponent,
    data: {
      title: 'Planings',
      role: [Role.Admin,Role.Comptable],
    }
  },
  {
    path: 'planing-list',
    canActivate: [AuthGuard],
    component: PlaningListComponent,
    data: {
      title: 'Planings listes',
      role: [Role.Admin,Role.Comptable],
    }
  },
  {
    path: 'paiement-make/:month',
    canActivate: [AuthGuard],
    component: PaiementMakeComponent,
    data: {
      title: 'Paiements',
      role: [Role.Admin,Role.Comptable],
    }
  },
  {
    path: 'paiement',
    canActivate: [AuthGuard],
    component: PaiementComponent,
    data: {
      title: 'Paiements',
      role: [Role.Admin,Role.Comptable],
    }
  },
  {
    path: 'users',
    canActivate: [AuthGuard],
    component: UsersComponent,
    data: {
      title: 'Users',
      role: [Role.Admin,Role.Comptable],
    }
  },
  {
    path: 'departements',
    canActivate: [AuthGuard],
    component: DepartementComponent,
    data: {
      title: 'Departements',
      role: [Role.Admin,Role.Comptable],
    }
  },
  {
    path: 'type-planing',
    canActivate: [AuthGuard],
    component: TypePlaningComponent,
    data: {
      title: 'Type planing',
      role: [Role.Admin,Role.Comptable],
    }
  },
  {
    path: 'avantages',
    canActivate: [AuthGuard],
    component: AvantageComponent,
    data: {
      title: 'Avantages',
      role: [Role.Admin,Role.Comptable],
    }
  },
  {
    path: 'fonctions',
    canActivate: [AuthGuard],
    component: FonctionComponent,
    data: {
      title: 'Fonctions',
      role: [Role.Admin,Role.Comptable],
    }
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {
}
