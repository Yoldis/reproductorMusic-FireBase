import { useEffect, useState } from "react";

const promotion = [
  {
      id:0,
      title:'!Sumergete en la musica como nunca antes!',
      img:'https://firebasestorage.googleapis.com/v0/b/musicapp-c130e.appspot.com/o/imgDefault%2Fperson.svg?alt=media&token=7c8efe18-734d-4284-8c2a-d638d320d86a'
  },

  {
      id:1,
      title: '!Importa tus musicas favoritas y dale play!',
      img:'https://firebasestorage.googleapis.com/v0/b/musicapp-c130e.appspot.com/o/imgDefault%2Fmusic.svg?alt=media&token=3034a5ee-0eca-46fd-a517-f5e682593870'
  },
  
  {
      id:2,
      title:'!Vive la emocion de una unica experiencia! ',
      img:'https://firebasestorage.googleapis.com/v0/b/musicapp-c130e.appspot.com/o/imgDefault%2Fmusic2.svg?alt=media&token=48d3e4d7-f156-4d69-a273-dc02186fd07b'
  },

  {
      id:3,
      title: '!Canta a todo pulmon sin interrupciones!',
      img:'https://firebasestorage.googleapis.com/v0/b/musicapp-c130e.appspot.com/o/imgDefault%2Fperson2.svg?alt=media&token=d435738d-7658-47f9-adcf-7e455ad83c63'
  }

]

export const AnimationAuth = ({children}) => {

  const [getIndexPromo, setGetIndexPromo] = useState(0);
  const [promo, setPromo] = useState(promotion[0]);
  const{img} = promo;
  
  useEffect(() => {

    let count = 0;
    const promo = setInterval(() => {

      count <=2 ? count ++ : count = 0;
      const indexPromo = promotion.findIndex((e) => {
        return e.id === count;
      });
      
      const newPromo = promotion.find((e) => {
        return e.id === count;
      });

      setGetIndexPromo(indexPromo);
      setPromo(newPromo);

    }, 4000);

    return () => {
      clearInterval(promo);
    };
  }, []);
  
  
  return (
    <div className={`animate__animated animate__fadeIn text-white `} >
      <div className="grid grid-cols-3 pt-5 ">
        <div className="animate__animated animate__fadeIn transition-all duration-200 bg-no-repeat bg-contain bg-center mb-5" style={{backgroundImage: `url(${img})`}}></div>
        <div className="flex flex-col items-center mb-7">
          <div>
            <img className="w-12" src="/src/assets/iconMusic.png" alt="" />
          </div>
          <h1 className="font-bold text-2xl text-secundary">Beats</h1>

          <h2 className="font-bold text-md md:text-3xl text-center">Tu musica en cualquier lugar</h2>
        </div>
        <div className="animate__animated animate__fadeIn transition-all duration-200 bg-no-repeat bg-contain bg-center mb-5" style={{backgroundImage: `url(${img})`}}></div>
      </div>

      <div className="grid md:grid-cols-4 grid-cols-2 items-center px-4 gap-5">
        {promotion.map((promo) => (
          <AnimationItem
            key={promo.id}
            title={promo.title}
            img={promo.img}
            id={promo.id}
            getIndexPromo={getIndexPromo}
          />
        ))}
      </div>
      {children}
      
    </div>
  );
}



const AnimationItem = ({id, title, img, getIndexPromo}) => {

    return (
      <div
        className={`bg-animationBG h-60 rounded-xl shadow-shadowAnimation p-1 mb-2 ${id === getIndexPromo && 'scale-105 border border-black'} transition-all duration-500 `}
      >
        <h3 className="md:text-lg text-md font-bold py-1 text-center text-cuarty">{title}</h3>

        <div className=" flex justify-center py-2 ">
          <img className="w-40 " src={img} alt="" />
        </div>
      </div>
    );
}
