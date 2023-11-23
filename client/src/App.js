import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar';
import Root from './pages/Root'
import Signup from './pages/Signup';
import Login from './pages/Login';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
          <div className='pages'>
            <Routes>
              <Route path='/' element={<Root />} />
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<Signup />}/>
            </Routes>
          </div>           
      </BrowserRouter>
    </div>
  );
}

export default App;
