import React from 'react';
import './static/css/index.css';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from '@/router';

function App() {
  return (
    <Router>
      <Routes />
    </Router>
  );
}

export default App;
