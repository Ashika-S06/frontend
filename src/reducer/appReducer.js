export const initialState = {
  authUser: null,
  token: null,
  students: [],
  companies: [],
  drives: [],
  applications: [],
  interviews: [],
  filters: {},
  analytics: null,
};

export const appReducer = (state, action) => {
  switch (action.type) {
    case 'SET_AUTH':
      return { ...state, authUser: action.payload.role, token: action.payload.token };
    case 'LOGOUT':
      return { ...initialState };
    case 'SET_STUDENTS':
      return { ...state, students: action.payload };
    case 'SET_COMPANIES':
      return { ...state, companies: action.payload };
    case 'SET_DRIVES':
      return { ...state, drives: action.payload };
    case 'SET_APPLICATIONS':
      return { ...state, applications: action.payload };
    case 'SET_INTERVIEWS':
      return { ...state, interviews: action.payload };
    case 'SET_ANALYTICS':
      return { ...state, analytics: action.payload };
    case 'SET_FILTERS':
      return { ...state, filters: { ...state.filters, ...action.payload } };
    default:
      return state;
  }
};
