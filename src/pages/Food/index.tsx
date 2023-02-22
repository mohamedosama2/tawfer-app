import FoodCat from "../../components/FoodCat";
import Nav from "../../components/Nav";
import styles from "./Food.module.scss";
import { motion } from "framer-motion";
import { useGetCategoriesQuery } from "../../store/services/categories";
interface IProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function Food({ setIsOpen }: IProps) {
  const { data } = useGetCategoriesQuery({
    token: localStorage.getItem("token"),
  });
  return (
    <>
      <div className={styles.Food} onClick={() => setIsOpen(false)}>
        <motion.h1 animate={{ opacity: [0, 1] }}>المنتجات الغذائية</motion.h1>
        <div className={styles.Food__cat}>
          {data?.docs.map((category, index) => {
            return <FoodCat {...category} key={index.toString()} />;
          })}

          {/*     <FoodCat />
          <FoodCat />
          <FoodCat />
          <FoodCat />
          <FoodCat />
          <FoodCat />
          <FoodCat />
          <FoodCat />
          <FoodCat /> */}
        </div>
      </div>
    </>
  );
}

export default Food;
