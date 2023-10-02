import React, { useState } from "react";
import { User } from "../utils/interface";
import axios from "axios";
import { useDispatch } from "react-redux/es/exports";
import { AppDispatch } from "../redux/store";
import {
  userLogin,
  translateEffects,
  opacityEffects,
  details,
  msg,
} from "../redux/reducer";
import { useSelector, TypedUseSelectorHook } from "react-redux/es/exports";
import { RootState } from "../redux/store";
import {FaUserCircle} from "react-icons/fa"
import {RiLockPasswordLine} from "react-icons/ri"

type Props = {
  show : boolean
}

export const Login = ({show} : Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const selector: TypedUseSelectorHook<RootState> = useSelector;
  const translate = selector((state) => state.currencyData.translate);
  const Opacity = selector((state) => state.currencyData.opacity);
   const [scale, setScale] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error,setError] = useState<{email :boolean,password : boolean}>({email :false,password : false})
  const [user, setUser] = useState<User>({
    email: "",
    password: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true);

    const {email,password} = user
    if(!email){
      // dispatch(msg("Email reqiured"))
      setError({email : true,password : false})
      setIsLoading(false);
      return
    }

    if(!password){
      // dispatch(msg("Password reqiured"))
      setError({email : false,password : true})
      setIsLoading(false);
      return
    }

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/login`,
        user,
        { withCredentials: true }
      );
      dispatch(msg(data.msg));
      localStorage.setItem("id", data.user._id);
      localStorage.setItem("token", data.user.token);
      // dispatch(loginandSignInalert("-translate-y-[230px]"));
      dispatch(userLogin(data.status));
      // setTimeout(() => {
      //   dispatch(loginandSignInalert("-translate-y-[1000px]"));
      // }, 3000);
      dispatch(
        details({
          _id: data.user._id,
          email: data.user.email,
          token: data.user.token,
        })
      );
      setIsLoading(false);
      if (data.msg === "Logged in successfully") {
        setTimeout(() => {
          let opacityObj = {
            ...Opacity,
            modalOpacity: "opacity-0",
            overlayOpacity: "opacity-0",
          };
          dispatch(opacityEffects(opacityObj));

          setTimeout(() => {
            let translateObj = {
              ...translate,
              overlay: "translate-x-[1700px]",
              showModal: "-translate-y-[800px]",
            };
            dispatch(translateEffects(translateObj));
          }, 400);
        }, 1500);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <div className={`flex justify-center items-start px-5 absolute flex-col gap-6 duration-500 ${!show ? "w-full opacity-1 visible" :"w-0 opacity-0 invisible"}`}>
      <span className={`mt-10 font-black text-[40px] text-[#f5f5f5] text-start relative before:absolute before:content-'' before:w-[30%] before:h-[1px] before:bg-[#06b6d4] before:top-[100%]`}>LOGIN</span>
      <form
        id="formLogin"
        onSubmit={handleSubmit}
        className="w-[100%] flex flex-col justify-center items-center gap-5"
        action=""
      >
        <div className="flex justify-center items-center w-full mb-5 relative">
        <FaUserCircle className="text-[#06b6d4] text-[2.5rem] border-b border-[#f5f5f5] mt-[1px] p-1"/>
        <input
          onChange={handleChange}
          className="outline-none border-b p-2 bg-[rgba(0,0,0,0)] text-[#f5f5f5] font-semibold w-[100%]"
          type="email"
          placeholder="Email"
          name="email"
        />
        <span className={`${error.email ? "translate-y-0 opacity-[1]" : "translate-y-5 opacity-0"} duration-500 text-[14px] font-bold text-[#D2042D] absolute top-[110%] left-0`}>Email reqiured</span>
        </div>

        <div className="flex justify-center items-center w-full mb-3 relative">
        <RiLockPasswordLine className="text-[#06b6d4] text-[2.5rem] border-b border-[#f5f5f5] mt-[1px] p-1"/>
        <input
          onChange={handleChange}
          className="outline-none p-2 border-b bg-[rgba(0,0,0,0)] text-[#f5f5f5]  font-semibold w-[100%]"
          type="password"
          placeholder="Password"
          name="password"
        />
          <span className={`${error.password ? "translate-y-0 opacity-[1]" : "translate-y-5 opacity-0"} duration-500 text-[14px] font-bold text-[#D2042D] absolute top-[110%] left-0`}>Password reqiured</span>
        </div>

        <button onMouseDown={() => setScale(true)} onMouseUp={() => setScale(false)} type="submit"
        className={`mt-5 flex justify-center items-center p-2 w-[100%] px-5 bg-[#06b6d4] text-[#f5f5f5] rounded-md font-bold transition duration-500 ${scale ? "scale-[0.9]" : "scale-100"}`}
        >
          <span className={`flex justify-center items-center`}>
            {isLoading ?
          <div className="loader w-7 h-7 flex justify-center items-center relative before:content-'' before:absolute before:w-7 before:h-7 before:rounded-full before:bg-[#06b6d4] before:border-[5px] before:border-t-darkBlue before:animate-spin"></div>
              : "Login"}
          </span>
        </button>
      </form>
      <span className={`text-[#f5f5f5] text-center font-bold ${!show ? "opacity-[1] transition-opacity delay-500 duration-500" :"opacity-0"}`}>Access your crypto holdings and embrace financial freedom with our login.</span>
    </div>
  );
};
