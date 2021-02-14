function getTx(range) {
    range = (range === undefined) ? 500 : range; //if the range is undefined, set it to 500

    if (range >= eth.blockNumber) { //the starting block (eth.blockNumber - range) can not be less than 1
        var startingBlock = 1 //check the whole chain for transactions
    } else {
        var startingBlock = eth.blockNumber - range;
    }

    for (var i = startingBlock; i <= eth.blockNumber; i++) {
        var block = eth.getBlock(i, true); 
        if (block.transactions != null) {
            block.transactions.forEach(function (tx) {
                console.log("tx hash: " + tx.hash + "\nFROM: " + tx.from + "\nTO: " + tx.to + "\nDATA: " + web3.toUtf8(tx.input) + "\n");
            })
        }
    }
}
