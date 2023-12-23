import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
export interface Event{ 
  id?: string;
  players: string;
  title: string;
}

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private firestore: Firestore) {
   }
 getEvents(): Observable <Event[]> {
  const eventsRef= collection(this.firestore,'Events');
  return collectionData(eventsRef,{idField:'id'}) as Observable<Event[]>
 }
}