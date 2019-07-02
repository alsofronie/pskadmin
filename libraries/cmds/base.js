const interact = require('interact');
const is = interact.createInteractionSpace();

module.exports.getCurrentNode = function(callback){
    is.startSwarm("connection", "getSelected").onReturn(callback);
};

module.exports.createRemoteInteraction = function(callback){
    module.exports.getCurrentNode((err, node)=>{
        if(err){
            throw err;
        }
        const rmis = interact.createRemoteInteractionSpace(node.alias, node.remote, 'local/agent/system');
        callback(null, rmis);
    });
};