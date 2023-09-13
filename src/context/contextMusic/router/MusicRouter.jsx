import { useContext } from "react";
import { FaTimes } from "react-icons/fa";
import { Navigate, Route, Routes} from "react-router-dom"
import { DetailsProcfile } from "../../../components/auth";
import { Multimedia, SideBarMusic } from "../../../components/musicApp"
import { MusicOptions } from "../../../components/musicApp/MusicOptions";
import { authContext } from "../../useContext";


export const MusicRouter = () => {

  const{opacityFocus, toogleProcfileDetails, onHiddenProcfile} = useContext(authContext);

  return (
    <div className=" animate__animated animate__fadeIn ">
      <div className={`${opacityFocus} flex flex-col min-h-screen justify-between`}>
        <div className="flex flex-grow ">
        <SideBarMusic />
        <div className="relative w-full">
          <Routes>
            <Route path="/music/*" element={<MusicOptions/>} />
            <Route path="/*" element={<Navigate to="/music"/>} />
          </Routes>
          </div>
        </div>
        <Multimedia />
      </div>

      <div className={` text-white absolute top-1/2 left-1/2 translate-x-translateProcfile translate-y-translateProcfile w-full md:w-full h-full ${toogleProcfileDetails}`}>
        <div
          className={` m-auto mt-40 bg-bgProcFile p-5 md:w-2/5 w-5/6 rounded-lg `}
        >
          <div className="flex mb-5 items-center gap-5 justify-between ">
            <p className="text-xl text-gray-100 font-bold">
              Detalles del Perfil
            </p>
            <FaTimes
              onClickCapture={onHiddenProcfile}
              className="text-xl cursor-pointer"
            />
          </div>

          <DetailsProcfile />
        </div>
      </div>
    </div>
  );
}
