import {setEntries, next, vote, INITIAL_STATE} from './core';

export default function reducer(state = INITIAL_STATE, action){
    switch (action.type) {
  case 'SET_ENTRIES':
    return setEntries(state, action.entries);
  case 'NEXT':
    return next(state);
  case 'VOTE':
    return state.update('vote', voteState => vote(voteState, action.entry))
  }
  return state;
};
//an importent req of reducers, if they are called with an undefined state
// they should know how to initialize it into a meanful value
