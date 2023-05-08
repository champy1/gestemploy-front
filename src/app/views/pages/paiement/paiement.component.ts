import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Paiement } from 'src/app/core/models/paiement';
import { DatabaseService } from 'src/app/core/service/database.service';
import { DownloadService } from 'src/app/core/service/download';
import { saveAs } from 'file-saver';
import * as FileSaver from 'file-saver';
import { DatatableComponent } from '@swimlane/ngx-datatable';
@Component({
  selector: 'app-paiement',
  templateUrl: './paiement.component.html',
  styleUrls: ['./paiement.component.css']
})
export class PaiementComponent implements OnInit {
  selectmonth!: number;
  rows: Paiement[] = [];
  temp: Paiement[] | undefined;
      // @ts-ignore
    @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  // @ts-ignore
  itemForm: FormGroup;
  constructor(private modalService: NgbModal, private formBuilder: FormBuilder,
    private route: ActivatedRoute, private toaster: ToastrService,private downloadService: DownloadService,
    private router: Router, private database: DatabaseService) {
    this.itemForm = this.formBuilder.group({
      total_jour: ["", Validators.required],
      user_id: ["", Validators.required],
      id: [null, Validators.required],
      precomptePro: [null, Validators.required],
      cotisationCnss: [null, Validators.required],
      retenu_retraite: [null, Validators.required],
      retenu_chomage: [null, Validators.required],
      retenu_total: [null, Validators.required],
      cnss_retenue: [null, Validators.required],
      suppl_transport: [null, Validators.required],
      prime_HS: [null, Validators.required],
      prime_prestation: [null, Validators.required],
      prime_equipe: [null, Validators.required],
      total_brut: [null, Validators.required],
      total_prime: [null, Validators.required],
      total_impossable: [null, Validators.required],
      total_net: [null, Validators.required],
    });

  }
  ngOnInit(): void {
    let mon = new Date().getMonth;
    this.selectmonth = new Date().getMonth() + 1;
    this.database.getPaiementbyMonth(this.selectmonth).subscribe((res) => {
      this.rows = res;
      this.temp=res;
    }, (error) => {

    }
    );
  }
  openLg(content: any) {
    this.modalService.open(content, { size: 'lg' });

  }
  printPDF(row: any) {
    this.downloadService
    .download(row.id)
    .subscribe(blob => FileSaver.saveAs(blob, row.id+'.pdf'));
  }
  detail(content: any, row: any) {
    this.itemForm.patchValue({
      'total_net': row.total_net,
      'user_id': row.user_id,
      total_impossable: row.total_impossable,
      prime_prestation: row.prime_prestation,
      total_brut: row.total_brut,
      prime_equipe: row.prime_equipe,
      retenu_total: row.retenu_total,
      prime_HS: row.prime_HS,
      cnss_retenue: row.cnss_retenue,
      suppl_transport: row.suppl_transport,

      cotisationCnss: row.cotisationCnss,
      precomptePro: row.precomptePro,
      retenu_chomage: row.retenu_chomage,
      id: row.id,
    })
    this.modalService.open(content, { size: 'lg' });
  }
  monthChange(event: any) {
    this.rows = [];
    this.database.getPaiementbyMonth(this.selectmonth + 1).subscribe((res) => {
      this.rows = res;
    }
    );
  }
  updateFilter(event:any) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp_ = this.temp!.filter(function (d) {
      return d.user_name!.toLowerCase().indexOf(val) !== -1||
       d.user_matricule!.toLowerCase().indexOf(val) !== -1
          !val;
    });
//console.log(this.temp)
    // update the rows
    this.rows = temp_;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }
  onSubmit() { 
    this.database.createPaiement(this.itemForm.value).subscribe((res: any) => {
      this.toaster.success("Enregistrement avec success", 'OK');
     this.modalService.dismissAll();
  
    }, err => {
      console.log(err);
      this.toaster.error("Ust produite", err.message);
    });
  }
}
