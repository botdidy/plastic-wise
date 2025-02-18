// src/NewsFeed.js
import React, { useState, useEffect } from 'react';

function NewsFeed() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Replace 'YOUR_API_KEY' with your actual NewsAPI key.
    const API_KEY = 'e94b200473694fd5bbdbd21d7039e954';
    // Query for environmental news related to plastic recycling and sustainability.
    const url = `https://newsapi.org/v2/everything?q=plastic+recycling+environment+sustainability&sortBy=publishedAt&apiKey=$e94b200473694fd5bbdbd21d7039e954`;

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setArticles(data.articles);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading news...</p>;
  }

  if (error) {
    return <p>Error fetching news: {error.message}</p>;
  }

  return (
    <div>
      <h2>Environmental News</h2>
      {articles.length === 0 && <p>No articles found.</p>}
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {articles.map((article, index) => (
          <li key={index} style={{ marginBottom: '1rem' }}>
            <a href={article.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: '#333' }}>
              <h3>{article.title}</h3>
            </a>
            <p>{article.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NewsFeed;
