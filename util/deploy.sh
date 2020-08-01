#!/bin/bash

# parâmetros
DEPLOY_BASE_PATH="/root/projects/"
ENV="production"
PORT="8092"
PACKAGE_NAME="express-site-lagoinha"
DEPLOY_PATH="$DEPLOY_BASE_PATH/$ENV/$PACKAGE_NAME/"
PM2_NAME="$PACKAGE_NAME-$ENV-$PORT"

# exclui lá
ssh root@clicaaki.com "rm $DEPLOY_PATH -R"
echo 'excluído remoto'

# copy
scp -r ./dist root@clicaaki.com:$DEPLOY_PATH
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
