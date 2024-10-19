import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/auth/operations";
import { selectUser } from "../../redux/auth/selectors";
import css from "./UserMenu.module.css";

export const UserMenu = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  return (
    <div className={css.wrapper}>
      <p className={css.username}>{user.name.toUpperCase()}</p>
      <button
        className={css.button}
        type="button"
        onClick={() => dispatch(logout())}
      >
        Logout
      </button>
    </div>
  );
};
