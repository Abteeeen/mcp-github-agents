# 📈 Trending Digest - Code Examples

15+ code examples for customization and integration.

---

## Example 1: Basic Usage

Run the complete digest:

```javascript
import { TrendingDigestAgent } from './src/trending-digest.js';

const agent = new TrendingDigestAgent(process.env.GITHUB_TOKEN);
await agent.run();

// Output: Fetches all languages, AI trends, generates newsletter, exports JSON
```

**Use case:** Standard weekly digest run

---

## Example 2: Get Only JavaScript Trending

```javascript
const agent = new TrendingDigestAgent(process.env.GITHUB_TOKEN);
const jsRepos = await agent.getTrendingRepositories('JavaScript', 'week');

jsRepos.forEach(repo => {
  console.log(`⭐ ${repo.name} by ${repo.owner}`);
  console.log(`   Stars: ${repo.stars.toLocaleString()}`);
  console.log(`   URL: ${repo.url}\n`);
});
```

**Output:**
```
⭐ NextJS by vercel
   Stars: 120,000
   URL: https://github.com/vercel/next.js

⭐ React by facebook
   Stars: 195,000
   URL: https://github.com/facebook/react
```

**Use case:** Monitor specific language trends

---

## Example 3: Get Monthly Trends

```javascript
const agent = new TrendingDigestAgent(process.env.GITHUB_TOKEN);

// Get monthly trending instead of weekly
const pythonRepos = await agent.getTrendingRepositories('Python', 'month');

console.log(`Found ${pythonRepos.length} trending Python repos in the last month`);
pythonRepos.slice(0, 5).forEach((repo, i) => {
  console.log(`${i+1}. ${repo.name} (${repo.stars} stars)`);
});
```

**Use case:** See longer-term trends, less noisy

---

## Example 4: AI Trends Only

```javascript
const agent = new TrendingDigestAgent(process.env.GITHUB_TOKEN);
const aiTrends = await agent.detectAITrends();

console.log(`🤖 Top 5 AI Projects This Week:\n`);
aiTrends.slice(0, 5).forEach((repo, i) => {
  console.log(`${i+1}. ${repo.name}`);
  console.log(`   Owner: ${repo.owner}`);
  console.log(`   Description: ${repo.description.substring(0, 60)}...`);
  console.log(`   Language: ${repo.language}`);
  console.log(`   Category: ${repo.trendingCategory}\n`);
});
```

**Use case:** Focus only on AI/ML trends

---

## Example 5: Compare Languages by Job Market

```javascript
const agent = new TrendingDigestAgent(process.env.GITHUB_TOKEN);

const languages = ['Python', 'Rust', 'TypeScript', 'Go'];
const salaryMap = {};

for (const lang of languages) {
  const repos = await agent.getTrendingRepositories(lang);
  const correlated = agent.correlateWithJobMarket(repos, lang);
  
  if (correlated[0]?.jobMarketData) {
    salaryMap[lang] = correlated[0].jobMarketData.avgSalary;
  }
}

const sorted = Object.entries(salaryMap).sort((a, b) => b[1] - a[1]);
console.table(sorted);

// Output:
// ┌─────────┬────────┐
// │ Language│ Salary │
// ├─────────┼────────┤
// │  Rust   │155000  │
// │   Go    │145000  │
// │TypeScript│130000 │
// │ Python  │125000  │
// └─────────┴────────┘
```

**Use case:** Find highest-paying trending technologies

---

## Example 6: Export Multiple Formats

```javascript
const agent = new TrendingDigestAgent(process.env.GITHUB_TOKEN);
const data = await agent.run();

// Export as JSON (built-in)
agent.exportToJSON(data, 'digest-weekly.json');

// Export as CSV
const csv = [['Name', 'Owner', 'Stars', 'Language', 'Job Market']];
Object.values(data.byLanguage).forEach(repos => {
  repos.forEach(repo => {
    csv.push([
      repo.name,
      repo.owner,
      repo.stars,
      repo.language,
      repo.jobMarketData?.demand || 'N/A'
    ]);
  });
});

const csvContent = csv.map(row => row.join(',')).join('\n');
fs.writeFileSync('trending-digest.csv', csvContent);
console.log('✅ Exported to trending-digest.csv');
```

**Use case:** Use data in spreadsheets or other tools

---

## Example 7: Send to Slack with Custom Message

```javascript
const agent = new TrendingDigestAgent(
  process.env.GITHUB_TOKEN,
  process.env.SLACK_WEBHOOK_URL
);

const data = await agent.run();

// Send custom formatted message
const customMessage = `
🚀 Weekly Trending Summary

Total repos analyzed: ${data.summary.totalRepos}
AI projects trending: ${data.summary.aiTrendingRepos}
Most trending language: Python (45k+ jobs available)

Top opportunity: Learn Rust ($155k avg salary, 35% growth)

