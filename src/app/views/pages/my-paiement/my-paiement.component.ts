import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as FileSaver from 'file-saver';
import { ToastrService } from 'ngx-toastr';
import { Paiement } from 'src/app/core/models/paiement';
import { DatabaseService } from 'src/app/core/service/database.service';
import { DownloadService } from 'src/app/core/service/download';

@Component({
  selector: 'app-my-paiement',
  templateUrl: './my-paiement.component.html',
  styleUrls: ['./my-paiement.component.css']
})
export class MyPaiementComponent  implements OnInit {
  selectmonth!: number;
  currentUser: any;
  rows: Paiement[] = [];
  // @ts-ignore
  itemForm: FormGroup;
  constructor(private modalService: NgbModal, private formBuilder: FormBuilder,
    private route: ActivatedRoute, private toaster: ToastrService,private downloadService: DownloadService,
    private router: Router, private database: DatabaseService) {

  }
  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser')!);
    this.database.getPaiementByUser(this.currentUser.id).subscribe((res) => {
      this.rows = res;
    }, (error) => {

    }
    );
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
}

