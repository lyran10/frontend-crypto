import React from 'react';
import './App.css';
import { Route,Routes } from 'react-router-dom';
import { HomePage } from './component/pages/homePage';
import { CoinPage } from './component/pages/coinPage';

function App() {
  return (
    <div className="relative">
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/coin/:id' element={<CoinPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
