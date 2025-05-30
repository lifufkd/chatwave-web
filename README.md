[🇬🇧 English](./README.md) | [🇷🇺 Русский](./README/README.ru.md)

<p align="center">
  <img src="assests/logo-dark.svg" alt="ChatWave logo" width="200"/>
</p>

# 💬 ChatWave Web

**ChatWave Web** — This is a modern, fast and secure web frontend for the ChatWave messenger, implemented in JavaScript.  
A simple interface, powerful features, and flexible customization are all you need to communicate in 2025. 🚀

![Chat Screenshot](./assests/ChatWaveBanner.png)

---

## 🌐 Opportunities

### 📝 Registration

- **Nickname** — minimum **3 characters**
- **Login** — minimum **3 characters**
- **Password** — minimum **8 characters**, required:
  - one **uppercase Latin** letter,
  - one **lowercase Latin** letter,
  - one **digit**

### 🔐 Entrance

- **Login**
- **Password**

### 🏠 Home Page

- 📥 Getting a list of **personal chats**
- 🔍 **User search** (validation: minimum 3 characters)
- ➕ Create **personal dialogues**
- 👤 View and **edit your profile**:
  - Avatar
  - Nickname
  - Login
  - Personal information (BIO)
  - Birthday
  - Date/time of last online
  - Date/time of account creation
  - Date/time of the last update
- 🧑‍💼 Viewing **other people's profiles**
- 🧹 Clearing chats
- 🚪 Log out of chats
- ❌ Account deletion

### 💬 Chat

- 💌 Message display:
  - Content (text, photo, voice)
  - Sender's avatar
  - Nickname
  - Date and time of sending
- ✍️ **Sending**:
  - Text messages
  - Photos
  - Photos with caption
  - Voice messages
- 🔄 **Receiving** messages from the interlocutor
- 🗑️ **Deleting** messages (your own and the other person's)
- 🖊️ **Edit** your messages (text only)

## 📈 Development Roadmap

Planned and implemented features to improve **ChatWave**:

| Feature                                   | Description                                                  | Status     |
|-------------------------------------------|--------------------------------------------------------------|------------|
| 🖼️ Image Viewer                           | Open images in full size                                     | 🔄 In Progress |
| 🔔 New Message Sound                      | Play sound when a new message arrives                        | ⏳ Planned |
| 📎 Media Message Support                  | Sending various media types (e.g., files, videos)            | ⏳ Planned |
| 📞 Voice & Video Calls                    | Real-time voice and video communication                      | ⏳ Planned |
| 🔐 HTTPS Support                          | Secure connection via self-signed and Let's Encrypt certs    | ✅ Done    |

## ⚙️ Installation

### 🔧 Option 1: Manual installation

1. Clone the repository:
   ```
   git clone https://github.com/lifufkd/chatwave-web.git
   cd chatwave-web
   ```
2. Set up the configuration in js/config.js:
   ```
   export const API_BASE_URL = "http://127.0.0.1:8000";
   export const API_TOKEN_LIFESPAN = 1209500;
   export const LONG_POLLING_DELAY = 1;
   export const DEFAULT_MESSAGES_QUANTITY = 20;
   ```
3. Start a web server (for example, using a Live Server or another dev server)

### 🐳 Option 2: Docker
1. Download the docker image:
```
docker pull ghcr.io/lifufkd/chatwave-web:latest
```
2. Run with the necessary environment variables:
```
# HTTP (no ssl) mode
docker run -d \
  -e API_URL=http://backend-host \
  -e API_PORT=8000 \
  -e JWT_ACCESS_TOKEN_EXPIRES=1209500 \
  -e LONG_POLLING_DELAY=1 \
  -e DEFAULT_MESSAGES_QUANTITY=20 \
  -p 80:80 \
  ghcr.io/lifufkd/chatwave-web:latest

# HTTPS (ssl) mode. You need to specify path to folder with ssl certs and change this line.
docker run -d \
  -e API_URL=http://backend-host \
  -e API_PORT=8000 \
  -e SSL_CERT_PATH=/cert/cert.pem \
  -e SSL_CERT_KEY=/cert/cert.key \
  -e JWT_ACCESS_TOKEN_EXPIRES=1209500 \
  -e LONG_POLLING_DELAY=1 \
  -e DEFAULT_MESSAGES_QUANTITY=20 \
  -p 80:80 \
  -p 443:443 \
  -v /path/to/folder/with/certs:/cert:ro \
  ghcr.io/lifufkd/chatwave-web:latest
```
