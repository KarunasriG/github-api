const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// GitHub API configuration
const GITHUB_API_URL = 'https://api.github.com';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_USERNAME = process.env.GITHUB_USERNAME;

const githubApi = axios.create({
  baseURL: GITHUB_API_URL,
  headers: {
    Authorization: `Bearer ${GITHUB_TOKEN}`,
    Accept: 'application/vnd.github.v3+json'
  }
});

// Routes
// GET /github - to show user data
app.get('/github', async (req, res) => {
  try {
    const [userResponse, reposResponse] = await Promise.all([
      githubApi.get(`/users/${GITHUB_USERNAME}`),
      githubApi.get(`/users/${GITHUB_USERNAME}/repos`)
    ]);

    const userData = {
      followers: userResponse.data.followers,
      following: userResponse.data.following,
      repositories: reposResponse.data.map(repo => ({
        name: repo.name,
        url: repo.html_url,
        description: repo.description,
        stars: repo.stargazers_count,
        language: repo.language
      }))
    };

    res.json(userData);
  } catch (error) {
    console.error('Error fetching GitHub data:', error.message);
    res.status(500).json({ error: 'Failed to fetch GitHub data' });
  }
});

// GET /github/:repoName - to show a particular repo 
app.get('/github/:repoName', async (req, res) => {
  try {
    const { repoName } = req.params;
    const repoResponse = await githubApi.get(`/repos/${GITHUB_USERNAME}/${repoName}`);

    const repoData = {
      name: repoResponse.data.name,
      description: repoResponse.data.description,
      stars: repoResponse.data.stargazers_count,
      language: repoResponse.data.language,
      created_at: repoResponse.data.created_at,
      updated_at: repoResponse.data.updated_at,
      clone_url: repoResponse.data.clone_url,
      open_issues: repoResponse.data.open_issues
    };

    res.json(repoData);
  } catch (error) {
    console.error('Error fetching repository data:', error.message);
    res.status(404).json({ error: 'Repository not found' });
  }
});

// POST /github/:repoName/issues - create an issue
app.post('/github/:repoName/issues', async (req, res) => {
  const { repoName } = req.params;
  try {
    const { title, body } = req.body;
    console.log('Request body:', req.body);

    if (!title || !body) {
      return res.status(400).json({ error: 'Title and body are required' });
    }

    const response = await githubApi.post(
      `/repos/${GITHUB_USERNAME}/${repoName}/issues`,
      { title, body }
    );
    res.json({
      message: 'Issue created successfully',
      issue_url: response.data.html_url
    });
  } catch (error) {
    console.error('Error creating issue:', error.message)
    res.status(500).json({ error: 'Failed to create issue' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});