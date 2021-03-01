# local-geth
# Running
## Initializing
It is important that node.js and npm are installed on the computer 

```
geth --datadir node1 account new
geth --datadir node2 account new
# 1234 should be used as the password for both nodes
geth --datadir node1 init genesis.json
geth --datadir node2 init genesis.json
```

## Booting the nodes
To start the bootnode navigate to /local-geth and execute:
```
./bootnode.sh
```

Start the node by typing the following into a new terminal instance:
```
./node1.sh
# node1 starts off mining
# mining can be stopped with miner.stop()
# inorder to call node2, call ./node2.sh
```

## Connecting the nodes
In order to peer the nodes together, you must provide one of the nodes' enode id to the other
In one of the nodes, type:
```
admin.nodeInfo.enode
# copy the output
# run the following in the other node
admin.addPeer(<copied string>)
```

# Sending the transaction
Transactions are can be sent between accounts on two different nodes, given they are peered.
Execute:
```
eth.sendTransaction({from:eth.accounts[0],to:<account hash>,value:1,data:web3.toHex(<any string>)})
# the recepient's hash value can be obtained by typing eth.accounts[0] in the node with the recepient's account
# any string can passed into the data field, and it will be converted to hex
# the functions will copy the transaction's hash, save for use in viewing transaction data
```

Once the transaction has been mined, it can be viewed with the following code:
```
tx = getTransaction(<transaction hash>).input
web3.toUtf8(tx)
```

# Viewing transaction data
The following scripts make use of a few nodejs modules. Navigate to /local-geth and execute:
```
npm install web3
npm install yargs
```

## getTx-v2.js
getTx-v2 returns all transactions on a node within a certain range and outputs them to /data/log.txt.           
Make sure that the node whose transactions you want to get is running with a WebSocket address and port.                   
Execute the following in a new terminal instance:
```
node getTx-v2.js --close --range --connect
# --close must be included for the file to close after it is done writing
# --range is an optional parameter that specifies how many blocks from the latest block to start mining from
# range is set to 500 if no value is provided, or to the whole blockchain if a value greater than the chain length is provided
# --connect is an optional parameter that specified the wsaddr:wsport of the node to connect to
# connects to node1's addr:port by default
```

## checkTx-v2.js
checkTx-v2 will automatically run getTx-v2 everytime a block with at least one transaction is mined.                       
Make sure that the node whose transactions you want to get is running with a WebSocket address and port.                    
Execute the following in a new terminal instance:
```
node checkTx-v2.js --range --connect
# --range is an optional parameter that specifies the range for getTx-v2
# range is set to 10 if no value is provided
# --connect is an optional parameter that specified the wsaddr:wsport of the node to connect to
# connects to node1's addr:port by default
```

## perfromance-v2.js
performance.js records the difference in time (milliseconds) between when a transaction is made and when it is mined.    
The result is stored in /data/performance.txt.                 
```
node performance.js --connect
# --connect is an optional parameter that specified the wsaddr:wsport of the node to connect to
# connects to node1's addr:port by default
```
In order for the performance to be accurately measured, tranactions should be written with the following format: 
```
eth.sendTransaction({from:<from>,to:<to>,value:1,data:web3.toHex(new Date().getTime().toString() + "00")})
// + "00" is important in order to avoid the following error: "cannot unmarshal hex string of odd length"
```
