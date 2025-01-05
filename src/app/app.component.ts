import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
//manually initialize firebase
import { environment } from '../environments/environment';
import { initializeApp } from 'firebase/app';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = '4todos';

  //initialize firebase
  constructor() {
    initializeApp(environment.firebaseConfig); // Initialize Firebase
  }
}

// export class AppModule {
//   constructor() {
//     initializeApp(environment.firebaseConfig); // Initialize Firebase
//   }
// }
