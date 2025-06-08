import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import Settings from './pages/Settings';
import ProfilePage from './pages/ProfilePage';
import { useAuthStore } from './store/useAuthStore';
import './App.css';
import { useEffect } from 'react';


const App = () => {
  const {authUser, checkAuth} = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  console.log({authUser});

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={ <HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </div>
  );
}
export default App;