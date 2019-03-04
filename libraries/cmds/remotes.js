const interactionSpace = require("interact").createInteractionSpace();

const base = require("./base");

function addRemote(alias, remote, domainName) {
    if(!alias || !remote || !domainName){
        console.error('This command needs a <alias> and a <endpoint> and a <domainName> params');
        return;
    }

    base.createRemoteInteraction((err, rmis) => {
        rmis.startSwarm('domains', 'connectDomainToRemote', domainName, alias, remote).onReturn(function (err) {
            if (err) {
                console.error(err);
            }else{
                console.log(`Succefully added remote interface called ${alias} - ${remote} to domain ${domainName}`)
            }
        });
    });
}

function getRemotes(...args) {
    interactionSpace.startSwarm('remotes', 'getRemotes', ...args).onReturn(function (err, result) {
        if (err) {
            console.error(err);
            return;
        }
        console.log(result);
    });
}

function getRemote(...args) {
    interactionSpace.startSwarm('remotes', 'getRemote', ...args).onReturn(function (err, result) {
        if (err) {
            console.error(err);
            return;
        }

        console.log(result);
    });
}

addCommand("add", "remote", addRemote, "<remoteAlias> <remoteEndpoint> <domainName>\t\t\t\t |add a new remote with alias to specific domain");

/*
addCommand("add", "remote", addRemote, "<alias> <endpoint>\t\t\t\t |add a new remote to local domain with alias");
addCommand("get", "remote", getRemote, "<endpoint>\t\t\t\t |get endpoints for local domain");
addCommand("get", "remotes", getRemotes, "\t\t\t\t |get endpoints for local domain");*/
