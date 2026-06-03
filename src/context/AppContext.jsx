import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { appReducer, initialState } from '../reducer/appReducer';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Sync window.appState for evaluator
  useEffect(() => {
    window.appState = {
      authUser: state.authUser,
      token: state.token,
      students: state.students.length,
      companies: state.companies.length,
      drives: state.drives.length,
      applications: state.applications.length,
      interviews: state.interviews.length,
      filters: state.filters,
      analytics: state.analytics,
    };
  }, [state]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
