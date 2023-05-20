import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Departement } from 'src/app/core/models/departement';
import { Fonction } from 'src/app/core/models/fonction';
import { MakePlaning } from 'src/app/core/models/makePlaning';
import { PlaningModel } from 'src/app/core/models/planingModels';
import { TypePlaning } from 'src/app/core/models/typeplaning';
import { DatabaseService } from 'src/app/core/service/database.service';

@Component({
  selector: 'app-planing-month',
  templateUrl: './planing-month.component.html',
  styleUrls: ['./planing-month.component.css']
})
export class PlaningMonthComponent   implements OnInit {

  currentDate=new Date()
  select_user=""
  select_date=""
  select_user_id=0;
  select_planing_id=0;
  planing: MakePlaning = new MakePlaning;
  rowModels:PlaningModel[]=[];
  typePlanings:TypePlaning[]|undefined;
  departements:Departement[]|undefined;
  fonctions:Fonction[]|undefined;
  rowHeaders:Date[]=[];
   pipe= new DatePipe('en-US');
  // @ts-ignore
  itemForm: FormGroup;
  constructor( private modalService: NgbModal,private formBuilder: FormBuilder,
   private route: ActivatedRoute,private toaster: ToastrService,
   private router: Router,private database: DatabaseService){
     this.itemForm = this.formBuilder.group({
       fonction_id: ["", Validators.required],
       type_planing_id: ["", Validators.required],
       date_debut: ["", Validators.required],
       date_fin: ["", Validators.required],
       type_planing: ["", Validators.required],
/*         heure_debut: [null, Validators.required],
       heure_fin: [null, Validators.required], */
       repeat: ["none", Validators.required],
       user_id: [null, Validators.required],
       id: [null, Validators.required],
     });
 }
 ngOnInit(): void {
   
   let date_current=this.currentDate.getFullYear()+'-'+this.currentDate.getMonth()+'-'+this.currentDate.getDate();
   let currentDate_=this.pipe.transform(this.currentDate,'yyyy-MM-dd')
/*     this.database.getPlaningAll().subscribe((res)=>{
     this.rowModels=res;
   } 
   );*/
    this.database.getPlaningHeaderMonths(currentDate_!).subscribe((res)=>{
     this.rowHeaders=res;
   },(error)=>{

   }
   );
   this.database.getPlaningModelMonths(currentDate_!).subscribe((res)=>{
     this.rowModels=res;
   },(error)=>{

   }
   ); 
 }
  public getWeekDays(startingDate: Date): Date[] {
   const dateList: Date[] = [];
   for (let i = 0; i <= 6; i++) {
     const newDate = new Date(this.currentDate.getTime());
     newDate.setDate(newDate.getDate() + i);
     dateList.push(newDate);
   }
   return dateList;
 }
 openLg(content:any,date:any,row:any) {
   console.log(row.user);
   this.select_user=row.user;
   this.select_user_id=row.user_id;
   this.itemForm.value.user_id=row.user_id
  this.itemForm.patchValue({
     'date_debut':date,
     'user_id':row.user_id
   })
   this.database.getTypeplaning().subscribe((res)=>{
     this.typePlanings=res;
   }); 
   this.database.getFonctionByDepartement(row.departement_id).subscribe((res)=>{
     this.fonctions=res;
   });
   this.modalService.open(content, { size: 'lg' });

 }

 editModal(content:any,row:any) {
   console.log(row.user);
  
   this.database.getPlaningByID(row).subscribe((res)=>{
     this.planing=res;
      this.select_date=res.date_planing!;
   this.select_user=res.user_name!;
   this.select_user_id=res.user_id!;
   this.itemForm.patchValue({
     'date_debut':res.date_debut,
     'date_fin':res.date_fin,
     'user_id':res.user_id,
       fonction_id: res.fonction_id,
       type_planing_id: res.type_planing_id,
       heure_debut: res.heure_debut,
       heure_fin: res.heure_fin,
       id: res.id,
   })
   this.database.getFonctionByDepartement(res.departement_id!).subscribe((res)=>{
     this.fonctions=res;
   });
   });
  
   console.log(this.planing)
   this.database.getTypeplaning().subscribe((res)=>{
     this.typePlanings=res;
   });
   
   this.modalService.open(content, { size: 'lg' });

 }
 deleteModal(content:any,row:any) {
   this.modalService.dismissAll();
   this.select_planing_id=row
   this.modalService.open(content, { size: 'md' });

 }
 getNextWeek(date:any){
   this.rowHeaders=[];
   this.rowModels=[]
   let resut= new Date(date)
   resut.setDate(resut.getDate()+2)
   let currentDate_=this.pipe.transform(resut,'yyyy-MM-dd')
    this.database.getPlaningHeaderMonths(currentDate_!).subscribe((res)=>{
     this.rowHeaders=res;
   }
   );
   this.database.getPlaningModelMonths(currentDate_!).subscribe((res)=>{
     this.rowModels=res;
   }
   );
 }
 getPreviousWeek(date:Date){
   this.rowHeaders=[];
   this.rowModels=[]
   let resut= new Date(date)
   resut.setDate(resut.getDate()-1)
   console.log(resut)
  // date.setDate(date.getDate()-1)
   let currentDate=this.pipe.transform(resut,'yyyy-MM-dd')
   this.database.getPlaningHeaderMonths(currentDate!).subscribe((res)=>{
     this.rowHeaders=res;
   }
   );
   this.database.getPlaningModelMonths(currentDate!).subscribe((res)=>{
     this.rowModels=res;
   }
   );
 }
 checkOldDate(date:any){
   let now=new Date()
   let resut= new Date(date)
   if(now>resut){
     return false;
   }else{
     return true;
   }
 }
 onSubmit() {
   let currentDate_=this.pipe.transform(this.currentDate,'yyyy-MM-dd')
   this.itemForm.value.user_id=this.select_user_id
   console.log(this.itemForm.value)
   this.database.createPlaning(this.itemForm.value).subscribe((res: any) => {
     this.toaster.success("Enregistrement avec success", 'OK');
    this.modalService.dismissAll();
    this.database.getPlaningModels(currentDate_!).subscribe((res)=>{
     this.rowModels=res;
   })
   }, err => {
     console.log(err);
     this.toaster.error("Ust produite", err.message);
    // this.toaster.error(this.translateService.instant('internalServerError'), err.message);
   });
 }
 onUpdate() {
   let currentDate_=this.pipe.transform(this.currentDate,'yyyy-MM-dd')
   console.log(this.itemForm.value)
   this.database.createPlaning(this.itemForm.value).subscribe((res: any) => {
     this.toaster.success("Enregistrement avec success", 'OK');
    this.modalService.dismissAll();
    this.database.getPlaningModels(currentDate_!).subscribe((res)=>{
     this.rowModels=res;
   })
   }, err => {
     console.log(err);
     this.toaster.error("Ust produite", err.message);
    // this.toaster.error(this.translateService.instant('internalServerError'), err.message);
   });
 }
 onDelete() {
   let currentDate_=this.pipe.transform(this.currentDate,'yyyy-MM-dd')
   this.database.deletePlaningByID(this.select_planing_id).subscribe((res: any) => {
     this.toaster.success("Suppression avec success", 'OK');
    this.modalService.dismissAll();
    this.database.getPlaningModels(currentDate_!).subscribe((res)=>{
     this.rowModels=res;
   })
   }, err => {
     console.log(err);
     this.toaster.error("Une erreur s'est produite", err.message);
   });
 }
}
