import { useRedux } from "../../customHooks/useRedux";
import { SignInButton } from "../auth/signInButton";
import { Logout } from "../auth/logout";
import { WatchList } from "../watchlist/watchList";
import { useStorage } from "../../customHooks/UseStorage";

type Show = {
  showSideNav: string;
  translateSideNav: string;
  ModalIn: () => void;
  navBg: boolean;
};

export const SideNav = ({
  translateSideNav,
  showSideNav,
  navBg,
}: Show) => {
  const [methods] = useRedux()
  const [storage] = useStorage()
  const { id, email } = storage.getValues()
  const userLogin = methods.selector((state) => state.data.login);

  return (
    <div
      className={`h-[80vh] flex flex-col p-3 gap-10 z-[999] rounded-md w-full bg-white absolute right-0 left-0 top-20 bottom-0 ${showSideNav} ${translateSideNav} transition duration-500`}
    >
      {id ?
        <>
          <span className="flex gap-2 items-center text-darkBlue">
            <img
              className="inline-block h-12 w-12 rounded-full cursor-pointer ring-2 ring-white"
              src="https://www.arlis.umd.edu/sites/default/files/default_images/avatardefault_92824.png"
              alt="image"
            />
            <span className="text-darkBlue">{email}</span>

          </span>
        </>
        : null}
      <div className="flex flex-col gap-2">
        <h4 className="text-center font-bold">Change Currency</h4>
      </div>
      {userLogin ? (
        <WatchList
        />
      ) : null}

      {userLogin ? (
        <Logout
          navBg={true}
          show="flex"
          trueColor="text-[#191825]"
          falseColor="text-[#191825]"
        />
      ) : (
        <SignInButton
          navBg={navBg}
        />
      )}
    </div>
  );
};
