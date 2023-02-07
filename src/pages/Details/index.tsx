import styles from "./Details.module.scss";
import oil from "../../imgs/oil.jpg";
import Nav from "../../components/Nav";
import People from "../../components/People";
import { motion } from "framer-motion";
interface IProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function Details({ isOpen, setIsOpen }: IProps) {
  return (
    <>
      <main className={styles.Details} onClick={() => setIsOpen(false)}>
        <section className="m-20 ">
          <img src={oil} alt="oil" className={styles.product} />
          <div>
            <h2>زيت</h2>
            <p>
              الزيت النباتي هو الزيت المستخرج من أصول طبيعية نباتية، مثل زيت
              السمسم وزيت الزيتون وزيت دوار الشمس وزيت الذرة وغيرها من الزيوت.
              وهو سائل أقل كثافة من الماء ولا يمتزج معه غالبا بدون إضافة مواد
              وسيطة أغلبها كيماوية، وهو إيضاً عبارة عن أسترات ثلاثية الأحماض
              الدهنية والغليسرول، وتسمى بالغليسيريدات الثلاثية، حيث تنتج من
              تفاعل بين الغليسيرول، وثلاث أنواع من أحماض دهنية متشابهة أو غير
              متشابهة.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="bg-gray-800  text-white px-20  py-3 rounded-2xl my-2 block m-auto hover:bg-primary cursor-pointer text-3xl"
            >
              اضافة الي قائمة الاهتمامات
            </motion.button>
          </div>
        </section>
        <div>
          <h1 className="mt-10 mb-5 text-6xl ">افضل سعر</h1>
          <People />
        </div>
        <div>
          <h1 className="mt-10 mb-5 text-6xl">افضل الاماكن</h1>
          <div className="flex items-start flex-wrap justify-center max-w-full">
            <People />
            <People />

            <People />
            <People />
            <People />
            <People />
            <People />
          </div>
        </div>
      </main>
    </>
  );
}

export default Details;
