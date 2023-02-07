import { motion } from "framer-motion";

function FoodCat() {
  return (
    <motion.div
      whileHover={{
        scale: 1.05,
      }}
      animate={{ opacity: [0, 1] }}
      transition={{ duration: 1 }}
      className="m-3 relative cursor-pointer"
    >
      <img
        src="https://yasour.org/2018/uploads/news/700x440/21/04/%D8%A7%D9%84%D8%AE%D9%8A%D8%A7%D8%B1.jpg"
        alt="طماطم"
        className="w-44 h-44 rounded-3xl "
      />
      <span className="bg-red-500 text-white absolute top-0 right-0 z-10 p-1 rounded-tr-lg">
        خيار
      </span>
    </motion.div>
  );
}

export default FoodCat;
