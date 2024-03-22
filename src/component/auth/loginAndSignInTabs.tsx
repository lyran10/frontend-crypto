import { useState, useEffect } from "react";
import { useRedux } from "../../customHooks/useRedux";
import { EnhancedAuth } from "./authForm";
import { getStatus, getModal } from "../redux/reducer";

export const LoginAndSignInTabs = () => {
  const [methods] = useRedux()
  const modal = methods.selector((state) => state.data.modal)
  const [show, setShow] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    modal ? setShowModal(true) : setShowModal(false)
  }, [modal])

  const handleClick = (bool: boolean) => {
    setShow(bool)
    methods.dispatch(getStatus(bool))
  }

  const handleModal = () => {
    if (!isLoading) {
      methods.dispatch(getModal(false))
      methods.dispatch(getStatus(false))
    }
  }

  return (
    <section className={`${showModal ? "opacity-[1] transotion-transform delay-150 translate-y-0" : "opacity-0 delay-150 transotion-transform translate-y-[-1000px]"} fixed z-[1000] w-full h-screen transition duration-500 top-0 flex justify-center items-center`}>
      <div className="w-full h-full absolute" onClick={handleModal}></div>
      <div className={`relative shadow-custom rounded-md duration-500 w-[100%] md:w-[70%] lg:w-[40%] h-[500px] bg-[rgba(0,0,0,0.7)]`} >
        <ul className="relative flex">
          <li
            onClick={() => handleClick(false)}
            className="w-[50%] flex justify-center items-center"
          >
            <button
              className={`text-center p-2 w-[100%] rounded-l-md ${!show ? "bg-[#06b6d4] text-[#f5f5f5]" : "text-[#f5f5f5]"
                } cursor-pointer font-black hover:bg-alphaBlue text-[#f5f5f5] transition duration-500`}
            >
              LOGIN
            </button>
          </li>
          <li
            onClick={() => handleClick(true)}
            className="w-[50%] flex  justify-center items-center"
          >
            <button
              className={`text-center p-2 w-[100%] rounded-r-md ${show ? "bg-[#06b6d4] text-[#f5f5f5]" : "text-[#f5f5f5]"
                } cursor-pointer font-black hover:bg-alphaBlue transition duration-500`}
            >
              SIGNUP
            </button>
          </li>
        </ul>
        <EnhancedAuth id={false} show={show} isLoading={isLoading} setIsLoading={setIsLoading} />
        <EnhancedAuth id={true} show={show} isLoading={isLoading} setIsLoading={setIsLoading} />
      </div>
    </section>

  );
};
