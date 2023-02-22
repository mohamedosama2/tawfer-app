import { motion } from "framer-motion";
import { Category } from "../models/Category.model";
import styles from "./Favourite.module.scss";

function Favourite(favourite: Category) {
  return (
    <motion.div whileHover={{ scale: 1.05 }} className={styles.Fav}>
      <img
        src={favourite.photo}
        alt={favourite.name}
        className="w-16 h-16 rounded-3xl"
      />
      <div className="text-2xl font-bold text-primary">{favourite.name}</div>
      {/*       <div className="text-2xl font-bold text-primary">{favourite.}</div> */}
     {/*  <motion.span
        className="text-lg hover:text-red-600 block cursor-pointer"
        whileHover={{ scale: 1.5 }}
      >
        x
      </motion.span> */}
    </motion.div>
  );
}

export default Favourite;
