// jshint esversion: 6

const net = require('net');
var counter = 0;
var username = "username";
let client = net.createConnection(6969, 'localhost');

client.setEncoding('utf8');

client.on('connect', ()=>{
  console.log('Welcome. Please enter your username');
  process.stdin.pipe(client);
});

//receiving data..
client.on('data', function (chunk) {
  process.stdout.write(chunk);
});
