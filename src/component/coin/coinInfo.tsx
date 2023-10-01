import React, { useEffect,useState } from "react";
import { numberWithCommas } from "../banner/carousel";
import {
  useDispatch,
  useSelector,
  TypedUseSelectorHook,
} from "react-redux/es/exports";
import { AppDispatch, RootState } from "../redux/store";
import { SignInButton } from "../auth/signInButton";
import { translateEffects, opacityEffects } from "../redux/reducer";
import parse from "html-react-parser";
import { AddCoinButton } from "./addCoinButton";
import {Button} from "../watchlist/watchListButton"
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";

type Props = {
  coinData: any;
};

export const CoinInfo = ({ coinData }: Props) => {
  const selector: TypedUseSelectorHook<RootState> = useSelector;
  const dispatch = useDispatch<AppDispatch>();
  const [show,setShow] = useState<boolean>(false)
  const [arrow,setArrow] = useState<{arrow1 : string, arrow2 : string,arrow3 : string}>({
    arrow1 : "-translate-y-2",
    arrow2 : "w-8",
    arrow3 : "translate-y-2"
  })
  const translate = selector((state) => state.currencyData.translate);
  const Opacity = selector((state) => state.currencyData.opacity);
  const symbol = selector((state) => state.currencyData.symbol);
  const currency = selector((state) => state.currencyData.currency).toLowerCase();
  const userLogin = selector((state) => state.currencyData.login);

  const ModalIn = () => {
    let translateObj = {
      ...translate,
      showModal: "translate-y-[300px]",
      overlay: "translate-x-[0px]",
    };
    dispatch(translateEffects(translateObj));
    setTimeout(() => {
      let opacityObj = {
        ...Opacity,
        modalOpacity: "opacity-1",
        overlayOpacity: "opacity-50",
      };
      dispatch(opacityEffects(opacityObj));
    }, 300);
  };

  const handleNav = () => {
    setShow(show => !show ? true : false)
    if(arrow.arrow1 === "-translate-y-2"){
      setArrow({arrow1 : "-rotate-[33deg] -translate-y-2",arrow2 : "rotate-[90deg] translate-x-[14px] w-[36px]",arrow3 : "rotate-[33deg] translate-y-2"})
    }else{
      setArrow({arrow1 : "-translate-y-2",arrow2 : "w-8",arrow3 : "translate-y-2 "})
    }
  }

  useEffect(() => {}, [symbol, currency, translate, Opacity, coinData]);

  return (
    <div className={`fixed left-0 bottom-3 flex justify-center items-end gap-1`}>
    <div className={`flex flex-col gap-3 item-center duration-700 bg-[rgba(0,0,0,0.6)] ${show? "w-[200px] h-[420px] opacity-1 translate-x-0" : " -translate-x-[200px] delay-300 transition-translate h-0 w-0 opacity-0"}  text-[#f5f5f5] py-3 px-2 rounded-br-md rounded-tr-md`}>
      {Object.keys(coinData).length !== 0 ? 
      <>
        <img
      className={`h-10 w-10 duration-500 ${show ? "opacity-1" : "opacity-0"}`}
      src={coinData?.image?.large}
      alt={coinData?.name}
    />
      <div className={`flex flex-col gap-[1px] duration-500 ${show ? "opacity-1" : "opacity-0"}`}>
       <span>Name</span>
       <span className="font-bold">{coinData.name}</span>
      </div>
      <div className={`flex flex-col gap-[1px] duration-500 ${show ? "opacity-1" : "opacity-0"}`}>
        <span> Rank</span>
        <span className="font-bold">
          {coinData.market_cap_rank}
        </span>
        </div>
        <div className={`flex flex-col gap-[1px] duration-500 ${show ? "opacity-1" : "opacity-0"}`}>
        <span>Current Price</span>
        <span className="font-bold">{symbol}{numberWithCommas( coinData.market_data?.current_price[currency] )}</span>
        </div>
        <div className={`flex flex-col gap-[1px] duration-500 ${show ? "opacity-1" : "opacity-0 invisible"}`}>
          <span>Market Cap</span>
        <span className="font-bold">
          {symbol}
          {numberWithCommas(
            coinData.market_data?.market_cap[currency]
              ?.toString()
              .slice(0, -4)
          )}{" "}
          M
        </span>
        {userLogin ? 
            <div className="flex flex-col mt-5 w-[100%]">
          <span className="text-center font-semibold text-[#f5f5f5]">
            Add {coinData.name} to your watch list
          </span>
          <AddCoinButton />
        </div>
       : 
        <div className="flex flex-col mt-5 gap-2 w-[100%]">
          <span className="text-center font-semibold text-[#f5f5f5]">
            Login to make your own watchlist
          </span>
          <SignInButton
            navBg={true}
            ModalIn={ModalIn}
            // show="flex"
            trueColor="text-[#f5f5f5]"
            falseColor="text-[#f5f5f5]"
          />
        </div>
      }
        </div>
       </>
      : null
}
    </div>
    <Tippy placement="top" content="Coin Info" theme="light">
    <div onClick={handleNav} className="w-[50px] h-[50px] md:w-[70px] md:h-[70px] lg:w-[70px] lg:h-[70px] flex justify-center items-center duration-500 rounded-md bg-alphaBlue">
    <Button arrow={arrow}/>
    </div>
    </Tippy>
    </div>

  );
};
