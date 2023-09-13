import { useEffect, useState } from "react"
import { BsMusicNote } from "react-icons/bs"
import style from "../css/LoadingAnimation.module.css"


export const LoadingAnimation = () => {


  const [icon1, setIcon1] = useState('');
  const [icon2, setIcon2] = useState('');
  const [icon3, setIcon3] = useState('');

  useEffect(()=> {

    setTimeout(()=> {
      setIcon1(style.animate)
    }, 100)

    setTimeout(()=> {
      setIcon2(style.animate)
    }, 200)

    setTimeout(()=> {
      setIcon3(style.animate)
    }, 300)

  }, [])

  return (
    <div className="flex justify-center md:min-h-screen mt-[300px] md:mt-0 items-center ">
        <BsMusicNote className={`${icon1} text-secundary md:text-3xl text-xl`}/>
        <BsMusicNote className={`${icon2} text-secundary md:text-3xl text-xl`}/>
        <BsMusicNote className={`${icon3} text-secundary md:text-3xl text-xl`}/>
      </div>
  )
}
