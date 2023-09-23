import React, { useEffect, useState } from "react";
import { numberWithCommas } from "../banner/carousel";
import { NextandPrev } from "./nextandPrev";
import { useSelector, TypedUseSelectorHook } from "react-redux/es/exports";
import { RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { TrendingCoins } from "../utils/interface";

export const Table = () => {
  const selector: TypedUseSelectorHook<RootState> = useSelector;
  const [pagination, setPagination] = useState<boolean>(true);
  const navigate = useNavigate();
  const userLogin = selector((state) => state.currencyData.login);
  const inputSearch = selector((state) => state.currencyData.inputSearch);
  const filteredList = selector((state) => state.currencyData.filteredList);
  const paginationList = selector((state) => state.currencyData.paginationList);
  const symbol = selector((state) => state.currencyData.symbol);
  const [list, setList] = useState<TrendingCoins[]>([]);
  const [pageNum, setPageNum] = useState<number>(11);
  const [pages, setPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [array, setArray] = useState<string[]>([]);

  const getData = async () => {
    setList(paginationList);
    setPages(paginationList.length / pageNum);
    let numberArray = Object.keys([...Array(pageNum + 1)]);
    numberArray.shift();
    setArray(numberArray);
  };

  const lastIndex = currentPage * pages;
  const firstIndex = lastIndex - pages;

  const visibleArray = list.slice(firstIndex, lastIndex);

  useEffect(() => {
    if (inputSearch === "") {
      setPagination(true);
      getData();
    } else {
      setPagination(false);
      setList(filteredList);
    }
  }, [pageNum, currentPage, inputSearch, filteredList, paginationList]);

  const tableRow = (index: number, row: any, profit: boolean) => {
    return (
      <Tippy key={index} content={`Click for more info about ${row.name}`}>
        <tr
          onClick={() => navigate(`/coin/${row.id}`)}
          className="hover:bg-darkBlue hover:shadow-custom hover:text-white border-b-[1px] cursor-pointer transition duration-300"
        >
          <td className="w-[25%]">
            <div className="text-start">
              <img src={row?.image} height="30" width="30" />
              <div className="flex justify-start flex-col">
                <span className="text-[20px]">{row.symbol}</span>
                <span className="text-[20px]">{row.name}</span>
              </div>
            </div>
          </td>
          <td className="w-[25%]">
            <span className="coinInfo flex items-center justify-center">
              {symbol}
              {numberWithCommas(row?.current_price.toFixed(2))}
            </span>
          </td>
          <td className="w-[25%]">
            <span
              className={`coinInfo flex items-center justify-center text-[15px] font-bold ${
                profit ? "text-[rgb(14,203,129)]" : "text-[#D2042D]"
              }`}
            >
              {profit && "+"} {row?.price_change_percentage_24h?.toFixed(2)}%
            </span>
          </td>
          <td className="w-[25%]">
            <span className="coinInfo flex items-center justify-center">
              {" "}
              {symbol}
              {numberWithCommas(row?.market_cap.toString().slice(0, -6))} M
            </span>
          </td>
        </tr>
      </Tippy>
    );
  };

  return (
    <div
      className={`${
        userLogin ? "w-[90vw]" : "w-[90vw]"
      } flex items-center justify-center flex-col`}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-[100%] justify-center items-center gap-y-7">
      {pagination
    ? list.length
      ? visibleArray.map((row: any, index: number) => {
          let profit = row.price_change_percentage_24h >= 0;
          return (
            <div key={index} className="w-[300px] h-[250px] group relative m-auto flex justify-center p-2 gap-5 items-center shadow-cards rounded-md">
              <div className="flex flex-col w-full justify-center items-center">
              <img src={row?.image} className="w-[100px] h-[100px]" />
              <span className="text-[14px] text-center absolute bottom-[93%] bg-alphaBlue text-darkBlue py-1 px-2 rounded-md">{row.symbol.toUpperCase()}</span>
              <span className="text-[20px] text-center">{row.name}</span>
              </div>
              <div className="flex flex-col gap-3 w-full">
              <div className="flex flex-col">
              <span className="font-bold">Price</span>
              <span className="coinInfo flex">
              {symbol}
              {numberWithCommas(row?.current_price.toFixed(2))}
            </span>
              </div>

              <div className="flex flex-col">
              <span className="font-bold">24h Change</span>
              <span
              className={`coinInfo flex text-[15px] font-bold ${
                profit ? "text-[rgb(14,203,129)]" : "text-[#D2042D]"
              }`}
            >
              {profit && "+"} {row?.price_change_percentage_24h?.toFixed(2)}%
            </span>
              </div>

              <div className="flex flex-col">
              <span className="font-bold">Market Cap</span>
              <span className="coinInfo flex">
              {" "}
              {symbol}
              {numberWithCommas(row?.market_cap.toString().slice(0, -6))} M
            </span>
              </div>
              </div>
              <button onClick={() => navigate(`/coin/${row.id}`)} className="absolute top-[93%] translate-y-10 opacity-0 group-hover:opacity-[1] group-hover:translate-y-0 duration-500 rounded-md text-[#f5f5f5] bg-darkBlue py-1 px-2">More Info</button>
            </div>
          )
        })
      : null
    : list.length
    ? list.map((row: any, index: number) => {
        let profit = row.price_change_percentage_24h >= 0;
        return tableRow(index, row, profit);
      })
    : null}
      </div>
      <NextandPrev
        setCurrentPage={setCurrentPage}
        array={array}
        currentPage={currentPage}
        pagination={pagination}
      />
    </div>
  );
};



{/* <table className="w-[95%]" cellPadding={7}>
<thead>
  <tr className="bg-darkBlue border-b-[1px] text-white">
    <th className="rounded-tl-md">Coin</th>
    <th>Price</th>
    <th>24h Change</th>
    <th className="rounded-tr-md">Market Cap</th>
  </tr>
</thead>
<tbody>
  {pagination
    ? list.length
      ? visibleArray.map((row: any, index: number) => {
          let profit = row.price_change_percentage_24h >= 0;
          return tableRow(index, row, profit);
        })
      : null
    : list.length
    ? list.map((row: any, index: number) => {
        let profit = row.price_change_percentage_24h >= 0;
        return tableRow(index, row, profit);
      })
    : null}
</tbody>
</table> */}
