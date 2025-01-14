// import logo from './logo.svg';
import React, {useState} from 'react'; 
import './App.css';
import SignUp  from './pages/SignUp';
import MainPage from './pages/MainPage'
import SignIn from './pages/SignIn'
import ProtectedRoutes from './components/ProtectRoutes';
import NotFound from './pages/NotFound';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';


function App() {
  const [isAuthenticated, setAuthenticated] = useState(false); 
  return (
    <Router>
      <Routes>
      <Route path="/" element={<MainPage />} /> 
      <Route path="/mainpage" element={<MainPage />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn setAuthenticated={setAuthenticated}/>} />
      <Route 
      path="/home" 
      element={
        <ProtectedRoutes isAuthenticated={isAuthenticated}>
          <Home />
        </ProtectedRoutes>
        }
      /> 
      <Route path = "*" element={<NotFound />} />
      </Routes>
    </Router>
    // <div className="App">
    //     <SignUp />
      
    // </div>
  );
}

export default App;
