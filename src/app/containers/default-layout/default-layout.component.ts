import { Component } from '@angular/core';
import { Role } from 'src/app/core/models/role';
import { AuthService } from 'src/app/core/service/auth.service';

import { IcustomNavData, navItems, navItemsComptable, navItemsUSER } from './_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
})
export class DefaultLayoutComponent {

  public navItems! :IcustomNavData [];

  public perfectScrollbarConfig = {
    suppressScrollX: true,
  };

  constructor(private authService: AuthService,) {
    const userRole = this.authService.currentUserValue.role;
    if(userRole==Role.User){
       this.navItems = navItemsUSER;
    }else if(userRole==Role.Comptable){
      this.navItems = navItemsComptable;
    }else{
      this.navItems = navItems;
    }
  }
}
