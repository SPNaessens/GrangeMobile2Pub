import { Component, OnInit } from '@angular/core';
// Import the studentdata service
import { StudentDataService } from '../services/studentdata.service';
import { Router } from '@angular/router';
// Import the student class
import { Student } from './student';
import { ModalController, NavParams } from '@ionic/angular';
import { AddStudentPage } from '../addstudent/addstudent.page';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  // we need use an intermdiate array to store the result
  // and then pass into newStudents?
  students: any;
  newStudents: any;
  newStudent = new Student();

  // Pass instance of StudentDataService into constructor:
  constructor(private studentdataservice: StudentDataService, private router: Router, private modalCtrl: ModalController) { }

  getStudentData() {
    // Get the information from the API using Observable
    // by subscribing to the studentservice Observable 
    this.studentdataservice.getData().subscribe(result => {
    this.students = result;
    this.newStudents = this.students.students;

    });
  }

  // Create modal that will launch to add a new student to
  // the MySQL database using the AddStudentPage
  // The student object is then passed back from the modal
  // so that we can update the list view with the new item 
  // Note: ensure to import the AddStudentPage module to app.module.ts and 
  // add it to the imports array too
  async addStudent() {
    // create modal instance
    const modal = await this.modalCtrl.create({
      component: AddStudentPage
    });
    //Get the data returned from the Modal and add to global variable
    modal.onDidDismiss().then(data => {
      // Check if data has been retured
      // if not, the modal was cancelled
      // using back button
      if (data['data']) {
        this.newStudents.push(data['data']);
        console.log(data['data']);
      } else {
        console.log("Modal Cancelled");
      }

    });
    return await modal.present();
  }

  ngOnInit() {
    this.getStudentData();
  }

}
