import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Avantage } from 'src/app/core/models/avantage';
import { Departement } from 'src/app/core/models/departement';
import { User } from 'src/app/core/models/user';
import { DatabaseService } from 'src/app/core/service/database.service';

@Component({
  selector: 'app-avantage',
  templateUrl: './avantage.component.html',
  styleUrls: ['./avantage.component.css']
})
export class AvantageComponent implements OnInit{
  current_id:number|undefined
  rows:Avantage[] | undefined;
      // @ts-ignore
      itemForm: FormGroup;
      constructor( private modalService: NgbModal,private formBuilder: FormBuilder,
        private route: ActivatedRoute,private toaster: ToastrService,
        private router: Router,private database: DatabaseService){
    
      }
  ngOnInit(): void {
    this.itemForm = this.formBuilder.group({
      typeAvantage: ["", Validators.required],
      id: [null, Validators.required]
    });
    this.database.getAvantages().subscribe((res)=>{
      this.rows=res;
    },(error)=>{

    }
    );
  }
  openLg(content:any) {
    this.modalService.open(content, { size: 'md' });

  }
  openEditLg(content: any,row:any) {
    this.itemForm=this.formBuilder.group({
      typeAvantage: row.typeAvantage,
      id: row.id
    });
    this.modalService.open(content, { size: 'md' });
  }
  onSubmit() {

    console.log(this.itemForm.value)
    this.database.createAvantage(this.itemForm.value).subscribe((res: any) => {
      this.toaster.success("Enregistrement avec success", 'OK');
     this.modalService.dismissAll();
     this.database.getAvantages().subscribe((res)=>{
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

    this.database.deleteAvantage(Number(this.current_id)).subscribe((res: any) => {
      this.toaster.success("Suppression avec success", 'OK');
     this.modalService.dismissAll();
     this.database.getAvantages().subscribe((res)=>{
      this.rows=res;
    })
    }, err => {
      console.log(err);
      this.toaster.error("Ust produite", err.message);
     // this.toaster.error(this.translateService.instant('internalServerError'), err.message);
    });
  }
}

