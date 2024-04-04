import { useState, useEffect } from "react";
import { UseForm } from "../../customHooks/UseForm";
import { useRedux } from "../../customHooks/useRedux";
import { FaUserCircle } from "react-icons/fa"
import { RiLockPasswordLine } from "react-icons/ri"
import { login, signIn } from "../redux/actions";
import { AuthHOC } from "../HOC/authHOC";
import { Auth } from "../common/interface";

export const AuthForm = ({ id, show, isLoading, setIsLoading, head, text }: Auth) => {
  const [methods] = useRedux()
  const [user, error, changeEvents, authenticate] = UseForm()
  const status = methods.selector((state) => state.data.login)
  const msg = methods.selector((state) => state.data.alertMsg)
  const [scale, setScale] = useState<boolean>(false);

  useEffect(() => { setIsLoading(false) }, [status, msg])

  const handleSubmit = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault()
    setIsLoading(true)
    if (!authenticate(user.email, user.password)) return setIsLoading(false)
    methods.dispatch(!id ? login({ email: user.email, password: user.password }) : signIn({ email: user.email, password: user.password }))
  }

  return (
    <div className={`flex justify-center items-start px-5 absolute flex-col gap-6 duration-500 ${show && id ? "w-full opacity-1 visible" : !show && !id ? "w-full opacity-1 visible" : "w-0 opacity-0 invisible"}`}>
      <span className={`mt-10 font-black text-[40px] text-[#f5f5f5] text-start relative before:absolute before:content-'' before:w-[30%] before:h-[1px] before:bg-[#06b6d4] before:top-[100%]`}>{head}</span>
      <form
        id="formLogin"
        onSubmit={(e) => handleSubmit(e)}
        className="w-[100%] flex flex-col justify-center items-center gap-5"
        action=""
      >
        <div className="flex justify-center items-center w-full mb-5 relative">
          <FaUserCircle className="text-[#06b6d4] text-[2.5rem] border-b border-[#f5f5f5] mt-[1px] p-1" />
          <input
            {...changeEvents}
            className="outline-none border-b p-2 bg-[rgba(0,0,0,0)] text-[#f5f5f5] font-semibold w-[100%]"
            type="email"
            placeholder="Email"
            name="email"
          />
          <span className={`${error && !user.email ? "translate-y-0 opacity-[1]" : "translate-y-5 opacity-0"} duration-500 text-[14px] font-bold text-[#D2042D] absolute top-[110%] left-0`}>Email reqiured</span>
        </div>

        <div className="flex justify-center items-center w-full mb-3 relative">
          <RiLockPasswordLine className="text-[#06b6d4] text-[2.5rem] border-b border-[#f5f5f5] mt-[3px] p-1" />
          <input
            {...changeEvents}
            className="outline-none p-2 border-b bg-[rgba(0,0,0,0)] text-[#f5f5f5]  font-semibold w-[100%]"
            type="password"
            placeholder="Password"
            name="password"
          />
          <span className={`${error && !user.password ? "translate-y-0 opacity-[1]" : "translate-y-5 opacity-0"} duration-500 text-[14px] font-bold text-[#D2042D] absolute top-[110%] left-0`}>Password reqiured</span>
        </div>

        <button onMouseDown={() => setScale(true)} onMouseUp={() => setScale(false)} type="submit"
          className={`mt-5 flex justify-center items-center p-2 w-[100%] px-5 bg-[#06b6d4] text-[#f5f5f5] rounded-md font-bold transition ${scale ? "scale-x-95" : "scale-x-100"}`}
        >
          <span className={`flex justify-center items-center`}>
            {isLoading ?
              <div className="loader w-7 h-7 flex justify-center items-center relative before:content-'' before:absolute before:w-7 before:h-7 before:rounded-full before:bg-[#06b6d4] before:border-[5px] before:border-t-darkBlue before:animate-spin"></div>
              : `${head}`}
          </span>
        </button>
      </form>
      <span className={`text-[#f5f5f5] text-center font-bold ${show && id ? "opacity-[1] transition-opacity delay-500 duration-500" : !show && !id ? "opacity-[1] transition-opacity delay-500 duration-500" : "opacity-0"}`}>{text}</span>
    </div>
  );
};

export const EnhancedAuth = AuthHOC(AuthForm)
