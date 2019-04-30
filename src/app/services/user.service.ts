import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
   private userCollection: AngularFirestoreCollection<User>;
   private user: Observable<User[]>;

  constructor(db: AngularFirestore) {
    this.userCollection = db.collection<User>('user');
    this.user = this.userCollection.snapshotChanges().pipe(map(
      actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ... data };
        });
      } 
    ));
   }

   getUsers(){
      return this.user;
   }

   getUser(id:string){
      return this.userCollection.doc<User>(id).valueChanges();
   }

   updateUser(user:User, id: string){
     return this.userCollection.doc(id).update(user);
   }

   addUser(user:User){
      return this.userCollection.add(user);
   }

   removeUser(id:string){
     return this.userCollection.doc(id).delete();
   }
}
