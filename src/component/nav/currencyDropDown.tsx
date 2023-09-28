import React, { useEffect } from "react";
import { useDispatch } from "react-redux/es/exports";
import { AppDispatch } from "../redux/store";
import { RootState } from "../redux/store";
import { useSelector, TypedUseSelectorHook } from "react-redux/es/exports";
import { currencyChange, symbolChange } from "../redux/reducer";
import { coinssList } from "../redux/actions";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";

export const CurrencyDropDown = () => {
  const selector: TypedUseSelectorHook<RootState> = useSelector;
  const currency = selector((state) => state.currencyData.currency);
  const show = selector((state) => state.currencyData.showWatchList);
  const dispatch = useDispatch<AppDispatch>();

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
      <div
      id={cur}
      onClick={handleChange}
      key={cur}
      className={`h-8 hover:w-[90px] ${cur === currency ? "hover:bg-[#f5f5f5]" : "hover:bg-[#06b6d4]"} w-8 bg-tansparent cursor-pointer left-0 bottom-3 duration-500 p-5 relative flex items-center group rounded-full`}>
          <span className={`${cur === currency ? "text-[#06b6d4]" : ""} text-sm font-bold duration-500 absolute left-5 group-hover:opacity-[1] opacity-0`}>{cur}</span>
      <div className={`rounded-full shadow-sideBarShadow h-9 w-9 absolute ${cur === currency ? "bg-[#f5f5f5] text-[#06b6d4]" : "bg-[#06b6d4]"} right-0 duration-300 flex justify-center items-center text-[20px]`}>
      {symbol}
      </div>
      </div>          
    </Tippy>
    );
  };

  return (
    <div
      className={`flex flex-col gap-3 fixed right-[5px] top-[16%] md:top-[5%] lg:top-[5%] justify-end items-end rounded-md text-offWhite transition duration-500`}
    >
      {items("USD","$")}
      {items("ILS","₪")}
      {items("INR","₹")}
    </div>
  );
};
