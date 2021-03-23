import React from "react";

function AuthForm({ btnText, onSubmit }) {
  const [state, setState] = React.useState({
    email: "",
    password: "",
    username: "",
    name: "",
    lastName: "",
  });

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

        <section id='signupForm' className="top-less-space">
          <form id="form-login" onSubmit={handleSubmit}>
            <div
              id="loginDiv"
              class="flex-row-inputs paint-div-input bottom-space"
            >
              <input
                id="inputsLogin"
                placeholder="NAME"
                type="text"
                name="name"
                value={state.name}
                onChange={handleChange}
              />
              <input
                id="inputsLogin"
                type="text"
                name="lastName"
                placeholder="LASTNAME"
                value={state.lastName}
                onChange={handleChange}
              />
            </div>
            ;
            <div
              id="loginDiv"
              className="flex-row-inputs paint-div-input bottom-space"
            >
              <input
                id="inputsLogin"
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
                id="inputsLogin"
                placeholder="USERNAME"
                type="text"
                name="username"
                value={state.username}
                onChange={handleChange}
              />
            </div>
            <div
              id="loginDiv"
              className="flex-row-inputs paint-div-input bottom-space"
            >
              <input
                id="inputsLogin"
                placeholder="PASSWORD"
                type="password"
                name="password"
                value={state.password}
                onChange={handleChange}
              />
            </div>
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
    // <form onSubmit={handleSubmit}>
    //   <label>
    //     email
    //     <input
    //       type="email"
    //       name="email"
    //       value={state.email}
    //       onChange={handleChange}
    //     />
    //   </label>
    //   <label>
    //     username
    //     <input
    //       type="text"
    //       name="username"
    //       value={state.username}
    //       onChange={handleChange}
    //     />
    //   </label>
    //   <label>
    //     password
    //     <input
    //       type="password"
    //       name="password"
    //       value={state.password}
    //       onChange={handleChange}
    //     />
    //   </label>
    //   <label>
    //     name
    //     <input
    //       type="text"
    //       name="name"
    //       value={state.name}
    //       onChange={handleChange}
    //     />
    //   </label>
    //   <label>
    //     lastName
    //     <input
    //       type="text"
    //       name="lastName"
    //       value={state.lastName}
    //       onChange={handleChange}
    //     />
    //   </label>
    //   <button>{btnText}</button>
    // </form>
  );
}

export default AuthForm;
