#!/bin/bash

# Exit script immediately if any command fails
set -e

echo "Killing all existing tmux sessions..."
tmux kill-server || true

PROJECT_DIR=~/my-portfolio
cd "$PROJECT_DIR"

echo "Fetching latest changes from GitHub..."
git fetch
git reset origin/main --hard

echo "Activating virtual environment..."
source python3-virtualenv/bin/activate

echo "Installing dependencies..."
pip install -r requirements.txt

echo "Starting Flask server in a new tmux session..."
tmux new-session -d -s mysite "
cd $PROJECT_DIR && \
source python3-virtualenv/bin/activate && \
export FLASK_APP=app.py && \
flask run --host=0.0.0.0
"

echo "Redeployment complete."
