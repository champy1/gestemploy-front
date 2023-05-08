import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/core/models/user';
import { DatabaseService } from 'src/app/core/service/database.service';

@Component({
  selector: 'app-send-mail',
  templateUrl: './send-mail.component.html',
  styleUrls: ['./send-mail.component.css']
})
export class SendMailComponent  implements OnInit{
  rows:User[] | undefined;
  message:any;
  subject:any;
  users=[]
  // @ts-ignore
  selected :User[] = [];
  SelectionType= SelectionType;
  ColumnMode=ColumnMode;
  constructor(
    private route: ActivatedRoute,private toaster: ToastrService,
    private router: Router,private database: DatabaseService){

  }
  ngOnInit(): void {
    this.database.getUsers().subscribe((res)=>{
      this.rows=res;
    });
  }
 // @ts-ignore
  onSelect({selected}) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
    
  }
  addRow(id:any){
    // @ts-ignore
    this.users?.push(id)
    console.log(this.users)
  }
  send(){
    let data={
      message: this.message,
      subject: this.subject,
      items: this.selected!.map(function(d){
        return d.id;
      })
    }
    console.log(data)
    this.database.sendMail(data).subscribe((res: any) => {
      this.toaster.success("Message envoyé avec success", 'OK');

    }, err => {
      console.log(err);
      this.toaster.error("Une erreur s'est produite", err.message);
    });
  }
}
