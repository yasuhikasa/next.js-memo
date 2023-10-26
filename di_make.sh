#!/bin/bash

# WebアプリコンテンツサーバのDockerイメージを作成する

# コンテンツサーバのソースディレクトリ
SOURCE_DIR=container/WebContentsServer

#生成するDockerイメージ・イメージファイル名
IMAGE_NAME=di_webcontentssrv
DOCKER_IMAGEDIR=../../docker/images/
IMAGE_FILE_NAME="${IMAGE_NAME}.tar"
echo ${IMAGE_FILE_NAME}

#Docker上にイメージが残っていれば先に削除する
if [ "`docker images | grep ${IMAGE_NAME}`" ]; then
  docker rmi ${IMAGE_NAME}
fi
cd ${SOURCE_DIR}

#Dockerビルダーのキャッシュを削除する
docker builder prune -a -f

#Dockerイメージを作成する
docker buildx build --platform linux/arm64 -f Dockerfile.production --no-cache -t ${IMAGE_NAME} .
docker save ${IMAGE_NAME} -o ${DOCKER_IMAGEDIR}/${IMAGE_FILE_NAME}

docker rmi ${IMAGE_NAME}
