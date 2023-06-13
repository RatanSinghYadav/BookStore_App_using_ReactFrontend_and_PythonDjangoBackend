import {BrowserRouter as Router, Routes,Route} from 'react-router-dom';
import Signup from './component/signup';
import Login from './component/login';
import Home from './component/home';
import Navbar from './component/navbar';
import Detail from './component/detail';

function App() {
  return (
    <div>
    <Router>
    <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element = {<Login/>}/>
        <Route path='/summary/:title/:id' element = {<Detail/>}/>
      </Routes>
    </Router>      
    </div>
  );
}

export default App;
