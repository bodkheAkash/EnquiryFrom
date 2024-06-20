import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  apiUrl: string = 'https://freeapi.gerasim.in/api/youtube/'
  http = inject(HttpClient);
  constructor() { }

  getAllEnqury() {
    return this.http.get(`${this.apiUrl}GetAllEnquries`)
  }
  getAllEnquryStatus() {
    return this.http.get(`${this.apiUrl}GetAllEnquiryStatus`)
  }
  getAllSubjects() {
    return this.http.get(`${this.apiUrl}GetAllEnquirySubject`)
  }

  createNewEnquiry(obj:any){
      return this.http.post(`${this.apiUrl}AddNewEnquiry`, obj)
  }

  filterData(obj:any){
  
    return this.http.post(`${this.apiUrl}FilterEnquries`,obj)
  }
}
