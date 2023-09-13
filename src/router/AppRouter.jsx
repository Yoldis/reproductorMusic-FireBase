import { Navigate, Route, Routes } from "react-router-dom"
import { AuthRouter } from "../context/auth/router/AuthRouter"
import { MusicRouter } from "../context/contextMusic/router/MusicRouter";
import { chekingUser } from "../firebase/auth/chekingStatus"
import { LoadingAnimation } from "./LoadingAnimation";

export const AppRouter = () => {

  const {getUser:{status}} = chekingUser();

  if(status === 'Cheking'){
    return (
      <LoadingAnimation/>
      );
    }
    

  return (
    <Routes>
      {status === "Autenticated" ? (
        <Route path="/*" element={<MusicRouter />} />
        ) : (
          <Route path="auth/*" element={<AuthRouter />} />
          )}

      <Route path="/*" element={<Navigate to="/auth/login" />} />
    </Routes>
  );
}

