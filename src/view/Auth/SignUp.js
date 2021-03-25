import React from "react";
import AuthFormSignUp from "../../components/Auth/AuthForm/AuthFormSignUp";
import { signup } from "../../service/auth.service";
import { useAuth } from "../../context/AuthContext.utils";

function Signup({toggle}) {
  const { setUser } = useAuth();
  const [error, setError] = React.useState({})
  const handleSignup = async (user) => {
    try {
      const { data } = await signup(user);
      console.log(data);
      if(data.user){
        setUser({isLogged: true, user: data.id})
        localStorage.setItem('isLogged', 'true')
        localStorage.setItem('user', data.id)
        toggle();
      }
    } catch (e) {
      console.error(e);
      setError(e.response.data)
    }
  };
  React.useEffect(()=>{
    toggle()
  },[])

  return <AuthFormSignUp error={error} btnText="signup" onSubmit={handleSignup} />;
}

export default Signup;
