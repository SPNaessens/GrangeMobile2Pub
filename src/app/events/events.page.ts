import { Component, OnInit, NgZone} from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { onSnapshot, collection, getFirestore } from 'firebase/firestore';
import { Events } from '../models/event';
import { getApp } from '@angular/fire/app';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage implements OnInit {
  public currentEvents: Events[] = [];
  Events: any =[];

  constructor(private navCtrl: NavController, private zone: NgZone,private firebaseService: FirebaseService) {
   }
   goToCreateEventPage() {
    this.navCtrl.navigateForward('/create-event');
  }

ngOnInit() {
  const firebaseApp = getApp();
  const db = getFirestore(firebaseApp);
  const eventCollection = collection(db, 'Events');
  
    onSnapshot(eventCollection, snapshot => {
    this.zone.run(() => {
      this.Events = snapshot.docs.map(d => {
        const currentEvent = d.data() as Events;
        currentEvent.id = d.id;
        console.log(currentEvent);
        return currentEvent;
      });
  
    });
  });
 }
}
