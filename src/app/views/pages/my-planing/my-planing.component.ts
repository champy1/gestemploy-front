import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { MakePlaning } from 'src/app/core/models/makePlaning';
import { PlaningModel } from 'src/app/core/models/planingModels';
import { DatabaseService } from 'src/app/core/service/database.service';
@Component({
  selector: 'app-my-planing',
  templateUrl: './my-planing.component.html',
  styleUrls: ['./my-planing.component.css']
})
export class MyPlaningComponent implements OnInit {
  currentDate=new Date()
  currentUser: any;
  select_user:any
  select_date=""
  select_user_id=0;
  init_date:any
  end_date:any
  rowModels:MakePlaning[]=[];
  rowHeaders:Date[]=[];
    pipe= new DatePipe('en-US');
  constructor(private modalService: NgbModal, private formBuilder: FormBuilder,
    private route: ActivatedRoute, private toaster: ToastrService,
    private router: Router, private database: DatabaseService) {

  }
  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser')!);
    let currentDate_=this.pipe.transform(this.currentDate,'yyyy-MM-dd')
    this.database.getPlaningByUserID(this.currentUser.id,currentDate_!).subscribe((res)=>{
      this.rowModels=res;
      this.init_date=res[0].date_planing
      this.end_date=res[6].date_planing
    },(error)=>{

    }
    );
  }
  getNextWeek(date:any){
    this.rowHeaders=[];
    this.rowModels=[]
    let resut= new Date(date)
    resut.setDate(resut.getDate()+1)
    let currentDate_=this.pipe.transform(resut,'yyyy-MM-dd')
    this.database.getPlaningByUserID(this.currentUser.id,currentDate_!).subscribe((res)=>{
      this.rowModels=res;
      this.init_date=res[0].date_planing
      this.end_date=res[6].date_planing
    },(error)=>{

    }
    );
  }
  getPreviousWeek(date:Date){
    this.rowModels=[]
    let resut= new Date(date)
    resut.setDate(resut.getDate()-1)
    let currentDate=this.pipe.transform(resut,'yyyy-MM-dd')
    this.database.getPlaningByUserID(this.currentUser.id,currentDate!).subscribe((res)=>{
      this.rowModels=res;
      this.init_date=res[0].date_planing
      this.end_date=res[6].date_planing
    },(error)=>{

    }
    );
  }detail(content:any,row:any){
    this.select_user=row
    this.modalService.open(content, { size: 'md' });
  }
}
