module.exports = function(RED) {
    'use strict';
    var rtstat = require('rtstat');

    function RadioThermIn(n) {

        var node = this;

        RED.nodes.createNode(node, n);


        var ipaddr = n.ip;


        // on input message
        node.on('input', function(msg) {

            var tstat = rtstat.tstat(ipaddr);

            obj.handleInputEvent(msg)
            var outputPromise = tstat.ttemp();
            outputPromise.then(function(value) {
                node.send({ payload: value });
            });

        });

    }
    RED.nodes.registerType("rstat in", RadioThermIn);


    RED.httpAdmin.get("/thermostats", RED.auth.needsPermission('rstat.read'), function(req, res) {
        // which returns a promise that will resolve to an object with tstat uuids as keys and tstat objects as, um, objects
        var tlist = rtstat.findThermostats();
        var output = [];
        tlist.then(function(thermostats) {
            for (var key in thermostats) {
                // 'key' is this thermostat's uuid
                var thisTstat = thermostats[key];
                output.push(thisTstat.ipAddress);
            }
            res.json(output);
        });
    });
}