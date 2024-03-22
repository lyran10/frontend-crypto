import { useEffect } from "react";
import { useRedux } from "../../customHooks/useRedux";
import { useShow } from "../../customHooks/useShow";
import { useStorage } from "../../customHooks/UseStorage";
import { useParams } from "react-router-dom";
import { NavBar } from "../nav/navbar";
import { AlertMsg } from "../utils/alertMsg";
import { CoinInfo } from "../coin/coinInfo";
import { CoinChart } from "../coin/coinChart";
import { WatchList } from "../watchlist/watchList";
import { CurrencyDropDown } from "../nav/currencyDropDown";
import { getwatchList, findUser } from "../redux/actions";

type Params = {
  id: string;
};

export const CoinPage = () => {
  const [methods] = useRedux()
  const [show] = useShow()
  const [storage] = useStorage()
  const { id } = useParams<Params>();
  const login = methods.selector((state) => state.data.login);

  const checkIfTokenExpired = async () => {
    if (storage.getValues() !== null) methods.dispatch(findUser({ id: storage.getValues().id }));
  };

  useEffect(() => {
    checkIfTokenExpired();
    if (storage.getValues() !== null) methods.dispatch(getwatchList(storage.getValues().id));
  }, [id]);

  return (
    <div
      className={`p-2 bg-darkBlue flex justify-center ${show ? "opacity-1" : "opacity-0"
        } duration-500 w-[100%]`}
    >
      <NavBar />
      <div className="flex bg-darkBlue w-[100%] justify-center flex-col h-[100vh] items-center">
        <CoinChart id={id} />
        {login ? (
          <WatchList

          />
        ) : null}
        <CurrencyDropDown id="coin" />
        <CoinInfo id={id} />
      </div>
      <AlertMsg />
    </div>
  );
};
