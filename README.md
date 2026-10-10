# STRATUS Chatroom

A real-time chatroom built for Vercel with a modern, gaming-inspired UI.

## Features

✨ **Real-Time Chat** - Instant messaging with polling-based updates  
🎨 **Custom Colors** - Choose from 6 vibrant colors for your messages  
💬 **User Presence** - See how many users are online  
🚀 **Vercel Ready** - Deploy instantly with zero configuration  
📱 **Responsive Design** - Works on desktop and mobile  
🔒 **Lightweight** - No database required, in-memory storage  

## Quick Deploy

### 1. Deploy to Vercel

Click the button below to deploy instantly:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/school-rgb/stratus-chatroom)

### 2. Manual Deploy

```bash
# Clone the repo
git clone https://github.com/school-rgb/stratus-chatroom.git
cd stratus-chatroom

# Deploy to Vercel
vercel
```

### 3. Local Development

```bash
# Install dependencies (none required!)
npm install

# Start development server
npm run dev

# Open http://localhost:3000
```

## How It Works

- **Frontend**: Pure HTML/CSS/JavaScript UI with no dependencies
- **Backend**: Serverless API route (`/api/chat.js`) using Vercel Node.js runtime
- **Communication**: HTTP polling every 2 seconds for new messages
- **Storage**: In-memory array (messages cleared when server restarts)

## API Endpoints

### Get Messages
```
GET /api/chat?action=messages&since=<timestamp>
```
Returns messages newer than the provided timestamp.

### Send Message
```
POST /api/chat?action=send
Body: { username, message, color }
```
Adds a new message to the chat.

### Get Status
```
GET /api/chat?action=status
```
Returns online user count and server status.

## Configuration

- **Max Messages**: 100 (keeps last 100 messages)
- **Message Retention**: 30 minutes
- **Max Message Length**: 500 characters
- **Poll Interval**: 2 seconds
- **Username Max Length**: 20 characters

## Customization

Edit `public/index.html` to customize:
- Colors in the `colors` array
- Poll interval (line 227: `setInterval(pollMessages, 2000)`)
- Message limit (line 11 in `api/chat.js`)

## Limitations

- ⚠️ **No Persistence**: Messages are lost when the server restarts
- ⚠️ **Memory-Based**: All messages stored in RAM
- ⚠️ **Single Instance**: Only works with single Vercel deployment

For production use, add a database like Firebase, MongoDB, or Supabase.

## License

MIT
