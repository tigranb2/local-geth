function getTx(range) {
    if (range != null && range >= 1) {
        var startingBlock = eth.blockNumber - range;
    } else {
        var startingBlock = eth.blockNumber - 500;
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