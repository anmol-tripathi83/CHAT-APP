// rafc command to get boiler plate for arrow function

import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage  from "./pages/HomePage";      // export default => HomePage and export only => {HomePage}
import SettingPage from "./pages/SettingPage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import {Loader} from "lucide-react";
import { Toaster } from "react-hot-toast";
import { useThemeStore } from "./store/useThemeStore.js";
import SignupPage from "./pages/SignUpPage.jsx";

const App = () => {
  const {authUser, checkAuth, isCheckingAuth, onlineUsers}  = useAuthStore();

  console.log({onlineUsers});

  const { theme } = useThemeStore();

  useEffect(() =>{     // when load it check user is authenticated or not
    checkAuth();
  }, [checkAuth]);

  console.log({authUser});
  
  if(isCheckingAuth && !authUser) return (      // loader loads when refress the page(at the same time it also checking autheticity of the user)
    <div className="flex items-center justify-center h-screen">
      <Loader className = "size-10 animate-spin" />
    </div>
  )
  return (
    <div data-theme={theme}>
       <Navbar/>
       <Routes>
        <Route path="/" element={authUser ? <HomePage/> : <Navigate to="/login"/>} />
        <Route path="/signup" element={!authUser ? <SignupPage/> : <Navigate to="/login"/>} />
        <Route path="/login" element={!authUser ? <LoginPage/> : <Navigate to="/" />} />
        <Route path="/setting" element={<SettingPage/>} />
        <Route path="/profile" element={authUser ? <ProfilePage/> : <Navigate to="/login"/>} />
       </Routes>

       <Toaster />
    </div>
  );
}

export default App;
