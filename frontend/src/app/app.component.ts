import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAamEKTMNgJmxj9zFVtidv0DlsPZfiHM70",
  authDomain: "jashanfilms-13995.firebaseapp.com",
  projectId: "jashanfilms-13995",
  storageBucket: "jashanfilms-13995.firebasestorage.app",
  messagingSenderId: "298367387254",
  appId: "1:298367387254:web:d600879bbfe45ac37a0157",
  measurementId: "G-ML78ZXTH4T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'jashanfilms';
}
