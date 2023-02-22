import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import FormikInput from "../FormikInput";
import { Constants } from "../../utils/constants";
import styles from "../WelcomeForm.module.scss";
import { useAddFoodMutation } from "../../store/services/food";
const btn = styles.btnFood;
const style = styles.inputFood;
interface IProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  category: string;
}
const FoodSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("مطلوب"),
  price: Yup.number().required("مطلوب"),
  address: Yup.string().required("مطلوب"),
  describtion: Yup.string(),
});

function CreateFoodModal({ isOpen, onOpen, onClose, category }: IProps) {
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [addFood, { isLoading }] = useAddFoodMutation();
  const toast = useToast();
  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        size="6xl"
        colorScheme={"cyan"}
      >
        <ModalOverlay />
        <ModalContent style={{ backgroundColor: "#ececec" }}>
          <ModalHeader>اضافة طعام بسعر مناسب</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {isLoading ? (
              <Spinner />
            ) : (
              <Formik
                initialValues={{
                  name: "",
                  price: 0,
                  address: "",
                  describtion: "",
                }}
                validationSchema={FoodSchema}
                onSubmit={async (
                  values,
                  { resetForm }: { resetForm: () => void }
                ) => {
                  // same shape as initial values
                  console.log(values);
                  await addFood({
                    ...values,
                    category,
                    token: localStorage.getItem("token") as string,
                    customer: localStorage.getItem("id") as string,
                  });

                  /*     await signUp(values); */
                  toast({
                    title: `تم انشاء اكلة بعنوان وسعر جديد`,
                    position: "top",
                    isClosable: true,
                    status: "success",
                  });

                  resetForm();
                }}
              >
                {({ errors, touched }) => (
                  <Form>
                    <div className="py-10 flex flex-col content-around items-center">
                      <FormikInput
                        name="name"
                        type="text"
                        className={style}
                        placeholder="الاسم"
                      />
                      <FormikInput
                        name="price"
                        type="number"
                        className={style}
                        placeholder="السعر"
                      />
                      <FormikInput
                        name="address"
                        type="text"
                        className={style}
                        placeholder="العنوان"
                      />
                      <FormikInput
                        name="describtion"
                        type="text"
                        className={style}
                        placeholder="الاسم"
                      />

                      <button className={btn}> اضافة طعام</button>
                    </div>
                  </Form>
                )}
              </Formik>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default CreateFoodModal;
