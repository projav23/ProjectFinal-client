import React, { useState } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

function AuthForm({ btnText, onSubmit, error }) {
  const [state, setState] = React.useState({
    email: "",
    password: "",
    username: "",
    name: "",
    lastName: "",
  });

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
        <h1 style={{ color: "white", fontSize: "3.2em" }}>ROOMIES</h1>

        <section id="signupForm" className="top-less-space">
          <form id="form-login" onSubmit={handleSubmit}>
            <div
              id="loginDiv"
              className="flex-row-inputs paint-div-input bottom-space"
            >
              <input
                className="inputsLogin"
                placeholder="NAME"
                type="text"
                name="name"
                value={state.name}
                onChange={handleChange}
              />
              <input
                className="inputsLogin"
                type="text"
                name="lastName"
                placeholder="LASTNAME"
                value={state.lastName}
                onChange={handleChange}
              />
            </div>

            <div
              id="loginDiv"
              className="flex-row-inputs paint-div-input bottom-space"
            >
              <input
                className="inputsLogin"
                placeholder="EMAIL"
                type="email"
                name="email"
                value={state.email}
                onChange={handleChange}
              />
            </div>
            <div
              id="loginDiv"
              className="flex-row-inputs paint-div-input bottom-space"
            >
              <input
                className="inputsLogin"
                placeholder="USERNAME"
                type="text"
                name="username"
                value={state.username}
                onChange={handleChange}
                required
              />
            </div>
            <div
              id="loginDiv"
              className="flex-row-inputs paint-div-input bottom-space"
            >
              <input
                className="inputsLogin"
                placeholder="PASSWORD"
                type={inputType}
                name="password"
                value={state.password}
                onChange={handleChange}
                required
              />
              {icon ? (
                <AiOutlineEyeInvisible
                  size={32}
                  color={"white"}
                  onClick={handleIcon}
                />
              ) : (
                <AiOutlineEye size={32} color={"white"} onClick={handleIcon} />
              )}
            </div>
            <p className="error-login">{error.message}</p>
            <button className="btn-login">{btnText}</button>
          </form>
        </section>

        <p className="blanco-difuminado top-less-space noStyle">
          ¿Ya tienes cuenta?
          <a id="Registrate" className="noStyle" href="/login">
            {" "}
            Inicia sesion aqui
          </a>
        </p>
      </section>
    </>
  );
}

export default AuthForm;
