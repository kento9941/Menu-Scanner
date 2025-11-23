#!/bin/bash
# Startup script for Render deployment
# Render provides PORT environment variable

PORT=${PORT:-8000}

# Change to backend directory if we're in the repo root
# This handles both cases: root directory set to "backend" or repo root
if [ -d "backend" ] && [ ! -f "src/main.py" ]; then
    cd backend
fi

uvicorn src.main:app --host 0.0.0.0 --port $PORT

