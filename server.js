var SerialPort = require("serialport").SerialPort
var serialPort = new SerialPort("/dev/tty.usbmodemfd121", {
  baudrate: 9600
});
var Hapi = require('hapi');


var isOpen = false;

serialPort.on("open", function () {
  console.log('open');
  isOpen = true;
  serialPort.write("0\n");
});

var PORT = process.env.PORT || 8080
var server = new Hapi.Server(PORT)

server.route({
  method: 'GET',
  path: '/light/{color}',
  handler: function(request, reply) {
	if(isOpen) {
		serialPort.write(request.params.color + "\n");
		reply('YES<input action="action" type="button" value="Back" onclick="history.go(-1);" />');
	}
	reply('NO<input action="action" type="button" value="Back" onclick="history.go(-1);" />');
  }
})
server.route({
  method: 'GET',
  path: '/',
  handler: function(request, reply) {
	reply('<html><body><h1> <a href="/light/0">Off</a><br> <a href="/light/1">One</a><br><a href="/light/2">Two</a><br><a href="/light/3">Three</a><br><a href="/light/4">Four</a><br><a href="/light/5">Five</a><br><a href="/light/6">Six</a><br><a href="/light/7">Seven</a><br><a href="/light/8">Eight</a><br><a href="/light/9">Nine</a><br> </h1></body></html> ');
  }
})
 
server.start()
console.log("http://localhost:%s", PORT)
