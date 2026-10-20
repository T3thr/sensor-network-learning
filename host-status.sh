#!/bin/bash
# 305432 เครือข่ายเซนเซอร์ - Web Hosting Status Checker

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "========================================================"
echo "📊 305432 Sensor Network - Web Hosting Status"
echo "========================================================"

# Nginx Status
if pgrep -f "nginx.*sensor-network/nginx.conf" > /dev/null; then
    echo "🟢 Nginx: RUNNING (Local: http://localhost:8080/)"
else
    echo "🔴 Nginx: STOPPED"
fi

# Cloudflare Tunnel Status
if pgrep -x cloudflared > /dev/null; then
    echo "🟢 Cloudflare Tunnel: RUNNING"
    if [ -f "$DIR/logs/tunnel.log" ]; then
        URL=$(grep -oE "https://[a-zA-Z0-9-]+\.trycloudflare\.com" "$DIR/logs/tunnel.log" | head -n 1)
        if [ -n "$URL" ]; then
            echo ""
            echo "🔗 Active Cloud URLs:"
            echo "   🏠 Hub Portal:       $URL/"
            echo "   📄 Paper 4 (Main):   $URL/paper-4/"
            echo "   📖 Translation P4:   $URL/paper-4/translation.html"
            echo "   📄 Paper 3 (Main):   $URL/paper-3/"
            echo "   📖 Translation P3:   $URL/paper-3/translation.html"
            echo "   📄 Paper 3 (v2):     $URL/paper-3/v2/"
            echo "   📄 Paper 2:          $URL/paper-2/"
            echo "   📄 Paper 1:          $URL/paper-1/"
        fi
    fi
else
    echo "🔴 Cloudflare Tunnel: STOPPED"
fi
echo "========================================================"
