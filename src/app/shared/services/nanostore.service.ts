import {Injectable} from '@angular/core';
import {AngularFirestore, DocumentReference} from '@angular/fire/firestore';
import {Nanostore, StoreFirebase} from '../models/nanostore';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class NanostoreService {

  constructor(private afs: AngularFirestore) {
  }

  getAllNanostores(): Observable<Nanostore> | any {
    return this.afs.collection<Nanostore>('nanostores').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Nanostore;
        const id = a.payload.doc.id;
        return {id, ...data};
      }))
    );
  }

  addNanostore(store: Nanostore): Promise<DocumentReference> {
    store.createdAt = moment().toDate();
    return this.afs.collection('nanostores').add(store);
  }

  addStoreFirebase(store: StoreFirebase): Promise<DocumentReference> {
    return this.afs.collection('nanostores').add(store);
  }

  uploadMultiple(stores: Nanostore[]) {
    const arr = [];
    const createdAt = moment().toDate();
    stores.forEach(s => {
      s.createdAt = createdAt;
      arr.push(this.afs.collection('nanostores').add(s));
    });
    return Promise.all(arr);
  }
}
