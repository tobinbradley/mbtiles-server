var Service = require('node-windows').Service;

// New service object
var svc = new Service({
  name:'Node MBTiles Server',
  script: require('path').join(__dirname,'helloworld.js')
});

// Listen for the "uninstall" event so we know when it's done.
svc.on('uninstall',function(){
  console.log('Uninstall complete.');
  console.log('The service exists: ',svc.exists);
});

// Uninstall the service.
svc.uninstall();
