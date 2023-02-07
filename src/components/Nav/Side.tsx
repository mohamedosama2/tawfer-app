import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

interface IProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function Side({ isOpen, setIsOpen }: IProps) {
  return (
    <motion.nav
      className={`w-1/2 text-right font-bold text-xl bg-white absolute left-0 top-0 min-h-full z-50 flex flex-col content-center items-center py-20 ${
        isOpen ? "block" : "hidden"
      } `}
    >
      <h3 className="">
        {" "}
        <NavLink to={"/signup"}>تسجيل الخروج</NavLink>
      </h3>
      <h3 className="mt-6 ">
        {" "}
        <NavLink to={"/"}>الصفحة الرئيسية</NavLink>{" "}
      </h3>
      <h3 className="my-6">
        <NavLink to={"/favourits"}>الاهتمامات</NavLink>
      </h3>
      <h3 className="  ">
        <NavLink to={"/food"}>المنتجات</NavLink>
      </h3>
    </motion.nav>
  );
}

export default Side;
