import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DatabaseService } from 'src/app/core/service/database.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  currentUser: any;
  oldpassword: any;
  newpassword: any;
  // @ts-ignore
  itemForm: FormGroup;
  constructor(private modalService: NgbModal, private formBuilder: FormBuilder,
    private route: ActivatedRoute, private toaster: ToastrService,
    private router: Router, private database: DatabaseService) {
    this.itemForm = this.formBuilder.group({
      username: ["username", Validators.nullValidator],
      firstname: ["", Validators.required],
      lastname: ["", Validators.required],
      phone: ["", Validators.required],
      matricule: ["", Validators.required],
      genre: ["", Validators.required],
      etatCivil: ["", Validators.required],
      compteIban: ["", Validators.required],
      email: ["", Validators.required],
      role: ["", Validators.required],
      departement_id: ["", Validators.required],
      id: [null, Validators.required],
      departement: [null]
    });
  }
  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser')!);
    console.log(this.currentUser.id)
    this.database.getUserById(this.currentUser.id).subscribe((res) => {
      this.itemForm = this.formBuilder.group({
        username: res.username,
        firstname: res.firstname,
        lastname: res.lastname,
        phone: res.phone,
        matricule: res.matricule,
        genre: res.genre,
        etatCivil: res.etatCivil,
        compteIban: res.compteIban,
        email: res.email,
        role: res.role,
        departement_id: res.departement_id,
        id: res.id,
      });
    }, (error) => {

    }
    );
  }
  changePassword() {
    let val = {
      'oldpassword': this.oldpassword,
      'newpassword': this.newpassword
    }
    this.database.changePassword(this.currentUser.id,this.oldpassword,this.newpassword).subscribe((res:any) => {});
  }
  onSubmit() {

    console.log(this.itemForm.value)
    this.database.createUser(this.itemForm.value).subscribe((res: any) => {
      this.toaster.success("Enregistrement avec success", 'OK');
    }, err => {
      console.log(err);
      this.toaster.error("Ust produite", err.message);
    });
  }
}
