import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Constants } from "../utils/constants";
import FormikInput from "./FormikInput";
import { useState } from "react";
import styles from "./WelcomeForm.module.scss";
import {
  LoginResponse,
  useLogInMutation,
  useSignUpMutation,
} from "../store/services/auth";
import RingLoader from "react-spinners/RingLoader";
import { useToast } from "@chakra-ui/react";
const btn = styles.btn;

const style = styles.input;

const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("مطلوب"),
  country: Yup.string().required("مطلوب"),
  email: Yup.string().email("Invalid email").required("مطلوب"),
  phone: Yup.string().matches(Constants.PHONE_REGX).required("مطلوب"),
  password: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("مطلوب"),
});
const LoginSchema = Yup.object().shape({
  phone: Yup.string().matches(Constants.PHONE_REGX).required("مطلوب"),
  password: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("مطلوب"),
});
interface IProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function WelcomeForm({ setIsOpen }: IProps) {
  const [isSignUp, setIsSignUp] = useState<boolean>(true);
  const toast = useToast();

  const [signUp, { isLoading: isLoadingSignUp }] = useSignUpMutation();
  const [login, { isLoading: isLoadingLogin }] = useLogInMutation();

  let FormSignUp = isLoadingSignUp ? (
    <div className=" mt-20 relative w-28 m-auto">
      {" "}
      <RingLoader size={150} color="#301E67" style={{ margin: "auto" }} />
    </div>
  ) : (
    <Formik
      initialValues={{
        username: "",
        country: "",
        email: "",
        phone: "",
        password: "",
      }}
      validationSchema={SignupSchema}
      onSubmit={async (values, { resetForm }: { resetForm: () => void }) => {
        // same shape as initial values
        console.log(values);

        await signUp(values);
        toast({
          title: `تم انشاء مستخدم جديد`,
          position: "top",
          isClosable: true,
          status: "success",
        });
        setIsSignUp(false);
        resetForm();
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <div className="py-10 flex flex-col content-around items-center">
            <FormikInput
              name="username"
              type="text"
              className={style}
              placeholder="الاسم"
            />
            <FormikInput
              name="email"
              type="email"
              className={style}
              placeholder="الايميل"
            />
            <FormikInput
              name="phone"
              type="string"
              className={style}
              placeholder="المحمول"
            />
            <FormikInput
              name="country"
              type="string"
              className={style}
              placeholder="البلد"
            />
            <FormikInput
              name="password"
              type="password"
              className={style}
              placeholder="كلمة المرور"
            />
            <span
              className="text-primary underline cursor-pointer"
              onClick={() => setIsSignUp(false)}
            >
              تسجيل الدخول
            </span>

            <button className={btn}>تسجيل الدخول</button>
          </div>
        </Form>
      )}
    </Formik>
  );
  let FormLogin = isLoadingLogin ? (
    <div className=" mt-20 relative w-28 m-auto">
      {" "}
      <RingLoader size={150} color="#301E67" style={{ margin: "auto" }} />
    </div>
  ) : (
    <Formik
      initialValues={{
        phone: "",
        password: "",
      }}
      validationSchema={LoginSchema}
      onSubmit={async (values, { resetForm }: { resetForm: () => void }) => {
        // same shape as initial values
        console.log(values);
        const user: { data: LoginResponse } | any = await login({
          password: values.password,
          phone: values.phone,
        });
        window.location.href = "/";

        console.log(user);
        for (const key in user?.data?.user) {
          localStorage.setItem(key, user?.data?.user[key]);
        }
        localStorage.setItem("token", user?.data?.token);

        toast({
          title: "تم التسجيل بنجاح",
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
              name="phone"
              type="string"
              className={style}
              placeholder="المحمول"
            />

            <FormikInput
              name="password"
              type="password"
              className={style}
              placeholder="كلمة المرور"
            />
            <span
              className="text-primary underline cursor-pointer"
              onClick={() => setIsSignUp(true)}
            >
              مستخدم جديد؟
            </span>

            <button className={btn}>تسجيل الدخول</button>
          </div>
        </Form>
      )}
    </Formik>
  );

  return (
    <>
      <div
        style={{
          minHeight: "100vh",
        }}
        className="bg-secondary"
        onClick={() => setIsOpen(false)}
      >
        <div className="text-center m-auto  py-10 ">
          <h2 className="text-white bg-gray-800 w-1/4 m-auto  py-3 text-4xl font-extrabold font-body italic -skew-x-12 ">
            يلا توفيير
          </h2>
          {isSignUp ? FormSignUp : FormLogin}
        </div>
      </div>
    </>
  );
}
