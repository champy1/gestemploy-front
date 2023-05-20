import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ToastrService } from 'ngx-toastr';
import { Departement } from 'src/app/core/models/departement';
import { Fonction } from 'src/app/core/models/fonction';
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
  checkTypeplaning=false
  imageSrc: any = '';
  public selected :any = [];
  public dayworks :any=[];
  // @ts-ignore
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  departements:Departement[] | undefined;
  fonctions:Fonction[]|undefined;
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
      fonction_id: ["", Validators.required],
      id: [null, Validators.nullValidator],
      imageFile: ['', [Validators.required]],
      departement:[null, Validators.nullValidator],
      typeplaning:[null, Validators.nullValidator],
      dayworks:[null, Validators.nullValidator],
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
    this.itemForm.reset();
    this.imageSrc=null
    this.modalService.open(content, { size: 'lg' });
    this.database.getDepartements().subscribe((res)=>{
      this.departements=res;
    },(error)=>{

    }
    );
  }
  changeDepartement(departement:Event){
    this.database.getFonctionByDepartement(parseInt((departement.target as HTMLInputElement).value)).subscribe((res)=>{
      this.fonctions=res;
    });
  }
  changeTypePlaning(departement:Event){
  console.log( this.itemForm.value.typeplaning)
  if(this.itemForm.value.typeplaning==2){
    this.checkTypeplaning=true
  }else{
    this.checkTypeplaning=false
  }
  }
  clickDay(event:Event){
    // @ts-ignore
    if(event.target!.checked!){
     
      this.dayworks.push((event.target as HTMLInputElement).value)
      console.log(this.dayworks)
    }else{

    }
    
  }
  openEditLg(content: any,row:any) {
    this.itemForm.reset();
    //this.onFileSelect(row.imageFile);
    this.database.getFonctionByDepartement(parseInt(row.departement_id)).subscribe((res)=>{
      this.fonctions=res;
    });
    this.imageSrc = row.imageFile;
    if(row.typeplaning==2){
      this.checkTypeplaning=true
      this.dayworks=row.dayworks
    }else{
      this.checkTypeplaning=false
      this.dayworks=[]
    }
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
      fonction_id: row.fonction_id,
      id: row.id,
      departement: row.departement,
      typeplaning:row.typeplaning,
      imageFile:[],
      dayworks:[]
    })
    this.modalService.open(content, { size: 'lg' });
    this.database.getDepartements().subscribe((res) => {
      this.departements = res;
    }, (error) => {

    }
    );
    console.log(this.dayworks)
  }
  onSubmit() {
    
    this.itemForm.value.dayworks = this.dayworks;
    console.log(this.itemForm.value)
    this.database.createUser(this.itemForm.value).subscribe((res: any) => {
      this.database.getUsers().subscribe((res)=>{
        this.rows=res;
      })
      this.itemForm.reset();
      this.modalService.dismissAll();
 /*     this.itemFormPlaning.value.user_id=res.id
    console.log(this.itemFormPlaning.value)
     this.database.createPlaning(this.itemFormPlaning.value).subscribe((res: any) => {
      this.toaster.success("Enregistrement avec success", 'OK');
      this.database.getUsers().subscribe((res)=>{
        this.rows=res;
      })
     this.modalService.dismissAll();
    }, err => {
      console.log(err);
      this.toaster.error("Ust produite", err.message);
    }); */
  
  

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
    this.itemForm.value.imageFile = this.imageSrc;
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
