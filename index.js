const noble = require("noble");
const io = require("socket.io-client");
const onPushButton = require("./button");

// const networkInterface = require('os').networkInterfaces();
const macaddress = "luggagemacadr";

const logError = err => console.log(err);

const socket = io("http://localhost:1337/checkLuggage");

onPushButton(() => {
  socket.emit("fetch_data", macaddress);
});

socket.on("flight_data", function (data) {
  noble.on('stateChange', (state) => {
    if (state === 'poweredOn') {
      noble.startScanning([], true, (err) => {
        if (err) {
          return console.log(err);
        }

        console.log("scanning...");
      });
    } else {
      noble.stopScanning(logError);
    }
  })


  noble.on('discover', (peripheral) => {
    if (!data[peripheral.address]) {
      peripheral.connect();
    }
    // if (peripheral.address === "e5:fe:c1:fa:b5:e6") {
    //   console.log("RSSI: " + peripheral.rssi);
    // }
  });
});



