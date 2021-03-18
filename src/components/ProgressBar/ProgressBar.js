import React from "react";

const ProgressBar = ({ completed, bgColor, diasRestantes }) => {
  const containerStyles = {
    width: "80px",
    height: "10px",
    backgroundColor: "#343c44",
    borderRadius: 50,
  };

  const fillerStyles = {
    height: "100%",
    width: `${completed}%`,
    backgroundColor: bgColor,
    transition: "width 1s ease-in-out",
    borderRadius: "inherit",
    textAlign: "right",
    border: "2px solid #343c44 ",
  };

  const labelStyles = {
    width: "100%",
    color: "black",
    fontWeight: "normal",
    fontSize: "0.4em",
  };

  const [message, setMessage] = React.useState("");
  const showMessage = () => {
    if (diasRestantes < 0) {
      setMessage(`Deberia haber finalizado hace ${-diasRestantes} dia(s)`);
    } else {
      setMessage(`Te queda(n) ${-diasRestantes} dia(s)`);
    }
  };

  React.useEffect(()=>{
    showMessage()
  },[])

  return (
    <div style={containerStyles}>
      <div style={fillerStyles}></div>
      <p style={labelStyles}>{message}</p>
    </div>
  );
};

export default ProgressBar;
