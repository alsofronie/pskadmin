const interact = require('interact');
const interactionSpace = interact.createInteractionSpace();

function dummy(){
    console.log("Executing dummy command ", arguments);
}

function addAgent(agentName) {
    if(!agentName) {
        console.error('Missing arguments');
        return;
    }

    interactionSpace.startSwarm("connection", "getSelected").onReturn((err, node) => {
        if(!node.remote) {
            console.log(`No PSK Node is selected! Run first command use <PSK Node alias>.`);
            return;
        }

        const remoteInteractionSpace = interact.createRemoteInteractionSpace(node.alias, node.remote, `${node.alias}/agent/system`);
        remoteInteractionSpace.startSwarm('global.agents', 'add', agentName, undefined).onReturn((err) => {
            if(err) {
                console.log(`Agent with name <${agentName}> failed to be created for domain <${node.alias}>`);
                return;
            }

            console.log(`Agent with name <${agentName}> successfully created for domain <${node.alias}>`);
        });
    });
}


addCommand("add", "agent", addAgent, "<agentName> \t\t\t\t |add a new agent in the current domain");
addCommand("delete", "agent", dummy, "<agentName> \t\t\t\t |remove the agent");
addCommand("transfer", "agent", dummy, "<agentName> <remoteWalletUid> \t |transfer the private key of an agent to another wallet");
addCommand("allow", "agent", dummy, "<agentName> <remoteWalletUid> \t |transfer a temporary private key of an agent to another wallet");
