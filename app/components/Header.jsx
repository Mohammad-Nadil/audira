import React from "react";
import Container from "./layers/Container";

const Header = () => {
  return (
    <header className="">
      <nav className="fixed top-0 left-1/2 -translate-x-1/2 w-full z-50">
        <Container className={` flex justify-between py-2 md:py-6`}>
          <img
            src="/images/logo.png"
            alt=""
            className="logo aspect-150/57 w-25 h-10 sm:h-auto  sm:w-auto "
          />
          <button className=" bg-secondary  sm:py-2.5 px-2 sm:px-5 rounded-[10px] font-Dm flex  justify-center items-center font-medium text-white sm:text-lg ">
            <a href=""> Buy Now</a>
          </button>
        </Container>
      </nav>
    </header>
  );
};

export default Header;
