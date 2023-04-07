import React from 'react';
import './App.css';
import Authentication from './components/pages/Authentication';
import { useSelector } from 'react-redux';

function App() {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  return (
    <React.Fragment>
      {!isLoggedIn && <Authentication />}
      {isLoggedIn && <h1>Welcome to Mail Box</h1>}
    </React.Fragment>
  );
}

export default App;
