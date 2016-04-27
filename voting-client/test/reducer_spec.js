import React from "react";
import ReactDOM from "react-dom";
import {Map, List, fromJS} from "immutable";
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithTag,
  Simulate
} from 'react-addons-test-utils';
import {expect} from "chai";
import Reducer from "../src/Reducer";

describe("Reducer", ()=>{
  it("handles SET_STATE",()=>{
    const initialState = Map();
    const action ={
      type:"SET_STATE",
      state:Map({
        vote:Map({
          pair: List.of("Trainspotting", "28 days later"),
          tally: Map({"Trainspotting":1})
        })
      })
    };
    const nextState = Reducer(initialState, action);
    expect(nextState).to.equal(fromJS({
        vote:{
          pair:["Trainspotting", "28 days later"],
          tally: {Trainspotting:1}
        }
    }));
  })

  it("handles SET_STATE with Plain js payload", ()=>{
      const initialState= Map();
      const action = {
        type: 'SET_STATE',
        state: {
          vote: {
            pair: ['Trainspotting', '28 Days Later'],
            tally: {Trainspotting: 1}
          }
        }
      };
        const nextState = Reducer(initialState, action);
        expect(nextState).to.equal(fromJS({
          vote:{
          pair:["Trainspotting", "28 days later"],
          tally:{Trainspotting:1}
          }
        }));
      })

      it("handles SET_STATE without initialState", ()=>{
        const action = {
          type: 'SET_STATE',
          state: {
            vote: {
              pair: ['Trainspotting', '28 Days Later'],
              tally: {Trainspotting: 1}
            }
          }
        };
        const nextState = Reducer(undefined, action);
        expect(nextState).to.equal(fromJS({
          vote: {
            pair: ['Trainspotting', '28 Days Later'],
            tally: {Trainspotting: 1}
          }
        }));
      })
      it('handles VOTE by setting hasVoted', () => {
  const state = fromJS({
    vote: {
      pair: ['Trainspotting', '28 Days Later'],
      tally: {Trainspotting: 1}
    }
  });
  const action = {type: 'VOTE', entry: 'Trainspotting'};
  const nextState = reducer(state, action);

  expect(nextState).to.equal(fromJS({
    vote: {
      pair: ['Trainspotting', '28 Days Later'],
      tally: {Trainspotting: 1}
    },
    hasVoted: 'Trainspotting'
  }));
});

it('does not set hasVoted for VOTE on invalid entry', () => {
  const state = fromJS({
    vote: {
      pair: ['Trainspotting', '28 Days Later'],
      tally: {Trainspotting: 1}
    }
  });
  const action = {type: 'VOTE', entry: 'Sunshine'};
  const nextState = reducer(state, action);

  expect(nextState).to.equal(fromJS({
    vote: {
      pair: ['Trainspotting', '28 Days Later'],
      tally: {Trainspotting: 1}
    }
  }));
});


it('removes hasVoted on SET_STATE if pair changes', () => {
  const initialState = fromJS({
    vote: {
      pair: ['Trainspotting', '28 Days Later'],
      tally: {Trainspotting: 1}
    },
    hasVoted: 'Trainspotting'
  });
  const action = {
    type: 'SET_STATE',
    state: {
      vote: {
        pair: ['Sunshine', 'Slumdog Millionaire']
      }
    }
  };
  const nextState = reducer(initialState, action);

  expect(nextState).to.equal(fromJS({
    vote: {
      pair: ['Sunshine', 'Slumdog Millionaire']
    }
  }));
});


});
