// rafc command to get boiler plate for arrow function

import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import { HomePage }  from "./Pages/HomePage";      // export default => HomePage and export only => {HomePage}
import { SignupPage } from "./Pages/SignupPage";
import { SettingPage } from "./Pages/SettingPage";
import { ProfilePage } from "./Pages/ProfilePage";
import { LoginPage } from "./Pages/LoginPage";

const App = () => {
    return (
        <div >
       <Navbar/>
        <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/signup" element={<SignupPage/>} />
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/setting" element={<SettingPage/>} />
            <Route path="/profile" element={<ProfilePage/>} />
        </Routes>
    </div>
    );
}

export default App;