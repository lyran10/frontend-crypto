import { useState, useEffect } from "react";
import { useRedux } from "../../customHooks/useRedux";
import { useStorage } from "../../customHooks/UseStorage";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { useParams } from "react-router-dom";
import { addCoin, getwatchList } from "../redux/actions";

type Params = {
  id: string | undefined;
};

export const AddCoinButton = () => {
  const { id } = useParams<Params>();
  const [methods] = useRedux()
  const [storage] = useStorage()
  const [loading, setLoading] = useState<boolean>(false);
  const watchlist = methods.selector((state) => state.data.watchlist);
  const message = methods.selector((state) => state.data.alertMsg);

  useEffect(() => {
    if (message) {
      methods.dispatch(getwatchList(storage.getValues().id));
      setLoading(false);
    }
  }, [message])

  useEffect(() => { }, [watchlist, storage.getValues().id]);

  const add = () => {
    setLoading(true);
    methods.dispatch(addCoin({ id: storage.getValues().id, coin: id }))
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
        onClick={add}
        className={`flex ${checkInList() ? "" : "group"
          } font-bold self-center w-[100%] justify-center rounded-md items-center gap-2 py-1 px-2 transition duration-500 ${checkInList()
            ? "bg-[#f5f5f5] text-darkBlue mt-[51px]"
            : "bg-[#06b6d4] hover:bg-alphaBlue hover:text-[#f5f5f5] cursor-pointer"
          }   text-[#f5f5f5]`}
      >
        {loading ? (
          <>
            <div className="loader w-7 h-7 flex justify-center items-center relative before:content-'' before:absolute before:w-7 before:h-7 before:rounded-full before:bg-[rgba(0,0,0,0)] before:border-[5px] before:border-t-darkBlue before:animate-spin"></div>
          </>
        ) : (
          <>
            <span>{checkInList() ? "Added in watch list" : "Add in watch list"} </span>
          </>
        )}
      </button>
    </Tippy>
  );
};
