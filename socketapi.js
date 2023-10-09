const io = require("socket.io")();
const socketapi = {
  io: io,
};

let connections = [];
let connectionsId = [];
let colours = [];

function red() {
  return Math.random() * 255;
}

function green() {
  return Math.random() * 255;
}

function blue() {
  return Math.random() * 255;
}

io.on("connection", function (socket) {
  socket.on("disconnect", function () {
    let indexOfDisconnectedUser = connectionsId.indexOf(socket.id);
    connections.splice(indexOfDisconnectedUser, 1);
    connectionsId.splice(indexOfDisconnectedUser, 1);
    colours.splice(indexOfDisconnectedUser, 1);
    io.emit("names", connections);
  });

  console.log("Total " + connections.length + " users have joined the chat");

  socket.on("msg", function (data) {
    let name = connections[connectionsId.indexOf(socket.id)];
    let color = colours[connectionsId.indexOf(socket.id)];
    io.emit("msg", name, data, color);
  });

  socket.on("name", function (data) {
    connections.push(data);
    connectionsId.push(socket.id);
    let color = `rgb(${Math.round(red())},${Math.round(green())},${Math.round( blue() )}, 0.500)`;
    colours.push(color);
    io.emit("names", connections);
  });

  socket.on("typing", function () {
    let name = connections[connectionsId.indexOf(socket.id)];
    socket.broadcast.emit("typing", name);
  });
});

module.exports = socketapi;
