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
import {BsCoin} from "react-icons/bs"
import { useNavigate } from 'react-router-dom'
import { removeData } from '../redux/reducer'
import { data } from '../table/data'
import { Button } from './watchListButton'

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
  const [show,setShow] = useState<boolean>(false)
  const [selectedCoin,setSelectedCoin] = useState<string>("")
  const selector : TypedUseSelectorHook<RootState> = useSelector
  const [selectedId,setSelectedId] = useState<string>("")
  const userLogin =  selector(state => state.currencyData.login)
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
    setShow(true)
  }else{
    setArrow({arrow1 : "-translate-y-2",arrow2 : "w-8",arrow3 : "translate-y-2 "})
    setShow(false)
  }
}

useEffect(() => {
  dispatch(getwatchList(userDetails))
},[currency])

useEffect(() => {
  dispatch(coinssList(currency))
  
},[symbol,userLogin,userDetails,singlecoin,days,currency,watchlist])

  return (
    <div className={`flex fixed bottom-0 gap-3 items-end right-0 ${show ? "" : "translate-y-[80px]"}`}>
        <div className={`flex relative gap-3 flex-col duration-500 py-3 px-4 rounded-md ${show ? " bg-[rgba(0,0,0,.6)]" : "bg-transparent"}`}>
          <div className='flex justify-between items-center'>
          <span className={`text-[#f5f5f5] font-bold text-center ml-10 text-[20px] ${show ? "visible" : "invisible"}`}>Watch List</span>
        <div onClick={handleNav} className={`w-[70px] h-[70px] duration-500 rounded-md ${show ? "bg-transparent relative" : "bg-[#06b6d4] absolute right-4 bottom-[140%]"} flex justify-center items-center cursor-pointer  text-[#f5f5f5]`}>
        {/* <BsCoin className='text-[#f5f5f5] text-[40px]'/> */}
        <Button arrow={arrow}/>
      </div>
      </div>
      <div className={`${show ? "w-[90vw] h-[450px]  md:w-[400px] lg:w-[400px] opacity-1" : "w-0 h-0 opacity-0 translate-x-[200px]"} duration-500`}>
          <ul className='flex flex-col justify-center w-[100%] py-3 overflow-scroll watchlist overflow-x-hidden gap-2'>
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
                  <div className={`flex gap-2 justify-center items-center ${selectedCoin === coin?.id ? " text-darkBlue" : "text-offWhite"}`}>
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

// before:absolute before:py-1 before:w-[80px] before:text-center before:bottom-[110%] before:right-0 before:rounded-md before:bg-[rgb(0,0,0)] before:content-["Watch_List"] before:text-[13px]

// after:absolute after:py-1 after:w-[10px] after:h-[10px] after:text-center after:bottom-[110%] after:right-0 after:rounded-md after:bg-[rgb(0,0,0)] after:content-["Watch_List"] after:text-[13px]

// if(watchlist.includes(coin.id)){  }

// {coinslist && watchlist.length ? coinslist.map(coin => {}


//  <div className={`text-darkBlue ${sm} watchlist  ${lg} ${height} overflow-scroll flex-col gap-2 m-auto justify-start items-center w-[90%] ${userLogin ? `md:w-[25%] lg:w-[25%]` : "md:w-[30%] lg:w-[30%]"} rounded-md bg-darkBlue mb-10 shadow-custom md:ms-0 md:me-0 lg:me-0 lg:ms-0`}>
//        <span className={`text-offWhite font-bold text-[25px] text-center ${mt}`}>Watchlist</span>
//        <ul className='flex flex-col justify-center w-[100%] p-2 gap-2'>
//         {coinslist ? coinslist.map(coin => {
//           return(
//             <li
//                   key={coin?.id}
//                   className="flex justify-between text-white p-1"
//                 >
//                   <span onClick={() => handleClick(coin.id)} className="mt-1 cursor-pointer">{coin?.name}</span>
//                   <div className="flex gap-2 justify-center items-center">
//                     <span className="mt-1" id={coin.id}>
//                       {symbol}{" "}
//                       {numberWithCommas(parseInt(coin?.current_price.toFixed(2)))}
//                     </span>
//                     {coin.id == selectedId ? 
//                     <ImSpinner2 size={20} className='animate-spin text-offWhite'/>
//                     :  <DeleteCoinButton deleteCoin={deleteCoin} coinId = {coin.id}/>}
//                   </div>
//                 </li>
//           )
      
//         }) : <div className='flex justify-center items-center'><span className='text-[15px] font-bold text-white'>No coins in the Watchlist</span></div>}
//        </ul>
      
//     </div>
//     <div className='w-[80px] h-[80px] rounded-full bg-darkBlue'>liran</div>