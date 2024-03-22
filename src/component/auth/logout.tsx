import { useRedux } from "../../customHooks/useRedux";
import { FiLogOut } from "react-icons/fi";
import { logout } from "../redux/actions";

type Props = {
  navBg: boolean;
  trueColor: string;
  falseColor: string;
  show: string;
};

export const Logout = ({ navBg, trueColor, falseColor, show }: Props) => {
  const [methods] = useRedux()
  const login = methods.selector((state) => state.data.login);

  return (
    <button
      onClick={() => methods.dispatch(logout())}
      className={`${show} md:flex lg:flex h-[100%] font-bold justify-center cursor-pointer items-center gap-1 md:gap-2 lg:gap-2 p-2 px-5 transition duration-500 hover:bg-alphaBlue ${navBg ? trueColor : falseColor
        }`}
    >
      {!login ? <span>Logout</span> : null}
      <FiLogOut size={20} />
    </button>
  );
};
