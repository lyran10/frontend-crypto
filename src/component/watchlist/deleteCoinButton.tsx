import React from "react";
import { TiDelete } from "react-icons/ti";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";

type Props = {
  removeCoin: (event: React.MouseEvent<HTMLButtonElement>) => void;
  coinId: string;
  selectedCoin: string;
};

export const DeleteCoinButton = ({
  removeCoin,
  coinId,
  selectedCoin,
}: Props) => {
  return (
    <Tippy theme="light" content="Delete coin">
      <button
        id={coinId}
        onClick={(event) => removeCoin(event)}
        className="cursor-pointer p-0 mt-1"
      >
        <TiDelete
          className={`${
            selectedCoin === coinId ? "text-darkBlue" : "text-[#06b6d4]"
          }`}
          size={20}
        />
      </button>
    </Tippy>
  );
};
