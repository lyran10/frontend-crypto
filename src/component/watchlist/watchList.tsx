import React, { useState, useEffect } from 'react'
import { useRedux } from '../../customHooks/useRedux'
import { useStorage } from '../../customHooks/UseStorage'
import { useNavigate } from 'react-router-dom'
import { ImSpinner2 } from "react-icons/im"
import { numberWithCommas } from '../banner/carousel'
import { getwatchList, singleCoin, historicalChart, deleteCoin } from '../redux/actions'
import { removeData, showWatchList, getStatus } from '../redux/reducer'
import { DeleteCoinButton } from './deleteCoinButton'
import { Button } from './watchListButton'
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";

export const WatchList = () => {
  const [methods] = useRedux()
  const [storage] = useStorage()
  const navigate = useNavigate()
  const [selectedCoin, setSelectedCoin] = useState<string>("")
  const [selectedId, setSelectedId] = useState<string>("")
  const watchListButton = methods.selector(state => state.data.showWatchList)
  const watchlist = methods.selector(state => state.data.watchlist)
  const coinslist = methods.selector(state => state.data.coinsList)
  const symbol = methods.selector(state => state.data.symbol)
  const currency = methods.selector(state => state.data.currency)
  const days = methods.selector(state => state.data.days)

  const removeCoin = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    setSelectedId(event.currentTarget.id)
    methods.dispatch(getStatus(true))
    methods.dispatch(deleteCoin({ id: storage.getValues()?.id, coin: event.currentTarget.id }))
    await methods.dispatch(getwatchList(storage.getValues()?.id))
    setSelectedId("")
  }

  const coinSelected = (id: string) => {
    methods.dispatch(removeData([]))
    methods.dispatch(singleCoin(id as string))
    methods.dispatch(historicalChart({ currency, days, id }))
    navigate(`/coin/${id}`)
  }

  const handleClick = (id: string) => {
    setSelectedCoin(id)
    coinSelected(id)
  }

  const handleNav = () => !watchListButton ? methods.dispatch(showWatchList(true)) : methods.dispatch(showWatchList(false))

  useEffect(() => { methods.dispatch(getwatchList(storage.getValues()?.id)) }, [currency])

  return (
    <div className={`flex fixed bottom-1 gap-3 items-end right-0 ${watchListButton ? "" : "translate-y-[80px]"}`}>
      <div className={`flex relative gap-3 flex-col duration-500 py-3 px-4 rounded-md ${watchListButton ? " bg-[rgba(0,0,0,.6)]" : "bg-transparent"}`}>
        <div className='flex justify-between items-center'>
          <span className={`text-[#f5f5f5] font-bold text-center text-[20px] ${watchListButton ? "visible" : "invisible"}`}>Watch List</span>
          <Tippy placement='top' content="Watch List" theme='light'>
            <div onClick={handleNav} className={`w-[50px] h-[50px] md:w-[70px] md:h-[70px] lg:w-[70px] lg:h-[70px] duration-500 rounded-md ${watchListButton ? "bg-transparent relative -translate-y-0" : "bg-[#06b6d4] absolute right-4 bottom-[100%] -translate-y-5"} flex justify-center items-center cursor-pointer text-[#f5f5f5]`}>
              <Button show={watchListButton} />
            </div>
          </Tippy>
        </div>
        <div className={`${watchListButton ? "w-[90vw] h-[450px]  md:w-[400px] lg:w-[400px] opacity-[1]" : "w-0 h-0 opacity-0 translate-x-[200px]"} duration-500 watchlist overflow-x-hidden`}>
          <ul className='flex flex-col justify-center w-[100%] py-3 gap-2'>
            {coinslist ? coinslist.map(coin => {
              if (watchlist.includes(coin.id)) {
                return (
                  <li
                    onClick={() => handleClick(coin.id)}
                    key={coin?.id}
                    className={`cursor-pointer relative flex justify-between text-white p-1 duration-500 ${selectedCoin === coin?.id ? "bg-[#f5f5f5] text-darkBlue" : ""}`}
                  >
                    <div className='flex gap-1'>
                      <div className='w-[30px] h-[30px]'><img className='w-full h-full' src={coin.image} alt="" /></div>
                      <span className={`mt-1 ${selectedCoin === coin?.id ? " text-darkBlue" : ""}`}>{coin?.name}</span>
                    </div>
                    <div className={`flex gap-2 justify-center items-center ${selectedCoin === coin?.id ? " text-darkBlue" : "text-offWhite"} font-semibold`}>
                      <span className={`mt-1 `} id={coin.id}>
                        {symbol}{" "}
                        {numberWithCommas(parseInt(coin?.current_price.toFixed(2)))}
                      </span>
                      {coin.id == selectedId ?
                        <ImSpinner2 size={20} className={`animate-spin absolute ${selectedCoin === coin?.id ? " text-darkBlue" : "text-offWhite"}`} />
                        : <DeleteCoinButton selectedCoin={selectedCoin} removeCoin={removeCoin} coinId={coin.id} />}
                    </div>
                  </li>
                )
              }

            }) : <div className='flex justify-center items-center'><span className='text-[15px] font-bold text-white'>No coins in the Watchlist</span></div>}
          </ul>
        </div>
      </div>
    </div>
  )
}