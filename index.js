var restify = require('restify');
var opn = require('opn');

function respond(req, res, next) {
  var requestedUrl = req.query;
  res.send('open ' + requestedUrl.url);
  //opn(requestedUrl.url, {app: 'google chrome'});
  next();
}

var server = restify.createServer();
server.use(restify.plugins.queryParser());
server.get('/h?url', respond);
server.head('/', respond);

server.get(/^\/([a-zA-Z0-9_\.~-]+)\/(.*)/, function(req, res, next) {
    console.log(JSON.stringify(req.params))
    var params = req.params;
    var link = [];
    link.push('localhost');
    for (var key in params) {
        if (params.hasOwnProperty(key)) {
            link.push(params[key])
        }
    }
    console.log(link.join('/'));
    //console.log(req.params[1]);
    res.send(200);
    return next();
  });
server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});