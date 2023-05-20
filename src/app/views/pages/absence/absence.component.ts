import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Absence } from 'src/app/core/models/absence';
import { User } from 'src/app/core/models/user';
import { DatabaseService } from 'src/app/core/service/database.service';

@Component({
  selector: 'app-absence',
  templateUrl: './absence.component.html',
  styleUrls: ['./absence.component.css']
})
export class AbsenceComponent  implements OnInit{
  current_id:number|undefined
  rows:Absence[] | undefined;
  users:any[]=[];
  public selected :any = [];
      // @ts-ignore
      itemForm: FormGroup;
      constructor( private modalService: NgbModal,private formBuilder: FormBuilder,
        private route: ActivatedRoute,private toaster: ToastrService,
        private router: Router,private database: DatabaseService){
    
      }
  ngOnInit(): void {
    this.itemForm = this.formBuilder.group({
      motif: ["", Validators.required],
      dateDebut: ["", Validators.required],
      dateFin: ["", Validators.required],
      user_id: ["", Validators.required],
      id: [null, Validators.required]
    });
    this.database.getAbsences().subscribe((res)=>{
      this.rows=res;
    },(error)=>{

    }
    );
  }
  openLg(content:any) {
    this.modalService.open(content, { size: 'md' });
    this.database.getUsers().subscribe((res)=>{
      this.users=res;
    }
    );
  }
  openEditLg(content: any,row:any) {
    this.itemForm=this.formBuilder.group({
      motif: row.motif,
      dateDebut:row.dateDebut,
      dateFin:row.dateFin,
      user_id:row.user_id,
      id: row.id
    });
    this.modalService.open(content, { size: 'md' });
  }
  onSubmit() {

    console.log(this.itemForm.value)
    this.database.createAbsence(this.itemForm.value).subscribe((res: any) => {
      this.toaster.success("Enregistrement avec success", 'OK');
     this.modalService.dismissAll();
     this.database.getAbsences().subscribe((res)=>{
      this.rows=res;
    });
    }, err => {
      console.log(err);
      this.toaster.error("Ust produite", err.message);
     // this.toaster.error(this.translateService.instant('internalServerError'), err.message);
    });
  }
  openDelete(content: any,row:any) {
    this.current_id=row.id;
    this.modalService.open(content, { size: 'md' });
  }
  delete() {

    this.database.deleteAbsence(Number(this.current_id)).subscribe((res: any) => {
      this.toaster.success("Suppression avec success", 'OK');
     this.modalService.dismissAll();
     this.database.getAbsences().subscribe((res)=>{
      this.rows=res;
    })
    }, err => {
      console.log(err);
      this.toaster.error("Ust produite", err.message);
     // this.toaster.error(this.translateService.instant('internalServerError'), err.message);
    });
  }
}

