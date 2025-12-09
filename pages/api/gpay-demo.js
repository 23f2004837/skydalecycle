export default function handler(req, res) {
  // Placeholder API route for GPay server-side verification
  // In production, this would verify payment tokens with Google Pay API
  if (req.method === 'POST') {
    res.status(200).json({ 
      ok: true, 
      message: 'GPay verification endpoint - to be implemented with Google Pay server-side API' 
    });
  } else {
    res.status(405).json({ ok: false, message: 'Method not allowed' });
  }
}
