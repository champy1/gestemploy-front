import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalService } from '@coreui/angular';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Departement } from 'src/app/core/models/departement';
import { DatabaseService } from 'src/app/core/service/database.service';

@Component({
  selector: 'app-departement',
  templateUrl: './departement.component.html',
  styleUrls: ['./departement.component.css']
})
export class DepartementComponent implements OnInit{
  rows!: Departement[];
  current_id:number|undefined
    // @ts-ignore
    itemForm: FormGroup;
  constructor( private modalService: NgbModal,private formBuilder: FormBuilder,
    private route: ActivatedRoute,private toaster: ToastrService,
    private router: Router,private database: DatabaseService){

  }
  ngOnInit(): void {
    this.itemForm = this.formBuilder.group({
      nomDepartement: ["", Validators.required],
    });
    this.database.getDepartements().subscribe((res)=>{
      this.rows=res;
    },(error)=>{

    }
    );
  }
  openLg(content:any) {
    
    this.modalService.open(content, { size: 'lg' });
  }
  openEditLg(content: any,row:any) {
    this.itemForm=this.formBuilder.group({
      nomDepartement: row.nomDepartement,
      id: row.id
    });
    this.modalService.open(content, { size: 'md' });
  }
  onSubmit() {
    console.log(this.itemForm.value)
    this.database.createDepartement(this.itemForm.value).subscribe((res: any) => {
      this.toaster.success("Enregistrement avec success", 'OK');
     this.modalService.dismissAll();
     this.database.getDepartements().subscribe((res)=>{
      this.rows=res;
    }
    );

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

    this.database.deleteDepartement(Number(this.current_id)).subscribe((res: any) => {
      this.toaster.success("Suppression avec success", 'OK');
     this.modalService.dismissAll();
     this.database.getDepartements().subscribe((res)=>{
      this.rows=res;
    })
    }, err => {
      console.log(err);
      this.toaster.error("Ust produite", err.message);
     // this.toaster.error(this.translateService.instant('internalServerError'), err.message);
    });
  }
}
