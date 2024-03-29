export const useStorage = () => {

  const handleStorage = (user : {id : string, email : string}) => {
    if(!localStorage.getItem("user")) localStorage.setItem("user",JSON.stringify(user))
  }

  const removeStorage = () => localStorage.removeItem("user")
  

  const getValues = () => {
    let values = localStorage.getItem("user")
    if(values) return JSON.parse(values)
    return null
  }

  let storage = {
    handleStorage,
    removeStorage,
    getValues
  }

  return [storage]
}
