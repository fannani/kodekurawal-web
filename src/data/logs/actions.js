export const logsHasErrored = bool => ({
  type: 'LOGS_HAS_ERRORED',
  hasErrored: bool,
});

export const logsIsLoading = bool => ({
  type: 'LOGS_IS_LOADING',
  isLoading: bool,
});
export const logsFetchDataSuccess = logs => ({
  type: 'LOGS_FETCH_DATA_SUCCESS',
  logs,
});

export const logsFetchData = () => (dispatch) => {
  dispatch(logsIsLoading(true));
};
