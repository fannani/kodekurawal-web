import React, { useReducer } from 'react';
import Layout from './Layout';
import AppPersist from '../AppPersist';
import { initialState, reducer } from '../../data/siswa/reducer';
import { ContextProvider } from '../../utils/context';

const STORAGE_KEY = 'app:persist';
const localData = localStorage.getItem(STORAGE_KEY);

const App = () => (
  <ContextProvider
    value={useReducer(
      reducer,
      localData == null ? initialState : JSON.parse(localData),
    )}
  >
    <AppPersist storageKey={STORAGE_KEY}>
      <Layout />
    </AppPersist>
  </ContextProvider>
);

export default App;
