import Server from 'socket.io';

export function startServer(store){
  //publishes the whole state to everyone whenever any change occurs. Can be cleaned up to save data
  const io = new Server().attach(8090);
  store.subscribe(
    () => io.emit('state', store.getState().toJS())
  );

    io.on('connection', (socket) => {
      socket.emit('state', store.getState().toJS());
      socket.on('action', store.dispatch.bind(store));
    });
}
