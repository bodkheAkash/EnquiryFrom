import { Component, OnInit, inject } from '@angular/core';
import { MasterService } from '../../service/master.service';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-enquiry-list',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './enquiry-list.component.html',
  styleUrl: './enquiry-list.component.css'
})
export class EnquiryListComponent implements OnInit {

  masterService = inject(MasterService)
  enquiryList: any[] = [];
  enquiryStatusList: any[] = [];
  enquirySubjectList: any[] = [];
  filterObj = {
    "customerName": null,
    "contactNo": null,
    "email": null,
    "enquiryStatusId": null,
    "enquirySubjectId": null,
    "fromDate": null,
    "toDate": null
  }
  ngOnInit(): void {
    this.loadAllEnquires();
    this.getAllStatus();
    this.getAllSubjects();
  }

  loadAllEnquires() {
    this.masterService.getAllEnqury().subscribe((res: any) => {
      this.enquiryList = res.data
    }, error => {

    })
  }
  getAllStatus() {
    this.masterService.getAllEnquryStatus().subscribe((res: any) => {
      this.enquiryStatusList = res.data;
    })
  }

  getAllSubjects() {
    this.masterService.getAllSubjects().subscribe((res: any) => {
      this.enquirySubjectList = res.data;
    })
  }

  filterData(){
    this.masterService.filterData(this.filterObj).subscribe((res: any) => {
      this.enquiryList=res.data;
    },error=>{
      alert(error.message);
    })
  }
  rest(){
    this. filterObj = {
      "customerName": null,
      "contactNo": null,
      "email": null,
      "enquiryStatusId": null,
      "enquirySubjectId": null,
      "fromDate": null,
      "toDate": null
    }
    this.loadAllEnquires();
  }
}
