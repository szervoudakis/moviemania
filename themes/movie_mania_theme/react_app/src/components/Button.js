import React from "react";

const Button = ({ type = "button", label, onClick, variant = "primary" }) => {
  return (
    <button
      type={type}
      className={`btn btn-${variant} mt-3`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
