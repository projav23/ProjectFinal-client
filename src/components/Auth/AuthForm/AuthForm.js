import React from "react";
import "./AuthForm.css";
import imagenUser from "./email-icon.png";
import imagenPass from "./password-icon.png";
// import { Redirect } from "react-router-dom";

function AuthForm({ btnText, onSubmit }) {
  const [state, setState] = React.useState({ email: "", password: "" });

  const handleChange = ({ target }) => {
    setState({ ...state, [target.name]: target.value });
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
                style={{ width: "8%" }}
                alt="foto"
              />
              <input
                id="inputsLogin"
                type="email"
                name="email"
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
                style={{ width: "8%" }}
                alt="foto"
              />
              <input
                id="inputsLogin"
                type="password"
                name="password"
                value={state.password}
                placeholder="********"
                onChange={handleChange}
              />
            </div>
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
{
  /* <div className="container-login">
        <h2 className="login-text">Login</h2>
        <form id="form-login" onSubmit={handleSubmit}>
          <input
            id="inputsLogin"
            type="email"
            name="email"
            value={state.email}
            placeholder="info@roomies.com"
            onChange={handleChange}
          />
          <input
            id="inputsLogin"
            type="password"
            name="password"
            value={state.password}
            placeholder="********"
            onChange={handleChange}
          />
          <button className="btn-login">{btnText}</button>
        </form>
      </div> */
}
