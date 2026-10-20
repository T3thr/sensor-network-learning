#!/bin/bash
# 305432 เครือข่ายเซนเซอร์ - Web Hosting Controller (Stop Script)
# Stops Cloudflare Cloud Tunnel & Nginx cleanly

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "========================================================"
echo "🛑 305432 Sensor Network - Stopping Web Hosting Service"
echo "========================================================"

# 1. Stop Cloudflare Tunnel
if pgrep -x cloudflared > /dev/null; then
    echo "☁️  Stopping Cloudflare Tunnel..."
    pkill -x cloudflared
    for i in {1..10}; do
        if ! pgrep -x cloudflared > /dev/null; then
            break
        fi
        sleep 0.3
    done
    if pgrep -x cloudflared > /dev/null; then
        pkill -9 -x cloudflared 2>/dev/null
        sleep 0.3
    fi
    rm -f "$DIR/logs/tunnel.log"
    echo "✅ Cloudflare Tunnel stopped."
else
    rm -f "$DIR/logs/tunnel.log"
    echo "ℹ️  Cloudflare Tunnel is not running."
fi

# 2. Stop Nginx
if [ -f "$DIR/logs/nginx.pid" ]; then
    PID=$(cat "$DIR/logs/nginx.pid")
    echo "🚀 Stopping Nginx (PID: $PID)..."
    /opt/homebrew/bin/nginx -s stop -c "$DIR/nginx.conf" 2>/dev/null || kill -TERM "$PID" 2>/dev/null
    rm -f "$DIR/logs/nginx.pid"
else
    pkill -f "nginx.*sensor-network/nginx.conf" 2>/dev/null
fi

for i in {1..10}; do
    if ! pgrep -f "nginx.*sensor-network/nginx.conf" > /dev/null; then
        break
    fi
    sleep 0.3
done
echo "✅ Nginx stopped."

echo "========================================================"
echo "🔒 All services stopped successfully. (Offline)"
echo "========================================================"
