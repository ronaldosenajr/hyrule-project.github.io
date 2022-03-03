import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import InitialPage from './Pages/InitialPage';
import Header from './Components/Header';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route exact path="/" element={ <InitialPage /> } />
        <Route exact path="/all" element="" />
        <Route exact path="/creatures" element="" />
        <Route exact path="/equipment" element="" />
        <Route exact path="/food" element="" />
        <Route exact path="/materials" element="" />
        <Route exact path="/monters" element="" />
        <Route exact path="/treasure" element="" />
      </Routes>
    </div>
  );
}

export default App;
