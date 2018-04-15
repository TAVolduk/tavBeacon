const noble = require("noble");
const io = require("socket.io-client");
const onPushButton = require("./button");

// const networkInterface = require('os').networkInterfaces();
const macaddress = "luggagemacadr";

const logError = err => console.log(err);

const socket = io("https://4e7d4256.ngrok.io/checkLuggage");

let isScanning = false
onPushButton(() => {
  if(!isScanning){
    socket.emit("fetch_data", macaddress);
    console.log("Scan Active");
    isScanning = true;
  }
  else {
    noble.stopScanning(logError);
    console.log("Scan stop");
    isScanning = false;
  }
});


socket.on("flight_data", function (data) {
  data = JSON.parse(data);
  console.log(data);
  noble.on('stateChange', (state) => {
    if (state === 'poweredOn') {
      noble.startScanning([], false, (err) => {
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
     // console.log("Found mismatch : " + peripheral.advertisement.localName);
	console.log(peripheral.address + " mismatch");
    }
    else {
      console.log(peripheral.address + " OK");	
    }
    // if (peripheral.address === "e5:fe:c1:fa:b5:e6") {
    //   console.log("RSSI: " + peripheral.rssi);
    // }
  });
});



