import React, { useState,useEffect } from 'react'
import { useSelector,TypedUseSelectorHook} from 'react-redux/es/exports'
import { RootState } from '../redux/store'
import { numberWithCommas } from '../banner/carousel'
import { useDispatch} from 'react-redux/es/exports'
import { AppDispatch } from '../redux/store'
import { coinssList, getwatchList, singleCoin, historicalChart } from '../redux/actions'
import { DeleteCoinButton } from './deleteCoinButton'
import axios from 'axios'
import {ImSpinner2} from "react-icons/im"
import { useNavigate } from 'react-router-dom'
import { removeData, showWatchList } from '../redux/reducer'
import { Button } from './watchListButton'
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";

type Props = {
  width : string,
  mt : string,
  sm : string,
  lg:string,
  height :string
}

type Params = {
  id :string,

}

export const WatchList = ({width,mt,sm,lg,height} :Props) => {

  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const [arrow,setArrow] = useState<{arrow1 : string, arrow2 : string,arrow3 : string}>({
    arrow1 : "-translate-y-2",
    arrow2 : "w-8",
    arrow3 : "translate-y-2"
  })
  const [selectedCoin,setSelectedCoin] = useState<string>("")
  const selector : TypedUseSelectorHook<RootState> = useSelector
  const [selectedId,setSelectedId] = useState<string>("")
  const userLogin =  selector(state => state.currencyData.login)
  const show =  selector(state => state.currencyData.showWatchList)
  const watchlist =  selector(state => state.currencyData.watchlist)
  const userDetails =  selector(state => state.currencyData.userDetails)
  const coinslist =  selector(state => state.currencyData.coinsList)
  const symbol =  selector(state => state.currencyData.symbol)
  const currency =  selector(state => state.currencyData.currency)
  const singlecoin =  selector(state => state.currencyData.singlecoin)
  const days =  selector(state => state.currencyData.days)
 
 const deleteCoin = async(event : React.MouseEvent<HTMLButtonElement>) => {
    setSelectedId(event.currentTarget.id)
    try {
      const {data} = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/deletecoin`, {id : userDetails._id,coin : event.currentTarget.id},{
        headers : {Authorization: `Bearer ${userDetails.token}`},withCredentials:true
      })
     await dispatch(getwatchList(userDetails))
          setSelectedId("")
    } catch (error) {
      console.log(error)
      setSelectedId("")
    }
  }

const coinSelected = (id :string) => {
  navigate(`/coin/${id}`)
  dispatch(removeData([]))
  dispatch(singleCoin(id as string))
  dispatch(historicalChart({currency,days,id}))
}

const handleClick = (id : string) => {
  setSelectedCoin(id)
  coinSelected(id)
}

const handleNav = () => {
  if(arrow.arrow1 === "-translate-y-2"){
    setArrow({arrow1 : "-rotate-[33deg] -translate-y-2",arrow2 : "rotate-[90deg] translate-x-[14px] w-[36px]",arrow3 : "rotate-[33deg] translate-y-2"})
    dispatch(showWatchList(true))
  }else{
    setArrow({arrow1 : "-translate-y-2",arrow2 : "w-8",arrow3 : "translate-y-2 "})
    dispatch(showWatchList(false))
  }
}

useEffect(() => {
  dispatch(getwatchList(userDetails))
},[currency])

useEffect(() => {
  dispatch(coinssList(currency))
  
},[symbol,userLogin,userDetails,singlecoin,days,currency,watchlist])

  return (
    <div className={`flex fixed bottom-1 gap-3 items-end right-0 ${show ? "" : "translate-y-[80px]"}`}>
        <div className={`flex relative gap-3 flex-col duration-500 py-3 px-4 rounded-md ${show ? " bg-[rgba(0,0,0,.6)]" : "bg-transparent"}`}>
          <div className='flex justify-between items-center'>
          <span className={`text-[#f5f5f5] font-bold text-center text-[20px] ${show ? "visible" : "invisible"}`}>Watch List</span>
          <Tippy placement='top' content="Watch List" theme='light'>
        <div onClick={handleNav} className={`w-[50px] h-[50px] md:w-[70px] md:h-[70px] lg:w-[70px] lg:h-[70px] duration-500 rounded-md ${show ? "bg-transparent relative -translate-y-0" : "bg-[#06b6d4] absolute right-4 bottom-[100%] -translate-y-5"} flex justify-center items-center cursor-pointer text-[#f5f5f5]`}>
        <Button arrow={arrow}/>
      </div>
      </Tippy>
      </div>
      <div className={`${show ? "w-[90vw] h-[450px]  md:w-[400px] lg:w-[400px] opacity-1" : "w-0 h-0 opacity-0 translate-x-[200px]"} duration-500 watchlist overflow-x-hidden`}>
          <ul className='flex flex-col justify-center w-[100%] py-3 gap-2'>
          {coinslist ? coinslist.map(coin => {
            if(watchlist.includes(coin.id)){  
          return(
            <li
                  onClick={() => handleClick(coin.id)}
                  key={coin?.id}
                  className={`cursor-pointer flex justify-between text-white p-1 duration-500 ${selectedCoin === coin?.id ? "bg-[#f5f5f5] text-darkBlue" : ""}`}
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
                    <ImSpinner2 size={20} className={`animate-spin  ${selectedCoin === coin?.id ? " text-darkBlue" : "text-offWhite"}`}/>
                    :  <DeleteCoinButton selectedCoin = {selectedCoin} deleteCoin={deleteCoin} coinId = {coin.id}/>}
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