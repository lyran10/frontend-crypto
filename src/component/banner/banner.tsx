import { ErrorMessages } from "../../constants/constants";
import ErrorBoundry from "../errorBoundaries/coinDataError";
import { Carousel } from "./carousel";

export const Banner = () => {
  return (
    <div
      className={`w-[100%] h-[100vh] bg-banner flex flex-col justify-center items-center bg-center bg-cover bg-fixed transition duration-500`}
    >
      <span className="font-black text-center text-[#f5f5f5] tracking-wide text-[40px] md:text-[50px] lg:text-[75px]">
        Crypto Currency
      </span>
      <span className="text-[#f5f5f5] text-center tracking-wide text-[15px] md:text-[20px] lg:text-[20px]">
        Get all info regarding you favourite crypto currency
      </span>
      <Carousel />
    </div>
  );
};
