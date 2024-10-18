import { FaRegTrashCan, FaRegUser } from "react-icons/fa6";
import { deleteContact } from "../../redux/contacts/operations";
import { useDispatch } from "react-redux";
import css from "./Contact.module.css";
import Modal from "../Modal/Modal";
import { useState } from "react";
import toast from "react-hot-toast";
import { setCurrentContact } from "../../redux/contacts/slice";
import { FaEdit } from "react-icons/fa";
import { GoKebabHorizontal } from "react-icons/go";
import { FiPhone } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";
import { slideInFromLeft, slideInFromRight } from "../../motion/motion";

function Contact({ contact, index, isOpen, toggleMenu }) {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const handleDelete = () => {
    setShowModal(true);
  };

  const confirmDelete = async () => {
    try {
      await dispatch(deleteContact(contact.id));
      toast.success("Contact deleted successfully!");
      setShowModal(false);
      toggleMenu();
    } catch {
      toast.error("Failed to delete contact!");
    }
  };

  const cancelDelete = () => {
    setShowModal(false);
  };

  const handleEdit = () => {
    dispatch(setCurrentContact(contact));
    toggleMenu();
  };

  return (
    <AnimatePresence mode="wait">
      <motion.li
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={
          index % 2 === 0
            ? slideInFromLeft(index * 0.1)
            : slideInFromRight(index * 0.1)
        }
        className={css.item}
      >
        <div className={css.wrapper}>
          <p className={css.text}>
            <FaRegUser />
            {contact.name}
          </p>
          <p className={css.text}>
            <FiPhone />
            {contact.number}
          </p>
        </div>

        <button
          className={`${css.button} ${isOpen ? css.buttonActive : ""} `}
          onClick={toggleMenu}
        >
          <GoKebabHorizontal />
        </button>

        <div className={`${css.menu} ${isOpen ? css.open : ""}`}>
          <button className={css.menuButton} onClick={handleEdit}>
            <FaEdit /> Edit
          </button>
          <button className={css.menuButton} onClick={handleDelete}>
            <FaRegTrashCan /> Delete
          </button>
        </div>

        {showModal && (
          <Modal
            contact={contact}
            onConfirm={confirmDelete}
            onCancel={cancelDelete}
          />
        )}
      </motion.li>
    </AnimatePresence>
  );
}

export default Contact;
