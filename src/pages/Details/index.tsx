import styles from "./Details.module.scss";
import oil from "../../imgs/oil.jpg";
import Nav from "../../components/Nav";
import People from "../../components/People";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { useGetFoodQuery } from "../../store/services/food";
import {
  useAddToFavouritsMutation,
  useGetCategoryQuery,
  useRemoveFromFavouritsMutation,
} from "../../store/services/categories";
import { RingLoader } from "react-spinners";
import { Spinner, useDisclosure } from "@chakra-ui/react";
import CreateFoodModal from "../../components/CreateFoodModal";
interface IProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function Details({ isOpen, setIsOpen }: IProps) {
  let { id } = useParams();
  const { data } = useGetFoodQuery({
    token: localStorage.getItem("token"),
    category: id?.toString(),
  });
  const {
    data: categoryData,
    isLoading,
    isFetching,
  } = useGetCategoryQuery({
    token: localStorage.getItem("token") as string,
    id: id?.toString() as string,
  });
  const [addToFavourite] = useAddToFavouritsMutation();
  const [removeFromFavourite] = useRemoveFromFavouritsMutation();
  const { isOpen: isOpenModal, onOpen, onClose } = useDisclosure();
  return (
    <>
      <main className={styles.Details} onClick={() => setIsOpen(false)}>
        <section className=" ">
          <img src={categoryData?.photo} alt="oil" className={styles.product} />
          <div>
            <h2>{categoryData?.name}</h2>
            <p>{categoryData?.describtion}</p>
            <motion.button
              onClick={() => {
                if (categoryData?.isFav) {
                  removeFromFavourite({
                    token: localStorage.getItem("token") as string,
                    id: id?.toString() as string,
                  });
                } else {
                  addToFavourite({
                    token: localStorage.getItem("token") as string,
                    id: id?.toString() as string,
                  });
                }
              }}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-800  text-white px-20  py-3 rounded-2xl my-2 block m-auto hover:bg-primary cursor-pointer text-3xl"
            >
              {isLoading || isFetching ? (
                <Spinner color="red.500" />
              ) : categoryData?.isFav ? (
                "ازالة من قائمة الاهتمامات"
              ) : (
                "اضافة الي قائمة الاهتمامات"
              )}
            </motion.button>
          </div>
        </section>
        <div>
          <h1 className="mt-10 mb-5 text-6xl ">افضل سعر</h1>
          {data?.docs[0] ? <People {...data?.docs[0]} /> : <></>}
        </div>
        <div>
          <h1 className="mt-10 mb-5 text-6xl">افضل الاماكن</h1>
          <div className="flex items-start flex-wrap justify-center max-w-full">
            {data?.docs.map((food) => {
              return <People {...food} />;
            })}
          </div>
          <motion.button
            onClick={onOpen}
            whileHover={{ scale: 1.05 }}
            className="bg-gray-800  text-white px-20  py-3 rounded-2xl my-2 block m-auto hover:bg-primary cursor-pointer text-3xl"
          >
            اضافة سعر ومكان
          </motion.button>
          <CreateFoodModal
            {...{ onClose, onOpen }}
            category={id as string}
            isOpen={isOpenModal}
          />
        </div>
      </main>
    </>
  );
}

export default Details;
