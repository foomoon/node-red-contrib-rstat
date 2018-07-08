module.exports = function(RED) {
    'use strict';
    var rtstat = require('rtstat');
    //var tstat = rtstat.tstat('192.168.1.6');


    function RadioThermIn(n) {

        var node = this;

        RED.nodes.createNode(node, n);



        // which returns a promise that will resolve to an object with tstat uuids as keys and tstat objects as, um, objects




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

            var tlist = rtstat.findThermostats();
            //node.send({ payload: tlist });
            var output = [];
            tlist.then(function(thermostats) {
                for (var key in thermostats) {
                    // 'key' is this thermostat's uuid
                    var thisTstat = thermostats[key];
                    output.push({ uuid: key, therm: thisTstat });
                }
                node.send({ payload: output })
            });

        });

    }
    RED.nodes.registerType("rstat in", RadioThermIn);


}