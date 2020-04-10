import React from 'react';
import './global.css'
import Routes from './routes';

function App() {
  return (
    <div>
      <Routes />
      <footer className="page-footer font-small app-footer">
        <div className="text-center py-3 footer-text"><strong>Sangue Bom</strong> 1.0.4</div>
      </footer>
    </div>
  );
}

export default App;
