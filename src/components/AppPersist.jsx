import { useEffect, useContext } from 'react';
import AppContext from '../utils/context';

const AppPersist = ({ storageKey, children }) => {
  const [state] = useContext(AppContext);

  const saveStateToLocalStorage = () => {
    localStorage.setItem(storageKey, JSON.stringify(state));
  };

  useEffect(
    () => {
      saveStateToLocalStorage();
    },
    [state],
  );
  return children;
};

export default AppPersist;
