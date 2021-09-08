import React from 'react';
import './App.css';
import { ScholarshipAddForm } from './components/ScholarshipAddForm';
import ScholarshipsTable from './scenes/DashBoard/ScholarshipsTable';
 
function App() {
 return (
   <div className="App">
     <ScholarshipAddForm />
     <ScholarshipsTable/>
   </div>
 );
}
 
export default App;