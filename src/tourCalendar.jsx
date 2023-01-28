import React from 'react';
import {format, startOfWeek, addDays, startOfDay, startOfMonth, endOfMonth, endOfWeek, isSameMonth, isSameDay, addMonths, subMonths, parse, set} from 'date-fns' ;
import $ from 'jquery';
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';

let selectedDays = [];
let price;
let multiplied;
let rngePlus;

const urlParams = new URLSearchParams(window.location.search);
let userId = urlParams.get('uid');

function logSelected(){
  for(let i = 0; i < selectedDays.length; i++){
    console.log(selectedDays[i]);
    console.log(selectedDays[i].slice(8,11));
  } 
  if(selectedDays.length === 2 ){
    let curD = selectedDays[1].slice(8,11);
    let prevD = selectedDays[0].slice(8,11);
    let rnge = parseInt(curD, 10) - parseInt(prevD, 10) - 1;
    rngePlus = parseInt(curD, 10) - parseInt(prevD, 10) + 1;
    console.log(rngePlus);
    if(rnge >= 1){
      console.log(selectedDays[0], selectedDays[1]);
      for(let i = parseInt(prevD, 10); i <= parseInt(curD, 10); i++){
        console.log(i);
        document.getElementById(i).classList.add('selected');
        // for(let k = 0; k < parseInt(curD, 10) - parseInt(prevD, 10) + 1; k++){
        //   selectedDays[k] = i
        // }
      }
      if(selectedDays.length > 1){
        document.getElementById('showDates').innerHTML = 'Your Dates: '+selectedDays[0]+' - '+selectedDays[selectedDays.length-1];
      }else{
        document.getElementById('showDates').innerHTML = 'Your Dates: '+selectedDays[0];
      }
      
    }    
  }
}

const firebaseConfig = {
  apiKey: "AIzaSyAN-hSy8cWKUKJS4SxjNcN9lrmvZPTy430",
  authDomain: "booking-app-6750f.firebaseapp.com",
  databaseURL: "https://booking-app-6750f-default-rtdb.firebaseio.com",
  projectId: "booking-app-6750f",
  storageBucket: "booking-app-6750f.appspot.com",
  messagingSenderId: "687482685582",
  appId: "1:687482685582:web:a91f903ce5133c4f5aa1df",
  measurementId: "G-0WDDDKD9ZL"
};

const firebaseapp = initializeApp(firebaseConfig);
var db = getDatabase();
console.log(db);

console.log(getAuth());

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = mm + '-' + dd + '-' + yyyy;
let todayString = today.toString();
console.log(today.toString());

function saveDates(){
  let updates = {};
  if(rngePlus != undefined){
    updates['users/userAccount/'+userId+'/tourdata/tourDates'] = selectedDays;
    updates['users/userAccount/'+userId+'/tourdata/datesLength'] = rngePlus;
    updates['users/userAccount/'+userId+'/bookingdata/itemDates'] = selectedDays;
    updates['users/userAccount/'+userId+'/bookingdata/datesLength'] = rngePlus;
    updates['users/userAccount/'+userId+'/tourdata'+today+'/tourDates'] = selectedDays;
    updates['users/userAccount/'+userId+'/tourdata'+today+'/datesLength'] = rngePlus;
    updates['users/userAccount/'+userId+'/itemdata'+today+'/datesLength'] = rngePlus;
    return firebaseapp.database().ref().update(updates);
  }else{
    updates['users/userAccount/'+userId+'/tourdata/tourDates'] = selectedDays;
   updates['users/userAccount/'+userId+'/tourdata/datesLength'] = 1;
   updates['users/userAccount/'+userId+'/bookingdata/itemDates'] = selectedDays;
   updates['users/userAccount/'+userId+'/bookingdata/datesLength'] = 1;
   updates['users/userAccount/'+userId+'/tourdata'+today+'/tourDates'] = selectedDays;
   updates['users/userAccount/'+userId+'/tourdata'+today+'/datesLength'] = 1;
   updates['users/userAccount/'+userId+'/itemdata'+today+'/datesLength'] = 1;
   return firebaseapp.database().ref().update(updates);
  }
}

