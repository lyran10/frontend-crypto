import React, { useRef, useEffect } from "react";
import { useDispatch } from "react-redux/es/exports";
import { AppDispatch } from "../redux/store";
import { RootState } from "../redux/store";
import { useSelector, TypedUseSelectorHook } from "react-redux/es/exports";
import { currencyChange, symbolChange } from "../redux/reducer";
import { coinssList } from "../redux/actions";
import { TiTick } from "react-icons/ti";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import india from "./india.jpg"

type Props = {
  // position: string;
  // showDropdown : boolean
};

export const CurrencyDropDown = () => {
  const selector: TypedUseSelectorHook<RootState> = useSelector;
  const currency = selector((state) => state.currencyData.currency);
  const dispatch = useDispatch<AppDispatch>();
  const curRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {}, []);

  const handleChange = (event: React.MouseEvent<HTMLElement>) => {
    if (event.currentTarget.id === "USD") {
      dispatch(symbolChange("$"));
    } else if (event.currentTarget.id === "ILS") {
      dispatch(symbolChange("₪"));
    } else {
      dispatch(symbolChange("₹"));
    }
    dispatch(coinssList(event.currentTarget.id));
    dispatch(currencyChange(event.currentTarget.id));
  };

  const items = (cur: string,symbol : string) => {
    return (
      <Tippy
      theme="light"
      content={`${
        cur === "USD"
          ? "Change currency to US Dollars"
          : cur === "ILS"
          ? "Change currency to Israeli Shekel"
          : "Change currency to Indian Rupee"
      }`}
      placement="top"
    >
      {/* <div
      
      // onClick={() => onBasemapChange(id)}
      className={` w-0 hover:w-full px-3 rounded-full flex cursor-pointer items-center`}> */}
       {/* <div className="w-28">
        <p className="text-sm text-slate-700">{name}</p>
      </div> */}
      <div
      id={cur}
      onClick={handleChange}
      key={cur}
      className={`h-8 hover:w-[90px] ${cur === currency ? "hover:bg-[#f5f5f5]" : "hover:bg-[#06b6d4]"} w-8 bg-tansparent cursor-pointer left-3 bottom-3 duration-500 p-5 relative flex items-center group rounded-full`}>
      <div className={`rounded-full shadow-sideBarShadow h-9 w-9 absolute ${cur === currency ? "bg-[#f5f5f5] text-[#06b6d4]" : "bg-[#06b6d4]"} left-0 duration-300 flex justify-center items-center text-[20px]`}>
      {symbol}
      </div>
      <span className={`${cur === currency ? "text-[#06b6d4]" : ""} text-sm font-bold duration-500 absolute right-5 group-hover:opacity-[1] opacity-0`}>{cur}</span>
     
        {/* {img && ( */}
          {/* <img
            // src={img}
            alt={"image"}
            className={`rounded-full shadow-sideBarShadow h-8 w-8 absolute ${ currency === cur ? "scale-75" : ""} right-0 duration-300 group-hover:scale-75`}
          /> */}
        {/* )} */}
      </div>          
    {/* </div> */}
    </Tippy>
    );
  };

  return (
    <div
      className={`flex flex-col gap-3 fixed left-0 rounded-md bottom-3 text-offWhite transition duration-500`}
    >
      {items("USD","$")}
      {items("ILS","₪")}
      {items("INR","₹")}
    </div>
  );
};



{/* <button
onClick={handleChange}
ref={curRef}
id={cur}
className={`${
  currency === cur ? "bg-alphaBlue" : ""
} w-[100%] flex items-center gap-1 justify-end p-1 text-center cursor-pointer border-[1px] border-darkBlue font-bold hover:bg-alphaBlue transition duration-500`}
>
<div className={`w-[51%] duration- me-3 md:me-0 lg:me-0 flex justify-start items-center`}>
  <Tippy
    theme="light"
    content={`${
      cur === "USD"
        ? "US Dollars"
        : cur === "ILS"
        ? "Israeli Shekel"
        : "Indian Rupee"
    }`}
    placement="left"
  >
    <span>{cur}</span>
  </Tippy>
  {currency === cur ? (
    <TiTick style={{ color: "#34c38f", marginLeft: "5px" }} />
  ) : null}
</div>
</button> */}
