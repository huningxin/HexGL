
const SerialPort = require("serialport");
const ByteLength = SerialPort.parsers.ByteLength;
var serialport;

const serialportListener = {
	listeners_: [],
	addEventListener: function(f) {
		this.listeners_.push(f);
	},
	onState: function(state) {
		for (let i in this.listeners_) {
			this.listeners_[i](state);
		}
	}
};

SerialPort.list(function (err, results) {
  if (err) {
    throw err;
  }
  
  for (var i = 0; i < results.length; i++) {
    var item = results[i];
		console.log(item);
		if (item.manufacturer === 'Microsoft' &&
				item.productId === '0204' &&
				item.vendorId == '0D28') {
			serialport = new SerialPort(item.comName, {
				baudRate: 115200,
				autoOpen: false
			});
			
			const parser = new ByteLength({length: 1});
			serialport.pipe(parser);
			
			serialport.open(() => {
				console.log(`Seiral Port ${item.comName} open`);
				parser.on('data', (data) => {
					console.log('Received Data: ' + data.toString());
					let state = parseInt(data.toString());
					serialportListener.onState(state);
				});
			})
			return;
		}
  }
});
