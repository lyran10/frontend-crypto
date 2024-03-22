import { useEffect, useState } from "react";
import { useRedux } from "../../customHooks/useRedux";
import { numberWithCommas } from "../banner/carousel";
import { SignInButton } from "../auth/signInButton";
import { AddCoinButton } from "./addCoinButton";
import { Button } from "../watchlist/watchListButton"
import { singleCoin } from "../redux/actions";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import { getStatus, showCoinInfo } from "../redux/reducer";

type Props = {
  id: string | undefined;
};

export const CoinInfo = ({ id }: Props) => {
  const [methods] = useRedux()
  const [data, setData] = useState<any>({})
  const symbol = methods.selector((state) => state.data.symbol);
  const currency = methods.selector((state) => state.data.currency).toLowerCase();
  const userLogin = methods.selector((state) => state.data.login);
  const watchlist = methods.selector((state) => state.data.watchlist);
  const singlecoin = methods.selector((state) => state.data.singlecoin);
  const coinInfoButton = methods.selector((state) => state.data.coinInfoButton);

  useEffect(() => { methods.dispatch(singleCoin(id as string)); }, [id]);

  useEffect(() => { setData(singlecoin) }, [singlecoin]);
  
  const handleNav = () => {
    methods.dispatch(getStatus(true))
    !coinInfoButton ? methods.dispatch(showCoinInfo(true)) : methods.dispatch(showCoinInfo(false))
  }

  const checkInList = () => {
    if (id && watchlist.length !== 0) {
      return watchlist.find((ele: string) => ele === id);
    }
  };

  return (
    <div className={`fixed left-0 bottom-3 flex justify-center items-end gap-1`}>
      <div className={`flex flex-col gap-3 item-center justify-end duration-700 bg-[rgba(0,0,0,0.6)] ${coinInfoButton ? "w-[250px] h-[400px] opacity-1 translate-x-0" : " -translate-x-[200px] delay-300 transition-translate h-0 w-0 opacity-0"}  text-[#f5f5f5] py-3 px-2 rounded-br-md rounded-tr-md`}>
        {Object.keys(data).length !== 0 ?
          <div className="flex self-start w-full h-full">
            <div className="flex flex-col gap-2 w-[60%]">
              <div className={`flex flex-col gap-[1px] duration-500 ${coinInfoButton ? "opacity-1" : "opacity-0"}`}>
                <span>Name</span>
                <span className="font-bold">{data.name}</span>
              </div>
              <div className={`flex flex-col gap-[1px] duration-500 ${coinInfoButton ? "opacity-1" : "opacity-0"}`}>
                <span> Rank</span>
                <span className="font-bold">
                  {data.market_cap_rank}
                </span>
              </div>
              <div className={`flex flex-col gap-[1px] duration-500 ${coinInfoButton ? "opacity-1" : "opacity-0"}`}>
                <span>Current Price</span>
                <span className="font-bold">{symbol}{numberWithCommas(data.market_data?.current_price[currency])}</span>
              </div>
              <div className={`flex flex-col gap-[1px] duration-500 ${coinInfoButton ? "opacity-1" : "opacity-0 invisible"}`}>
                <span>Market Cap</span>
                <span className="font-bold">
                  {symbol}
                  {numberWithCommas(
                    data.market_data?.market_cap[currency]
                      ?.toString()
                      .slice(0, -4)
                  )}{" "}
                  M
                </span>
              </div>

            </div>
            <img
              className={`h-24 duration-500 ${coinInfoButton ? "opacity-1" : "opacity-0"}`}
              src={data?.image?.large}
              alt={data?.name}
            />

          </div>
          : null
        }
        {userLogin ?
          <div className="flex flex-col gap-2 w-[100%]">
            {!checkInList() ?
              <span className="text-center font-semibold text-[#f5f5f5]">
                Add {data.name} to your watch list
              </span>
              :
              null
            }

            <AddCoinButton />
          </div>
          :
          <div className="flex flex-col mt-5 gap-2 w-[100%]">
            <span className="text-center font-semibold text-[#f5f5f5]">
              Login to make your own watchlist
            </span>
            <SignInButton
              navBg={true}
              trueColor="text-[#f5f5f5]"
              falseColor="text-[#f5f5f5]"
            />
          </div>
        }
      </div>
      <Tippy placement="top" content="Coin Info" theme="light">
        <div onClick={handleNav} className="w-[50px] h-[50px] md:w-[70px] md:h-[70px] lg:w-[70px] lg:h-[70px] flex justify-center items-center duration-500 rounded-md bg-alphaBlue">
          <Button show={coinInfoButton} />
        </div>
      </Tippy>
    </div>

  );
};
