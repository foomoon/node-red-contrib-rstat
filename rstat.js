module.exports = function(RED) {
    'use strict';
    var rtstat = require('rtstat');
    var tstat = rtstat.tstat('192.168.1.6');


    function RadioTherm(n) {
        RED.nodes.createNode(this, n);

        var node = this;
        //this.config = n.config;
        //this.myConfig = RED.nodes.getNode(this.config);

        // initialize object
        //var obj = new rstat(this, config)

        // on input message
        this.on('input', function(msg) {
            //obj.handleInputEvent(msg)
            var outputPromise = tstat.ttemp()
                .then(function(value) {
                    node.send({ payload: value });
                });
        });

    }
    RED.nodes.registerType("rstat", RadioTherm);


}