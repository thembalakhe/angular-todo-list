import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { environment } from "../../environments/environment";


// Initialize Firebase
const app = initializeApp(environment.firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);
console.log("Inside Firebase Config")