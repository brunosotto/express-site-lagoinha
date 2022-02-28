#!/bin/bash

# parâmetros
source ./util/baseParam.sh

# tar
tar -czvf dist.tar.gz ./dist

# copy
scp dist.tar.gz root@clicaaki.com:$TGZ_FILE

# unpack
ssh root@clicaaki.com "tar -xzvf $TGZ_FILE -C $ENV_PATH"

# exclui TGZ lá
ssh root@clicaaki.com "rm $TGZ_FILE"

# exclui lá
ssh root@clicaaki.com "rm $DEPLOY_PATH -R"

# move a pasta lá
ssh root@clicaaki.com "mv $ENV_PATH/dist $DEPLOY_PATH"
echo 'cópia finalizada'

# exibe os dados
echo "PACKAGE_NAME:==$PACKAGE_NAME:=="

echo "----------------------- LS -----------------------"
ssh root@clicaaki.com "ls $DEPLOY_PATH"
echo "----------------------- LS -----------------------"

# deleta o projeto no pm2 e recria
ssh root@clicaaki.com "pm2 delete $PM2_NAME"
ssh root@clicaaki.com "cd $DEPLOY_PATH && pm2 start pm2-ecosystem.config.js"
ssh root@clicaaki.com "pm2 save"

echo "Terminou"
