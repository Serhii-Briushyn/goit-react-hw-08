import { useDispatch, useSelector } from "react-redux";
import { selectNameFilter } from "../../redux/filters/selectors";
import { changeFilter } from "../../redux/filters/slice";
import css from "./SearchBox.module.css";

function SearchBox() {
  const dispatch = useDispatch();
  const filter = useSelector(selectNameFilter);

  const handleFilterChange = (e) => {
    dispatch(changeFilter(e.target.value));
  };

  return (
    <div className={css.wrapper}>
      <label className={css.label} htmlFor="contact-filter">
        Find contacts
      </label>
      <input
        className={css.input}
        type="text"
        id="contact-filter"
        value={filter}
        onChange={handleFilterChange}
      />
    </div>
  );
}

export default SearchBox;
