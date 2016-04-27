import makeStore from './src/store';
import {startServer} from './src/server';
export const store = makeStore();
//this is subscribing to a redux store. the function is what the store will call
//after every action it applies, when the state has potentially changed.
// /its the callback to state change within the store
startServer(store);
store.dispatch({
  type: 'SET_ENTRIES',
  entries: require('./entries.json')
});
store.dispatch({type: 'NEXT'});
