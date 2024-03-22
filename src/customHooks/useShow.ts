import {useState,useEffect} from 'react'

export const useShow = () => {
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => { setShow(true) },[])

  return [show]
}
