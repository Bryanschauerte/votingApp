export default socket=> store => next =>action => {
  if(action.meta && action.meta.remote){
    console.log('in middleware', action);
    socket.emit('action',action);
  }
  console.log('in middleware not emitted', action);

  return next(action);
}


// same as
// export default function(store) {
//   return function(next) {
//     return function(action) {
//
//     }
//   }
// }
