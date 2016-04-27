import React from 'react';
import ReactDOM from 'react-dom';
import {Voting, VotingContainer} from './components/Voting';
import {Route, Router, hashHistory} from 'react-router';
import App from './components/App';
import remoteActionMiddleware from './remote_action_middleware';
import {Results, ResultsContainer} from './components/Results';
import reducer from "./Reducer";
import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import io from 'socket.io-client';
import {vote, setState} from "./action_creators";


// const store = createStore(reducer);
// store.dispatch({
//   type:"SET_STATE",
//   state: {
//     vote: {
//       pair: ['Sunshine', '28 Days Later'],
//       tally: {Sunshine: 2}
//     }
//   }
// });



const socket = io(`${location.protocol}//${location.hostname}:8090`);
socket.on('state', state=> store.dispatch(setState(state)));

const createStoreWithMiddleware = applyMiddleware(
  remoteActionMiddleware(socket)
)(createStore);
const store = createStoreWithMiddleware(reducer);


const routes = (
  <Route component={App} >
    <Route path ="/results" component={ResultsContainer} />
    <Route path = "/" component ={VotingContainer}/>
    </Route>
);

ReactDOM.render(
  <Provider store={store}>
  <Router history={hashHistory}>{routes}</Router>
  </Provider>,
   document.getElementById('app'));
