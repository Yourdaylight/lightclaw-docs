#!/bin/bash
# deploy.sh — 一键构建并部署到生产服务器
# 用法: ./deploy.sh

set -e

SERVER="root@43.132.178.232"
REMOTE_DIR="/var/www/lightclaw-docs"
NGINX_MASTER_PID=$(sshpass -p 'lightclaw@1234' ssh -o StrictHostKeyChecking=no $SERVER "cat /run/nginx.pid 2>/dev/null || pgrep -f 'nginx: master'")

echo "==> 构建文档..."
npm run build

echo "==> 上传到服务器..."
sshpass -p 'lightclaw@1234' rsync -az --delete \
  -e "ssh -o StrictHostKeyChecking=no" \
  ./build/ $SERVER:$REMOTE_DIR/

echo "==> Reload nginx..."
sshpass -p 'lightclaw@1234' ssh -o StrictHostKeyChecking=no $SERVER \
  "kill -HUP \$(pgrep -f 'nginx: master') && echo 'nginx reloaded'"

echo "==> 完成! 访问 https://lightclaw.clawtown.cn"
