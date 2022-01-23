import React from 'react';
import { Provider } from 'mobx-react';
import rootStore from '@/stores';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from '@/router';

import './static/css/index.css';
import './App.css';

function App() {
  return (
    <Provider store={rootStore}>
      <Router>
        <Routes />
      </Router>
    </Provider>
  );
}

export default App;
