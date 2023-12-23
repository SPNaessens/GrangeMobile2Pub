import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Events } from '../models/event';
import { getFirestore, collection, addDoc, doc, onSnapshot, setDoc, deleteDoc } from '@angular/fire/firestore';
import { getApp } from '@angular/fire/app';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.page.html',
  styleUrls: ['./create-event.page.scss'],

})
export class CreateEventPage implements OnInit {
  public createEventForm: FormGroup
  private firebaseApp = getApp();
  private db = getFirestore(this.firebaseApp);
  public eventId: string='';
  constructor(public FormBuilder: FormBuilder, private route: ActivatedRoute, private router:Router, private alertController: AlertController) {
    this.createEventForm = this.FormBuilder.group({
      title: ['', Validators.compose([Validators.required])],
      img: ['', Validators.compose([Validators.required])],
      description: ['', Validators.compose([Validators.required])],
      date: ['', Validators.compose([Validators.required])],
    });
   }

  ngOnInit() {
    this.eventId = this.route.snapshot.params['id'];
    if (this.eventId !== 'new'){
      const currentEvent = doc(this.db, `Events/${this.eventId}`);
      onSnapshot(currentEvent, snapshot => {
        const data = snapshot.data();
        if(data){
          this.createEventForm.setValue({
            title: data['title'],
            img: data['img'],
            description: data['description'],
            date: data['date'],
          })
        }

      });
    }
  }

  addEvent(): void {
    if (this.eventId === 'new') {
      const EventsCollection = collection(this.db, 'Events');
    addDoc(EventsCollection, this.createEventForm.value).then(() => {
      this.router.navigateByUrl('');
    });
    }else{
      const eventDoc = doc(this.db, `Events/${this.eventId}`);
      setDoc(eventDoc, this.createEventForm.value).then(() => {
        this.router.navigateByUrl('');
      });
    }
  }

  addEvents(): void{
   
    if(this.eventId ==='new'){
      const taskCollection = collection(this.db, `Events`);
    
      addDoc(taskCollection, this.createEventForm.value).then(() => {
        this.router.navigateByUrl(``);
      });
    } else{
      const eventDoc = doc(this.db, `Events/${this.eventId}`);
      setDoc(eventDoc, this.createEventForm.value).then(() => {
        this.router.navigateByUrl(``);
      });
    }
       
      }
  
  async deleteEvent(eventId: string): Promise<void> {
    const alert = await this.alertController.create({
      header: 'confrirm delete',
      message: 'Are you sure you want to delete this?',
      buttons: [
        {text: 'cancel',
        role: 'cancel',
      },
      {
        text: 'Delete',
        handler: () => {
          const eventToDelete = doc(this.db, `Events/${eventId}`);
          deleteDoc(eventToDelete).then(() => {
            this.router.navigateByUrl('');
          })
        }
      }
      ]
    });
    await alert.present();
  }
}