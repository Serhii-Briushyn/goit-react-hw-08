import ReactDOM from "react-dom";
import css from "./Modal.module.css";
import { motion, AnimatePresence } from "framer-motion";

function Modal({ contact, onConfirm, onCancel }) {
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };

  return ReactDOM.createPortal(
    <AnimatePresence mode="wait">
      <motion.div
        className={css.overlay}
        onClick={handleBackdropClick}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className={css.modal}
          initial={{ scale: 0, opacity: 0, rotate: 180 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ duration: 0.3 }}
        >
          <p className={css.text}>
            Are you sure you want to delete <span>{contact.name}</span>?
          </p>
          <div className={css.buttons}>
            <button className={css.confirmButton} onClick={onConfirm}>
              Yes
            </button>
            <button className={css.cancelButton} onClick={onCancel}>
              No
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.getElementById("modal-root")
  );
}

export default Modal;
