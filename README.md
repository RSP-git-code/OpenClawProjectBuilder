# OpenClawProjectBuilder
OpenClawProjectBuilder is an AI-powered coding assistant that helps developers brainstorm ideas, generate structured project scaffolding, and automatically create documentation from a single prompt.
Built using Docker, OpenClaw, and Telegram, the system allows users to describe a project via a Telegram bot. The agent then generates a complete project structure, including starter code, dependency files, and a detailed README, and saves it locally in the WSL workspace.
This approach significantly reduces the time required for initial project setup and helps developers focus directly on implementation and problem-solving.

# What It Does
You type in Telegram:

"build a spam classifier using logistic regression and gmail api"

And the bot generates:

-📂 Full folder structure

-💻 Starter code with placeholder functions

-📦 requirements.txt / package.json

-📄 README.md with setup instructions

-🏗️ Architecture explanation

All files are saved to your workspace and ready to run.

# Tech Stack

- OpenClaw : AI gateway and agent framework
-Google AI Models :gemini-3.5-flash,gemma-4-26b-a4b-it,gemini 2.5 Flash-Lite

-Telegram Bot API — chat interface:@BotFather

-Docker — containerized setup


# Example Projects Generated
ProjectDescriptiontodo_appPython CLI todo app with SQLitetravel_websiteTravel website with frontendpilot_farm_platformFastAPI + PostgreSQL + PostGIS crop registration platform

🚀 Setup
Prerequisites

Docker Desktop
Telegram Bot Token (from @BotFather)
Google Gemini API Key (from Google AI Studio)

1. Clone the repo
bashgit clone https://github.com/YOUR_USERNAME/ClawProjectBuilder.git
cd ClawProjectBuilder
2. Configure environment
bashcp .env.example .env
Edit .env and fill in:
envOPENCLAW_GATEWAY_TOKEN=     # run: openssl rand -hex 32
GEMINI_API_KEY=             # your Google Gemini API key
TELEGRAM_BOT_TOKEN=         # your Telegram bot token
3. Start the gateway
bashdocker compose up -d openclaw-gateway
4. First-time setup
bash# Run setup
docker compose run --rm openclaw-cli setup

# Configure Gemini model
docker compose run --rm openclaw-cli configure --section model
# Select: google/gemini-2.5-flash

# Configure Telegram channel
docker compose run --rm openclaw-cli configure --section channels
# Enter your Telegram bot token
5. Approve yourself
Message your bot on Telegram — it will send a pairing code. Run:
bashdocker compose run --rm openclaw-cli pairing approve telegram YOUR_PAIRING_CODE
6. Start building!
Message your bot with any project idea:
build a url shortener with flask and sqlite
7. Get your generated files
bashls ~/.openclaw/workspace/

# Copy to your machine
cp -r ~/.openclaw/workspace/PROJECT_NAME /your/desired/path

🔧 Useful Commands
bash# Start gateway
docker compose up -d openclaw-gateway

# Open TUI
docker compose run --rm openclaw-cli tui

# Fix permissions (if EACCES error)
docker compose run --rm --user root --entrypoint chown openclaw-cli -R node:node /home/node/.openclaw

# Check Telegram connection
docker compose logs openclaw-gateway | grep -i telegram

# Stop everything
docker compose down

# 📸 How It Works

Send a project idea to your Telegram bot

OpenClaw routes it to current selected model 
The AI generates a complete project skeleton
Files are saved to ~/.openclaw/workspace/
Copy them to your machine and start coding


⚠️ Important

Never commit your .env file — it contains real API keys
The .gitignore already excludes it
Generate your gateway token with: openssl rand -hex 32
