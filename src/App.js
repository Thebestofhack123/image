import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [code, setCode] = useState('');
  const [link, setLink] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLink('');

    try {
      const response = await axios.post('/api/code', { code });
      setLink(response.data.link);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to submit code');
    }
  };

  return (
    <div className="App">
      <h1>Lua Code Sharing</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter your Lua code here"
          rows="10"
          cols="50"
        />
        <br />
        <button type="submit">Submit</button>
      </form>
      {link && (
        <div>
          <h3>Your unique link:</h3>
          <a href={link} target="_blank" rel="noopener noreferrer">{link}</a>
          <p>Share this link with Roblox clients to execute the code.</p>
        </div>
      )}
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default App;