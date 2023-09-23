import React from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import { TiDelete } from "react-icons/ti";

type Props = {
  deleteCoin: (event: React.MouseEvent<HTMLButtonElement>) => void;
  coinId: string;
  selectedCoin : string
};

export const DeleteCoinButton = ({ deleteCoin, coinId,selectedCoin }: Props) => {
  return (
    <Tippy theme="light" content="Delete coin">
      <button
        id={coinId}
        onClick={(event) => deleteCoin(event)}
        className="cursor-pointer p-0 mt-1"
      >
        <TiDelete className={`${selectedCoin === coinId ? "text-darkBlue" : "text-offWhite"}`} size={20} />
      </button>
    </Tippy>
  );
};
