import {useState} from 'react'
import { User } from '../component/common/interface';

export const UseForm = () => {
  const [user, setUser] = useState<User>({ email: "", password: ""});
  const [error,setError] = useState<boolean>(false)
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => setUser({ ...user, [event.target.name]: event.target.value });

  const authenticate = (email : string, password : string) => {
    if(!email || !password){
      setError(true)
      return false
    }
      return true
  }

  const changeEvents = {
    onChange : handleChange
  }

  return [user, error, changeEvents , authenticate] as const
}
