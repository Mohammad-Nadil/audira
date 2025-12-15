import React from "react";

const Container = ({ children, className }) => {
  return (
    <div  className={`w-full max-w-360 mx-auto relative px-3 2xl:px-0 ${className}`}>{children}</div>
  );
};

export default Container;
