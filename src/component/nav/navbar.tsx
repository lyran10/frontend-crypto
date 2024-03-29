import { useState, useEffect } from "react";
import { useRedux } from "../../customHooks/useRedux";
import { useStorage } from "../../customHooks/UseStorage";
import { Link } from "react-router-dom";
import { SignInButton } from "../auth/signInButton";
import { Logout } from "../auth/logout";
import { getModal, removeCredentials } from "../redux/reducer";
import "tippy.js/dist/tippy.css";

export const NavBar = () => {
  const [methods] = useRedux()
  const [storage] = useStorage()
  const login = methods.selector((state) => state.data.login);
  const { id, email } = methods.selector((state) => state.data.credentials);
  const [navBg, setnavBg] = useState<boolean>(false);
// console.log(id)
// console.log(email)
  useEffect(() => {
    if (id && email) {
      storage.handleStorage({ id, email })
      methods.dispatch(removeCredentials({ id: "", email: "" }))
      methods.dispatch(getModal(false))
    }
  }, [id, email, login]);

  const changeColor = () => {
    if (window.scrollY > 650) {
      setnavBg(true);
    } else {
      setnavBg(false);
    }
  };
console.log(login)
  window.addEventListener("scroll", changeColor);

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
          {storage.getValues() && login ? (
            <li className="flex me-[20px] justify-center items-center gap-2">
              <span
                className={`font-bold ${navBg ? "text-[#191825]" : "text-offWhite"}`}
              >
                {storage.getValues().email}
              </span>
            </li>
          ) : null}
          <li>
            {login ? (
              <Logout
                navBg={navBg}
                show="flex"
                trueColor="text-[#191825]"
                falseColor="text-offWhite"
              />
            ) : (
              <SignInButton
                navBg={navBg}
                trueColor="text-[#190ab5]"
                falseColor="text-offWhite"
              />
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
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