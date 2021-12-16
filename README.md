# ep2_mac0426
Aplicação do BigchainDB para o projeto 2 da matéria MAC0426

To reproduce our results you will need to run a node from BigchainDB, this can be easily done by using docker as follow:

```
sudo docker run \
  --detach \
  --name bigchaindb \
  --publish 9984:9984 \
  --publish 9985:9985 \
  --publish 27017:27017 \
  --publish 26657:26657 \
  --volume $HOME/bigchaindb_docker/mongodb/data/db:/data/db \
  --volume $HOME/bigchaindb_docker/mongodb/data/configdb:/data/configdb \
  --volume $HOME/bigchaindb_docker/tendermint:/tendermint \
  bigchaindb/bigchaindb:all-in-one
  ```
  
  You also need node.js to run this project, assuming you have installed node, you can start this application with this command:
  
  ```
  node index.js
  ```
