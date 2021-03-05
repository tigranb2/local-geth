package main

import (
	"fmt"
	"os/exec"
)

func main() {
	writeMetaData("ws://localhost:8101", "hello!")
}

func writeMetaData(connect string, msg string){
	metaData := fmt.Sprintf("")//--exec 'eth.sendTransaction({from:eth.accounts[0],to:eth.accounts[0],value:1,data:web3.toUtf8(%v)'", connect, msg)
	_, err := exec.Command("geth", metaData).Output()
	if err != nil {
		fmt.Println(err)
	}
}