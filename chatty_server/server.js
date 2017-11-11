const express = require('express');
const ws = require('ws')
const uuidv4 = require('uuid/v4');
const PORT = 3001;

const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

function broadcaster(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === ws.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
};

const wss = new ws.Server({ server });

wss.on('connection', (ws) => {
  console.log("A new client has connected")
  let currentUsers = wss.clients.size 
  let newUser = { type: "userJoin", id: uuidv4(), content: "A new user has joined. " + currentUsers + " users online", users: currentUsers}
  broadcaster(newUser)

  ws.on('message',(message) =>{
    parsed = JSON.parse(message)

    if (parsed.type === "postMessage"){   
      newMessage = {type: "incomingMessage", id: uuidv4(), username: parsed.username, content : parsed.content, users: currentUsers} 
      broadcaster(newMessage)
    } else if (parsed.type === "postNotification") {
      newName = {type:"incomingNotification", id: uuidv4(), content: parsed.content, users: currentUsers}
      broadcaster(newName)
    }
  })

  ws.on('close', (ws) =>{
    let currentUsers = wss.clients.size 
    let disonnectedUser = { type: "userNotification", id: uuidv4(), content: "A user has left. " + currentUsers + " users online", users: currentUsers}
    broadcaster(disonnectedUser)
  })
});

