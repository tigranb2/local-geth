var args = require('yargs').argv; //nodejs module for command line inputs
var range = (args.range === undefined) ? 10 : args.range; //if --range is undefined, set it to 10
var connect = (args.connect === undefined) ? 'ws://localhost:8101' : args.connect; //if --connect is undefined, set it node1 addr:port

let getTx = require ("./getTx-v2"); //imports getTx() function from getTx-v2.js

var Web3 = require('web3'); //nodejs module for web3
var web3 = new Web3();
web3.setProvider(new web3.providers.WebsocketProvider(connect)) //connect to specified node via WebSocket

fs = require('fs'); //nodejs module for writing to file system
fs.unlink('./data/log.txt', (_) => {}); //deletes log file before use, comment this line to keep file between uses

async function checkTx() {
    var latestBlock = await web3.eth.getBlockNumber();
    var blockInfo = await web3.eth.getBlock(latestBlock);
    if (blockInfo.transactions > 0) {
        console.log("New block with transactions: " + blockInfo.number);
        getTx.getTx(range); //writes last transactions within the last 10 blocks
    }
}

checkTx();

web3.eth.subscribe('newBlockHeaders', function(error, _){
    if (!error) {checkTx()}
})




