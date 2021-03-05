package main

import (
	"fmt"
	"os/exec"
)

func main() {
	writeMetaData("ws://10.0.0.1:8101", "hello world")
}

func writeMetaData(connect string, msg string){
	tx := fmt.Sprintf("eth.sendTransaction({from:eth.accounts[0],to:eth.accounts[0],value:1,data:web3.toHex('%v')})", msg)
	output, err := exec.Command("geth", "attach", connect, "--exec", tx).CombinedOutput() 

	if err != nil {
		fmt.Println(err)
	}
	fmt.Println(string(output))
}