# 🚀 PeerX - Decentralized Cloud Storage

> A secure, peer-to-peer file sharing platform with end-to-end encryption for local networks.

PeerX is a peer to peer file sharing platform that enables secure file sharing across devices on the same local network. With automatic peer discovery, end-to-end encryption, and instant network-wide file sharing, PeerX transforms your local network into a private cloud.

---

## ✨ Key Features

- 🔒 **End-to-End Encryption** - All files encrypted with AES-256-GCM
- 🌐 **Automatic Peer Discovery** - Devices on the same WiFi network are discovered automatically
- 📤 **Network Share** - Instant file sharing with all connected devices
- 👥 **Private Groups** - Create secure groups for selective file sharing
- 💾 **Storage Management** - Track storage usage with visual indicators
- 🎨 **Modern UI** - Clean, responsive interface with dark mode support
- 🔄 **Real-time Updates** - Live peer status and file synchronization
- 📱 **Cross-Platform** - Works on desktop, mobile, and tablets

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v14 or higher)
- **MongoDB** (v6.0 or higher)
- **npm** or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ayushiadhikari2004/PeerX.git
   cd PeerX
   ```

2. **Install dependencies**
   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   cd ..
   ```

3. **Set up environment variables**
   - Copy `.env.example` to `.env` in the `backend/` folder and fill in the required values.

4. **Start MongoDB**
   ```bash
   # Windows
   mongod

   # Mac (with Homebrew)
   brew services start mongodb-community

   # Linux
   sudo systemctl start mongod
   ```

5. **Start the backend server**
   ```bash
   cd backend
   node server.js
   ```

6. **Start the frontend** (in a new terminal)
   ```bash
   cd frontend
   npm start
   ```

7. **Access PeerX**
   - Local: `http://localhost:3000`
   - Network: `http://YOUR_IP:3000`

---

## 🌐 Network Setup Guide

### Connecting Multiple Devices

1. Find your local IP address (e.g., `192.168.1.105`).
2. Update your `.env` file in `backend/` with your IP:
   ```env
   FRONTEND_URL=http://localhost:3000,http://192.168.1.105:3000
   ```
3. Configure your firewall to allow ports 3000, 5000, and 5001.
4. On other devices (same WiFi), open a browser and go to `http://YOUR_IP:3000`.

---

## 📚 Usage Guide

### 1. Account Creation
- Register and log in from the browser.

### 2. Network Share
- All devices on the same network join the Network Share automatically.
- Upload files to share instantly with all devices.

### 3. Private Groups
- Create groups for selective sharing.
- Share invite codes to add members.

### 4. Peer Discovery
- See all devices on your network in the Peers tab.

### 5. File Management
- Upload, download, and delete files securely.

---

## 🏗️ Architecture

```
Frontend (React) <-> Backend (Node.js/Express) <-> MongoDB
         |                |                        |
         |                |                        |
         |                |-- UDP Peer Discovery --|
```

---

## 🔧 Configuration

### Environment Variables (backend/.env)

| Variable              | Description                        | Default                      |
|-----------------------|------------------------------------|------------------------------|
| PORT                  | Backend server port                | 5000                         |
| MONGODB_URI           | MongoDB connection string          | mongodb://localhost:27017/peex |
| JWT_SECRET            | Secret key for JWT signing         | your-jwt-secret-here         |
| JWT_EXPIRES_IN        | JWT token expiration               | 7d                           |
| FRONTEND_URL          | Allowed frontend origins           | http://localhost:3000        |
| MAX_FILE_SIZE         | Max file upload size (bytes)       | 524288000                    |
| ENCRYPTION_ALGORITHM  | Encryption algorithm               | aes-256-gcm                  |
| ENABLE_PEER_DISCOVERY | Enable peer discovery              | true                         |
| PEER_PORT             | UDP port for peer discovery        | 5001                         |
| NODE_ENV              | Environment mode                   | development                  |

---

## 🐛 Troubleshooting

- Ensure all devices are on the same WiFi network.
- Check firewall settings for required ports.
- Verify MongoDB is running and accessible.
- Check `.env` configuration.

---

## 🤝 Contributing

Contributions are welcome! Please fork the repo, create a feature branch, and open a pull request.

---

## 📄 License

This project is licensed under the MIT License.

---

## 👤 Author

**Ayushi Adhikari**
- GitHub: [@ayushiadhikari2004](https://github.com/ayushiadhikari2004)

---

<div align="center">

**Star ⭐ this repo if you find it useful!**

</div>