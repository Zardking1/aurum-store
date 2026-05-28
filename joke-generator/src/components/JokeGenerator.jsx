import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/JokeGenerator.css';

const JokeGenerator = () => {
  const [joke, setJoke] = useState(null);
  const [loading, setLoading] = useState(false);
  const [jokeType, setJokeType] = useState('general');
  const [history, setHistory] = useState([]);
  const [copied, setCopied] = useState(false);

  const APIs = {
    general: {
      url: 'https://api.api-ninjas.com/v1/jokes',
      headers: { 'X-Api-Key': 'YOUR_API_NINJAS_KEY' },
      parseJoke: (data) => data[0]?.joke,
    },
    programming: {
      url: 'https://official-joke-api.appspot.com/random_joke',
      headers: {},
      parseJoke: (data) => `${data.setup}\n${data.punchline}`,
    },
    dad: {
      url: 'https://icanhazdadjoke.com/slack',
      headers: {},
      parseJoke: (data) => data.attachments[0]?.text,
    },
  };

  const fetchJoke = async () => {
    setLoading(true);
    try {
      const api = APIs[jokeType];
      const response = await axios.get(api.url, { headers: api.headers });
      const jokeText = api.parseJoke(response.data);

      setJoke(jokeText);
      setHistory([jokeText, ...history.slice(0, 4)]);
    } catch (error) {
      console.error('Error fetching joke:', error);
      setJoke('Failed to fetch joke. Please try again!');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJoke();
  }, [jokeType]);

  const copyToClipboard = () => {
    if (joke) {
      navigator.clipboard.writeText(joke);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shareOnTwitter = () => {
    if (joke) {
      const text = encodeURIComponent(joke);
      window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
    }
  };

  const shareOnFacebook = () => {
    if (joke) {
      const text = encodeURIComponent(joke);
      window.open(`https://www.facebook.com/sharer/sharer.php?quote=${text}`, '_blank');
    }
  };

  return (
    <div className="joke-container">
      <div className="joke-card">
        <h1>😂 Joke Generator</h1>

        <div className="joke-type-selector">
          <button
            className={`type-btn ${jokeType === 'general' ? 'active' : ''}`}
            onClick={() => setJokeType('general')}
          >
            General
          </button>
          <button
            className={`type-btn ${jokeType === 'programming' ? 'active' : ''}`}
            onClick={() => setJokeType('programming')}
          >
            Programming
          </button>
          <button
            className={`type-btn ${jokeType === 'dad' ? 'active' : ''}`}
            onClick={() => setJokeType('dad')}
          >
            Dad Jokes
          </button>
        </div>

        <div className="joke-display">
          {loading ? (
            <p className="loading">Loading a hilarious joke...</p>
          ) : joke ? (
            <p className="joke-text">{joke}</p>
          ) : (
            <p className="error">Click "Get Joke" to start laughing!</p>
          )}
        </div>

        <div className="action-buttons">
          <button className="btn btn-primary" onClick={fetchJoke} disabled={loading}>
            {loading ? 'Loading...' : '🎲 Get Joke'}
          </button>
          <button className="btn btn-secondary" onClick={copyToClipboard} disabled={!joke}>
            📋 Copy
          </button>
          {copied && <span className="copied-message">Copied!</span>}
        </div>

        <div className="share-buttons">
          <button className="share-btn twitter" onClick={shareOnTwitter} disabled={!joke}>
            <span>𝕏</span>
          </button>
          <button className="share-btn facebook" onClick={shareOnFacebook} disabled={!joke}>
            <span>f</span>
          </button>
        </div>

        {history.length > 0 && (
          <div className="history-section">
            <h3>📜 Joke History</h3>
            <div className="history-list">
              {history.map((h, idx) => (
                <div key={idx} className="history-item">
                  <p>{h.substring(0, 60)}...</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JokeGenerator;