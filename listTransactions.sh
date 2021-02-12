RANGE=${1:-500} # specify how many blocks back to start checking transactions from, default value is 500
NODE=${2:-http://localhost:8101} # specify which node to attach to, default node is node1
geth attach $NODE > log.txt << EOF
loadScript("getTx.js")
getTx("$RANGE")
EOF
sed -i '1,12d' log.txt # deletes the Geth JS Console intro text
sed -i '$d' log.txt && sed -i '$d' log.txt && sed -i '$d' log.txt # deletes extra lines at the end
