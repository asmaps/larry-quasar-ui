#!/bin/bash

set -e
quasar build
rsync -ave ssh dist/ carrot.asw.io:/opt/nginx/data/static/larry
