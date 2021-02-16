function checkTx() {
    if (eth.getBlock(eth.blockNumber).transactions > 0) {
        getTx(); //prints last transactions within the last 500 blocks
    }
}

eth.filter("latest", function(_, _) { 
    checkTx(); 
});

checkTx();
