
import React from "react";

const Message = ({ type, text }) => {
  if (!text) return null; //if text is null return null
  //check the type of message
  const className = type === "error" ? "alert alert-danger" : "alert alert-success";

  return (
    <div className={`${className} mt-3`} role="alert">
      {text}
    </div>
  );
};

export default Message;
