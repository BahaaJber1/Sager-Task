const socketIO = require("socket.io");

exports.sio = (server) => {
  return socketIO(server, {
    transports: ["polling"],
    cors: {
      origin: "*",
    },
  });
};

exports.connection = (io) => {
  io.on("connection", (socket) => {
    console.log(`-> Client ${socket.id} connected`);

    setInterval(function () {
      socket.emit('message', GenerateData());
    }, 1000);

    socket.on("disconnect", () => {
      console.log(`-> Client ${socket.id} disconnected`);
    });
  });
};


function GenerateData() {

  return {
    "type": "FeatureCollection",
    "features": [
     {
        "type": "Feature",
        "properties": {
          "serial": makeID(10),
          "registration": "SD-" +makeID(2), 
          "Name": "Dji Mavic",
          "altitude": Math.floor(Math.random() * 100),
          "pilot": "Besher",
          "organization" : " Sager Drone",
          "yaw" : 120 + Math.floor(Math.random() * 20)
        },
        "geometry": {
          "coordinates": makeLocation(),
          "type": "Point"
        }
      }
    ]
  }
}

function makeID(number) {
  const characters = 'ABCD';
  let result = '';

  for (let i = 0; i < number; i++) {
    result += characters.charAt(Math.floor(Math.random() * 4));
  }

  return result;
}

function makeLocation() {
  base = [
    35.93131881204147 + (Math.random() * 2 - 1) / 10,
    31.94878648036645 + (Math.random() * 2 - 1) / 10
  ]
  return base;
}

