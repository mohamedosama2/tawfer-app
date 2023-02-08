import { useState } from "react";
import { NavLink, redirect } from "react-router-dom";
import { clearupFunc } from "../../utils/helperFuncs";
import styles from "./Nav.module.scss";
import Side from "./Side";
interface IProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function Nav({ isOpen, setIsOpen }: IProps) {
  return (
    <div className={styles.Nav}>
      <h1 className="">توفيييير</h1>
      <div className="">
        {localStorage.getItem("token") ? (
          <>
            <h3 className="">
              {" "}
              <NavLink
                to={"/signup"}
                onClick={() => {
                  clearupFunc();
                }}
              >
                تسجيل الخروج
              </NavLink>
            </h3>
            <h3 className="mx-6 ">
              {" "}
              <NavLink to={"/"}>الصفحة الرئيسية</NavLink>{" "}
            </h3>
            <h3 className="mr-6  ">
              <NavLink to={"/favourits"}>الاهتمامات</NavLink>
            </h3>
            <h3 className="  ">
              <NavLink to={"/food"}>المنتجات</NavLink>
            </h3>
          </>
        ) : (
          <>
            <h3 className="">
              {" "}
              <NavLink to={"/signup"}>تسجيل الدخول</NavLink>
            </h3>
            <h3 className="mx-6 ">
              {" "}
              <NavLink to={"/"}>الصفحة الرئيسية</NavLink>{" "}
            </h3>
          </>
        )}
      </div>
      <img
        onClick={() => setIsOpen((prev) => !prev)}
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/1024px-Hamburger_icon.svg.png"
      />
      <Side {...{ isOpen, setIsOpen }} />
    </div>
  );
}

export default Nav;
/*  */
