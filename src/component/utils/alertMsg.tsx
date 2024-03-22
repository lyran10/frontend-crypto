import { useEffect, useState } from "react";
import { useStorage } from "../../customHooks/UseStorage";
import { useRedux } from "../../customHooks/useRedux";
import { IoCloseSharp } from "react-icons/io5";
import { getStatus, autMsg, userLogin } from "../redux/reducer";
import { clearwatchlist } from "../redux/reducer";

export const AlertMsg = () => {
  const [methods] = useRedux()
  const [storage] = useStorage()
  const [show, setShow] = useState<boolean>(false)
  const message = methods.selector((state) => state.data.alertMsg)
  const status = methods.selector((state) => state.data.status)
  const login = methods.selector((state) => state.data.login)

  useEffect(() => {
    if (message) {
      if (!login && message === "Logged out successfully") {
        methods.dispatch(getStatus(false))
        methods.dispatch(clearwatchlist([]));
        storage.removeStorage()
      }

      setShow(true)

      let opacityTimer = setTimeout(() => { setShow(false) }, 4000);
      let msgTimer = setTimeout(() => { methods.dispatch(autMsg("")) }, 4200);

      return () => {
        clearTimeout(opacityTimer)
        clearTimeout(msgTimer)
      }
    }
  }, [message]);

  return (
    <div className={`transition flex z-[3000] text-[#f5f5f5] justify-between gap-3 items-center px-3 py-2 top-[20%] right-0 duration-500 fixed font-bold $ ${status ? "bg-[#3b82f6]" : "bg-[#ef4444]"} rounded-tl-lg rounded-bl-lg ${show ? "translate-x-0" : "translate-x-[500px]"}`}>
      <span className="">{message}</span>
      <IoCloseSharp className="cursor-pointer" onClick={() => setShow(false)} size={20} />
    </div>
  );
};
