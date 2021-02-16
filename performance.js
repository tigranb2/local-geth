var args = require('yargs').argv; //nodejs module for command line inputs
var connect = (args.connect === undefined) ? 'ws://localhost:8101' : args.connect; //if --connect is undefined, set it node1 addr:port

var Web3 = require('web3'); //nodejs module for web3
var web3 = new Web3();
web3.setProvider(new web3.providers.WebsocketProvider(connect)) //connect to specified node via WebSocket

fs = require('fs'); //nodejs module for writing to file system
fs.unlink('./data/performance.txt', (_) => {}); //comment this line to keep file between uses

var pendingTxTime;
var minedTxTime;
var latency;

async function checkPerformance() {
    var latestBlock = await web3.eth.getBlockNumber();
    var blockInfo = await web3.eth.getBlock(latestBlock);
    if (blockInfo.transactions > 0) {
        minedTxTime = new Date(); //record time when transaction is mined
        latency = minedTxTime.getTime() - pendingTxTime.getTime(); //difference of time in milliseconds
        fs.appendFileSync('./data/performance.txt', (latency.toString() + "\n"), (err) => { //synchronously writes to ./data/performance.txt
            if (err) {return console.log(err);}
        });
    }
}

checkPerformance();

web3.eth.subscribe('pendingTransactions', function(error, _){
    if (!error) {pendingTxTime = new Date();} //record time when tranasciton is written
})

web3.eth.subscribe('newBlockHeaders', function(error, _){
    if (!error) {checkPerformance()} 
})




