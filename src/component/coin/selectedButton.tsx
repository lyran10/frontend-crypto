import React from "react";

type Props = {
  children: JSX.Element;
  selected: boolean;
  onClick: () => void;
};

export const SelectButton = ({ children, selected, onClick }: Props) => {
  return (
    <span
      style={{
        cursor: "pointer",
        borderRadius: "5px",
        border: "solid 1px gold",
        backgroundColor: selected ? "gold" : "",
        color: selected ? "black" : "",
        fontWeight: selected ? "700" : "500",
        padding: "10px",
      }}
      onClick={onClick}
    >
      {children}
    </span>
  );
};
