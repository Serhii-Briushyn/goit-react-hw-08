import { motion } from "framer-motion";
import DocumentTitle from "../../components/DocumentTitle";
import css from "./HomePage.module.css";
import { TypeAnimation } from "react-type-animation";

export default function HomePage() {
  return (
    <>
      <DocumentTitle>Home</DocumentTitle>
      <motion.div
        className={css.wrapper}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className={css.image}>
          <img
            src="/contact-book.png"
            alt="Contacts Book image"
            className={css.image}
          />
        </div>

        <motion.div
          className={css.content}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <h1 className={css.title}>
            Welcome to your <span>PhoneBook!</span>
          </h1>
          <p className={css.text}>
            <TypeAnimation
              sequence={[
                "Save your contacts",
                1500,
                "Edit your contacts",
                1500,
                "Manage your contacts",
                1500,
              ]}
              cursor={true}
              repeat={Infinity}
            />
          </p>
        </motion.div>
      </motion.div>
    </>
  );
}
