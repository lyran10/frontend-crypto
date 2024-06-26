import { useEffect } from "react";
import { useRedux } from "../../customHooks/useRedux";
import { useShow } from "../../customHooks/useShow";
import { useStorage } from "../../customHooks/UseStorage";
import { Banner } from "../banner/banner";
import { NavBar } from "../nav/navbar";
import { TableData } from "../table/tableData";
import { findUser } from "../redux/actions";
import { WatchList } from "../watchlist/watchList";
import { CurrencyDropDown } from "../nav/currencyDropDown";
import { AlertMsg } from "../common/alertMsg";
import { LoginAndSignInTabs } from "../auth/loginAndSignInTabs";
import ErrorBoundary from "../errorBoundaries/coinDataError";
import { ErrorMessages } from "../../constants/constants";

export const HomePage = () => {
  const [methods] = useRedux()
  const [show] = useShow()
  const [storage] = useStorage()
  const login = methods.selector((state) => state.data.login);

  const checkIfTokenExpired = async () => {
    if (storage.getValues() !== null) methods.dispatch(findUser({ id: storage.getValues().id }));
  };

  useEffect(() => { 
    checkIfTokenExpired();
   }, []);

  return (
    <div
      className={`flex relative flex-col w-[100%] ${show ? "opacity-1" : "opacity-0"} duration-500 justify-center items-center gap-2`}>
      <NavBar />
      <Banner />
      <ErrorBoundary fallback={ErrorMessages.SERVER_ERROR}>
      <TableData />
      </ErrorBoundary>
      {login ? (
        <WatchList />
      ) : null}
      <CurrencyDropDown id={"home"} />
      <AlertMsg />
      <LoginAndSignInTabs />
    </div>
  );
};
