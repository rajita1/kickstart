const routes = require('next-routes')();

routes.add('/campaigns/new', '/campaigns/new')

.add('/campaigns/:address', '/campaigns/show') //:address is a wild card, second argument shows the route

.add('/campaigns/:address/requests', '/campaigns/requests/index')

.add('/campaigns/:address/requests/new', '/campaigns/requests/new');

module.exports = routes;
