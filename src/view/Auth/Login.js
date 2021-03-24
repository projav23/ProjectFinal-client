import React from "react";
import AuthForm from "../../components/Auth/AuthForm/AuthForm";
import { login } from "../../service/auth.service";
import { useAuth } from "../../context/AuthContext.utils";


function Login({ toggle }) {
  const { setUser } = useAuth();
  const [error, setError] = React.useState({})

  const handleLoginUser = async (user) => {
    try {
      const { data } = await login(user);
      console.log(data);
      if (data.user) {
        setUser({ isLogged: true, user: data.id });
        localStorage.setItem("isLogged", "true");
        localStorage.setItem("user", data.id);
        toggle();
      }
    } catch (e) {
      console.error(e);
      setError(e.response.data)
      console.log('error', e.response.data)
    }
  };
  React.useEffect(() => {
    toggle();
  }, []);

  return (

      <AuthForm error={error} btnText="login" onSubmit={handleLoginUser} />

  )
}

export default Login;