View full report: [Full Report Link](https://your-domain.com/digest)
`;

await agent.sendToSlack(customMessage, 'Custom Weekly Digest');
```

**Use case:** Send custom formatted messages to Slack

---

## Example 8: Schedule Weekly Runs

```javascript
import schedule from 'node-schedule';
import { TrendingDigestAgent } from './src/trending-digest.js';

// Run every Monday at 9 AM
schedule.scheduleJob('0 9 * * 1', async () => {
  console.log('📅 Running scheduled digest...');
  const agent = new TrendingDigestAgent(
    process.env.GITHUB_TOKEN,
    process.env.SLACK_WEBHOOK_URL
  );
  await agent.run();
});

console.log('⏰ Scheduled: Weekly digest every Monday 9 AM');

// Keep process running
setInterval(() => {}, 1000);
```

**Installation:** `npm install node-schedule`

**Use case:** Automated weekly updates

---

## Example 9: Find Fastest Growing Languages

```javascript
const agent = new TrendingDigestAgent(process.env.GITHUB_TOKEN);

// Get trending for all languages
const results = {};
const languages = ['Go', 'Rust', 'TypeScript', 'Python', 'JavaScript'];

for (const lang of languages) {
  const repos = await agent.getTrendingRepositories(lang);
  const correlated = agent.correlateWithJobMarket(repos, lang);
  
  const growth = correlated[0]?.jobMarketData?.yoyGrowth || '0%';
  results[lang] = parseInt(growth);
}

const sorted = Object.entries(results).sort((a, b) => b[1] - a[1]);

console.log('🚀 Fastest Growing Languages:\n');
sorted.forEach(([lang, growth], i) => {
  console.log(`${i+1}. ${lang}: ${growth}% YoY growth`);
});
```

**Output:**
```
🚀 Fastest Growing Languages:

1. Go: 42% YoY growth
2. Rust: 35% YoY growth
3. TypeScript: 35% YoY growth
4. Python: 28% YoY growth
5. JavaScript: 12% YoY growth
```

**Use case:** Identify emerging technologies

---

## Example 10: Build a Dashboard

```javascript
import express from 'express';
import { TrendingDigestAgent } from './src/trending-digest.js';

const app = express();
let digestData = null;

// Endpoint: Get current digest
app.get('/api/digest', (req, res) => {
  res.json(digestData);
});

// Endpoint: Get top AI projects
app.get('/api/ai-trends', (req, res) => {
  const top10 = digestData?.aiTrends.slice(0, 10) || [];
  res.json(top10);
});

// Endpoint: Get trending by language
app.get('/api/trending/:language', (req, res) => {
  const { language } = req.params;
  const data = digestData?.byLanguage[language] || [];
  res.json(data);
});

// Endpoint: Trigger new digest
app.post('/api/refresh', async (req, res) => {
  const agent = new TrendingDigestAgent(
    process.env.GITHUB_TOKEN,
    process.env.SLACK_WEBHOOK_URL
  );
  digestData = await agent.run();
  res.json({ status: 'Digest refreshed' });
});

app.listen(3000, () => {
  console.log('🖥️  Digest API running on port 3000');
});

// Initial load
setTimeout(async () => {
  const agent = new TrendingDigestAgent(process.env.GITHUB_TOKEN);
  digestData = await agent.run();
}, 1000);
```

**Use case:** REST API for dashboard access

---

## Example 11: Discord Integration

```javascript
import fetch from 'node-fetch';
import { TrendingDigestAgent } from './src/trending-digest.js';

async function sendToDiscord(webhookUrl, data) {
  const topAI = data.aiTrends[0];
  
  const embed = {
    title: '📈 Weekly Trending Repository Digest',
    description: `Top trending AI project: **${topAI.name}**`,
    fields: [
      {
        name: '🤖 Top AI Project',
        value: `[${topAI.name}](${topAI.url}) by ${topAI.owner}\n⭐ ${topAI.stars} stars`,
        inline: false
      },
      {
        name: '📊 This Week\'s Stats',
        value: `Repos analyzed: ${data.summary.totalRepos}\nAI trending: ${data.summary.aiTrendingRepos}`,
        inline: true
      }
    ],
    color: 3447003,
    timestamp: new Date().toISOString()
  };

  await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ embeds: [embed] })
  });

  console.log('✅ Sent to Discord');
}

// Usage
const agent = new TrendingDigestAgent(process.env.GITHUB_TOKEN);
const data = await agent.run();
await sendToDiscord(process.env.DISCORD_WEBHOOK_URL, data);
```

**Use case:** Post to Discord instead of (or in addition to) Slack

---

## Example 12: Email Alert

```javascript
import nodemailer from 'nodemailer';
import { TrendingDigestAgent } from './src/trending-digest.js';

async function emailDigest(data) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const topAI = data.aiTrends[0];
  const htmlContent = `
    <h1>📈 Weekly Trending Digest</h1>
    <p>Generated: ${new Date().toLocaleDateString()}</p>
    
    <h2>🤖 Top Trending AI Project</h2>
    <p><a href="${topAI.url}">${topAI.name}</a> by ${topAI.owner}</p>
    <p>⭐ ${topAI.stars.toLocaleString()} stars</p>
    
    <h2>📊 Statistics</h2>
    <ul>
      <li>Repos Analyzed: ${data.summary.totalRepos}</li>
      <li>AI Trending: ${data.summary.aiTrendingRepos}</li>
      <li>Languages: ${data.summary.languagesMonitored}</li>
    </ul>
  `;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: 'team@example.com',
    subject: '📈 Weekly Trending Digest',
    html: htmlContent
  });

  console.log('📧 Email sent');
}

// Usage
const agent = new TrendingDigestAgent(process.env.GITHUB_TOKEN);
const data = await agent.run();
await emailDigest(data);
```

**Installation:** `npm install nodemailer`

**Use case:** Email digest to team/stakeholders

---

## Example 13: Database Storage

```javascript
// Example with MongoDB
import { MongoClient } from 'mongodb';
import { TrendingDigestAgent } from './src/trending-digest.js';

async function storeDigest(data) {
  const client = new MongoClient(process.env.MONGODB_URI);
  
  try {
    await client.connect();
    const db = client.db('trending_digests');
    const collection = db.collection('digests');
    
    await collection.insertOne({
      ...data,
      createdAt: new Date(),
      week: new Date().toISOString().split('T')[0]
    });
    
    console.log('✅ Stored in MongoDB');
  } finally {
    await client.close();
  }
}

// Usage
const agent = new TrendingDigestAgent(process.env.GITHUB_TOKEN);
const data = await agent.run();
await storeDigest(data);
```

**Use case:** Track historical data over time

---

## Example 14: AI Learning Recommendations

```javascript
const agent = new TrendingDigestAgent(process.env.GITHUB_TOKEN);
const aiTrends = await agent.detectAITrends();

// Get top 5 AI projects and recommend learning
const topAI = aiTrends.slice(0, 5);

console.log('🎓 Recommended AI Learning Path (Based on Trends)\n');

topAI.forEach((project, i) => {
  console.log(`${i+1}. ${project.name}`);
  console.log(`   Project: ${project.description.substring(0, 60)}...`);
  console.log(`   Language: ${project.language}`);
  console.log(`   Stars: ${project.stars.toLocaleString()}`);
  console.log(`   Why: High popularity = well-documented & active community`);
  console.log(`   Next step: Clone repo, read README, try examples\n`);
});
```

**Output:**
```
🎓 Recommended AI Learning Path (Based on Trends)

1. llama
   Project: Inference code for LLaMA large language models...
   Language: Python
   Stars: 52,000
   Why: High popularity = well-documented & active community
   Next step: Clone repo, read README, try examples
```

**Use case:** Suggest what to learn based on what's trending

---

## Example 15: Generate Report Files

```javascript
import fs from 'fs';
import { TrendingDigestAgent } from './src/trending-digest.js';

async function generateReports(data) {
  const timestamp = new Date().toISOString().split('T')[0];
  
  // Save JSON
  fs.writeFileSync(
    `reports/digest-${timestamp}.json`,
    JSON.stringify(data, null, 2)
  );
  
  // Save Markdown (newsletter)
  fs.writeFileSync(
    `reports/digest-${timestamp}.md`,
    data.newsletter
  );
  
  // Save summary as text
  const summary = `
TRENDING DIGEST SUMMARY
Date: ${new Date().toLocaleDateString()}

STATISTICS:
- Total Repos: ${data.summary.totalRepos}
- AI Projects: ${data.summary.aiTrendingRepos}
- Languages: ${data.summary.languagesMonitored}

TOP 3 TRENDING AI PROJECTS:
${data.aiTrends.slice(0, 3).map((p, i) =>
  `${i+1}. ${p.name} (${p.stars} stars)`
).join('\n')}

Generated: ${new Date()}
  `;

  fs.writeFileSync(
    `reports/digest-${timestamp}.txt`,
    summary
  );
  
  console.log('✅ Reports saved: JSON, Markdown, and text');
}

// Usage
const agent = new TrendingDigestAgent(process.env.GITHUB_TOKEN);
const data = await agent.run();
await generateReports(data);
```

**Use case:** Generate multiple report formats for archival

---

## Tips & Tricks

### Performance

- **Cache results** - Save JSON, reuse within 24 hours
- **Batch requests** - Combine multiple queries in one API call
- **Rate limit** - 5000 requests/hour, so 16 requests per run = sustainable

### Data Analysis

- **Trending detection** - Use datetime filters for accurate trends
- **Job correlation** - Update salary data monthly for accuracy
- **Opportunity scoring** - Combine multiple metrics for better insights

### Integration

- **Slack** - Use incoming webhooks (no complex auth)
- **Discord** - Same pattern as Slack
- **Email** - Works with Gmail, Outlook, etc.
- **Database** - Store history for analysis

### Customization

- **Add languages** - Just add to JOB_MARKET_DATA
- **Change keywords** - Modify AI_KEYWORDS array
- **Adjust timeframes** - Edit date threshold logic
- **New formats** - Extend exportToJSON() method

---

**Created:** March 6, 2026  
**Status:** Production Ready ✅
