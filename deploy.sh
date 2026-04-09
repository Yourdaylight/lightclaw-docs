#!/bin/bash
# deploy.sh — 一键构建并部署到生产服务器
# 用法:
#   export DEPLOY_PASS=your_password
#   ./deploy.sh

set -e

SERVER="root@43.132.178.232"
REMOTE_DIR="/var/www/lightclaw-docs"

if [ -z "$DEPLOY_PASS" ]; then
  echo "❌ 请先设置环境变量 DEPLOY_PASS: export DEPLOY_PASS=your_password"
  exit 1
fi

echo "==> 构建文档..."
npm run build

echo "==> 上传到服务器..."
sshpass -p "$DEPLOY_PASS" rsync -az --delete \
  -e "ssh -o StrictHostKeyChecking=no" \
  ./build/ $SERVER:$REMOTE_DIR/

echo "==> Reload nginx..."
sshpass -p "$DEPLOY_PASS" ssh -o StrictHostKeyChecking=no $SERVER \
  "kill -HUP \$(pgrep -f 'nginx: master') && echo 'nginx reloaded'"

echo "==> 完成! 访问 https://lightclaw.clawtown.cn"
