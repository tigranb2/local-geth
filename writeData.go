package main

import (
	"fmt"
	"os/exec"
)

func main() {
	writeMetaData("ws://localhost:8101", "hello!")
}

func writeMetaData(connect string, msg string){
	metaData := fmt.Sprintf("attach %v --exec 'eth.sendTransaction({from:eth.accounts[0],to:eth.accounts[0],value:1,data:web3.toHex(%v)'", connect, msg)
	//output, err := exec.Command("geth", metaData).CombinedOutput() // returns 'Fatal: Unable to attach to remote geth: no known transport for URL scheme "c"'
	output, err := exec.Command("geth", metaData).CombinedOutput() // returns "invalid command: "attach ws://127.0.0.1:8101...." <--- rest of the metaData string

	if err != nil {
		fmt.Println(err)
	}

	fmt.Println(string(output))
}