#!/bin/sh

docker compose pull ui
docker compose up -d --no-deps --force-recreate ui
