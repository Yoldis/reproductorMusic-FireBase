import { Navigate, Route, Routes } from 'react-router-dom'
import { AnimationAuth, Login, Register} from '../../../components/auth/index'


export const AuthRouter = () => {

  return (
    
    <AnimationAuth>
      <Routes>
        <Route path="login" element={<Login/>} />
        <Route path="register" element={<Register/>} />

        <Route path="/*" element={<Navigate to="/login" />} />
      </Routes>
    </AnimationAuth>
  );
}
