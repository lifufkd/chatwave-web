# 💬 ChatWave Web
[🇷🇺 Русский](./README/README.ru.md) | [🇬🇧 English](./README.md)

**ChatWave Web** — This is a modern and fast web frontend for the ChatWave messenger, implemented in JavaScript.  
A simple interface, powerful features, and flexible customization are all you need to communicate in 2025. 🚀

![Chat Screenshot](./assests/banners/ChatWaveBanner.png)

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

---

## ⚙️ Installation

### 🔧 Option 1: Manual installation

1. Clone the repository:
   ```
   git clone https://github.com/lifufkd/chatwave-web.git
   cd chatwave-web
   ```
2. Set up the configuration in js/config.js:
   ```
   export const API_BASE_URL = "http://127.0.0.1:8000"; // адрес бэкенда
   export const API_TOKEN_LIFESPAN = 1209500;
   export const LONG_POLLING_DELAY = 1; // интервал long-polling запросов
   export const DEFAULT_MESSAGES_QUANTITY = 20;
   ```
3. Start a local server (for example, using a Live Server or another dev server)

### 🐳 Option 2: Docker
1. Download the finished image:
```
docker pull ghcr.io/lifufkd/chatwave-web:latest
```
2. Run with the necessary environment variables:
```
docker run -d \
  -e API_URL=http://backend-host \
  -e API_PORT=8000 \
  -e API_BASE_URL=http://backend-host:8000 \
  -e JWT_ACCESS_TOKEN_EXPIRES=1209500 \
  -e LONG_POLLING_DELAY=1 \
  -e DEFAULT_MESSAGES_QUANTITY=20 \
  -p 8080:80 \
  ghcr.io/lifufkd/chatwave-web:latest
```
