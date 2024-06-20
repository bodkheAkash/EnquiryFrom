import { Component, OnInit, inject } from '@angular/core';
import { MasterService } from '../../service/master.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-new-enquiry',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-enquiry.component.html',
  styleUrl: './new-enquiry.component.css'
})
export class NewEnquiryComponent implements OnInit {

  masterService=inject(MasterService)
  route=inject(Router)
  enquiryStatusList:any[]=[];
  enquirySubjectList:any[]=[];
  enquiryobj:any={
    "enquiryId": 0,
    "customerName": "",
    "contactNo": "",
    "altContactNo": "",
    "email": "",
    "enquiryStatusId": "",
    "enquirySubjectId":"",
    "createdDate": new Date(),
    "naration": ""
  }
  
  ngOnInit(): void {
   this.getAllStatus();
   this.getAllSubjects();
  }

  getAllStatus(){
    this.masterService.getAllEnquryStatus().subscribe((res:any)=>{
        this.enquiryStatusList=res.data;
    })
  }

  getAllSubjects(){
    this.masterService.getAllSubjects().subscribe((res:any)=>{
      this.enquirySubjectList=res.data;
    })
  }
  save(){
   
    this.masterService.createNewEnquiry(this.enquiryobj).subscribe((res:any)=>{
      if(res.result){
        alert('Enquiry created successfully');
        this. enquiryobj={
          "enquiryId": 0,
          "customerName": "",
          "contactNo": "",
          "altContactNo": "",
          "email": "",
          "enquiryStatusId": "",
          "enquirySubjectId":"",
          "createdDate":"",
          "naration": ""
        };
        this.route.navigateByUrl('/home');
      }
     
    else
      alert(res.message)
    },error=>{
      console.log(error.message);
    })
  }
}
