import ContactForm from "../../components/ContactForm/ContactForm";
import SearchBox from "../../components/SearchBox/SearchBox";
import ContactList from "../../components/ContactList/ContactList";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContacts } from "../../redux/contacts/operations";
import { selectError, selectIsLoading } from "../../redux/contacts/selectors";
import css from "./ContactsPage.module.css";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import Loader from "../../components/Loader/Loader";

export default function ContactPage() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());

    if (error) {
      toast.error(error);
    }
  }, [dispatch, error]);

  return (
    <motion.div
      className={css.wrapper}
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 1 }}
    >
      <div className={css.formWrapper}>
        <ContactForm />
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
