import {Voting, VotingContainer} from '../../src/components/Voting';
import ReactDOM from 'react-dom';
import React from 'react';
import {List} from 'immutable';
import{expect} from 'chai';
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithTag,
  Simulate
} from "react-addons-test-utils";

describe("Voting",()=>{
  it("renders a pair of buttons", ()=>{
    const component = renderIntoDocument(
      <Voting pair={["Trainspotting", "28 days later"]}/>
    );
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
    expect(buttons.length).to.equal(2);
    expect(buttons[0].textContent).to.equal('Trainspotting');
    expect(buttons[1].textContent).to.equal("28 days later");
  });


  it("invokes the callback when a button is clicked", ()=>{
    let votedWith;
    const vote = (entry)=> votedWith = entry;
    const component = renderIntoDocument(
      <Voting pair={["Trainspotting", "28 days later"]} vote={vote}/>
    )
    const buttons = scryRenderedDOMComponentsWithTag(component, "button");
    Simulate.click(buttons[0]);
    expect(votedWith).to.equal("Trainspotting");
  });


  it("disables the button when the user has voted", ()=>{
    const component = renderIntoDocument(
      <Voting pair={["Trainspotting", "28 days later"]} hasVoted="Trainspotting"/>
    );
    const buttons = scryRenderedDOMComponentsWithTag(component, "button");
    expect(buttons.length).is.equal(2);
    expect(buttons[0].hasAttribute('disabled')).to.equal(true);
    expect(buttons[1].hasAttribute('disabled')).to.equal(true);
  });

  it('Adds a label to the button the user placed a vote for', ()=>{
    const component = renderIntoDocument(
      <Voting pair={["Trainspotting", "28 days later"]} hasVoted="Trainspotting"/>
    );
    const buttons = scryRenderedDOMComponentsWithTag(component, "button");
    expect(buttons[0].textContent).to.contain('Voted');
  })

  it("has no buttons if there is a winner", ()=>{
    const component = renderIntoDocument(
      <Voting winner="Trainspotting"/>
    );
    const buttons = scryRenderedDOMComponentsWithTag(component, "button");
    expect(buttons.length).to.equal(0);
    const winner = ReactDOM.findDOMNode(component.refs.winner);
    expect(winner).to.be.ok;
    expect(winner.textContent).to.contain('Trainspotting');
  })

  it("renders as a pure component", ()=>{
    const pair = ["Trainspotting", "28 days later"];
    const container = document.createElement('div');
    let component = ReactDOM.render(<Voting pair={pair} />, container);
    let firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
    expect(firstButton.textContent).to.equal('Trainspotting');
    pair[0] = "Sunshine";
    component = ReactDOM.render(<Voting pair = {pair}/>, container);
    firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
    expect(firstButton.textContent).to.equal("Trainspotting");
  })

  it('does update DOM when prop changes', () => {
    const pair = List.of('Trainspotting', '28 Days Later');
    const container = document.createElement('div');
    let component = ReactDOM.render(
      <Voting pair={pair} />,
      container
    );

    let firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
    expect(firstButton.textContent).to.equal('Trainspotting');

    const newPair = pair.set(0, 'Sunshine');
    component = ReactDOM.render(
      <Voting pair={newPair} />,
      container
    );
    firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
    expect(firstButton.textContent).to.equal('Sunshine');
  });

});
