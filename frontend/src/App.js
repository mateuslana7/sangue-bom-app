import React from 'react';
import './global.css'
import Routes from './routes';

// import logoImg from './assets/logo.png'

function App() {
  return (
    <div>
      {/* <header>
        <img className="logo-img" src={logoImg} width="200" alt="Sangue Bom" />
      </header> */}
      <Routes />
    </div>
  );
}

export default App;
