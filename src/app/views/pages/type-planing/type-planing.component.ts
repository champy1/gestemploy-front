import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Departement } from 'src/app/core/models/departement';
import { TypePlaning } from 'src/app/core/models/typeplaning';
import { User } from 'src/app/core/models/user';
import { DatabaseService } from 'src/app/core/service/database.service';

@Component({
  selector: 'app-type-planing',
  templateUrl: './type-planing.component.html',
  styleUrls: ['./type-planing.component.css']
})
export class TypePlaningComponent  implements OnInit {
  rows:TypePlaning[] | undefined;
  current_id:number|undefined
  departements:Departement[] | undefined;
      // @ts-ignore
      itemForm: FormGroup;
      constructor( private modalService: NgbModal,private formBuilder: FormBuilder,
        private route: ActivatedRoute,private toaster: ToastrService,
        private router: Router,private database: DatabaseService){
    
      }
  ngOnInit(): void {
    this.itemForm = this.formBuilder.group({
      nomType: ["", Validators.required],
      id: [null, Validators.required]
    });
    this.database.getTypeplaning().subscribe((res)=>{
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
      nomType: row.nomType,
      id: row.id
    });
    this.modalService.open(content, { size: 'md' });
  }
  onSubmit() {

    console.log(this.itemForm.value)
    this.database.createTypeplaning(this.itemForm.value).subscribe((res: any) => {
      this.toaster.success("Enregistrement avec success", 'OK');
     this.modalService.dismissAll();
     this.database.getTypeplaning().subscribe((res)=>{
      this.rows=res;
    },(error)=>{

    }
    );
    }, err => {
      console.log(err);
      this.toaster.error("Une erreur s'est produite", err.message);
     // this.toaster.error(this.translateService.instant('internalServerError'), err.message);
    });
  }
  openDelete(content: any,row:any) {
    this.current_id=row.id;
    this.modalService.open(content, { size: 'md' });
  }
  delete() {

    this.database.deleteTypeplaning(Number(this.current_id)).subscribe((res: any) => {
      this.toaster.success("Suppression avec success", 'OK');
     this.modalService.dismissAll();
     this.database.getTypeplaning().subscribe((res)=>{
      this.rows=res;
    })
    }, err => {
      console.log(err);
      this.toaster.error("Ust produite", err.message);
     // this.toaster.error(this.translateService.instant('internalServerError'), err.message);
    });
  }
}
