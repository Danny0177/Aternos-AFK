# Aternos AFK Bot Debug Edition 

- A lightweight Minecraft AFK bot designed to keep an Aternos Minecraft server online using Mineflayer and Railway, Including comprehensive debug abilities to improve upon the base bot out of the box.

##**I have aimed here for reliability and simplicity:**
- Lightweight anti-AFK system
- No pathfinding
- Low CPU and RAM usage
  ##**Features:**
- Automatic reconnect after disconnects
- Automatic Respawns
- Handles Aternos restarts
- Handles resource packs
- Lightweight keep-alive activity
- Render & Railway: Web Service compatible
- Optional login command support (For plugins like AuthMe)

# Setup
**##1. Requirements:**
- A Minecraft server
- A Railway/Render account (for hosting)
## 2. Server dependencies:
Offline Mode Enabled
- The bot does not use a premium account to join, these accounts require Online Mode = False
ViaVersion, ViaBackward, and ViaRewind plugins installed on the software "Paper". 
- Your server Version might not be supported by mineflayer. These plugins allow the bot to communicate and join anyway.

## 3. Install dependencies (on the Web hosing platform)

Run:

```bash
npm install
npm start
