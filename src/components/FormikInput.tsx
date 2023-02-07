import { Field } from "formik";
interface IProps {
  placeholder: string;
  className: string;
  name: string;
  type: string;
}
function FormikInput({ placeholder, className, type, name }: IProps) {
  return (
    <>
      <Field component {...{ name }}>
        {({ field, form, meta }: any) => (
          <>
            <input {...{ placeholder, className, type }} {...field} />
            {meta.touched && meta.error && (
              <div className="text-red-500 ">{meta.error}</div>
            )}
          </>
        )}
      </Field>
    </>
  );
}

export default FormikInput;
