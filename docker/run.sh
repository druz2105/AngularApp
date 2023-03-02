#!/bin/bash
if [[ "$NODE_ENV" == 'develop' ]]; then
  npm run start_dev
else
  npm run start
fi
