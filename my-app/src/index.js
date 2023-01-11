import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import App from './App';
import {store} from "./store";
import {Provider} from "react-redux";
import { BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Provider store={store}>
      <Router>
        <App />
      </Router>
      </Provider>
  </React.StrictMode>,
);