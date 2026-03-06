# GitHub MCP Code Examples

Ready-to-use code examples for common GitHub MCP tasks.

## Example 1: Get Repository Stats

```javascript
async function getRepoStats(owner, repo) {
  const response = await agent.getRepo(owner, repo);
  
  console.log(`Repository: ${response.full_name}`);
  console.log(`Description: ${response.description}`);
  console.log(`Stars: ${response.stargazers_count}`);
  console.log(`Forks: ${response.forks_count}`);
  console.log(`Open Issues: ${response.open_issues_count}`);
  console.log(`Language: ${response.language}`);
  console.log(`Created: ${response.created_at}`);
  console.log(`Updated: ${response.updated_at}`);
  console.log(`URL: ${response.html_url}`);
  
  return response;
}

// Usage
getRepoStats('nodejs', 'node');
```

## Example 2: Find Trending Repositories

```javascript
async function getTrendingRepos(topic = 'javascript', days = 7) {
  // GitHub doesn't have "trending" endpoint, but we can search by date
  const date = new Date();
  date.setDate(date.getDate() - days);
  
  const query = `created:>=${date.toISOString().split('T')[0]} language:${topic} stars:>100`;
  
  const response = await fetch(
    `https://api.github.com/search/repositories?q=${encodeURIComponent(query)}&sort=stars&order=desc`,
    {
      headers: { 'Authorization': `token ${process.env.GITHUB_TOKEN}` }
    }
  );
  
  const data = await response.json();
  return data.items;
}

// Usage
const trending = await getTrendingRepos('javascript', 7);
console.log(trending.map(r => `${r.full_name}: ${r.stargazers_count}⭐`));
```

## Example 3: Create Daily Issue Report

```javascript
async function dailyIssueReport(owner, repo) {
  const issues = await agent.listIssues(owner, repo, 'open');
  
  // Group by label
  const grouped = {};
  issues.forEach(issue => {
    const label = issue.labels[0]?.name || 'unlabeled';
    if (!grouped[label]) grouped[label] = [];
    grouped[label].push(issue);
  });
  
  // Create report
  let report = `# Daily Issue Report - ${owner}/${repo}\n`;
  report += `Generated: ${new Date().toISOString()}\n\n`;
  
  Object.entries(grouped).forEach(([label, issues]) => {
    report += `## ${label} (${issues.length})\n`;
    issues.forEach(issue => {
      report += `- [#${issue.number}](${issue.html_url}) ${issue.title}\n`;
    });
    report += '\n';
  });
  
  return report;
}

// Usage
const report = await dailyIssueReport('nodejs', 'node');
console.log(report);
```

## Example 4: Auto-Label Issues by Content

```javascript
async function autoLabelIssue(owner, repo, issueNumber) {
  const issue = await agent.request('GET', `/repos/${owner}/${repo}/issues/${issueNumber}`);
  
  const labels = [];
  const text = (issue.title + ' ' + issue.body).toLowerCase();
  
  // Simple keyword matching
  if (text.includes('bug') || text.includes('error')) labels.push('bug');
  if (text.includes('feature') || text.includes('request')) labels.push('enhancement');
  if (text.includes('performance')) labels.push('performance');
  if (text.includes('documentation')) labels.push('documentation');
  
  if (labels.length > 0) {
    await agent.request('POST', `/repos/${owner}/${repo}/issues/${issueNumber}/labels`, labels);
    console.log(`Added labels: ${labels.join(', ')}`);
  }
}

// Usage
autoLabelIssue('my-org', 'my-repo', 42);
```

## Example 5: Monitor PR Merge Time

```javascript
async function getPRMetrics(owner, repo) {
  const prs = await agent.listPRs(owner, repo, 'closed', 50);
  
  const metrics = {
    total: prs.length,
    merged: prs.filter(p => p.merged_at).length,
    avgMergeTime: 0
  };
  
  // Calculate average time to merge
  const mergeTimes = prs
    .filter(p => p.merged_at && p.created_at)
    .map(p => {
      const created = new Date(p.created_at);
      const merged = new Date(p.merged_at);
      return (merged - created) / (1000 * 60 * 60 * 24); // days
    });
  
  if (mergeTimes.length > 0) {
    metrics.avgMergeTime = (mergeTimes.reduce((a, b) => a + b) / mergeTimes.length).toFixed(1);
  }
  
  return metrics;
}

