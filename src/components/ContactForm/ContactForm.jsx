import { Formik, Form, Field, ErrorMessage } from "formik";
import { addContact } from "../../redux/contacts/operations";
import { useDispatch, useSelector } from "react-redux";
import css from "./ContactForm.module.css";
import * as Yup from "yup";
import { unwrapResult } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { selectContacts } from "../../redux/contacts/selectors";

const ContactSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too Short!")
    .max(20, "Too Long!")
    .required("Name is required!"),
  number: Yup.string()
    .matches(/^[0-9+\-\s]+$/, "Invalid number format")
    .required("Number is required!"),
});

const initialValues = {
  name: "",
  number: "",
};

function ContactForm() {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  const handleSubmit = async (values, actions) => {
    try {
      const isDuplicate = contacts.some(
        (contact) => contact.number === values.number
      );
      if (isDuplicate) {
        toast.error(`${values.number} is already in contacts.`);
        return;
      }
      const resultAction = await dispatch(addContact(values));
      unwrapResult(resultAction);
      toast.success("Contact added successfully!");
      actions.resetForm();
    } catch {
      toast.error("Failed to add contact!");
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={ContactSchema}
    >
      <Form className={css.form}>
        <div className={css.wrapper}>
          <label className={css.label}>
            Name
            <Field className={css.input} type="text" name="name" />
          </label>
          <ErrorMessage className={css.error} name="name" component="span" />
        </div>
        <div className={css.wrapper}>
          <label className={css.label}>
            Number
            <Field className={css.input} type="text" name="number" />
          </label>
          <ErrorMessage className={css.error} name="number" component="span" />
        </div>

        <button className={css.button} type="submit">
          Add contact
        </button>
      </Form>
    </Formik>
  );
}

export default ContactForm;
