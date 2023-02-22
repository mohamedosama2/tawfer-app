import Nav from "../../components/Nav";
import styles from "./Home.module.scss";
import Price from "../../imgs/price.png";
import { motion } from "framer-motion";
import About from "../../components/About";
interface IProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
function Home({ isOpen, setIsOpen }: IProps) {
  console.log(process.env);
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
              يساعد التطبيق في توفير المال لأنه يتتبع ارتفاع الأسعار ويساعد
              الأشخاص على اختيار منتجات أقل سعرًا ويرسل إشعارًا إلى الأشخاص إذا
              تم تسجيل عنصر بسعر أرخص.
            </motion.p>
            <motion.button
              onClick={() => (window.location.href = "/favourits")}
              animate={{ y: [100, 0], opacity: [0, 1] }}
              transition={{ duration: 1, delay: 1 }}
              className="bg-white text-primary font-bold  my-5 px-2 py-4 rounded-2xl  w-80 m-auto  block text-2xl "
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
