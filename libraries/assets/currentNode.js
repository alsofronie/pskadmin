$$.asset.describe("CurrentNode", {
    public:{
        alias: "string:key",
        selectedNode: "string"
    },
    init:function(selectedNode){
        this.alias = "SELECTED";
        this.selectedNode = selectedNode;
    }
});