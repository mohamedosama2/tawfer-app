import Nav from "../../components/Nav";
import styles from "./Home.module.scss";
import Price from "../../imgs/price.png";
import { motion } from "framer-motion";
interface IProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
function Home({ isOpen, setIsOpen }: IProps) {
  return (
    <>
      <div className={styles.Home} onClick={() => setIsOpen(false)}>
        <main className={styles.Home__main}>
          <motion.img
            animate={{ y: [0, -20] }}
            transition={{
              repeat: Infinity,
              duration: 0.9,
              repeatType: "reverse",
            }}
            src={
              "https://raw.githubusercontent.com/ElzeroWebSchool/HTML_And_CSS_Template_Three/main/imgs/megamenu.png"
            }
            alt="price"
          />
          <div>
            <motion.h1
              animate={{ opacity: [0, 1], y: [-50, 0] }}
              transition={{ duration: 1 }}
            >
              يلا نوفرلهاا
            </motion.h1>
            <motion.p animate={{ y: [100, 0] }} transition={{ duration: 1 }}>
              "محاربة الغلاء".. تعرف على أماكن بيع السلع الغذائية بأسعار مخفضة
              في بورسعيد · تموين بورسعيد وجميع الاماكن في انحاء مصر
            </motion.p>
            <motion.button
              animate={{ y: [100, 0], opacity: [0, 1] }}
              transition={{ duration: 1, delay: 1 }}
              className="bg-primary text-white font-bold text-xl my-5 px-2 py-4 rounded-2xl  w-80 m-auto  block text-2xl "
            >
              يلا بينا
            </motion.button>
          </div>
        </main>
      </div>
    </>
  );
}

export default Home;
