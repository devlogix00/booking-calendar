import React from 'react';
import ReactDOM from 'react-dom/client';
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import RoomCalendar from './roomCalendar';
import CarCalendar from './carCalendar';
import TourCalendar from './tourCalendar';

const root = createRoot(document.getElementById("root"));

root.render(
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<App/>}></Route>
      <Route path="/RoomCalendar" element={<RoomCalendar/>}></Route>
      <Route path="/CarCalendar" element={<CarCalendar/>}></Route>
      <Route path="/TourCalendar" element={<TourCalendar/>}></Route>
    </Routes> 
  </BrowserRouter> 
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
