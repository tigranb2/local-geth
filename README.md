# local-geth
# Running
## Initializing
Go to this directory and use the following commands to initialize geth (use the password 1234):
```
geth --datadir node1 account new
geth --datadir node2 account new
geth --datadir node1 init genesis.json
geth --datadir node2 init genesis.json
```

## Booting the nodes
Open terminal to this directory and type to start the bootnode:
```
./bootnode.sh
```

node1 starts off mining. Start the node by typing the following into a new terminal instance:
```
./node1.sh
```

Let it mine a little, so that you have some ether to send in a transaction.    
To stop it from mining, type:
```
miner.stop()
```

To connect node2, type the following in a new terminal instance:
```
./node2.sh
```

## Connecting the nodes
In node2, type: 
```
admin.nodeInfo.enode
```
Copy the output, and run the following in node1:
```
admin.addPeer(<copied string>)
```

# Sending the transaction
In node2, type the following to get the hash of the account on node2, and copy it:
```
eth.accounts[0]
```

In node1, you can now send a transaction to node2:
```
eth.sendTransaction({from:eth.accounts[0],to:<node2 account hash>,value:1,data:web3.toHex(<any string>)})
```

Copy the output string, as this is the hash of the transaction.

Restart mining in node1 for a minute or so (you can stop it after the transaction has been mined):
```
miner.start()
```

In node2, type the following to save the transaction's input data as a variable and convert the hash to Utf8:
```
tx = getTransaction(<transaction hash>).input
web3.toUtf8(tx)
```

# Viewing transaction data
## saveTx.sh
In a new terminal instance, type
```
./saveTx.sh range node
```
range is an optional positve integer that denotes how many blocks before the current block to start checking transactions from. Leave it blank to default to 500.       
       
       
node is an optional parameter that denotes which node to connect to. Leave blank to connect to node1.    
*The node you are connecting to must be online.*        
node should be in the following format:
```
http://rpcaddr:rpcport
```
rpcaddr and rpcport are defined in node1.sh and node2.sh        

The output goes to ./log.txt.      
## getTX.js
getTx returns all transactions within a specified range, displaying the transaction hash, sender, reciever, and data.     
If a range is provided, getTx will return all transactions (range) blocks from the latest block. If none is provided, getTx will return all transactions 500 blocks from the latest block. If the blockchain is shorter than 500 blocks, all transactions in the blockchain are returned.      
In a node, type:
```
loadScript("getTX.js")
getTx(range)
```

## checkTx.js
checkTx.js checks each new block, and runs getTx() if the block contains at least one transaction.     
getTx() will display all the transactions from the last 500 blocks (or the entire blockchain, if it's less than 500 blocks long).     
Note: getTx.js will need to be loaded in.      
```
loadScript("checkTx.js")
```


