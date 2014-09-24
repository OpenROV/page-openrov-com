#!/bin/sh
CONFIG=${PWD#}/openrov-com
echo Loading docker configuration from: ${CONFIG#}/
docker run -d -p 2000:2368 -v ${CONFIG}:/ghost-override --name='openrov-ghost' dockerfile/ghost
