import React, { useEffect, useState } from "react";
import axios from "axios";
import { trendingCoins } from "../utils/coinapi";
import { TrendingCoins } from "../utils/interface";
import { useSelector, TypedUseSelectorHook } from "react-redux/es/exports";
import { RootState } from "../redux/store";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { carousel } from "../table/data";

export const numberWithCommas = (x: number) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const Carousel = () => {
  const [coins, setCoins] = useState<TrendingCoins[]>([]);
  const [index, setIndex] = useState<number>(0);
  const [animation,setAnimation] = useState<{next : boolean,prev : boolean}>({next : false,prev : false})
  const [scale,setScale] = useState<boolean>(false)
  const selector: TypedUseSelectorHook<RootState> = useSelector;
  const currency = selector((state) => state.currencyData.currency);

  const getData = async () => {
    const { data } = await axios.get(trendingCoins(currency));
    setCoins(data);
  };

  useEffect(() => {
    getData();
  }, [currency]);

  useEffect(() => {
    const coin = document.querySelector('.coin');

    const handleEvent = () => {   
    }
    if(coin){
     coin.addEventListener('animationend',handleEvent);

      return () => {coin.removeEventListener('animationend',handleEvent)}
    }
   
  },[])

  const next = () => {
    if (index === coins.length - 1) return;
    setAnimation({...animation,next : true,prev : false})

    setTimeout(() => {
      setIndex((index) => index + 1);
      console.log('Animation complete');
    }, 500);

    setTimeout(() => {
      setAnimation({...animation,next : false,prev : false})
    }, 700);
  };

  const prev = () => {
    if (index === 0) return;
    setAnimation({...animation,next : false,prev : true})

    setTimeout(() => {
      setIndex((index) => index - 1);
      console.log('Animation complete');
    }, 500);

    setTimeout(() => {
      setAnimation({...animation,next : false,prev : false})
    }, 700);
  };

  return (
    <div className="flex gap-[200px] mt-11 transition relative duration-300">
      {coins.length ? (
        <div className="flex justify-around items-center w-[95vw]">
          <IoIosArrowBack
            onClick={prev}
            onMouseDown={() => setScale(true)}
            onMouseUp={() => setScale(false)}
            className={`cursor-pointer p-2 bg-alphaBlue text-[#f5f5f5] rounded-full transition duration-500 hover:-translate-x-1 ${scale ? "scale-90" : "scale-100"}`}
            size={40}
          />
          <div className={`coin flex flex-col gap-[20px] w-[100px] duration-500 relative  ${animation.next ? "translate-x-[100px] opacity-0" : ""} ${animation.prev ? "-translate-x-[100px] opacity-0" : ""}`}>
            <img
              src={coins[index]?.image}
              alt={coins[index]?.name}
              className="h-[100px]"
            />
            <div className={`flex flex-col justify-center items-center `}>
              <span className="text-white text-[30px] font-bold">
                {coins[index]?.symbol}
              </span>
              <span
                className={`text-[20px] font-bold ${
                  coins[index]?.price_change_percentage_24h >= 0
                    ? "text-[rgb(14,203,129)]"
                    : "text-[#D2042D]"
                }`}
              >
                {" "}
                {coins[index]?.price_change_percentage_24h >= 0 && "+"}{" "}
                {coins[index]?.price_change_percentage_24h?.toFixed(2)}%
              </span>
            </div>
          </div>
          <IoIosArrowForward
            onClick={next}
            onMouseDown={() => setScale(true)}
            onMouseUp={() => setScale(false)}
            className={`cursor-pointer p-2 bg-alphaBlue text-[#f5f5f5] rounded-full hover:translate-x-1 transition duration-500 ${scale ? "scale-90" : "scale-100"}`}
            size={40}
          />
        </div>
      ) : null}
    </div>
  );
};
