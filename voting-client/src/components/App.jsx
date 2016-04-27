import React from 'react';
// import {List, Map} from "immutable";
//
//
// const pair = List.of("Trainspotting", "28 days later");
// const tally = Map({'Trainspotting':5, "28 days later": 4});
//
// export default React.createClass({
//   render(){
//     return React.cloneElement(this.props.children,
//        {
//          pair: pair,
//          tally: tally
//        });
//   }
// })
//that was the old hard codeing way

export default React.createClass({
  render(){
    return this.props.children;
  }
});
