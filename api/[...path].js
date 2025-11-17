/**
 * Vercel Serverless Function - API Proxy
 * Proxies all /api/* requests to the backend
 */

export default async function handler(req, res) {
  const { path } = req.query;
  const backendUrl = 'http://72.60.151.78:8080';
  
  // Construct the full URL
  const apiPath = Array.isArray(path) ? path.join('/') : path;
  const url = `${backendUrl}/api/${apiPath}`;
  
  // Forward query parameters
  const queryString = new URLSearchParams(req.url.split('?')[1] || '').toString();
  const fullUrl = queryString ? `${url}?${queryString}` : url;
  
  try {
    // Forward the request to the backend
    const response = await fetch(fullUrl, {
      method: req.method,
      headers: {
        'Content-Type': req.headers['content-type'] || 'application/json',
        'Authorization': req.headers['authorization'] || '',
      },
      body: req.method !== 'GET' && req.method !== 'HEAD' ? JSON.stringify(req.body) : undefined,
    });
    
    // Get response data
    const data = await response.text();
    
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    // Forward response
    res.status(response.status);
    
    // Try to parse as JSON, otherwise send as text
    try {
      res.json(JSON.parse(data));
    } catch {
      res.send(data);
    }
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: 'Proxy error', message: error.message });
  }
}
