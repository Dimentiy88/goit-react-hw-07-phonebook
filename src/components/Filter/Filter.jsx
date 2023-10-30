import css from './Filter.module.css';
import { onFilterChange } from 'redux/contactsSlice';
import { useDispatch, useSelector } from 'react-redux';

export const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(state => state.filter);

  const handleChange = event => {
    dispatch(onFilterChange(event.target.value));
  };

  return (
    <div>
      <label className={css.filterLabel}>Find contacts by Name </label>
      <input
        onChange={handleChange}
        className={css.filterName}
        type="text"
        name="filter"
        placeholder="Enter filter"
        value={filter}
      />
    </div>
  );
};
