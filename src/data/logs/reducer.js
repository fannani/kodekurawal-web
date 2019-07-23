const reducer = (
  state = {
    hasErrored: false,
    isLoading: false,
    logs: [],
  },
  action,
) => {
  switch (action.type) {
    case 'LOGS_HAS_ERRORED':
      return { ...state, hasErrored: action.hasErrored };
    case 'LOGS_IS_LOADING':
      return { ...state, isLoading: action.isLoading };
    case 'LOGS_FETCH_DATA_SUCCESS':
      return Object.assign({ ...state }, { logs: action.logs });
    default:
      return state;
  }
};

export default reducer;
