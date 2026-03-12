import { useContext, useEffect, Fragment } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
//*css
import './App.css'
//*Auth
import { AuthContext } from "./context/AuthContext";
//*helper
import routeHelper from './helpers/routeHelper';
import axiosapi from "./helpers/axiosapi";
//*comp
import Login from './pages/login/Login';
import ForgetPassword from "./pages/forgetPassword/ForgetPassword";
import PWAInstallPrompt from './components/PWAInstallPrompt';


function App() {

  const { user, dispatch } = useContext(AuthContext);

  useEffect(() => {
    const verifyUserOnLoad = async () => {
      try {
        const res = await axiosapi.get(`/auth/verify/${user._id}`);
        const { success } = res.data;
        if (success === false) dispatch({ type: 'LOGOUT' });
      } catch (error) {
        dispatch({ type: 'LOGOUT' });
      }
    };
    if (user) verifyUserOnLoad();
  }, []);

  if (user) {
    return (
      <>
        <PWAInstallPrompt />
        <Routes>
          {routeHelper.map((routePath, i) => (
            <Route key={i} path={routePath.path} element={routePath.comp} />
          ))}
        </Routes>
      </>
    )
  } else {
    return (
      <>
        <PWAInstallPrompt />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="*" element={<Navigate to='/login' />} />
        </Routes>
      </>
    )
  }

}

export default App


