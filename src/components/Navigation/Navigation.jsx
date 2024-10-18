import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";
import clsx from "clsx";
import { useState } from "react";
import { RiMenu2Fill, RiCloseFill } from "react-icons/ri";

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const buildLinkClass = ({ isActive }) => {
    return clsx(css.link, isActive && css.activeLink);
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <nav className={css.wrapper}>
      <div className={css.menuDesktop}>
        <NavLink className={buildLinkClass} to="/">
          Home
        </NavLink>

        <NavLink className={buildLinkClass} to="/contacts">
          Contacts
        </NavLink>
      </div>

      <button className={css.button} onClick={toggleMenu}>
        <RiMenu2Fill />
      </button>

      <div className={clsx(css.menuModal, isMenuOpen && css.open)}>
        <button className={css.closeButton} onClick={toggleMenu}>
          <RiCloseFill />
        </button>
        <NavLink className={buildLinkClass} to="/" onClick={toggleMenu}>
          Home
        </NavLink>

        <NavLink className={buildLinkClass} to="/contacts" onClick={toggleMenu}>
          Contacts
        </NavLink>
      </div>
    </nav>
  );
};
