
import { Route, Routes, Navigate } from "react-router-dom";
import { Procfile } from "../auth";
import {Music, MusicAleatory} from './index.js'

export const MusicOptions = () => {
  
  document.querySelector('#titlePrimary').innerHTML = "Beats";

  return (
    <div className="absolute w-full">
      <Routes>
        <Route path="/" element={<Music/>} />
        <Route path="/procfile" element={<Procfile />} />
        <Route path="/chekMusic" element={<MusicAleatory/>} />

        <Route path="/*" element={<Navigate to="/"/>} />
      </Routes>
    </div>
  );
}
