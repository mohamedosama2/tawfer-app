import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Category } from "../models/Category.model";

function FoodCat(category: Category) {
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{
        scale: 1.05,
      }}
      onClick={() => {
        navigate(`/details/${category._id}`);
      }}
      animate={{ opacity: [0, 1] }}
      transition={{ duration: 1 }}
      className="m-3 relative cursor-pointer"
    >
      <img
        src={category.photo}
        alt={category.name}
        className="w-44 h-44 rounded-3xl "
      />
      <span className="bg-red-500 text-white absolute top-0 right-0 z-10 p-1 rounded-tr-lg">
        {category.name}
      </span>
    </motion.div>
  );
}

export default FoodCat;
