import React, {useState} from 'react';
import {Link} from "react-router-dom";
import './App.css';
import { initializeApp } from '@firebase/app';
import {initializeAuth, getAuth, onAuthStateChanged, reload} from 'firebase/auth';
import { getAnalytics } from '@firebase/analytics';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyDAE5KMMaSWI8wYkSqmyBMlT9VDIUl2604",
//   authDomain: "booking-3cb4c.firebaseapp.com",
//   projectId: "booking-3cb4c",
//   storageBucket: "booking-3cb4c.appspot.com",
//   messagingSenderId: "740465077120",
//   appId: "1:740465077120:web:52f179c4875eae75072f65",
//   measurementId: "G-B9BPZBWH0B"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);



function App() {

  return (
    <div className="App">
      <main>
       <nav
         style={{
           borderBottom: "solid 1px",
           paddingBottom: "1rem"
         }}>
           <div>
            <Link to="/roomCalendar">RoomCalendar</Link>
           </div>
           <div>
            <Link to="/carCalendar">CarCalendar</Link>
           </div>
           <div>
            <Link to="/tourCalendar">TourCalendar</Link>
           </div>
         </nav>
      </main>    
    </div>
  );
}

export default App;
