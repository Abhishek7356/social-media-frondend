import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import GetStarted from './pages/getStarted/GetStarted';
import Signup from './pages/Signup/Signup';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import Profile from './pages/Profile/Profile';
import { useContext } from 'react';
import { StateProvider } from './context/AuthContext';
import Messenger from './pages/Messenger/Messenger';

function App() {

  const { user } = useContext(StateProvider);
  console.log(user);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={user ? <Home /> : <GetStarted />} />
        <Route path='/signup' element={user ? <Home /> : <Signup />} />
        <Route path='/login' element={user ? <Home /> : <Login />} />
        <Route path='/home' element={user ? <Home /> : <Login />} />
        <Route path='/profile/:username' element={user ? <Profile /> : <Login />} />
        <Route path='/chat' element={user ? <Messenger /> : <Login />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
