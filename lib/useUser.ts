import { magicClient } from "../lib/magic";
import { useEffect } from "react";
import { useState } from 'react'
type UserHandler = {
  user?: any;
  login: any;
  logout: any;
  loading: boolean;
};

export default function useUser(): UserHandler {
  const [user, setUser] = useState<any>('');
  const [loading, setLoading] = useState(true);

  async function login(email: string) {
    const loginDid = await magicClient?.auth.loginWithMagicLink({email: email})
    if(!loginDid){
      console.error("failed to login !loginMeta")
      return;
    }

    const userMeta = await magicClient?.user.getMetadata();
    if(!userMeta){
      console.error("failed to login !userMeta")
      return;
    }

    console.log({userMeta, loginDid})
    setUser(userMeta);
  }

  async function logout() {
    await magicClient?.user.logout();
    setUser(null);
  }

  useEffect(() => {

    if(!user){
      console.log("magic user is loggedIn", magicClient?.user.isLoggedIn());
      (async () => {
        const isLoggedIn = await magicClient?.user.isLoggedIn();
        if(isLoggedIn){
          try{
            const userMeta = await magicClient?.user.getMetadata();
            console.log(userMeta);
            setUser(userMeta);
          }catch(err){
            console.error("failed to check magic user", err);
          }
        }
        setLoading(false);
      })();
    } else if(loading){
      setLoading(false);
    }
  }, [user]);

  return { user, login, logout, loading };
}
