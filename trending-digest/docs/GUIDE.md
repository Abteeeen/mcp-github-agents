# 📈 Trending Repository Digest - Complete Guide

Comprehensive documentation for the Trending Repository Digest Agent.

---

## Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Installation](#installation)
4. [Getting Started](#getting-started)
5. [How It Works](#how-it-works)
6. [Data Structure](#data-structure)
7. [Job Market Correlation](#job-market-correlation)
8. [AI/ML Detection](#aiml-detection)
9. [Slack Integration](#slack-integration)
10. [Customization](#customization)
11. [Scheduling](#scheduling)
12. [API Reference](#api-reference)
13. [Troubleshooting](#troubleshooting)

---

## Overview

The Trending Repository Digest Agent is an AI-powered tool that:

1. **Analyzes GitHub** - Scans trending repositories across 10 programming languages
2. **Detects AI Trends** - Identifies latest AI/ML projects
3. **Correlates Job Market** - Shows salary, demand, and growth for each technology
4. **Generates Reports** - Creates formatted newsletters
5. **Exports Data** - Saves to JSON for further analysis
6. **Posts to Slack** - Sends weekly digest to your team
7. **Delivers Recommendations** - Suggests what to learn based on trending tech

### Why Use This?

- **Stay updated** on what's trending in your field
- **Make informed decisions** about what technology to learn
- **Understand market demand** for trending skills
- **Share insights** with your team via Slack
- **Make data-driven career choices** based on trends + job market

---

## Features

### 1. Multi-Language Trending Analysis

**Monitors 10 Programming Languages:**
- JavaScript, Python, TypeScript, Java, Go, Rust, C++, C#, Kotlin, Swift

**For each language, gets:**
- Top 15 trending repositories from the last 7 days
- Repository statistics (stars, forks, last update)
- Description and GitHub URL
- Topics and categorization

**Use Case:** Know what's trending and popular in your preferred language

### 2. AI/ML Trend Detection

**Searches for AI-related keywords:**
- General: "AI", "Machine Learning", "Deep Learning"
- Specific: "LLM", "Language Model", "GPT", "Transformer"
- Frameworks: "TensorFlow", "PyTorch", "Hugging Face"
- Contemporary: "Generative AI", "RAG", "Prompt Engineering", "Vector DB"

**Gets top 20 AI projects from last 30 days**

**For each project, includes:**
- Repository name and owner
- Description and URL
- Star count
- Programming language used
- Trending category matched
- GitHub topics

**Use Case:** Discover cutting-edge AI/ML projects and emerging technologies

### 3. Job Market Correlation

**Built-in data for 10 languages:**

```javascript
Language : {
  jobOpenings: number,     // Count of job postings
  avgSalary: number,       // Average salary in USD
  growth: number,          // YoY growth percentage
  demand: 'Very High'|'High'|'Medium'|'Low'  // Demand level
}
```

**Examples:**

| Language | Openings | Avg Salary | Growth | Demand |
|----------|----------|-----------|--------|--------|
| Python | 45,000 | $125k | 28% | Very High |
| Rust | 8,000 | $155k | 35% | High |
| Go | 12,000 | $145k | 42% | High |
| JavaScript | 50,000 | $110k | 12% | Very High |

**Use Case:** Correlate what's trending with job market demand and salary expectations

### 4. Newsletter Generation

Generates a formatted markdown newsletter including:

- Weekly header with generation date
- Top trending repos by language
- Job market correlation for each language
- Top 10 trending AI/ML projects
- How to get started guide for latest AI tech
- Statistics and insights
- Career recommendations

**Newsletter includes:**
- ⭐ Star counts
- 📚 Fork counts
- 💼 Job market data
- 💰 Salary information
- 📊 Demand levels
- 🚀 Learning paths

**Use Case:** Share professional, data-driven insights with your team

### 5. JSON Export

Exports complete structured data:

```javascript
{
  timestamp: "2024-03-06T12:34:56.789Z",
  summary: {
    totalRepos: 150,
    aiTrendingRepos: 18,
    languagesMonitored: 10,
    generatedAt: "3/6/2024, 1:34:56 PM"
  },
  byLanguage: {
    'JavaScript': [...],
    'Python': [...],
    // ... all languages
  },
  aiTrends: [...20 AI projects...],
  newsletter: "markdown format"
}
```

**File location:** `trending-digest/exports/trending-digest.json`

**Use Case:** Programmatically access data, build dashboards, further analysis

### 6. Slack Integration

**Sends formatted Slack messages:**
- Header with emoji
- Top repos by language
- Top AI projects
- Key insights
- Generation timestamp

**Slack format:**
- Uses Slack Blocks API
- Professional formatting
- Easy to read
- Includes links to repositories

**Requirements:**
- Slack Incoming Webhook URL
- Member has channel post permissions
- SLACK_WEBHOOK_URL environment variable

**Use Case:** Keep team updated without leaving Slack

### 7. Smart Recommendations

**Analyzes trending projects and provides:**
1. **Top trending AI project** - What's #1 right now
2. **Getting started steps:**
   - Clone & install instructions
   - What to learn from docs
   - Hands-on practice steps
3. **Career path:**
   - Job market demand
   - Average salary
   - Growth potential
   - Top hiring companies
4. **Learning timeline** - How long to learn and get hired

**Use Case:** Developers want to know "what should I learn and why"

---

## Installation

### Prerequisites

- Node.js 18+ (uses built-in HTTPS module)
- GitHub Personal Access Token
- (Optional) Slack Workspace with Incoming Webhooks

### Setup

1. **Clone repository**
```bash
git clone https://github.com/Abteeeen/mcp-github-agents.git
cd mcp-github-agents
```

2. **Set GitHub Token**
```powershell
# Windows PowerShell (Admin)
[Environment]::SetEnvironmentVariable("GITHUB_TOKEN", "ghp_xxxx", "User")

# Restart VS Code
```

3. **(Optional) Set Slack Webhook**
```powershell
[Environment]::SetEnvironmentVariable("SLACK_WEBHOOK_URL", "https://hooks.slack.com/services/T.../B.../X...", "User")
```

4. **Run agent**
```bash
npm run trending-digest
```

---

## Getting Started

### First Run

```bash
npm run trending-digest

# Output:
# 🤖 Trending Repository Digest Agent
# 📊 Fetching trending JavaScript repos (week)...
# 📊 Fetching trending Python repos (week)...
# ... [fetching all 10 languages] ...
# 🤖 Detecting AI/ML trends...
# 📰 Generating newsletter...
# ✅ Exported to: trending-digest/exports/trending-digest.json
# 📢 Sending to Slack...
# ✅ Message sent to Slack successfully!
```

### Checking Results

**View JSON export:**
```bash
cat trending-digest/exports/trending-digest.json | jq '.'
```

**View Slack message:**
- Check your configured Slack channel
- Should see weekly digest with formatting

**View newsletter:**
```javascript
// In code:
const digestData = require('./trending-digest/exports/trending-digest.json');
console.log(digestData.newsletter);
```

---

## How It Works

### Execution Flow

```
START
  ↓
GET GITHUB TOKEN
  ↓
FOR EACH LANGUAGE (JavaScript, Python, TypeScript, etc.)
  ├─ Query GitHub API: search trending repos
  ├─ Get top 15 repos from last 7 days
  └─ Correlate with Job Market data
  ↓
DETECT AI TRENDS
  ├─ Search for AI-related keywords
  ├─ Get top 20 repos from last 30 days
  └─ Categorize by trend type
  ↓
GENERATE NEWSLETTER
  ├─ Format by language
  ├─ Add job correlations
  ├─ Add AI insights
  └─ Add recommendations
  ↓
EXPORT TO JSON
  └─ Save structured data
  ↓
SEND TO SLACK (if configured)
  └─ Post formatted message
  ↓
DISPLAY SUMMARY
  └─ Console output with stats
  ↓
END
```

### API Calls Made

**GitHub API calls:**
- 1 call per language (10 total) - search trending repos
- 6 calls for AI trends (different keywords)
- Total: ~16 API calls per run

**Rate limiting:**
- GitHub limit: 5000 requests/hour with token
- This agent uses ~16 per run
- Can run ~312 times per hour safely
- Recommended: Weekly or daily (not hourly)

**Slack API calls:**
- 1 call to post message (if configured)

---

## Data Structure

### Output JSON Format

```javascript
{
  // Metadata
  timestamp: "2024-03-06T19:34:56.789Z",
  
  // Summary stats
  summary: {
    totalRepos: 150,        // All repos analyzed
    aiTrendingRepos: 18,    // AI/ML repos found
    languagesMonitored: 10, // Number of languages
    generatedAt: "3/6/2024, 1:34:56 PM"
  },
  
  // Trending repos by language
  byLanguage: {
    "JavaScript": [
      {
        name: "react",
        owner: "facebook",
        url: "https://github.com/facebook/react",
        description: "A JavaScript library for building user interfaces with components",
        stars: 195000,
        forks: 41000,
        language: "JavaScript",
        updatedAt: "2024-03-06T...",
        topics: ["javascript", "ui", "react"],
        isPrimary: true,
        jobMarketData: {
          openings: 50000,
          avgSalary: 110000,
          yoyGrowth: "12%",
          demand: "Very High",
          opportunity: "🚀 Very Good"
        }
      },
      // ... more repos
    ],
    "Python": [...],
    // ... 10 languages total
  },
  
  // AI/ML trending projects
  aiTrends: [
    {
      name: "llama",
      owner: "facebookresearch",
      url: "https://github.com/facebookresearch/llama",
      description: "Inference code for LLaMA models",
      stars: 52000,
      forks: 12000,
      language: "Python",
      updatedAt: "2024-03-06T...",
      topics: ["llm", "ai", "language-models"],
      isAI: true,
      trendingCategory: "large language models llm"
    },
    // ... more AI projects
  ],
  
  // Formatted newsletter text
  newsletter: "# 📈 Weekly Trending Repository Digest\n..."
}
```

### Repository Object

Each repository includes:

```javascript
{
  name: string,              // Repo name
  owner: string,             // Owner/organization
  url: string,               // GitHub URL
  description: string,       // Short description
  stars: number,             // Star count (popularity)
  forks: number,             // Fork count
  language: string,          // Primary language
  updatedAt: string(ISO),    // Last update date/time
  topics: string[],          // GitHub topics/tags
  jobMarketData: {           // (only if language tracked)
    openings: number,        // Job postings
    avgSalary: number,       // USD
    yoyGrowth: string,       // "12%"
    demand: string,          // "Very High", "High", etc.
    opportunity: string      // "🔥 Excellent", "🚀 Very Good"
  }
}
```

---

## Job Market Correlation

### How It Works

1. **Identify language** of trending repository
2. **Look up job data** for that language (if available)
3. **Calculate opportunity score:**
   ```
   Score = (Salary/50000 + Growth/10 + DemandLevel) / 3
   
   Score > 8 = 🔥 Excellent
   Score > 6 = 🚀 Very Good
   Score > 4 = 📈 Good
   Score < 4 = 📊 Decent
   ```
4. **Attach to repo data** in output

### Supported Languages (with job data)

✅ JavaScript - 50,000 openings, $110k avg, 12% growth  
✅ Python - 45,000 openings, $125k avg, 28% growth  
✅ TypeScript - 38,000 openings, $130k avg, 35% growth  
✅ Java - 42,000 openings, $128k avg, 8% growth  
✅ Go - 12,000 openings, $145k avg, 42% growth  
✅ Rust - 8,000 openings, $155k avg, 35% growth  
✅ C++ - 15,000 openings, $135k avg, 10% growth  
✅ C# - 28,000 openings, $120k avg, 15% growth  
✅ Kotlin - 8,000 openings, $118k avg, 22% growth  
✅ Swift - 6,000 openings, $115k avg, 5% growth  

### Use Case Scenarios

**Scenario 1: Choosing what to learn**
```
"Python is trending AND has 45k jobs with $125k salary AND 28% growth"
→ Decision: Python is excellent choice
```

**Scenario 2: Career planning**
```
"Rust trending, only 8k jobs BUT $155k salary and 35% growth"
→ Decision: Niche skill, highly paid future opportunity
```

**Scenario 3: Team upskilling**
```
"TypeScript trending with 38k jobs, $130k, 35% growth"
→ Decision: High demand, high pay, future-proof investment
```

---

## AI/ML Detection

### How It Works

1. **Define keywords** - 40+ AI-related terms
2. **Search GitHub** - Multiple queries combining terms + date filter
3. **Aggregate results** - Combine all search results
4. **Deduplicate** - Remove duplicate repos
5. **Sort by stars** - Most popular first
6. **Return top 20** - Final AI trend list

### Detected AI Categories

```
Query 1: "ai artificial intelligence"
Query 2: "machine learning ml"
Query 3: "large language models llm"
Query 4: "deep learning neural networks"
Query 5: "generative ai"
Query 6: "retrieval augmented generation rag"
```

### AI Keywords Tracked

**General:** ai, machine learning, ml, deep learning, neural network  
**Models:** llm, language model, gpt, transformer, bert  
**Tasks:** nlp, natural language, computer vision, cv  
**Frameworks:** tensorflow, pytorch, keras, scikit-learn  
**Companies:** huggingface, anthropic, openai, mistral  
**Techniques:** vllm, ollama, langchain, llamaindex  
**Advanced:** rag, retrieval augmented, embeddings, vector  
**Strategies:** agent, autonomous, multi-agent, prompt engineering  

### Result Categories

Each AI trend is tagged with:
- `trendingCategory` - Which search query matched it
- `isAI` - Always true for AI trends
- Stars and forks showing popularity
- Topics showing what it does

---

## Slack Integration

### Setup Instructions

See [SLACK_SETUP.md](SLACK_SETUP.md) for detailed setup.

### Quick Setup

1. **Create Slack App**
   - Go to https://api.slack.com/apps
   - Create New App → From scratch
   - Name: "Trending Digest"
   - Workspace: Choose your workspace

2. **Enable Incoming Webhooks**
   - Click "Incoming Webhooks"
   - Toggle ON
   - Add New Webhook to Workspace
   - Select channel
   - Authorize

3. **Copy URL**
   - Copy Webhook URL (starts with https://hooks.slack.com/services/...)
   - Set environment variable:
   ```powershell
   [Environment]::SetEnvironmentVariable("SLACK_WEBHOOK_URL", "https://hooks.slack.com/services/T.../B.../X...", "User")
   ```

4. **Test**
   ```bash
   npm run trending-digest
   ```

### Message Format

Slack message includes:

```
Header: 📈 Weekly Trending Repository Digest

Content:
- Top 10 trending AI/ML projects
- Details: Name, Owner, Stars, Language
- Stats: Total repos, AI repos, languages
- Timestamp

Format: Slack Blocks API (professional look)
```

### Customizing Slack Messages

Edit `sendToSlack()` method in `trending-digest.js`:

```javascript
const message = {
  text: "Your header",
  blocks: [
    // Customize these blocks
    {
      type: 'header',
      text: { type: 'plain_text', text: 'Your Title' }
    },
    // ... add more blocks
  ]
};
```

### Troubleshooting Slack

**Message not appearing?**
1. Check SLACK_WEBHOOK_URL is set
2. Verify URL is correct (paste into browser, should error)
3. Check channel exists and bot has permissions
4. Check VS Code terminal for error messages

**Message format wrong?**
1. Edit the blocks in `sendToSlack()`
2. Slack Block Kit reference: https://api.slack.com/block-kit

**Want different channel?**
1. Create new webhook for different channel
2. Set different env var or update code

---

## Customization

### Add More Languages

Edit `src/trending-digest.js`:

```javascript
const JOB_MARKET_DATA = {
  'JavaScript': { ... },
  'Python': { ... },
  
  // Add new language:
  'Golang': {
    jobOpenings: 12000,
    avgSalary: 145000,
    growth: 42,
    demand: 'High'
  },
  
  // ... rest
};
```

Then it will automatically monitored.

### Change Repository Count

In `getTrendingRepositories()`:

```javascript
// Current: 15 per language
per_page=15

// Change to 20:
per_page=20

// Change AI trends from 10 per query to 5:
per_page=5
```

### Adjust Time Ranges

```javascript
// Weekly (current - 7 days)
const dateThreshold = new Date();
dateThreshold.setDate(dateThreshold.getDate() - 7);

// Change to monthly (30 days):
dateThreshold.setDate(dateThreshold.getDate() - 30);

// For AI trends (currently 30 days):
// Adjust in detectAITrends() method
```

### Change Newsletter Format

Edit `generateNewsletter()` method - customize the markdown template

### Change Export Location

```javascript
// Current: trending-digest/exports/trending-digest.json
const filepath = path.join(process.cwd(), 'trending-digest', 'exports', filename);

// Change to:
const filepath = path.join(process.cwd(), 'data', 'reports', filename);
```

---

## Scheduling

### Option 1: Node.js Scheduler (Simple)

```javascript
// Add to main agent file:
const schedule = require('node-schedule');

// Run every Monday at 9 AM
schedule.scheduleJob('0 9 * * 1', async () => {
  const agent = new TrendingDigestAgent(token, slackUrl);
  await agent.run();
});
```

### Option 2: Windows Task Scheduler

1. Create batch file: `run-digest.bat`
```bat
@echo off
cd C:\Users\Codev\mcp-github-workspace
set GITHUB_TOKEN=ghp_xxxx
set SLACK_WEBHOOK_URL=https://hooks.slack.com/services/...
npm run trending-digest
```

2. Open Task Scheduler
3. Create Basic Task
4. Name: "Weekly Trending Digest"
5. Trigger: Weekly, Monday, 9:00 AM
6. Action: Start program: `C:\path\to\run-digest.bat`

### Option 3: GitHub Actions (Automated)

Create `.github/workflows/trending-digest.yml`:

```yaml
name: Weekly Trending Digest

on:
  schedule:
    - cron: '0 9 * * 1'  # Monday 9 AM UTC

jobs:
  digest:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm run trending-digest
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}
```

---

## API Reference

### Class: TrendingDigestAgent

#### Constructor
```javascript
const agent = new TrendingDigestAgent(token, slackWebhookUrl);
```

**Parameters:**
- `token` (string) - GitHub Personal Access Token
- `slackWebhookUrl` (string, optional) - Slack Incoming Webhook URL

#### Methods

##### `getTrendingRepositories(language, timeRange)`
Get trending repos for a specific language

```javascript
const repos = await agent.getTrendingRepositories('Python', 'week');
// Returns: Array of repository objects
```

**Parameters:**
- `language` (string) - "JavaScript", "Python", etc.
- `timeRange` (string) - "week" (default) or "month"

**Returns:** Array of repo objects

##### `detectAITrends()`
Find latest AI/ML trending repositories

```javascript
const aiRepos = await agent.detectAITrends();
// Returns: Array of AI project objects
```

**Returns:** Array of 20 top AI repos, sorted by stars

##### `correlateWithJobMarket(repos, language)`
Add job market data to repos

```javascript
const correlated = agent.correlateWithJobMarket(repos, 'Python');
// Returns: Repos with jobMarketData attached
```

**Parameters:**
- `repos` (array) - Repository objects
- `language` (string) - Language name

**Returns:** Array of repos with jobMarketData

##### `generateNewsletter(allLanguagesData, aiTrends)`
Generate formatted markdown newsletter

```javascript
const newsletter = await agent.generateNewsletter(data, aiTrends);
// Returns: Formatted markdown string
```

**Returns:** String (markdown formatted)

##### `exportToJSON(data, filename)`
Save data to JSON file

```javascript
const path = agent.exportToJSON(data, 'digest.json');
// Creates: trending-digest/exports/digest.json
```

**Parameters:**
- `data` (object) - Data to export
- `filename` (string, optional) - Filename (default: trending-digest.json)

**Returns:** File path or null if error

##### `sendToSlack(newsletter, topic)`
Send message to Slack

```javascript
const success = await agent.sendToSlack(newsletter, 'Weekly Digest');
// Posts message to configured Slack channel
```

**Parameters:**
- `newsletter` (string) - Message content
- `topic` (string, optional) - Message topic

**Returns:** Boolean (success or failure)

##### `run()`
Execute complete digest generation

```javascript
await agent.run();
// Runs everything: fetch, analyze, export, post to Slack
```

**Returns:** Digest data object

---

## Troubleshooting

### Common Issues

**❌ "GITHUB_TOKEN environment variable not set"**
- Windows: Run PowerShell as Admin
- Set: `[Environment]::SetEnvironmentVariable("GITHUB_TOKEN", "ghp_...", "User")`
- Restart VS Code completely

**❌ "API error: 403 - Forbidden"**
- Rate limit exceeded (5000 requests/hour)
- Wait 1 hour or reduce language count
- Check token has correct scopes (repo, gist, user)

**❌ "No repositories found"**
- Normal during quiet periods
- Check GitHub is accessible
- Verify languages are spelled correctly

**❌ "Slack message failed to send"**
- Check SLACK_WEBHOOK_URL is set correctly
- Verify URL format starts with https://hooks.slack.com
- Check workspace allows webhooks
- Check channel exists

**❌ "JSON not exporting"**
- Ensure trending-digest/exports/ exists
- Check write permissions on folder
- Try running npm run trending-digest again

**❌ "Newsletter empty or incomplete"**
- API calls may have partially failed
- Check console for error messages
- Run again to retry failed requests

---

## Performance & Optimization

### Typical Run Time

- Cold start: 30-45 seconds (fetching all data)
- Slack send: 2-3 seconds
- Total: 35-50 seconds

### Optimization Tips

1. **Run offline** - Cache results locally, re-use next run
2. **Reduce languages** - Monitor fewer languages
3. **Batch requests** - Combine multiple queries
4. **Use webhooks** - Slack posts are faster than API calls

### Data Storage

- JSON file: ~150-200 KB per run
- Recommended: Keep last 4 weeks (archive older)
- Local storage: Minimal (same machine)

---

## License

MIT - See LICENSE in root directory

---

**Created:** March 6, 2026  
**Status:** Production Ready ✅
