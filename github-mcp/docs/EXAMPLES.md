# 📝 GitHub MCP Examples

Code examples for working with the GitHub MCP agent.

---

## Example 1: Search Repositories

```javascript
import GitHubAgent from './agent.js';

const agent = new GitHubAgent(process.env.GITHUB_TOKEN);

// Search for repositories
const repos = await agent.searchRepos('react');
repos.forEach(repo => {
  console.log(`${repo.full_name}: ${repo.stargazers_count} ⭐`);
});
```

**Output:**
```
facebook/react: 224567 ⭐
nextjs/next.js: 125234 ⭐
remix-run/remix: 28456 ⭐
```

---

## Example 2: Get Repository Details

```javascript
const repo = await agent.getRepo('nodejs', 'node');

console.log(`Repository: ${repo.full_name}`);
console.log(`Description: ${repo.description}`);
console.log(`Stars: ${repo.stargazers_count}`);
console.log(`Forks: ${repo.forks_count}`);
console.log(`Language: ${repo.language}`);
console.log(`Created: ${repo.created_at}`);
```

---

## Example 3: List Open Issues

```javascript
const issues = await agent.listIssues('nodejs', 'node', 'open');

console.log(`Found ${issues.length} open issues\n`);

issues.slice(0, 5).forEach(issue => {
  console.log(`#${issue.number}: ${issue.title}`);
  console.log(`  Created: ${issue.created_at}`);
  console.log(`  Comments: ${issue.comments}\n`);
});
```

---

## Example 4: Analyze Repository Statistics

```javascript
async function analyzeRepo(owner, repo) {
  const data = await agent.getRepo(owner, repo);
  
  return {
    name: data.full_name,
    stars: data.stargazers_count,
    forks: data.forks_count,
    issuesOpen: data.open_issues_count,
    watchers: data.watchers_count,
    language: data.language,
    lastUpdate: data.updated_at,
    isArchived: data.archived,
    popularity: Math.round(data.stargazers_count / 1000) + 'k stars'
  };
}

const stats = await analyzeRepo('tensorflow', 'tensorflow');
console.log(stats);
```

---

## Example 5: Search by Language

```javascript
async function searchByLanguage(language, topic = 'machine-learning') {
  const query = `language:${language} topic:${topic} stars:>1000`;
  
  const results = await agent.request(
    'GET',
    `/search/repositories?q=${encodeURIComponent(query)}&sort=stars&order=desc`
  );
  
  return results.items.map(repo => ({
    name: repo.full_name,
    stars: repo.stargazers_count,
    description: repo.description
  }));
}

const pythonAIRepos = await searchByLanguage('python', 'artificial-intelligence');
pythonAIRepos.forEach(repo => console.log(repo));
```

---

## Example 6: Track Repository Growth

```javascript
async function trackGrowth(owner, repo) {
  const data = await agent.getRepo(owner, repo);
  
  const daysSinceCreation = Math.floor(
    (new Date() - new Date(data.created_at)) / (1000 * 60 * 60 * 24)
  );
  
  const starsPerDay = Math.round(data.stargazers_count / daysSinceCreation);
  
  return {
    repository: data.full_name,
    totalStars: data.stargazers_count,
    daysSinceCreation: daysSinceCreation,
    starsPerDay: starsPerDay,
    isActive: (new Date() - new Date(data.updated_at)) < 30 * 86400 * 1000
  };
}
```

---

## Example 7: Build a Repository Report

```javascript
async function generateReport(owner, repo) {
  const repoData = await agent.getRepo(owner, repo);
  const issues = await agent.listIssues(owner, repo, 'open');
  
  let report = `# Repository Report: ${repoData.full_name}\n\n`;
  report += `**Created:** ${repoData.created_at}\n`;
  report += `**Last Updated:** ${repoData.updated_at}\n`;
  report += `**Stars:** ${repoData.stargazers_count}\n`;
  report += `**Forks:** ${repoData.forks_count}\n`;
  report += `**Language:** ${repoData.language}\n\n`;
  
  report += `## Open Issues (${issues.length})\n`;
  issues.slice(0, 10).forEach(issue => {
    report += `- [#${issue.number}](${issue.html_url}) ${issue.title}\n`;
  });
  
  return report;
}

const report = await generateReport('kubernetes', 'kubernetes');
console.log(report);
```

---

## Example 8: Find Trending Repositories

```javascript
async function getTrendingRepos(days = 7) {
  const date = new Date();
  date.setDate(date.getDate() - days);
  
  const query = `created:>=${date.toISOString().split('T')[0]} stars:>100`;
  
  const results = await agent.request(
    'GET',
    `/search/repositories?q=${encodeURIComponent(query)}&sort=stars&order=desc&per_page=10`
  );
  
  return results.items.map(repo => ({
    name: repo.full_name,
    stars: repo.stargazers_count,
    language: repo.language,
    daysOld: Math.floor((Date.now() - new Date(repo.created_at)) / 86400000)
  }));
}

const trending = await getTrendingRepos(7);
trending.forEach(repo => {
  console.log(`${repo.name} (${repo.stars} ⭐) - ${repo.daysOld} days old`);
});
```

---

## Tips

- Always authenticate with valid GitHub token
- Handle API rate limits (60 requests/hour unauthenticated, 5000 authenticated)
- Use try-catch for robust error handling
- Cache results to avoid repeated API calls
- Sort by relevant metrics for better insights

---

See [USAGE.md](USAGE.md) for more patterns and [ARCHITECTURE.md](ARCHITECTURE.md) for system design.
