var beesHealer = require("swarmutils").beesHealer;

$$.swarm.describe('connection', {
    use: function (alias) {
        const transaction  = $$.blockchain.beginTransaction({});
        var node = transaction.lookup('global.CurrentNode', "SELECTED");

        if (!node) {
            this.swarm('interaction', '__return__', new Error('Could not identify the required PSKNode'));
            return;
        }
        node.init(alias);
        transaction.add(node);
        $$.blockchain.commit(transaction);
        this.swarm('interaction', '__return__');
    },
    add: function(alias, remote){
        const transaction  = $$.blockchain.beginTransaction({});
        var node = transaction.lookup('global.PSKNode', alias);

        node.init(alias, remote, "local/agent/system");
        transaction.add(node);
        $$.blockchain.commit(transaction);
        this.swarm('interaction', '__return__');
    },
    //TODO: add a remove phase into the swarm
    list: function(){
        const transaction  = $$.blockchain.beginTransaction({});
        const nodes        = transaction.loadAssets('global.PSKNode') || [];

        this.swarm('interaction', '__return__', undefined, nodes.map(node => beesHealer.asJSON(node).publicVars));
    },
    getSelected: function(){
        const transaction  = $$.blockchain.beginTransaction({});
        const currentNode  = transaction.lookup('global.CurrentNode', "SELECTED");

        var node;
        if(currentNode && currentNode.selectedNode){
            node = transaction.lookup('global.PSKNode', currentNode.selectedNode)
        }

        this.swarm('interaction', '__return__', undefined, node ? beesHealer.asJSON(node).publicVars : {});
    }
});