// Usage
const metrics = await getPRMetrics('nodejs', 'node');
console.log(`Avg merge time: ${metrics.avgMergeTime} days`);
```

## Example 6: Find Code Duplication

```javascript
async function findDuplicateCode(owner, repo, pattern) {
  const results = await agent.request(
    'GET',
    `/search/code?q=${encodeURIComponent(pattern)}+repo:${owner}/${repo}&per_page=30`
  );
  
  const files = {};
  results.items?.forEach(item => {
    if (!files[item.path]) files[item.path] = [];
    files[item.path].push(item);
  });
  
  // Find files with most matches
  const duplicates = Object.entries(files)
    .filter(([_, matches]) => matches.length > 1)
    .sort((a, b) => b[1].length - a[1].length);
  
  return duplicates;
}

// Usage
const dupes = await findDuplicateCode('my-org', 'my-repo', 'function logger');
console.log('Duplicate code found in:', dupes.map(d => d[0]));
```

## Example 7: Generate CHANGELOG from Issues

```javascript
async function generateChangelog(owner, repo, version) {
  const issues = await agent.listIssues(owner, repo, 'closed');
  
  // Filter by milestone
  const releaseIssues = issues.filter(i => 
    i.milestone?.title === version
  );
  
  let changelog = `# [${version}] - ${new Date().toISOString().split('T')[0]}\n\n`;
  
  // Group by type
  const types = {
    'Feature': '### Added',
    'Bug': '### Fixed',
    'Enhancement': '### Changed',
    'Documentation': '### Docs'
  };
  
  Object.entries(types).forEach(([type, heading]) => {
    const typeIssues = releaseIssues.filter(i =>
      i.labels.some(l => l.name.includes(type))
    );
    
    if (typeIssues.length > 0) {
      changelog += `${heading}\n`;
      typeIssues.forEach(issue => {
        changelog += `- ${issue.title} (#${issue.number})\n`;
      });
      changelog += '\n';
    }
  });
  
  return changelog;
}

// Usage
const changelog = await generateChangelog('my-org', 'my-repo', 'v1.0.0');
console.log(changelog);
```

## Example 8: GitHub Copilot Integration

Use with Copilot in your prompt:

```javascript
// In Copilot Chat or extension
const agent = new GitHubAgent(process.env.GITHUB_TOKEN);

// Copilot can now access GitHub data
// Example: "Summarize the top 5 NodeJS repositories"
// Copilot will use GitHub MCP to fetch and analyze them
```

## Example 9: Rate Limit Handler

```javascript
async function withRateLimit(fn, maxRetries = 3) {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (error.status === 403) {
        const resetTime = error.headers['x-ratelimit-reset'];
        const waitTime = (resetTime * 1000 - Date.now()) / 1000;
        
        console.log(`Rate limited. Waiting ${waitTime}s...`);
        await new Promise(r => setTimeout(r, Math.max(0, waitTime) * 1000));
      } else {
        throw error;
      }
    }
  }
}

// Usage
const repos = await withRateLimit(() => 
  agent.searchRepos('javascript')
);
```

## Example 10: Create PR from Issue

```javascript
async function createPRFromIssue(owner, repo, issueNumber) {
  const issue = await agent.request('GET', `/repos/${owner}/${repo}/issues/${issueNumber}`);
  
  // Create branch
  const branchName = `fix/issue-${issueNumber}`;
  
  // Create PR body referencing the issue
  const prBody = `
## Description
Fixes #${issueNumber}

${issue.body}

## Changes
- [Describe changes here]

## Testing
- [Describe testing here]
  `;
  
  const pr = await agent.request('POST', `/repos/${owner}/${repo}/pulls`, {
    title: `Fix: ${issue.title}`,
    body: prBody,
    head: branchName,
    base: 'main'
  });
  
  return pr;
}
```

## Tips for Success

1. **Always handle errors**: Use try-catch for API calls
2. **Check rate limits**: GitHub has limits on API calls
3. **Use pagination**: For large result sets, paginate results
4. **Cache results**: Store responses in memory if querying multiple times
5. **Add delays**: Between requests to avoid rate limiting
6. **Validate input**: Check parameters before API calls

## Running Examples

To run these examples:

```bash
# 1. Create example-runner.js with examples above
# 2. Set GITHUB_TOKEN
export GITHUB_TOKEN="your_token"

# 3. Run
node example-runner.js
```

## Next Steps

- Modify examples for your use case
- Combine examples to create workflows
- Integrate with VS Code extensions
- Build autonomous agents

## Need Help?

Check:
- [USAGE.md](USAGE.md) for detailed API reference
- [SETUP.md](SETUP.md) for configuration
- GitHub API docs: https://docs.github.com/en/rest
