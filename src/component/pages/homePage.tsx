import React, { useEffect, useState } from "react";
import { Banner } from "../banner/banner";
import { NavBar } from "../nav/navbar";
import { TableData } from "../table/tableData";
import { useDispatch } from "react-redux/es/exports";
import { AppDispatch } from "../redux/store";
import { RootState } from "../redux/store";
import { useSelector, TypedUseSelectorHook } from "react-redux/es/exports";
import { findUser } from "../redux/actions";
import { WatchList } from "../watchlist/watchList";
import { CurrencyDropDown } from "../nav/currencyDropDown";
import { AlertMsg } from "../utils/alertMsg";

export const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [show, setShow] = useState<boolean>(false);
  const selector: TypedUseSelectorHook<RootState> = useSelector;
  const userLog = selector((state) => state.currencyData.login);
  const userDetails = selector((state) => state.currencyData.userDetails);

  const checkIfTokenExpired = async () => {
    if (localStorage.getItem("id") !== null && userDetails._id === "") {
      let id = localStorage.getItem("id");
      let token = localStorage.getItem("token");
      dispatch(findUser({ id: id, token: token }));
    }
  };

  useEffect(() => {
    checkIfTokenExpired();
    setShow(true);
  }, [userLog]);

  return (
    <div
      className={`flex relative flex-col w-[100%] ${
        show ? "opacity-1" : "opacity-0"
      } duration-500 justify-center items-center gap-2`}
    >
      <NavBar />
      <Banner />
      <TableData />
      {userLog ? (
          <WatchList
            height="h-[97vh]"
            sm="hidden"
            lg="lg:flex"
            width="w-[20%]"
            mt="mt-[100px]"
          />
         ) : null}
         <CurrencyDropDown id={"home"}/>
         <AlertMsg bg="bg-lightBlue" />
    </div>
  );
};
