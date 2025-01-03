
import { Routes } from 'react-router-dom';
import './App.css'
import Home from './pages/Home';
import { Route } from 'react-router-dom'; 
import UserSignup from './pages/UserSignup';
import UserLogin from './pages/UserLogin';
import CaptainSignup from './pages/CaptainSignup';
import CaptainLogin from './pages/CaptainLogin';


function App() {
  return (
    <div >
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/usersignup' element={<UserSignup/>}/>
      <Route path='/userlogin' element={<UserLogin/>}/>
      <Route path='/captainsignup' element={<CaptainSignup/>}/>
      <Route path='/captainlogin' element={<CaptainLogin/>}/>
     </Routes>
     
    </div>
  );
}

export default App;


 