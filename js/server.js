// jshint esversion: 6

const net = require('net');
const fs = require('fs');
const users = [];
var username = "placeholder";
var counter = 0;


//callback function gets invoked for every client socket connection
let server = net.createServer((socket) => {

  socket.setEncoding('utf8');
  // console.log(socket.remotePort);
  server.getConnections(function(err, count){
    console.log(`${socket.remotePort} has connected. Now ${count} person(s) are connected.`);
  });

  users.push(socket);

  // socket.on('data', (chunk)=>{
  //   // counter++;
  //   // socket.write(`the current msg count is ${counter}`);

  //   console.log(`${socket.remotePort}: ${chunk}`);
  //   // console.log(`the current message count is: ${counter}`);
  // });

  socket.on('data', function (data) {
    process.stdout.write(`${socket.remotePort}: ${data}`);
    users.forEach(function(eachUser){
      eachUser.write(`${socket.remotePort}: ${data}`);
    });
  });

  
  process.stdin.on('data', (cmd)=>{
    users.forEach(function(eachUser){
      eachUser.write(`[admin]: ${cmd}`);
    });
  });

  // clientsCount++;
  // console.log(`the current client count is: ${clientsCount}`);

  socket.on('end', ()=>{
    server.getConnections(function(err, count){
      console.log(`${socket.remotePort} has disconnected. Now ${count} person(s) are connected`);
    });
  });
});

// process.stdin.on('data', function (cmd) {
//   users.forEach(function(eachUser) {
//     eachUser.write(`[admin]: ${cmd}`);
//   });
// });

server.listen(6969, '0.0.0.0', ()=>{
  console.log(`opened server on`, server.address());
});

// 