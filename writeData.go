package main

import (
	"fmt"
	"os/exec"
	"github.com/gocql/gocql"
)

type testData struct {
	id int
	msg string
}
func main() {
	msg1 := testData{1, "Hello World"}
	cassandraWrite(msg1)
}

func cassandraWrite(data testData){
	cluster := gocql.NewCluster("127.0.0.1") //connect to cassandra database
	cluster.Keyspace = "test_keyspace"
	session, err := cluster.CreateSession() 
	
	if err != nil {
		fmt.Print(err)
	}

	session.Query("INSET INTO test_table(id, message) VALUES(?, ?)", data.id, data.msg).Exec() //create new row in test_table
}

func gethWrite(connect string, msg string){
	tx := fmt.Sprintf("eth.sendTransaction({from:eth.accounts[0],to:eth.accounts[0],value:1,data:web3.toHex('%v')})", msg)
	output, err := exec.Command("geth", "attach", connect, "--exec", tx).CombinedOutput() 

	if err != nil {
		fmt.Println(err)
	}
	fmt.Println(string(output))
}