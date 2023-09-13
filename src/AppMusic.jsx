import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/auth/AuthProvider";
import { MusicProvider } from "./context/contextMusic/MusicProvider";
import { AppRouter } from "./router/AppRouter"

function AppMusic() {
  return (
    <AuthProvider>
      <MusicProvider>
        <BrowserRouter>
          <AppRouter></AppRouter>
        </BrowserRouter>
      </MusicProvider>
    </AuthProvider>
  );
}

export default AppMusic
