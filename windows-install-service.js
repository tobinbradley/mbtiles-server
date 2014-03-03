var Service = require('node-windows').Service;

// New service object
var svc = new Service({
  name:'Node MBTiles Server',
  description: 'Node MBTiles Server',
  script: 'C:\\workspace\\tiles\\server.js'
});

// Start service when installed
svc.on('install',function(){
  svc.start();
});

// Install the service
svc.install();
