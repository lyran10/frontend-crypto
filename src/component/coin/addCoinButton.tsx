import React, { useState, useEffect } from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector, TypedUseSelectorHook } from "react-redux/es/exports";
import { RootState } from "../redux/store";
import { useDispatch } from "react-redux/es/exports";
import { AppDispatch } from "../redux/store";
import { getwatchList } from "../redux/actions";
import { userLogin } from "../redux/reducer";
import { IoCloseSharp } from "react-icons/io5";

type Params = {
  id: string | undefined;
};

export const AddCoinButton = () => {
  const [alertMsg, setAlertMsg] = useState<string>("");
  const [moveUp, setMoveUp] = useState<string>("-translate-y-[1000px]");
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState<boolean>(false);
  const { id } = useParams<Params>();
  const selector: TypedUseSelectorHook<RootState> = useSelector;
  const watchlist = selector((state) => state.currencyData.watchlist);
  const userDetails = selector((state) => state.currencyData.userDetails);

  useEffect(() => {}, [watchlist, userDetails]);

  const addCoin = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/addcoin`,
        { id: userDetails._id, coin: id },
        {
          headers: { Authorization: `Bearer ${userDetails.token}` },
          withCredentials: true,
        }
      );
      await dispatch(getwatchList(userDetails));
      setAlertMsg(data.msg);
      setMoveUp("-translate-y-[400px]");
      setTimeout(() => {
        setMoveUp("-translate-y-[1000px]");
      }, 3000);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setMoveUp("-translate-y-[400px]");
      setTimeout(() => {
        setMoveUp("-translate-y-[1000px]");
      }, 3000);
      setLoading(false);
      dispatch(userLogin(false));
    }
  };

  const checkInList = () => {
    if (id && watchlist.length !== 0) {
      return watchlist.find((ele: string) => ele === id);
    }
  };

  return (
    <Tippy content="Add coin to your Watchlist" placement="bottom">
      <button
        disabled={checkInList() ? true : false}
        onClick={addCoin}
        className={`flex ${
          checkInList() ? "" : "group"
        } font-bold self-center w-[100%] justify-center rounded-md items-center gap-2 py-1 px-2 transition duration-500 ${
          checkInList()
            ? "bg-[#f5f5f5] text-darkBlue mt-5"
            : "bg-[#06b6d4] hover:bg-alphaBlue hover:text-[#f5f5f5] cursor-pointer"
        }   text-[#f5f5f5]`}
      >
        {loading ? (
          <>
            <div className="loader w-7 h-7 flex justify-center items-center relative before:content-'' before:absolute before:w-7 before:h-7 before:rounded-full before:bg-[#06b6d4] before:border-[5px] before:border-t-darkBlue before:animate-spin"></div>
          </>
        ) : (
          <>
            <span>{checkInList() ? "Added in watch list" : "Add in watch list"} </span>
            {/* <GiTwoCoins
              className="text-offWhite group-hover:text-darkBlue"
              size={20}
            /> */}
          </>
        )}
        <div
          className={`transition flex justify-between gap-3 items-center px-2 duration-300 absolute h-[40px] font-bold ${moveUp} bg-darkBlue rounded-md`}
        >
          <span className="">{alertMsg}</span>
          <IoCloseSharp
            className="cursor-pointer"
            onClick={() => setMoveUp("-translate-y-[1000px]")}
            size={25}
          />
        </div>
      </button>
    </Tippy>
  );
};
