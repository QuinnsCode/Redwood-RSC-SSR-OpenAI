#!/bin/sh

set -ex

if [ -n $MIGRATE_ON_BOOT ]; then
  $(dirname $0)/migrate.sh
fi

npx rw-server --api-port 8911 --web-port 8910 --api-host 0.0.0.0 --web-host 0.0.0.0

