import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { updateContact } from "../../redux/contacts/operations";
import * as Yup from "yup";
import toast from "react-hot-toast";
import css from "./EditContact.module.css";

const ContactSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too Short!")
    .max(20, "Too Long!")
    .required("Required"),
  number: Yup.string()
    .min(2, "Too Short!")
    .max(20, "Too Long!")
    .required("Required"),
});

function EditContact({ contact, onClose }) {
  const dispatch = useDispatch();

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await dispatch(updateContact({ id: contact.id, updatedContact: values }));
      toast.success("Contact updated successfully!");
      resetForm();
      onClose();
    } catch {
      toast.error("Failed to update contact!");
    }
  };

  const handleCancel = (resetForm) => {
    resetForm();
    onClose();
  };

  return (
    <Formik
      initialValues={{ name: contact.name, number: contact.number }}
      validationSchema={ContactSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ isSubmitting, resetForm }) => (
        <Form className={css.form}>
          <div className={css.wrapper}>
            <label className={css.label}>
              Name
              <Field className={css.input} type="text" name="name" />
            </label>
            <ErrorMessage
              className={css.message}
              name="name"
              component="span"
            />
          </div>

          <div className={css.wrapper}>
            <label className={css.label}>
              Number
              <Field className={css.input} type="text" name="number" />
            </label>
            <ErrorMessage
              className={css.message}
              name="number"
              component="span"
            />
          </div>

          <div className={css.buttonsWrapper}>
            <button
              className={css.button}
              type="submit"
              disabled={isSubmitting}
            >
              Save Changes
            </button>
            <button
              className={css.button}
              type="button"
              onClick={() => handleCancel(resetForm)}
            >
              Cancel
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default EditContact;
