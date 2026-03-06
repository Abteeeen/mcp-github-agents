# GitHub MCP Usage Guide

Learn how to use GitHub MCP in VS Code and build AI agents.

## What Can You Do?

With GitHub MCP, you can automate:

### 📊 Repository Management
- Search repositories by name, language, topic
- Get repository statistics (stars, forks, issues)
- List branches, releases, tags
- Access repository files and code

### 🎫 Issue Management
- List open/closed issues
- Create new issues automatically
- Search issues by keywords
- Get issue details and comments
- Track issue status

### 🔄 Pull Request Management
- List pull requests (open/closed/merged)
- Create pull requests programmatically
- Review PR details, diffs, comments
- Get PR merge status

### 🔍 Code Search
- Search code across repositories
- Find usage patterns
- Discover similar implementations
- Analyze code structure

### 👤 User & Organization
- Get user profile information
- List user repositories
- Get user activity
- Organization data

## Using GitHub MCP with Copilot

### Example 1: Ask Copilot to Search Repos

**In Copilot Chat:**

```
Find me the top 5 Python repositories about machine learning
```

**What happens:**
1. Copilot uses GitHub MCP to search
2. Fetches top ML repositories
3. Provides summaries and links

### Example 2: Analyze Repository

```
Summary the main features of the tensorflow/tensorflow repository
```

**Result:** Copilot fetches the repo README, analyzes features, tells you what it does.

### Example 3: Check Issues

```
What are the current open issues in nodejs/node?
```

**Result:** Lists recent open issues with summaries.

### Example 4: Create Issue

```
Create a GitHub issue in my-org/my-repo with title "Performance improvement: Optimize database queries" 
and body "Consider indexing frequently queried columns"
```

**Result:** MCP creates the issue automatically.

## Using GitHub MCP in Code

### Basic Usage Pattern

```javascript
import GitHubMCP from '@modelcontextprotocol/sdk/github';

const mcp = new GitHubMCP(process.env.GITHUB_TOKEN);

// Search repositories
const repos = await mcp.searchRepositories('machine learning', { limit: 5 });

// Get repository details
const repo = await mcp.getRepository('tensorflow', 'tensorflow');

// List issues
const issues = await mcp.listIssues('nodejs', 'node', { state: 'open' });

// Create issue
await mcp.createIssue('my-org', 'my-repo', {
  title: 'Bug: Login fails on Firefox',
  body: 'Steps to reproduce...'
});
```

### Run Example Agent

```bash
cd /path/to/mcp-github-workspace
npm install
npm start
```

This runs [src/agent.js](../src/agent.js) which demonstrates:
- Authenticating with GitHub
- Searching repositories
- Getting repository details
- Listing issues
- Getting file content

## Common Workflows

### Workflow 1: Monitor Repository

```javascript
async function getRepoHealth(owner, repo) {
  const repoData = await mcp.getRepository(owner, repo);
  const issues = await mcp.listIssues(owner, repo);
  const prs = await mcp.listPRs(owner, repo);
  
  return {
    name: repoData.name,
    stars: repoData.stargazers_count,
    openIssues: issues.length,
    openPRs: prs.length,
    lastUpdated: repoData.updated_at
  };
}
```

### Workflow 2: Auto-Create Issues from Logs

```javascript
async function createBugFromError(owner, repo, errorLog) {
  await mcp.createIssue(owner, repo, {
    title: `Bug detected: ${errorLog.message}`,
    body: `
## Error
\`\`\`
${errorLog.stack}
\`\`\`

## Environment
- Version: ${process.version}
- Timestamp: ${new Date().toISOString()}
    `
  });
}
```

### Workflow 3: Find Code Examples

```javascript
async function findCodeExamples(searchTerm) {
  const results = await mcp.searchCode(searchTerm, {
    language: 'javascript',
    sort: 'stars'
  });
  
  return results.map(r => ({
    repo: r.repository.full_name,
    file: r.path,
    url: r.html_url
  }));
}
```

### Workflow 4: Generate Reports

```javascript
async function generateWeeklyReport(owner, repo) {
  const week = new Date();
  week.setDate(week.getDate() - 7);
  
  const issues = await mcp.listIssues(owner, repo);
  const recent = issues.filter(i => 
    new Date(i.created_at) > week
  );
  
  return {
    newIssues: recent.length,
    topIssues: recent.slice(0, 5),
    reportDate: new Date().toISOString()
  };
}
```

## Integration with Other Tools

### VS Code Tasks

Add to `.vscode/tasks.json`:

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Check GitHub Status",
      "type": "shell",
      "command": "npm",
      "args": ["run", "check-github"]
    }
  ]
}
```

Then in `package.json`:

```json
{
  "scripts": {
    "check-github": "node src/check-github.js"
  }
}
```

### GitHub Actions Integration

Use MCP in your workflows:

```yaml
name: Auto-Report Issues
on: [schedule]
jobs:
  report:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm install
      - env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        run: npm start
```

## API Reference

### Search Methods

```javascript
// Search repositories
mcp.searchRepositories(query, options)
  - language: 'javascript'
  - sort: 'stars' | 'forks' | 'updated'
  - limit: number

// Search code
mcp.searchCode(query, options)
  - language: 'javascript'
  - repo: 'owner/name'

// Search issues
mcp.searchIssues(query, options)
  - repo: 'owner/name'
  - state: 'open' | 'closed'
```

### Repository Methods

```javascript
mcp.getRepository(owner, repo)
mcp.listRepositories(owner)
mcp.listBranches(owner, repo)
mcp.listReleases(owner, repo)
mcp.listTags(owner, repo)
mcp.getFileContent(owner, repo, path)
```

### Issue Methods

```javascript
mcp.listIssues(owner, repo, options)
mcp.getIssue(owner, repo, issueNumber)
mcp.createIssue(owner, repo, { title, body, labels })
mcp.updateIssue(owner, repo, issueNumber, updates)
mcp.addLabel(owner, repo, issueNumber, labels)
```

### PR Methods

```javascript
mcp.listPRs(owner, repo, options)
mcp.getPR(owner, repo, prNumber)
mcp.createPR(owner, repo, { title, body, head, base })
mcp.listPRReviews(owner, repo, prNumber)
```

## Tips & Tricks

1. **Rate Limiting**: GitHub API has limits. Use pagination and caching.
2. **Error Handling**: Always wrap MCP calls in try-catch.
3. **Authentication**: Keep tokens secure, never commit them.
4. **Batch Operations**: Group API calls when possible.
5. **Caching**: Cache search results to avoid repeated queries.

## Examples

See [EXAMPLES.md](EXAMPLES.md) for:
- Complete code samples
- Real-world use cases
- Error handling patterns
- Performance optimization

## Troubleshooting

**"No matching issues found"**: 
- Verify repository exists
- Check issue search syntax

**"Rate limit exceeded"**:
- Free tier: 60 requests/hour
- Add delays between requests
- Upgrade GitHub account

**"Unauthorized"**:
- Verify GITHUB_TOKEN is set
- Check token hasn't expired
- Regenerate if necessary

## Next Steps

1. Run the example agent: `npm start`
2. Try Copilot Chat queries with GitHub MCP
3. Build your own agent using the patterns above
4. Integrate with your workflow

## Resources

- [GitHub API Docs](https://docs.github.com/en/rest)
- [MCP Specification](https://modelcontextprotocol.io/)
- [Example Agent](../src/agent.js)
