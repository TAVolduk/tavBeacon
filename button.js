var Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO

var pushButton = new Gpio(4, 'in', 'rising', {debounceTimeout: 10});

pushButton.watch(function (err, value) { //Watch for hardware interrupts on pushButton GPIO, specify callback function
  if (err) { //if an error
    console.error('There was an error', err); //output error message to console
  return;
  }
  console.log("sombody pushed my button!");
});

function unexportOnClose() { //function to run when exiting program
  console.log("close");
  pushButton.unexport(); // Unexport Button GPIO to free resources
};

process.on('SIGINT', unexportOnClose); //function to run when user closes using ctrl+c 
