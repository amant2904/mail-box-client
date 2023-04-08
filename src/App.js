import React from 'react';
import './App.css';
import Authentication from './components/pages/Authentication';
import Welcome from "./components/pages/Welcome"
import { useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';

function App() {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  return (
    <React.Fragment>
      {isLoggedIn && <Header />}
      <Routes>
        {!isLoggedIn && <Route exact path="/" element={<Authentication />} />}
        {isLoggedIn && <Route exact path="/" element={<Welcome />} />}
      </Routes>
    </React.Fragment>
  );
}

export default App;
