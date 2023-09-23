// import React,{useState} from 'react'
// import { Context } from 'vm'

// type Props = {
//   handleNav? : () => void,
//   arrow : {arrow1 : string, arrow2 : string,arrow3 : string}
// }

// export const Button = ({handleNav,arrow} : Props) => {
 

//   const [move,setMove] = useState<string>("translate-y-[50vh] translate-x-[80vh] text-[100px]")

//   return (
//     <div className=''>
//          <div onClick={handleNav} className='cursor-pointer duration-500 rounded-full flex justify-center items-center flex-col h-[40px] w-[40px]'>
//         <div className={`w-8 h-[1px] bg-[#f5f5f5] ${arrow.arrow1} duration-200 ${move === "translate-y-0 translate-x-0" ? "bg-cyan-200" : ""} `}></div>
//         <div className={`h-[1px] bg-[#f5f5f5] ${move === "translate-y-0 translate-x-0" ? "bg-cyan-200" : ""} duration-200 ${arrow.arrow2}`}></div>
//         <div className={`w-8 h-[1px] bg-[#f5f5f5] ${arrow.arrow3} duration-200 ${move === "translate-y-0 translate-x-0" ? "bg-cyan-200" : ""}`}></div>
//       </div>
//     </div>
//   )
// }