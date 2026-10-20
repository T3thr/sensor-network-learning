#!/bin/bash
# 305432 เครือข่ายเซนเซอร์ - Web Hosting Controller (Start Script)
# Nginx on Port 8080 + Free Cloudflare Cloud Tunnel

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
mkdir -p "$DIR/logs"

echo "========================================================"
echo "🌐 305432 Sensor Network - Starting Web Hosting Service"
echo "========================================================"

# 1. Start Nginx
if pgrep -f "nginx.*sensor-network/nginx.conf" > /dev/null; then
    echo "✅ [1/2] Nginx is already running on port 8080."
else
    echo "🚀 [1/2] Starting Nginx on port 8080..."
    /opt/homebrew/bin/nginx -c "$DIR/nginx.conf"
    if [ $? -eq 0 ]; then
        echo "✅ Nginx started successfully."
    else
        echo "❌ Failed to start Nginx. Check logs/error.log."
        exit 1
    fi
fi

# 2. Start Cloudflare Tunnel
if pgrep -x cloudflared > /dev/null; then
    echo "✅ [2/2] Cloudflare Tunnel is already running."
else
    echo "☁️  [2/2] Connecting to Cloudflare Cloud Edge (http2)..."
    rm -f "$DIR/logs/tunnel.log"
    /opt/homebrew/bin/cloudflared tunnel --protocol http2 --url http://127.0.0.1:8080 > "$DIR/logs/tunnel.log" 2>&1 &
fi

# Wait for tunnel URL
echo "⏳ Waiting for Cloud Public URL..."
URL=""
for i in {1..20}; do
    sleep 1
    if [ -f "$DIR/logs/tunnel.log" ]; then
        URL=$(grep -oE "https://[a-zA-Z0-9-]+\.trycloudflare\.com" "$DIR/logs/tunnel.log" | head -n 1)
        if [ -n "$URL" ]; then
            break
        fi
    fi
done

echo ""
echo "========================================================"
echo "🎉 Web Hosting is LIVE & READY (Free Cloudflare Tunnel)"
echo "========================================================"
if [ -n "$URL" ]; then
    echo "🔗 Cloud Public URL (เข้าผ่านอินเทอร์เน็ตได้ทุกที่):"
    echo "   🏠 Hub Portal:       $URL/"
    echo "   📄 Paper 4 (Main):   $URL/paper-4/"
    echo "   📖 Translation P4:   $URL/paper-4/translation.html"
    echo "   📄 Paper 3 (Main):   $URL/paper-3/"
    echo "   📖 Translation P3:   $URL/paper-3/translation.html"
    echo "   📄 Paper 3 (v2):     $URL/paper-3/v2/"
    echo "   📄 Paper 2:          $URL/paper-2/"
    echo "   📄 Paper 1:          $URL/paper-1/"
else
    echo "⚠️  Tunnel is starting in background. Check: $DIR/logs/tunnel.log"
fi
echo ""
echo "🏠 Local Network URL (ภายในเครื่อง Mac):"
echo "   http://localhost:8080/"
echo "   http://localhost:8080/paper-4/"
echo "   http://localhost:8080/paper-3/"
echo "   http://localhost:8080/paper-2/"
echo "   http://localhost:8080/paper-1/"
echo "========================================================"
echo "🛑 วิธีปิดเมื่อเลิกใช้งาน: รันคำสั่ง ./host-stop.sh"
echo "========================================================"
