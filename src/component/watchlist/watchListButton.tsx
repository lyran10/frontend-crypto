import { useEffect, useState } from "react";

type Props = {
  handleNav?: () => void;
  show: boolean;
};

export const Button = ({ handleNav, show }: Props) => {
  const [button, setButton] = useState<boolean>(false);

  useEffect(() => {
    setButton(show);
  }, [show]);

  return (
    <div className="">
      <div
        onClick={handleNav}
        className="cursor-pointer duration-500 rounded-full flex justify-center items-center flex-col h-[40px] w-[40px]"
      >
        <div
          className={`w-8 h-[1px] bg-[#f5f5f5] ${
            !button ? "-translate-y-2" : "-rotate-[33deg] -translate-y-2"
          } duration-200`}
        ></div>
        <div
          className={`h-[1px] bg-[#f5f5f5] ${
            !button ? "w-8" : "rotate-[90deg] translate-x-[14px] w-[36px]"
          } duration-200`}
        ></div>
        <div
          className={`w-8 h-[1px] bg-[#f5f5f5] ${
            !button ? "translate-y-2" : "rotate-[33deg] translate-y-2"
          } duration-200`}
        ></div>
      </div>
    </div>
  );
};
