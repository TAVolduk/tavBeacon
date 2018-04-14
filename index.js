const noble = require("noble");

const logError = err => console.log(err);

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
  if (peripheral.address === "e5:fe:c1:fa:b5:e6") {
    console.log("RSSI: " + peripheral.rssi);
  }
});


