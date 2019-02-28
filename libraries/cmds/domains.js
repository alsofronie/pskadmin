const interact = require('interact');
const is = interact.createInteractionSpace();


function createDomain(domainName) {
    if (!domainName) {
        console.error('Missing arguments');
        return;
    }

    is.startSwarm("connection", "getSelected").onReturn((err, node) => {
        if(node.remote){
            console.log(`Start to create domain ${domainName} on ${node.alias} and remote ${node.remote}`);

            const rmis = interact.createRemoteInteractionSpace(node.alias, node.remote, 'local/agent/system');

            rmis.startSwarm('domains', 'add', "basicDomain", domainName).onReturn((err, key) => {
                if (err) {
                    console.error(`Domain <${domainName}> failed to create.`);
                }else{
                    console.log(`Domain <${domainName}> succefully created.`);
                }
            });
        }else{
            console.log(`No PSK Node is selected! Run first command use <PSK Node alias>.`);
        }
    });
}


function listDomainConfiguration(domainName) {
    if (!domainName) {
        console.error('Missing <domain name> argument');
        return;
    }
    is.startSwarm("connection", "getSelected").onReturn((err, node) => {
        if(node.remote){
            const rmis = interact.createRemoteInteractionSpace(node.alias, node.remote, 'local/agent/system');

            rmis.startSwarm('domains', 'getDomainDetails', domainName).onReturn((err, domain) => {
                if (err) {
                    console.error(`Failed to extract domain <${domainName}> details.`);
                }else{
                    console.log(`Domain <${domainName}> details:`);
                    console.log(`-----------------------------------`);
                    console.log(`PSK Node \t Domain name \t Role`);
                    console.log(`-----------------------------------`);
                    console.log(`${node.alias} \t\t  ${domainName} \t ${domain.publicVars.role}`);
                    console.log(`-----------------------------------`);

                    var i=0;
                    console.log(`Remote interfaces`);
                    for(var remoteAlias in domain.publicVars.remoteInterfaces){
                        console.log(`#${i} - ${remoteAlias} ${domain.publicVars.remoteInterfaces[remoteAlias]}`);
                        i++;
                    }

                    if(i==0){
                        console.log(`0 remote interfaces`);
                    }

                    i=0;
                    console.log(`-----------------------------------`);
                    console.log(`Local interfaces`);
                    for(var localAlias in domain.publicVars.localInterfaces){
                        console.log(`#${i} - ${localAlias} ${domain.publicVars.localInterfaces[localAlias]}`);
                        i++;
                    }
                    if(i==0){
                        console.log(`0 local interfaces`);
                    }
                    console.log(`-----------------------------------`);
                }
            });
        }else{
            console.log(`No PSK Node is selected! Run first command use <PSK Node alias>.`);
        }

    });
}

function listDomains() {
    is.startSwarm("connection", "getSelected").onReturn((err, node) => {
        if(node.remote){
            console.log(`Listing all domains found on ${node.alias} and remote ${node.remote}`);
        }

        const rmis = interact.createRemoteInteractionSpace(node.alias, node.remote, 'local/agent/system');

        rmis.startSwarm('domains', 'getDomains').onReturn((err, domains) => {
            console.log(err, domains)
            if (err) {
                console.error(`Error while trying to get all domains.`);
            }else{
                console.log(`-----------------------------------`);
                console.log(`PSK Node \t Domain name \t Role`);
                console.log(`-----------------------------------`);
                for(var i=0; i<domains.length; i++){
                    var domain = domains[i];
                    console.log(`${node.alias} \t\t ${domain.publicVars.alias} \t ${domain.publicVars.role}`);
                }
                console.log(`-----------------------------------`);
            }
        });
    });
}

//connectDomainToRemote

addCommand("create", "domain", createDomain, "<domainName> \t\t\t |add a new domain in the selected PSK Node");
addCommand("list", "domains", listDomains, " \t\t\t\t\t |list all domains from the selected PSK Node");
addCommand("list", "domain", listDomainConfiguration, "<domainName> \t\t\t\t |list domain configuration");