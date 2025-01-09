// import logo from './logo.svg';
import React from 'react'; 
import './App.css';
import SignUp  from './pages/SignUp';
// import Home from './pages/Home';
import MainPage from './pages/MainPage'
import SignIn from './pages/SignIn'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';


function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<MainPage />} /> 
      <Route path="/mainpage" element={<MainPage />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/home" element={<Home />}> </Route>
      </Routes>
    </Router>
    // <div className="App">
    //     <SignUp />
      
    // </div>
  );
}

export default App;
