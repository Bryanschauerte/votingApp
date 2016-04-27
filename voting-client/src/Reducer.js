import {Map, List} from "immutable";

function setState(state, newState){
  return state.merge(newState);
}

function vote(vote, entry){
  const currentPair = state.getIn(['vote', "pair"]);
  if(currentPair && currentPair.includes(entry)){
    return state.set('hasVoted', entry);
  }else{
    return state;
  }

}

function resetVote(state) {
  const hasVoted = state.get('hasVoted');
  const currentPair = state.getIn(['vote', 'pair'], List());
  console.log("curious, current pair", currentPair);

  if (hasVoted && !currentPair.includes(hasVoted)) {
    return state.remove('hasVoted');
  } else {
    return state;
  }
}

export default function(state=Map(), action){
  switch(action.type){
    case "SET_STATE":
      return setState(resetVote(state), action.state);
    case "VOTE":
      return vote(state, action.entry);
  }
  return state;
};
