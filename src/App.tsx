import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route,Routes } from 'react-router-dom';
import { NavBar } from './component/nav/navbar';
import { WatchList } from './component/watchlist/watchList';
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
