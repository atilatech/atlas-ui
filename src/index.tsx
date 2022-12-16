import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import "react-datepicker/dist/react-datepicker.css";
import reportWebVitals from './reportWebVitals';
import App from './App';
import PopUp from './scenes/PopUp/PopUp';


const popupRoot = document.getElementById("popup-root");

// Main Extensions page
!popupRoot &&
  ReactDOM.render(
    <React.StrictMode>
      {
        window.location.pathname.includes('popup') ?  <PopUp /> : <App />
      }
    </React.StrictMode>,
    document.getElementById("root")
  );

// PopupComponent / popup.html
popupRoot &&
  ReactDOM.render(
    <React.Fragment>
      <PopUp />
    </React.Fragment>,
    popupRoot
  );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
