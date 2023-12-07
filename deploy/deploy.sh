#!/bin/sh

docker build -t andreclerigo/payload-dashboard-ui:latest-arm64-build -f ../Dockerfile.build ..
docker push andreclerigo/payload-dashboard-ui:latest-arm64-build
docker compose pull ui
docker compose up -d --no-deps --force-recreate ui