function highlightDates(){
  const roomdata = db.ref('users/userAccount/'+userId+'/tourdata');
  roomdata.on('value', (snapshot) => {
    const data = snapshot.val();
    if(data != 'null'){
      let dateHolder = [];
      dateHolder = data.tourDates;
      console.log(dateHolder);
      for(let i = 0; i < dateHolder.length; i++){
        console.log(dateHolder[i]);
        console.log(dateHolder[i].slice(8,11));
      } 
      if(dateHolder.length === 2 ){
        let curD = dateHolder[1].slice(8,11);
        let prevD = dateHolder[0].slice(8,11);
        let rnge = parseInt(curD, 10) - parseInt(prevD, 10) - 1;
        rngePlus = parseInt(curD, 10) - parseInt(prevD, 10) + 1;
        console.log(rngePlus);
        if(rnge >= 1){
          console.log(dateHolder[0], dateHolder[1]);
          for(let i = parseInt(prevD, 10); i <= parseInt(curD, 10); i++){
            console.log(i);
            // if(data.room === 'Dreams'){
            //   document.getElementById(i).classList.add('dreams');
            // } else if (data.room === 'The Golden Palace'){
            //   document.getElementById(i).classList.add('thegoldenpalace');
            // } else if (data.room === 'Feel Royal'){
            //   document.getElementById(i).classList.add('feelroyal');
            // } else if (data.room === 'info'){
            //   document.getElementById(i).classList.add('info');
            // }

            
            // for(let k = 0; k < parseInt(curD, 10) - parseInt(prevD, 10) + 1; k++){
            //   selectedDays[k] = i
            // }
          }
          
        }    
      }
    }
  });
}
//highlightDates();

function closeCalendar(){
  window.location = 'https://polar-scrubland-06961.herokuapp.com/tourism.html';
}

class tourCalendar extends React.Component{
    state = {
        currentMonth: new Date(),
        selectedDate: new Date()
    };
   
    renderHeader(){
        const dateFormat = "MMMM yyyy";
    
        return (
          <div className="header row flex-middle">
            <div className="col col-start">
              <div className="icon" onClick={this.prevMonth}>
                chevron_left
              </div>
            </div>
            <div className="col col-center">
              <span>{format(this.state.currentMonth, dateFormat)}</span>
            </div>
            <div className="col col-end" onClick={this.nextMonth}>
              <div className="icon">chevron_right</div>
            </div>
          </div>
        );
    }
    
    renderDays(){
        const dateFormat = "dddd";
        const days = [];
    
        let startDate = startOfWeek(this.state.currentMonth);
    
        for (let i = 0; i < 7; i++) {
          days.push(
            <div className="col col-center" key={i}>
              {format(addDays(startDate, i), dateFormat)}
            </div>
          );
        }
    
        return <div className="days row">{days}</div>;
    }

    renderCells(){
        const { currentMonth, selectedDate } = this.state;
        const monthStart = startOfMonth(currentMonth);
        const monthEnd = endOfMonth(monthStart);
        const startDate = startOfWeek(monthStart);
        const endDate = endOfWeek(monthEnd);

        const dateFormat = "d";
        const rows = [];
    
        let days = [];
        let day = startDate;
        let formattedDate = "";
        
        let cells = document.getElementsByClassName('cell');
        while (day <= endDate) {
          for (let i = 0; i < 42; i++) {
            formattedDate = format(day, dateFormat);
            const cloneDay = day;
            let stringCloneDay = cloneDay.toString();
            days.push(
              <div
                className={`col cell ${
                  !isSameMonth(day, monthStart)
                    ? "disabled"
                    : isSameDay(day, selectedDate) ? "selected" : ""
                }`}
                id={formattedDate}
                key={day}
                // onClick={() => this.onDateClick(parse(cloneDay, formattedDate, selectedDate))}
                onClick={()=> this.onDateClick(console.log(selectedDays.push(stringCloneDay.slice(0,15)), selectedDays, cells[i].classList.add('selected'), document.getElementById('showDates').innerHTML = 'Your Dates: '+selectedDays),
                localStorage.setItem('selectedDates', selectedDays), logSelected()
                 )}
              >
                <span className="number">{formattedDate}</span>
                <span className="bg" >{formattedDate}</span>
              </div>
            );
       
            day = addDays(day, 1);
            
          }
                  
          //  $('#'+formattedDate).addClass('selected'), console.log(day);
          rows.push(
            <div className="row" key={day}>
              {days}
            </div>
          );
          days = [];
          
        }
        return <div className="body">{rows}</div>;
    };
   
    onDateClick = day => {
        this.setState({
            selectedDate: day
        });
        
    };
    
    nextMonth = () => {
        this.setState({
            currentMonth: addMonths(this.state.currentMonth, 1)
        });
    };
    prevMonth = () => {
        this.setState({
            currentMonth: subMonths(this.state.currentMonth, 1)
        });
    };

    render(){
        return(
          <div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
              <h1>Your Calendar</h1>
            </div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
              <p>Select Start date and End date to begin.</p>
            </div>
            <div className="calendar">
                {this.renderHeader()}
                {this.renderDays()}
                {this.renderCells()}
            </div>
            <div id="showDates"></div>
            <div id="total"></div>  
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              <button onClick={saveDates}>Save</button>
              <button onClick={closeCalendar}>Close</button>
            </div>
          </div>    
        );
    }
    
}



export default tourCalendar;