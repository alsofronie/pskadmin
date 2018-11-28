require('../../builds/devel/pskruntime');
require("callflow");

const pskConsole = require('swarmutils').createPskConsole();
$$.loadLibrary("cmds",require('./libraries/cmds/index'));
$$.loadLibrary("pskwallet",require("./libraries/swarms/index"));
pskConsole.runCommand();
