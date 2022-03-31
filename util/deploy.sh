#!/bin/bash

# parâmetros
source ./util/baseParam.sh

# tar
tar -czvf dist.tar.gz ./dist

# copy
scp dist.tar.gz root@$DEST_SERVER:$TGZ_FILE

# unpack
ssh root@$DEST_SERVER "tar -xzvf $TGZ_FILE -C $ENV_PATH"

# exclui TGZ lá
ssh root@$DEST_SERVER "rm $TGZ_FILE"

# exclui lá
ssh root@$DEST_SERVER "rm $DEPLOY_PATH -R"

# move a pasta lá
ssh root@$DEST_SERVER "mv $ENV_PATH/dist $DEPLOY_PATH"
echo 'cópia finalizada'

# exibe os dados
echo "PACKAGE_NAME:==$PACKAGE_NAME:=="

echo "----------------------- LS -----------------------"
ssh root@$DEST_SERVER "ls $DEPLOY_PATH"
echo "----------------------- LS -----------------------"

# deleta o projeto no pm2 e recria
ssh root@$DEST_SERVER "cd $DEPLOY_PATH && pm2 start pm2-ecosystem.config.js"
ssh root@$DEST_SERVER "pm2 save"

echo "Terminou"
