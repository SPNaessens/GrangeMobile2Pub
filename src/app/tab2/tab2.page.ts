import { Component, OnInit } from '@angular/core';

import { LecturerDataService } from '../services/lecturerdata.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  lecturers: any;
  newLecturers: any;



  constructor(private lecturerservice: LecturerDataService) {}

  getLecturerData(){
    // Get the information from the API using Observable
    // by subscribing to the lecturerservice Observable 
    this.lecturerservice.getData().subscribe(result => {
      this.lecturers = result;
      this.newLecturers = this.lecturers.lecturers;
     });
  }

  ngOnInit() {
    this.getLecturerData();
  }
}
