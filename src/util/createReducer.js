export default function createReducers(initialState, reducerMap) {
  return (state = initialState, action) => {
    const reducer = reducerMap[action.type];
    if (reducer) {
      return reducer(state, action);
    }
    return state;
  };
}