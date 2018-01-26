var nmap = require('libnmap');
nmap.nmapLocation = "nmap";
var http = require('http');
var exports = module.exports;
var descr = 'You need to have nmap installed on your server so you could start a scan. Nmap is a tool for discovering open ports on hosts, please enter ip and wait for a few minutes as nmap is processing your scan.\n';
exports.descr = descr;
exports.opts = {
    range: [],
    json: false,
  };
var Target = function () {
  this.addrPattern = /\d+\.\d+\.\d+\.\d+$/;
  this.pattern = /.*\.js/;
  this.xmlpattern = /\<\?xml-stylesheet.*\n/;
};

Target.prototype.ip = function (reqUrl) {
    this.reqUrl = reqUrl;
    return reqUrl.match(this.addrPattern)[0];
};

Target.prototype.action = function (reqUrl) {
  this.reqUrl = reqUrl;
  if (reqUrl.match(this.pattern) && reqUrl.match(this.addrPattern))
  return true;
};

Target.prototype.xml = function (input) {
  return input.replace(this.xmlpattern, '');
}

exports.target = new Target ();
exports.nmap = nmap;
