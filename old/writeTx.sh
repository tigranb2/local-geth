while getopts c:m: parameter
do
    case "${parameter}" in
        c) CONNECT="${OPTARG}";;
        m) MSG="${OPTARG}";;
        esac
done

geth attach ${CONNECT:-"ws://10.0.0.1:8101"} --exec "eth.sendTransaction({from:eth.accounts[0],to:eth.accounts[1],value:1,data:web3.toHex('${MSG:-"null"}')})"
# connects to h1 if no wsaddr is provided
# sends "null" if no message is provided
