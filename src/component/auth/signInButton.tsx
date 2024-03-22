import { useRedux } from "../../customHooks/useRedux";
import { FiLogIn } from "react-icons/fi";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { getModal } from "../redux/reducer";

type Props = {
  navBg: boolean;
  trueColor: string;
  falseColor: string;
};

export const SignInButton = ({
  navBg,
  trueColor,
  falseColor,
}: Props) => {
  const [methods] = useRedux()
  return (
    <Tippy content="Login and Signup Tabs" placement="bottom">
      <div
        onClick={() => methods.dispatch(getModal(true))}
        className={`flex font-bold justify-center cursor-pointer rounded-md bg-[#06b6d4] items-center gap-2 p-2 px-5 transition duration-500 hover:bg-alphaBlue ${navBg ? trueColor : falseColor
          }`}
      >
        <span>Sign in</span>
        <FiLogIn size={20} />
      </div>
    </Tippy>
  );
};
