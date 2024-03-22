import { useEffect, useState } from "react";
import { useRedux } from "../../customHooks/useRedux";
import { Input } from "./input";
import { Table } from "./table";
import { coinsList } from "../redux/actions";

export const TableData = () => {
  const [methods] = useRedux()
  const [show, setShow] = useState<boolean>(false);
  const currency = methods.selector((state) => state.data.currency);

  const getCointsList = async () => {
    methods.dispatch(coinsList(currency));
  };

  useEffect(() => {
    getCointsList();
  }, [currency]);

  useEffect(() => {
    window.onscroll = () => {
      setShow(window.pageYOffset < 200 ? false : true);
    };
  });

  return (
    <div className="min-h-[500px] w-[100%]">
      <div
        className={`transition duration-500 ${show ? "opacity-[1]" : "opacity-0"
          } flex justify-center items-center flex-col gap-5 w-[100%]`}
      >
        <div className="flex justify-center items-center flex-col">
          <span className="lg:text-[30px] md:text-[30px] text-center text-[25px] mt-[40px]">
            Crypto Currency Price By Market Capital
          </span>
          <span className="text-center">
            Click on the Coins From The Table For More Information
          </span>
        </div>
        <Input />
        <Table />
      </div>
    </div>
  );
};
