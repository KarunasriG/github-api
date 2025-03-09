# GitHub Activity Log API

This project is a server-side API that integrates with the GitHub API to fetch user activity data, repository details, and create issues in a repository. It is built using **Express.js** and can be added to your portfolio website.

---

## Features

1. **Fetch GitHub User Data**:
   - Get the number of followers, following, and a list of personal repositories.
   - Endpoint: `GET /github`

2. **Fetch Repository Details**:
   - Get details about a specific repository (e.g., stars, forks, issues).
   - Endpoint: `GET /github/{repo-name}`

3. **Create Issues in a Repository**:
   - Create a new issue in a repository with a title and body.
   - Endpoint: `POST /github/{repo-name}/issues`

---

## Prerequisites

Before running the project, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [Git](https://git-scm.com/)
- A GitHub Personal Access Token (PAT) with the `repo` scope. [Create a PAT here](https://github.com/settings/tokens).

---

## Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/KarunasriG/github-api.git
   cd github-api
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Create a `.env` File**:
   Add your GitHub Personal Access Token to a `.env` file:
   ```
   GITHUB_TOKEN=your_github_personal_access_token
   ```

4. **Start the Server**:
   ```bash
   npm start
   ```
   The server will run at `http://localhost:3000`.

---

## API Endpoints

### 1. Get GitHub User Data
- **Endpoint**: `GET /github`
- **Response**:
  ```json
  {
    "followers": 10,
    "following": 5,
    "repos": [
      {
        "name": "repo1",
        "url": "https://github.com/your-username/repo1",
        "description": "My first repository",
         "stars": 10,
         "language": "JavaScript"
      },
      {
        "name": "repo2",
        "url": "https://github.com/your-username/repo2",
        "description": "My second repository",
        "stars": 1,
        "language": "JavaScript"
      }
    ]
  }
  ```

### 2. Get Repository Details
- **Endpoint**: `GET /github/{repo-name}`
- **Response**:
  ```json
  {
    "name": "repo1",
    "description": "My first repository",
    "stars": 5,
    "forks": 2,
    "language": "JavaScript",
    "created_at": "2025-02-12T09:49:04Z",
    "updated_at": "2025-03-04T03:46:05Z",
    "clone_url": "https://github.com/your-username/repo1.git",
    "open_issues": 1
  }
  ```

### 3. Create an Issue in a Repository
- **Endpoint**: `POST /github/{repo-name}/issues`
- **Request Body**:
  ```json
  {
    "title": "Test Issue",
    "body": "This is a test issue created via the API."
  }
  ```
- **Response**:
  ```json
  {
    "message": "Issue created successfully",
    "issueUrl": "https://github.com/your-username/repo1/issues/1"
  }
  ```

---


## Added to Portfolio Website

Deploy the API to a vercel [Vercel](https://github-api-lime-beta.vercel.app), then added to portfolio website [Portfolio](https://karunasrig.github.io/MyPortfolio)

---

## Contributing

Contributions are welcome! If you find any issues or want to add new features, feel free to open a pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---
