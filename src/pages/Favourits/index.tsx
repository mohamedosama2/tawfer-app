import Favourite from "../../components/Favourite";
import Nav from "../../components/Nav";
import styles from "./Favourits.module.scss";
interface IProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function Favourits({ setIsOpen }: IProps) {
  return (
    <>
      <div className={styles.Favourits} onClick={() => setIsOpen(false)}>
        <h1 className=" text-6xl font-bold text-primary underline text-center py-10">
          التفضيلات
        </h1>
        <section >
          <Favourite />
          <Favourite />
          <Favourite />
          <Favourite />
          <Favourite />
          <Favourite />
          <Favourite />
          <Favourite />
        </section>
      </div>
    </>
  );
}

export default Favourits;
