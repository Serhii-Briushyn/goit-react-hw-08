import ContactForm from "../../components/ContactForm/ContactForm";
import SearchBox from "../../components/SearchBox/SearchBox";
import ContactList from "../../components/ContactList/ContactList";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContacts } from "../../redux/contacts/operations";
import {
  selectCurrentContact,
  selectError,
  selectIsLoading,
} from "../../redux/contacts/selectors";
import EditContact from "../../components/EditContact/EditContact";
import { clearCurrentContact } from "../../redux/contacts/slice";
import css from "./ContactsPage.module.css";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import Loader from "../../components/Loader/Loader";

export default function ContactPage() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const currentContact = useSelector(selectCurrentContact);

  useEffect(() => {
    dispatch(fetchContacts());

    if (error) {
      toast.error(error);
    }
  }, [dispatch, error]);

  const handleCloseEditForm = () => {
    dispatch(clearCurrentContact());
  };

  return (
    <motion.div
      className={css.wrapper}
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 1 }}
    >
      <div className={css.formWrapper}>
        {!currentContact ? (
          <ContactForm />
        ) : (
          <EditContact contact={currentContact} onClose={handleCloseEditForm} />
        )}
        <SearchBox />
      </div>

      {isLoading && !error && (
        <div className="loader">
          <Loader />
        </div>
      )}

      {!isLoading && !error && (
        <div className={css.contactsWrapper}>
          <ContactList />
        </div>
      )}
    </motion.div>
  );
}
