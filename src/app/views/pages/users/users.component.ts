import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatatableComponent } from '@swimlane/ngx-datatable';
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
  temp:User[] | undefined;
  current_id:number|undefined
  imageSrc: any = '';
  public selected :any = [];
  // @ts-ignore
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
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
      imageFile: ['', [Validators.required]],
      departement:[null, Validators.nullValidator]
    });
    this.database.getUsers().subscribe((res)=>{
      this.rows=res;
      this.temp=res;
    },(error)=>{

    }
    );
  }
    updateFilter(event:any) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp_ = this.temp!.filter(function (d) {
      return d.firstname!.toLowerCase().indexOf(val) !== -1||
       d.matricule!.toLowerCase().indexOf(val) !== -1 || d.lastname!.toLowerCase().indexOf(val) !== -1
          !val;
    });
//console.log(this.temp)
    // update the rows
    this.rows = temp_;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }
  // @ts-ignore
  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
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
    //this.onFileSelect(row.imageFile);
    this.imageSrc = row.imageFile;
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
      departement: row.departement,
      imageFile:row.imageFile
    })
    this.modalService.open(content, { size: 'lg' });
    this.database.getDepartements().subscribe((res) => {
      this.departements = res;
    }, (error) => {

    }
    );
  }
  onSubmit() {
    this.itemForm.value.imageFile = this.imageSrc;
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
  onFileSelect(event:any) {
    const file = event.target.files[0];
    let status = event.target.files.length > 0;
    if (status === true){
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            this.imageSrc = reader.result;
           // this.fileType=file.type;
        };
    }
}
onImageSelect(event:any) {
  const file = event.target.files[0];
  let status = event.target.files.length > 0;
  if (status === true){
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
          this.imageSrc = reader.result;
         // this.fileType=file.type;
      };
  }
}
}
