import React from "react";
import AuthFormSignUp from "../../components/Auth/AuthForm/AuthFormSignUp";
import { signup } from "../../service/auth.service";
import { useAuth } from "../../context/AuthContext.utils";

function Signup({toggle}) {
  const { setUser } = useAuth();
  const handleSignup = async (user) => {
    try {
      const { data } = await signup(user);
      console.log(data);
      if(data.user){
        setUser({isLogged: true, user: data.user})
        localStorage.setItem('isLogged', 'true')
        localStorage.setItem('user', data.user)
      }
    } catch (e) {
      console.error(e);
    }
  };
  React.useEffect(()=>{
    toggle()
  },[])

  return <AuthFormSignUp btnText="signup" onSubmit={handleSignup} />;
}

export default Signup;
