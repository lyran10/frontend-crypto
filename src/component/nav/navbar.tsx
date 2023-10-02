import React, { useState, useEffect } from "react";
import { LoginAndSignInTabs } from "../auth/loginAndSignInTabs";
import { HamburgerButton } from "./hamburgerButton";
import { SideNav } from "./sideNav";
import { SignInButton } from "../auth/signInButton";
import { Logout } from "../auth/logout";
import { useSelector, TypedUseSelectorHook } from "react-redux/es/exports";
import { RootState } from "../redux/store";
import { translateEffects, opacityEffects } from "../redux/reducer";
import { useDispatch } from "react-redux/es/exports";
import { AppDispatch } from "../redux/store";
import { Link } from "react-router-dom";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import axios from "axios";

export const NavBar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const selector: TypedUseSelectorHook<RootState> = useSelector;
  const userDetails = selector((state) => state.currencyData.userDetails);
  const translate = selector((state) => state.currencyData.translate);
  const Opacity = selector((state) => state.currencyData.opacity);
  const userLogin = selector((state) => state.currencyData.login);
  const logoutMsg = selector((state) => state.currencyData.logoutMsg);
  const { showModal, showOverlay } = translate;
  const { overlayOpacity, modalOpacity } = Opacity;
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [navBg, setnavBg] = useState<boolean>(false);
  const [arrow, setArrow] = useState<string>("rotate-[0deg]");
  const [showSideNav, setShowSideNav] = useState<string>("opacity-0");
  const [translateSideNav, setTranslateSideNav] = useState<string>(
    "translate-x-[1800px]"
  );

  useEffect(() => {}, [translate, Opacity, userDetails, userLogin, logoutMsg]);

  const changeColor = () => {
    if (window.scrollY > 650) {
      setnavBg(true);
    } else {
      setnavBg(false);
    }
  };

  window.addEventListener("scroll", changeColor);

  const ModalIn = () => {
    let translateObj = {
      ...translate,
      showModal: "translate-y-[300px]",
      overlay: "translate-x-[0px]",
    };
    dispatch(translateEffects(translateObj));
    setTimeout(() => {
      let opacityObj = {
        ...Opacity,
        modalOpacity: "opacity-1",
        overlayOpacity: "opacity-50",
      };
      dispatch(opacityEffects(opacityObj));
    }, 300);
  };

  const ModalOut = () => {
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
  };

  // const convertFile = async (file: any) => {};

  // const handleClick = (e: any) => {
  //   e.preventDefault();
  // };

  // const handleFileUpload = async (e: any) => {
  //   const file = e.target.files[0];
  //   console.log(file)
  //   const config = {
  //     headers: {
  //       'Accept': 'image/jpeg, image/jpg, image/png',
  //     },
  //   };
  //   const {data} = await axios.post("http://localhost:4000/uploads",{image : file},config)
  //   console.log(data)
  // };

  return (
    <nav
      className={`flex fixed flex-col w-[100%] transition duration-500 items-center bottom-[100%] justify-center rounded-lg z-[1000]`}
    >
      <div
        className={`flex justify-between items-center p-2 bg-[rgba(0,0,0,.18)] rounded-lg relative top-[100px] w-[80%]`}
      >
        <Link to={"/"}>
          <img src="https://img.icons8.com/fluency/48/000000/cryptocurrency.png" />
        </Link>
        <ul className="flex">
          {userDetails._id !== "" && userLogin === true ? (
            <li className="flex me-[20px] justify-center items-center gap-2">
              {/* <Tippy content="Upload Photo">
                <form method="POST" action="http://localhost:4000/uploads">
                  <label htmlFor="uploadFile">
                    <img
                      className="inline-block h-12 w-12 rounded-full cursor-pointer ring-2 ring-white"
                      src="https://www.arlis.umd.edu/sites/default/files/default_images/avatardefault_92824.png"
                      alt="image"
                    />
                  </label>
                  <input
                className="hidden"
                onChange={(e) => handleFileUpload(e)}
                type="file"
                name="image"
                id="uploadFile"
                accept=".jpeg, .jpg, .png"
              />
              <span
                className={` ${navBg ? "text-[#191825]" : "text-offWhite"}`}
              >
                {userDetails.email}
              </span>
              <input type="submit"/>
                </form>
              </Tippy> */}
             <span
                className={` ${navBg ? "text-[#191825]" : "text-offWhite"}`}
              >
                {userDetails.email}
              </span>
            </li>
           ) : null}
          <li>
            {userLogin ? (
              <Logout
                navBg={navBg}
                show="flex"
                trueColor="text-[#191825]"
                falseColor="text-offWhite"
              />
            ) : (
              <SignInButton
                ModalIn={ModalIn}
                navBg={navBg}
                // show="hidden"
                trueColor="text-[#191825]"
                falseColor="text-offWhite"
              />
            )}
          </li>
          {/* <li>
            <HamburgerButton
              translateSideNav={translateSideNav}
              setTranslateSideNav={setTranslateSideNav}
              setShowSideNav={setShowSideNav}
              showSideNav={showSideNav}
            />
          </li> */}
        </ul>
        {/* <SideNav
          ModalIn={ModalIn}
          navBg={navBg}
          showSideNav={showSideNav}
          translateSideNav={translateSideNav}
        /> */}
         <LoginAndSignInTabs
          showModal={showModal}
          modalOpacity={modalOpacity}
          modalOut={ModalOut}
        /> 
      </div>

      <div
        onClick={() => ModalOut()}
        className={`bg-darkBlue h-screen w-[100vw] transition duration-300 top-[100%] bottom-0 left-0 right-0  absolute ${overlayOpacity} ${showOverlay}`}
      ></div>
      <div
        className={`bg-lightBlue duration-300 absolute px-2 font-bold rounded-md ${logoutMsg}`}
      >
        Logged out Successfully
      </div>
    </nav>
  );
};
