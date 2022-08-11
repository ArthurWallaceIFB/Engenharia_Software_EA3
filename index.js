const config = require('./config.js');
let IRoutes = require('./routes/' + config.IRoutes);

let routes = new IRoutes();
routes.get();
routes.post();
routes.put();
routes.delete();
routes.listen();
