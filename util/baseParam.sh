#!/bin/bash

# parâmetros
DEPLOY_BASE_PATH="/root/projects/"
ENV="production"
PORT="8092"
PACKAGE_NAME="express-site-lagoinha"
ENV_PATH="$DEPLOY_BASE_PATH/$ENV/"
DEPLOY_PATH="$ENV_PATH/$PACKAGE_NAME/"
TGZ_FILE="$ENV_PATH/$PACKAGE_NAME.tar.gz"
PM2_NAME="$PACKAGE_NAME-$ENV-$PORT"
