import React from "react";
import { useRedux } from "../../customHooks/useRedux";
import { inputChange } from "../redux/reducer";

export const Input = () => {
  const [methods] = useRedux()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => methods.dispatch(inputChange(event.target.value));

  return (
    <input
      onChange={handleChange}
      className="p-3 mt-[20px] mb-[10px] w-[50%] bg-darkBlue text-white outline-none rounded-md"
      type="text"
      placeholder="Search Coin"
    />
  );
};
