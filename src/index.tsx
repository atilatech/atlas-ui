import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import "react-datepicker/dist/react-datepicker.css";
import reportWebVitals from './reportWebVitals';
import ScholarshipAddForm from './components/ScholarshipAddForm';
import App from './App';


const popupRoot = document.getElementById("popup-root");

// Main Extensions page
!popupRoot &&
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById("root")
  );

// PopupComponent / popup.html
popupRoot &&
  ReactDOM.render(
    <React.Fragment>
      <ScholarshipAddForm />
    </React.Fragment>,
    popupRoot
  );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
