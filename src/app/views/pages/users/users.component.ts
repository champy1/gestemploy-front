import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Departement } from 'src/app/core/models/departement';
import { User } from 'src/app/core/models/user';
import { DatabaseService } from 'src/app/core/service/database.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent  implements OnInit{
  rows:User[] | undefined;
  current_id:number|undefined
  departements:Departement[] | undefined;
      // @ts-ignore
      itemForm: FormGroup;
      constructor( private modalService: NgbModal,private formBuilder: FormBuilder,
        private route: ActivatedRoute,private toaster: ToastrService,
        private router: Router,private database: DatabaseService){
    
      }
      ibanPattern = "^[a-z0-9_-]{16,16}$";
      emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  ngOnInit(): void {
    this.itemForm = this.formBuilder.group({
      password: ["12345", Validators.required],
      username: ["username", Validators.nullValidator],
      firstname: ["", Validators.required],
      lastname: ["", Validators.nullValidator],
      phone: ["", Validators.required],
      matricule: ["", Validators.nullValidator],
      genre: ["", Validators.nullValidator],
      etatCivil: ["", Validators.nullValidator],
      compteIban: ["", [Validators.required,Validators.pattern(this.ibanPattern), Validators.minLength(16)]],
      email: ["", Validators.required,Validators.pattern(this.emailPattern)],
     role: ["", Validators.required],
      departement_id: ["", Validators.required],
      id: [null, Validators.nullValidator],
      departement:[null, Validators.nullValidator]
    });
    this.database.getUsers().subscribe((res)=>{
      this.rows=res;
    },(error)=>{

    }
    );
  }
  openLg(content:any) {
    this.modalService.open(content, { size: 'lg' });
    this.database.getDepartements().subscribe((res)=>{
      this.departements=res;
    },(error)=>{

    }
    );
  }
  openEditLg(content: any,row:any) {
    this.itemForm=this.formBuilder.group({
      username: row.username,
      firstname: row.firstname,
      lastname: row.lastname,
      phone: row.phone,
      matricule: row.matricule,
      genre: row.genre,
      etatCivil: row.etatCivil,
      compteIban: row.compteIban,
      email: row.email,
      role: row.role,
      departement_id: row.departement_id,
      id: row.id,
      departement: row.departement
    })
    this.modalService.open(content, { size: 'lg' });
    this.database.getDepartements().subscribe((res) => {
      this.departements = res;
    }, (error) => {

    }
    );
  }
  onSubmit() {

    console.log(this.itemForm.value)
    this.database.createUser(this.itemForm.value).subscribe((res: any) => {
      this.toaster.success("Enregistrement avec success", 'OK');
     this.modalService.dismissAll();
     this.database.getUsers().subscribe((res)=>{
      this.rows=res;
    })

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

    this.database.deleteUser(Number(this.current_id)).subscribe((res: any) => {
      this.toaster.success("Suppression avec success", 'OK');
     this.modalService.dismissAll();
     this.database.getUsers().subscribe((res)=>{
      this.rows=res;
    })
    }, err => {
      console.log(err);
      this.toaster.error("Ust produite", err.message);
     // this.toaster.error(this.translateService.instant('internalServerError'), err.message);
    });
  }
}
