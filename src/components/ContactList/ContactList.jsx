import { useDispatch, useSelector } from "react-redux";
import {
  selectSortBy,
  selectSortedContacts,
} from "../../redux/contacts/selectors";
import css from "./ContactList.module.css";
import Contact from "../Contact/Contact";
import { useEffect, useState } from "react";
import { setSortBy } from "../../redux/contacts/slice";
import { FiGrid } from "react-icons/fi";
import { FaListUl } from "react-icons/fa6";
import { TypeAnimation } from "react-type-animation";
import { selectNameFilter } from "../../redux/filters/selectors";

function ContactList() {
  const dispatch = useDispatch();
  const [openContactId, setOpenContactId] = useState(null);
  const sortBy = useSelector(selectSortBy);
  const contacts = useSelector(selectSortedContacts);
  const filter = useSelector(selectNameFilter);
  const [viewMode, setViewMode] = useState("grid");
  const [textColor, setTextColor] = useState("#00FFFF");

  useEffect(() => {
    const savedViewMode = localStorage.getItem("viewMode");
    if (savedViewMode) {
      setViewMode(savedViewMode);
    }
  }, []);

  const toggleMenu = (contactId) => {
    setOpenContactId((prevId) => (prevId === contactId ? null : contactId));
  };

  const handleSortChange = (e) => {
    dispatch(setSortBy(e.target.value));
  };

  const handleViewChange = () => {
    const newViewMode = viewMode === "grid" ? "list" : "grid";
    setViewMode(newViewMode);
    localStorage.setItem("viewMode", newViewMode);
  };

  return (
    <>
      <div className={css.viewStyles}>
        <button className={css.button} onClick={handleViewChange}>
          {viewMode === "grid" ? <FaListUl /> : <FiGrid />}
        </button>
      </div>

      <select value={sortBy} className={css.select} onChange={handleSortChange}>
        <option value="name">By Name</option>
        <option value="date">By Date</option>
      </select>

      {contacts.length === 0 ? (
        filter ? (
          <p className={css.noFound}>No contacts found 😔</p>
        ) : (
          <div
            className={css.noContacts}
            style={{
              color: textColor,
            }}
          >
            <TypeAnimation
              sequence={[
                "Add",
                800,
                () => setTextColor("#ffa500"),
                "Add your",
                800,
                () => setTextColor("#0000ff"),
                "Add your first",
                800,
                () => setTextColor("#ff00ff"),
                "Add your first contact",
                1000,
                () => setTextColor("#7fff00"),
                "",
              ]}
              repeat={Infinity}
            />
          </div>
        )
      ) : (
        <ul className={viewMode === "grid" ? css.grid : css.list}>
          {contacts.map((contact, index) => (
            <Contact
              key={contact.id}
              contact={contact}
              index={index}
              isOpen={openContactId === contact.id}
              toggleMenu={() => toggleMenu(contact.id)}
            />
          ))}
        </ul>
      )}
    </>
  );
}

export default ContactList;
