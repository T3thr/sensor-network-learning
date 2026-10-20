#!/bin/bash
# 305432 เครือข่ายเซนเซอร์ - Web Hosting Controller (Restart / Re-deploy Script)

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "🔄 Re-deploying Sensor Network Web Hosting..."
"$DIR/host-stop.sh"
sleep 1
"$DIR/host-start.sh"
