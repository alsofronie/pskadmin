$$.asset.describe("PSKNode", {
    public:{
        remote: "string:index",
        agent: "string",
        alias: "string:key"
    },
    init:function(alias, remote, agent){
        this.remote = remote;
        this.alias = alias;
        this.agent = agent;
    }
});