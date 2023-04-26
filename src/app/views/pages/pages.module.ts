import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartementComponent } from './departement/departement.component';
import { UsersComponent } from './users/users.component';
import { PagesRoutingModule } from './pages-routing.module';
import { ButtonModule, CardModule, TableModule ,  GridModule,
  ModalModule,
  FormModule,
  TabsModule,
  NavModule,} from '@coreui/angular';
import { FonctionComponent } from './fonction/fonction.component';
import { AvantageComponent } from './avantage/avantage.component';
import { IconModule } from '@coreui/icons-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TypePlaningComponent } from './type-planing/type-planing.component';
import { MyPlaningComponent } from './my-planing/my-planing.component';
import { PlaningComponent } from './planing/planing.component';
import { PaiementComponent } from './paiement/paiement.component';
import { PlaningListComponent } from './planing-list/planing-list.component';
import { ProfilComponent } from './profil/profil.component';
import { PresenceComponent } from './presence/presence.component';
import { PaiementMakeComponent } from './paiement-make/paiement-make.component';
import { HeureSupplComponent } from './heure-suppl/heure-suppl.component';
import { PersonnelComponent } from './personnel/personnel.component';



@NgModule({
  declarations: [
    DepartementComponent,
    UsersComponent,
    FonctionComponent,
    AvantageComponent,
    TypePlaningComponent,
    MyPlaningComponent,
    PlaningComponent,
    PaiementComponent,
    PlaningListComponent,
    ProfilComponent,
    PresenceComponent,
    PaiementMakeComponent,
    HeureSupplComponent,
    PersonnelComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    TableModule,
    ButtonModule,
    CardModule,
    GridModule,
    ModalModule,
    CardModule,
    ButtonModule,
    GridModule,
    IconModule,
    FormsModule,
    FormModule,
    TabsModule,
    NavModule,
    ReactiveFormsModule,
  ]
})
export class PagesModule { }
