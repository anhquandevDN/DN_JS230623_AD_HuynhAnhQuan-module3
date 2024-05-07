import logo from './logo.svg';
import Router from './routes/Router';
import { BrowserRouter } from 'react-router-dom';


import './App.css';

function App() {
  return (
    <div className="App">
       <BrowserRouter basename='/'>
        <Router/>
       </BrowserRouter>
    </div>
  );
}

export default App;
