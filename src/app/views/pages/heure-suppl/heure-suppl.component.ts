import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { HeureSuppl } from 'src/app/core/models/heuresuppl';
import { User } from 'src/app/core/models/user';
import { DatabaseService } from 'src/app/core/service/database.service';

@Component({
  selector: 'app-heure-suppl',
  templateUrl: './heure-suppl.component.html',
  styleUrls: ['./heure-suppl.component.css']
})
export class HeureSupplComponent  implements OnInit{
  rows:HeureSuppl[] =[];
  current_id:number|undefined
  users:User[] =[]
      // @ts-ignore
      itemForm: FormGroup;
      constructor( private modalService: NgbModal,private formBuilder: FormBuilder,
        private route: ActivatedRoute,private toaster: ToastrService,
        private router: Router,private database: DatabaseService){
    
      }
  ngOnInit(): void {
    this.itemForm = this.formBuilder.group({
      dateHeureSuppl: ["", Validators.required],
      heureDebut: ["", Validators.required],
      heureFin: ["", Validators.required],
      user_id: ["", Validators.required],
      id: [null, Validators.required],
    });
    this.database.getHeuresupplementaires().subscribe((res)=>{
      this.rows=res;
    },(error)=>{

    }
    );
  }
  openLg(content:any) {
    this.modalService.open(content, { size: 'lg' });
    this.database.getUsers().subscribe((res)=>{
      this.users=res;
    }  );
  }
  changeDate(){
   console.log( this.itemForm.value.dateHeureSuppl)
   this.database.getPlageByDate(Number(this.itemForm.value.user_id),this.itemForm.value.dateHeureSuppl).subscribe((res: any) => {
    this.itemForm.value.heureDebut=res.heureDebut
    this.itemForm.patchValue({
      heureDebut:res.heureFin
    })
  }, err => {
    console.log(err);
    this.toaster.error("une erreur s'est produte", "il n'a pas de plage a cette date pour ce employe");
   // this.toaster.error(this.translateService.instant('internalServerError'), err.message);
  });
  }
  onSubmit() {

    console.log(this.itemForm.value)
    this.database.createHeureSuppl(this.itemForm.value).subscribe((res: any) => {
      this.toaster.success("Enregistrement avec success", 'OK');
     this.modalService.dismissAll();

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

    this.database.deleteheureSuppl(Number(this.current_id)).subscribe((res: any) => {
      this.toaster.success("Suppression avec success", 'OK');
     this.modalService.dismissAll();
     this.database.getHeuresupplementaires().subscribe((res)=>{
      this.rows=res;
    })
    }, err => {
      console.log(err);
      this.toaster.error("Ust produite", err.message);
     // this.toaster.error(this.translateService.instant('internalServerError'), err.message);
    });
  }
}
