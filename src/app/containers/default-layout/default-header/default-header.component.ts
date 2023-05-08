import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ClassToggleService, HeaderComponent } from '@coreui/angular';
import { AuthService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent {

  @Input() sidebarId: string = "sidebar";

  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public newNotifications = new Array(5)
  userImage:any
  constructor(private classToggler: ClassToggleService,private route: ActivatedRoute,
    private router: Router,private authService: AuthService) {
    super();
     this.userImage = this.authService.currentUserValue.img;
  }
  logout(){
    localStorage.removeItem('currentUser');
    this.authService.logout()
    this.router.navigate(["/login"]);
  }
}
