const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');

// In-memory store (replace with database for production)
const codeStore = new Map();

module.exports = async (req, res) => {
  // Handle CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    const { code } = req.body;
    if (!code || typeof code !== 'string') {
      return res.status(400).json({ error: 'Invalid or missing Lua code' });
    }

    const id = uuidv4();
    const privateKey = crypto.randomBytes(16).toString('hex');
    codeStore.set(id, { code, privateKey });

    const baseUrl = process.env.VERCEL_URL || 'http://localhost:3000';
    const link = `${baseUrl}/api/code?id=${id}&key=${privateKey}`;
    return res.json({ link });
  }

  if (req.method === 'GET') {
    const { id, key } = req.query;
    if (!id || !key) {
      return res.status(400).json({ error: 'Missing id or key' });
    }

    const stored = codeStore.get(id);
    if (!stored) {
      return res.status(404).json({ error: 'Code not found' });
    }

    if (stored.privateKey !== key) {
      return res.status(403).json({ error: 'Invalid private key' });
    }

    // Verify Roblox client
    const userAgent = req.headers['user-agent'] || '';
    if (!userAgent.includes('Roblox')) {
      return res.status(403).json({ error: 'Access restricted to Roblox clients' });
    }

    return res.json({ code: stored.code });
  }

  res.status(405).json({ error: 'Method not allowed' });
};