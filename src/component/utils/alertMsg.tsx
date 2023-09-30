import React, { useEffect,useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { useSelector, TypedUseSelectorHook } from "react-redux/es/exports";
import { RootState } from "../redux/store";
import { useDispatch } from "react-redux/es/exports";
import { AppDispatch } from "../redux/store";
import { loginandSignInalert, msg } from "../redux/reducer";

type Props = {
  bg: string;
};

export const AlertMsg = ({ bg }: Props) => {
  const [opacity,setOpacity] = useState<boolean>(false)
  const dispatch = useDispatch<AppDispatch>();
  const selector: TypedUseSelectorHook<RootState> = useSelector;
  const res = selector((state) => state.currencyData.alertMsg);
  const alertMoveUp = selector((state) => state.currencyData.alertMoveUp);

  useEffect(() => {
    if(res){
      
      setTimeout(() => {
        setOpacity(true)
      }, 500);

      setTimeout(() => {
        dispatch(msg(""))
        setOpacity(false)
      }, 1000);
    }
 
    
  }, [res]);

  return (
    <div
      className={`transition flex justify-between gap-3 items-center px-2 left-[45%]   ${res ? "top-[7%]" : "top-[120%]"} duration-300 absolute h-[40px] font-bold $ ${bg} rounded-md`}
    >
      <span className="">{res}</span>
      <IoCloseSharp
        className="cursor-pointer"
        onClick={() => dispatch(loginandSignInalert("-translate-y-[1000px]"))}
        size={25}
      />
    </div>
  );
};
