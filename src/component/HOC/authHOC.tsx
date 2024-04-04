import React from 'react'
import { Auth } from '../common/interface'

export const AuthHOC = (OriginalComponent: React.ComponentType<Auth>) => {

  const newComponent = (props: Auth) => {
    let { id } = props
    let obj = {} as { head: string, text: string }
    if (!id) {
      obj = {
        head: "LOGIN",
        text: "Access your crypto holdings and embrace financial freedom with our login."
      }
    } else {
      obj = {
        head: "SIGN UP",
        text: "Join the crypto revolution and start your journey towards decentralized financial empowerment."
      }
    }
    return <OriginalComponent {...props} {...obj} />
  }

  return newComponent
}
