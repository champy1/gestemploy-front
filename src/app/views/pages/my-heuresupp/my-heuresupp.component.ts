import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { HeureSuppl } from 'src/app/core/models/heuresuppl';
import { User } from 'src/app/core/models/user';
import { DatabaseService } from 'src/app/core/service/database.service';

@Component({
  selector: 'app-my-heuresupp',
  templateUrl: './my-heuresupp.component.html',
  styleUrls: ['./my-heuresupp.component.css']
})
export class MyHeuresuppComponent   implements OnInit{
  rows:HeureSuppl[] =[];
  current_id:number|undefined
  currentUser: any;
  users:User[] =[]
      // @ts-ignore
      itemForm: FormGroup;
      constructor( private modalService: NgbModal,private formBuilder: FormBuilder,
        private route: ActivatedRoute,private toaster: ToastrService,
        private router: Router,private database: DatabaseService){
    
      }
  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser')!);
    this.database.getHeuresupplementaireByUser(this.currentUser.id).subscribe((res)=>{
      this.rows=res;
    },(error)=>{

    }
    );
  }
}
