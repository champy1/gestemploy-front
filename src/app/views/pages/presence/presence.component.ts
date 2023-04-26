import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Presence } from 'src/app/core/models/presence';
import { User } from 'src/app/core/models/user';
import { DatabaseService } from 'src/app/core/service/database.service';
@Component({
  selector: 'app-presence',
  templateUrl: './presence.component.html',
  styleUrls: ['./presence.component.css']
})
export class PresenceComponent implements OnInit {
  rows: Presence[] = [];
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
   let currentDate_=Date.now();
  // this.selectdate="2023-04-09"
    let selectdate=this.pipe.transform(currentDate_,'yyyy-MM-dd')
    console.log(selectdate)
    this.selectdate=selectdate!;
    this.database.getPresencebyDate(selectdate!).subscribe((res)=>{
      this.rows=res;
    },(error)=>{

    }
    );
  }
  dateChange(date:any){
    let currentDate_=this.pipe.transform(this.selectdate,'yyyy-MM-dd')
    this.database.getPresencebyDate(currentDate_!).subscribe((res)=>{
      this.rows=res;
    })
  }
  openFiche(content:any,row:any){
    this.selectrow=row;
    this.modalService.open(content, { size: 'md' });
    
  }
  closeFiche(content:any,row:any){
    this.selectrow=row;
    this.modalService.open(content, { size: 'md' });
  }
  onSubmit(){
    let values={
      'id':this.selectrow.id,
      'heureDebut':this.timeIn,
      'heureFin':this.timeOut,
      'user_id':this.selectrow.user_id
    }
    this.database.createFiche(values).subscribe((res: any) => {
      this.toaster.success("Enregistrement avec success", 'OK');
     this.modalService.dismissAll();
     this.database.getPresencebyDate(this.selectdate!).subscribe((res)=>{
      this.rows=res;
    })}
    );
  }
}
