import React, { useState } from "react";
import { Signup } from "./signup";
import { Login } from "./login";

type Props = {
  showModal: string;
  modalOpacity: string;
  modalOut: () => void;
};

export const LoginAndSignInTabs = ({
  showModal,
  modalOpacity,
  modalOut,
}: Props) => {
  const [show, setShow] = useState<boolean>(false);
  // bg-crypto bg-cover bg-center bg-fixed
  return (
    <section
      className={`m-auto shadow-custom rounded-md z-[1000] absolute top-0 bottom-0 left-0 right-0 transition duration-500 w-[100%] md:w-[70%] lg:w-[40%] h-[500px] bg-[rgba(0,0,0,0.7)]`}
    >
      <ul className="relative flex">
        <li
          onClick={() => setShow(false)}
          className="w-[50%] flex justify-center items-center"
        >
          <button
            className={`text-center p-2 w-[100%] rounded-l-md ${
              !show ? "bg-[#06b6d4] text-[#f5f5f5]" : "text-[#f5f5f5]"
            } cursor-pointer font-black hover:bg-alphaBlue text-[#f5f5f5] transition duration-500`}
          >
            LOGIN
          </button>
        </li>
        <li
          onClick={() => setShow(true)}
          className="w-[50%] flex  justify-center items-center"
        >
          <button
            className={`text-center p-2 w-[100%] rounded-r-md ${
              show ? "bg-[#06b6d4] text-[#f5f5f5]" : "text-[#f5f5f5]"
            } cursor-pointer font-black hover:bg-alphaBlue transition duration-500`}
          >
            SIGNUP
          </button>
        </li>
        {/* <li>
          <IoCloseSharp
            className="absolute right-0 hover:bg-offWhite hover:text-[#0B2447] transition duration-500 text-[#f5f5f5] rounded-md top-0 cursor-pointer"
            onClick={modalOut}
            size={25}
          />
        </li> */}
      </ul>
       <Login show={show}/>
       <Signup show={show}/>
    </section>
  );
};
