import {Results} from '../../src/components/Results';
import React from 'react';
import ReactDOM from "react-dom";
// import next from "../../src/components/"
import {List, Map} from 'immutable';
import{expect} from 'chai';
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithTag,
  Simulate
} from "react-addons-test-utils";

describe("Results", ()=>{
  it("renders a div for each vote count or zero",()=>{
    const pair = List.of("Trainspotting", "28 days later");
    const tally = Map({"Trainspotting": 5});
    const component = renderIntoDocument(
      <Results pair={pair} tally={tally} />);
    const entries = scryRenderedDOMComponentsWithTag(component, "entry");
    const [train, days] = entries.map(entry=> entry.textContent);
    expect(entries.length).to.equal(2);
    expect(train.textContent).to.contain('Trainspotting');
    expect(days.textContent).to.contain("28 days later");
    expect(train).to.contain(5);
    expect(days).to.contain(0);
  });

  it("invokes the next callback when the next button is clicked", ()=>{
    let nextInvoked = false;
    const next = ()=> nextInvoked== true;
    const pair = List.of("Trainspotting", "28 days later");
    const tally = Map({"Trainspotting": 5});
    const component = renderIntoDocument(
      <Results pair={pair}
        tally={tally}
        next={next} />
    );
    Simulate.click(ReactDOM.findDOMNode(component.refs.next));
    expect(nextInvoked).to.equal(true);
  })

  it("displays the winner if we have one", ()=>{

    const component = renderIntoDocument(
      <Results
        winner = "Trainspotting"
        pair={["Trainspotting", "28 days later"]}
        tally={Map()}
         />
    );
    const winner = ReactDOM.findDOMNode(component.refs.winner);
    expect(winner).to.be.ok;
    expect(winner.textContent).to.contain("Trainspotting");
  });

})
