module.exports = {getTx}; //export getTx() for use from other files
var args = require('yargs').argv; //nodejs module for command line inputs
var range = (args.range === undefined) ? 500 : args.range; //if --range is undefined, set it to 500
var connect = (args.connect === undefined) ? 'ws://localhost:8101' : args.connect; //if --connect is undefined, set it node1 addr:port
var close = (args.close === undefined) ? false : args.close; //write --close in the command line for the file to automatically exit when done

var Web3 = require('web3'); //nodejs module for web3
var web3 = new Web3();
web3.setProvider(new web3.providers.WebsocketProvider(connect)) //connect to specified node via RPC

fs = require('fs'); //nodejs module for writing to file system
fs.unlink('log.txt', (_) => {}); //deletes log file before use, comment this line to keep file between uses


async function getTx(range) {
    var latestBlock = await web3.eth.getBlockNumber(); //async call for latest block number

    if (range >= latestBlock) { //the starting block (latestBlock - range) can not be less than 1
        var startingBlock = 1;
    } else {
        var startingBlock = latestBlock - range;
    }

    for (var i = startingBlock; i <= latestBlock; i++) {
        var block = await web3.eth.getBlock(i, true); //async call for block data
        if (block.transactions != null) {
            block.transactions.forEach(async function (tx) {
                var txInfo = "tx hash: " + tx.hash + "\nFROM: " + tx.from + "\nTO: " + tx.to + "\nDATA: " + web3.utils.toUtf8(tx.input) + "\n\n";
                fs.appendFileSync('log.txt', txInfo, (err) => { //synchronously writes to log.txt
                    if (err) {return console.log(err);}
                });
            })
        }
    }

    if(close){process.exit(0)}; //if --close is passed through cmd line, close the file
}

getTx(range);







