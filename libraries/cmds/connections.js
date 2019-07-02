const interact = require('interact');
const interactionSpace = interact.createInteractionSpace();


function addNode(alias, remote) {
    if (!alias || !remote) {
        console.error('This command needs a <alias> and a <remote> to the PSK Node.');
        return;
    }

    interactionSpace.startSwarm('connection', 'add', alias, remote).onReturn(function (err, result) {
        if(!err){
            console.log("PSK Node succesfully added.");
        }
    });
}

function useNode(alias){
    interactionSpace.startSwarm('connection', 'use', alias).onReturn(function (err, result) {
        if(!err){
            console.log(`PSK Node with alias ${alias} succesfully selected`);
        }
    });
}

function listNodes(){
    interactionSpace.startSwarm('connection', 'list').onReturn(function (err, result) {
        if (err) {
            console.log(err);
        }
        console.log("-----------------------------------------");
        console.log(`| Alias \t Remote`);
        console.log("-----------------------------------------");
        for(var i=0; i<result.length; i++){
            var item = result[i];
            console.log(`| ${item.alias} \t\t ${item.remote}`);
            console.log("-----------------------------------------");
        }

    });
}


function displaySelected(alias){
    interactionSpace.startSwarm('connection', 'getSelected').onReturn(function (err, result) {
        console.log(result);
        if(!err){
            console.log(`PSK Node selected is <${result.alias}>`);
        }
    });
}

addCommand("add", "PSKNode", addNode, "<alias> <remote> \t\t\t |add a new PSKNode remote to be managed");
addCommand("list", "PSKNodes", listNodes, " \t\t\t\t |Lists all PSKNode known");
addCommand("use", "", useNode, "<alias> \t\t\t\t\t |select PSKNode with <alias> to be used as default");
addCommand("display", "PSKNode", displaySelected, " \t\t\t\t |display the <alias> of the PSKNode used as default");