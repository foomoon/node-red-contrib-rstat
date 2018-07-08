module.exports = function(RED) {
    'use strict';
    var rtstat = require('rtstat');
    //var tstat = rtstat.tstat('192.168.1.6');


    function RadioThermIn(n) {

        var node = this;

        RED.nodes.createNode(node, n);

        var tlist = rtstat.findThermostats();

        // which returns a promise that will resolve to an object with tstat uuids as keys and tstat objects as, um, objects

        tlist.then(function(thermostats) {
            for (var key in thermostats) {
                // 'key' is this thermostat's uuid
                var thisTstat = thermostats[key];
            }
        });


        //if (node.myConfig) {

        // initialize object
        //var obj = new rstat(this, config)

        // on input message
        node.on('input', function(msg) {
            //obj.handleInputEvent(msg)
            //var outputPromise = tstat.ttemp();
            //outputPromise.then(function(value) {
            //    node.send({ payload: value });
            //});
        });

    }
    RED.nodes.registerType("rstat in", RadioThermIn);


}