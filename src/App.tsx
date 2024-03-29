import React from 'react';
import './App.css';
import { Route,Routes } from 'react-router-dom';
import { HomePage } from './component/pages/homePage';
import { CoinPage } from './component/pages/coinPage';
// "proxy": "https://crypto-app-api-irub.onrender.com",
function App() {
  return (
    <div className="">
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/coin/:id' element={<CoinPage/>}/>
      </Routes>
    </div>
  );
}

// "proxy": "https://crypto-app-api-irub.onrender.com",
export default App;
