import ReactDOM from "react-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { updateContact } from "../../redux/contacts/operations";
import * as Yup from "yup";
import toast from "react-hot-toast";
import css from "./EditContact.module.css";
import { motion, AnimatePresence } from "framer-motion";

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

  return ReactDOM.createPortal(
    <AnimatePresence mode="wait">
      <motion.div
        className={css.overlay}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className={css.modal}
          initial={{ scale: 0, opacity: 0, rotate: 180 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          exit={{ scale: 0, opacity: 0, rotate: 180 }}
          transition={{ duration: 0.3 }}
        >
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
                    className={css.error}
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
                    className={css.error}
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
                    Save
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
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.getElementById("modal-root")
  );
}

export default EditContact;
