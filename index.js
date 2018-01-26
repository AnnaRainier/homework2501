var http = require('http');
var webnmap = require('./webnmap');
var result;
var nmap = webnmap.nmap;
var target = webnmap.target;
var opts = webnmap.opts;
var descr = webnmap.descr;

http.createServer(function (req, res) {
  if (req.url === '/') {
  res.writeHead(200, {'Content-type': 'text/html'});
  res.write(descr);
  res.write('<form method="get" action="/test.js">');
  res.write('enter IP: <input type="text" name="ip"><br>');
  res.write('<input type="submit" value="Submit">');
  res.end();
};
  if (target.action(req.url)) {
    console.log('test required');
    opts['range'].push(target.ip(req.url));
  if (opts['range'].length > 1) {
    opts['range'].shift();
    result = false;
  }
    console.log(opts);
    nmap.scan(opts, function(err, report) {
    if (err) throw new Error(err);

    for (var item in report) {
    result = report[item];
     }
});
  var resultWait = setInterval(function () {
    if (result) {
      res.writeHead(200), {'Content-Type':'text/xml'};
      result = target.xml(result);
      res.write(result);
      res.end();
      clearInterval(resultWait);
    } else {
      setTimeout(function () {
        console.log('please wait for nmap response, processing');
      },1000)
    }
  },1000);
} else {
    console.log('ip is incorrect or not stated');
    res.end();
  }
}).listen(3000);
