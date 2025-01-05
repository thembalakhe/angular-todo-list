import { Injectable } from '@angular/core';
import { Database, getDatabase, ref, set, get, push, update, remove } from 'firebase/database';
import { initializeApp } from 'firebase/app';
import { environment } from '../../environments/environment'; 
import { AuthService } from '../auth/auth.service';
import { User, getAuth, onAuthStateChanged } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  private path: string = '';

  private db: Database;
  private auth = getAuth();
  private user: User | null = null;

  constructor(private authService: AuthService) {
    const app = initializeApp(environment.firebaseConfig);
    this.db = getDatabase(app);

    onAuthStateChanged(this.auth, (user: User | null) => {
      this.user = user;
      console.log('inside: ', user);
      if (user) {
        this.path = 'users/' + this.user?.uid + '/todos';
        console.log('path: ', this.path);
        console.log('user: ', this.user);
      }
    });
  }

  // Read data
  async getTasks() {
    //console.log('User id: ', this.user?.uid);
    const snapshot = await get(ref(this.db, this.path));
    return snapshot.exists() ? snapshot.val() : null;
  }

  // Add a new item to a list
  addTask(task: Object) {
    const newRef = push(ref(this.db, `${this.path}`));
    return set(newRef, task);
  }

  // Delete a record
  //set(ref(this.db, 'users/' + this.user?.uid + '/todos/' + id), null);
  deleteTask(id: string) {
    console.log('Deleting task...');
    return remove(ref(this.db, `${this.path}/${id}`));
  }

  createOrUpdateData(id: string, data: any) {
    return set(ref(this.db, `${this.path}/${id}/completed`), data);
  }

  // // Update specific fields
  // updateTask(id: string, data: Partial<any>) {
  //   return update(ref(this.db, `${this.path}/${id}/completed`), data);
  // }
  // Create or update a record
  // set(ref(this.db, 'users/' + this.user?.uid + '/todos/' + id), this.zxy);
  // createOrUpdateData(id: string, data: any) {
  //   return set(ref(this.db, `${this.path}/${id}`), data);
  // }
}
