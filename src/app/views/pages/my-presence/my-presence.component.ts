import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Presence } from 'src/app/core/models/presence';
import { DatabaseService } from 'src/app/core/service/database.service';

@Component({
  selector: 'app-my-presence',
  templateUrl: './my-presence.component.html',
  styleUrls: ['./my-presence.component.css']
})
export class MyPresenceComponent implements OnInit {
  rows: Presence[] = [];
  currentUser: any;
  selectdate:string|undefined;
  selectrow!:Presence;
   // @ts-ignore
  timeIn:string=null;
   // @ts-ignore
  timeOut!:string=null;
  pipe= new DatePipe('en-US');
  constructor( private modalService: NgbModal,private formBuilder: FormBuilder,
    private route: ActivatedRoute,private toaster: ToastrService,
    private router: Router,private database: DatabaseService){

  }
  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser')!);
    this.database.getPresencsByUser(this.currentUser.id).subscribe((res)=>{
      this.rows=res;
    },(error)=>{

    }
    );
  }
 
}
