// Simple HTTP-based chat API for Vercel (no WebSocket support on Vercel free tier)
// Uses polling mechanism for real-time feel

const messages = [];
const MAX_MESSAGES = 100;
const MESSAGE_RETENTION = 30 * 60 * 1000; // 30 minutes

function cleanOldMessages() {
  const now = Date.now();
  while (messages.length > 0 && now - messages[0].timestamp > MESSAGE_RETENTION) {
    messages.shift();
  }
}

export default function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { method, query, body } = req;

  try {
    if (method === 'GET') {
      if (query.action === 'messages') {
        // Get messages since a certain timestamp
        cleanOldMessages();
        const since = query.since ? parseInt(query.since) : 0;
        const filtered = messages.filter(m => m.timestamp > since);
        return res.status(200).json({ messages: filtered, timestamp: Date.now() });
      } else if (query.action === 'status') {
        return res.status(200).json({ status: 'online', users: new Set([...messages.map(m => m.username)]).size });
      }
    }

    if (method === 'POST') {
      if (query.action === 'send') {
        const { username, message, color } = body;

        if (!username || !message) {
          return res.status(400).json({ error: 'Missing username or message' });
        }

        if (message.length > 500) {
          return res.status(400).json({ error: 'Message too long (max 500 chars)' });
        }

        const newMessage = {
          id: Date.now() + Math.random(),
          username: username.slice(0, 20),
          message: message.slice(0, 500),
          color: color || '#00d4ff',
          timestamp: Date.now(),
        };

        messages.push(newMessage);

        // Keep only last 100 messages
        if (messages.length > MAX_MESSAGES) {
          messages.shift();
        }

        return res.status(200).json({ success: true, message: newMessage });
      }
    }

    return res.status(404).json({ error: 'Not found' });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
