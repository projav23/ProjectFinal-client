import React, {useState} from "react";
import "./AuthForm.css";
import imagenUser from "./email-icon.png";
import imagenPass from "./password-icon.png";
import {AiOutlineEyeInvisible, AiOutlineEye} from 'react-icons/ai'


function AuthForm({ btnText, onSubmit, error}) {
  const [state, setState] = React.useState({ email: "", password: "" });

  const handleChange = ({ target }) => {
    setState({ ...state, [target.name]: target.value });
  };
  const [icon, setIcon] = useState(false);
  const [inputType, setType] = useState("password");
  const handleIcon = () => {
    if (!icon) {
      setIcon(true);
      setType("text");
    } else {
      setIcon(false);
      setType("password");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(state);
  };

  return (
    <>
      <section id="login"></section>
      <section id="loginForm">
        <h1 style={{color:'white', fontSize:'3.2em'}}>ROOMIES</h1>

        <section className="top-less-space">
          <form id="form-login" onSubmit={handleSubmit}>
            <div
              id="loginDiv"
              className="flex-row-inputs paint-div-input bottom-space"
            >
              <img
                id="imgLogin"
                src={imagenUser}
                style={{ width: "7%" }}
                alt="foto"
              />
              <input
                className="inputsLogin"
                type="email"
                name="email"
                required
                value={state.email}
                placeholder="info@roomies.com"
                onChange={handleChange}
              />
            </div>
            <div
              id="loginDiv"
              className="flex-row-inputs paint-div-input bottom-space"
            >
              <img
                id="imgLogin"
                src={imagenPass}
                style={{ width: "6%" }}
                alt="foto"
              />
              <input
                className="inputsLogin"
                type={inputType}
                name="password"
                value={state.password}
                placeholder="********"
                required
                onChange={handleChange}
              />
              {icon ? <AiOutlineEyeInvisible size={32} color={'white'} onClick={handleIcon}/> : <AiOutlineEye size={32} color={'white'} onClick={handleIcon}/>}
            </div>
            <p className='error-login'>{error.message}</p>
            <button className="btn-login">{btnText}</button>
          </form>
        </section>

        <p className="blanco-difuminado top-less-space noStyle">
          ¿No tienes cuenta?
          <a id="Registrate" className="noStyle" href="/signup">
            {" "}
            Registrate aquí
          </a>
        </p>
      </section>
    </>
  );
}

export default AuthForm;

