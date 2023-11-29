import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import App from './App.jsx';
import List from './List.jsx';



ReactDOM.render(
  <Router >
    <Routes>
      <Route path='/' element={<App />}/>
      <Route path='/register' element={<List />}/>
      <Route path='*' element={<Navigate to='/' />}/>
    </Routes>
  </Router>
  ,document.getElementById('root'));

