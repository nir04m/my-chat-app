import Navbar from './components/Navbar';
import { Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import Settings from './pages/Settings';
import ProfilePage from './pages/ProfilePage';
import { useAuthStore } from './store/useAuthStore';
import './App.css';
import { useEffect } from 'react';
import { Loader } from 'lucide-react'
import { Toaster } from 'react-hot-toast';
import { useThemeStore } from './store/useThemeStore';



const App = () => {
  const {authUser, checkAuth, isCheckingAuth, onlineUsers} = useAuthStore();
  console.log({onlineUsers});
  const { theme } = useThemeStore(); // Initialize theme store to ensure it runs
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  console.log({authUser});
  if(isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className='animate-spin justify-center' />
      </div>
    )
  }

  return (
    <div data-theme={theme}>
      <Navbar />
      <Routes>
        <Route path="/" element={ authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/signup" element={ !authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/login" element={ !authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/settings" element={<Settings /> } />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
      </Routes>
      <Toaster />
    </div>
  );
}
export default App;