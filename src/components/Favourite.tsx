import { motion } from "framer-motion";
import styles from './Favourite.module.scss'
function Favourite() {
  return (
    <motion.div whileHover={{scale:1.05}}  className={styles.Fav}>
      <img
        src="https://yasour.org/2018/uploads/news/700x440/21/04/%D8%A7%D9%84%D8%AE%D9%8A%D8%A7%D8%B1.jpg"
        alt="طماطم"
        className="w-16 h-16 rounded-3xl"
      />
      <div className="text-2xl font-bold text-primary">طماطم</div>
      <div className="text-2xl font-bold text-primary">100</div>
      <motion.span
        className="text-lg hover:text-red-600 block cursor-pointer"
        whileHover={{ scale: 1.5 }}
      >
        x
      </motion.span>
    </motion.div>
  );
}

export default Favourite;
