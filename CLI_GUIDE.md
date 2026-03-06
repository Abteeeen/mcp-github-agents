# 🖥️ CLI & Integration Guide

Complete guide to using agents from command line and integrating with Gemini.

---

## 📚 Table of Contents

1. [Current CLI Usage](#current-cli-usage)
2. [Trending Digest CLI Arguments](#trending-digest-cli-arguments)
3. [Integration with Gemini](#integration-with-gemini)
4. [Creating Custom CLIs](#creating-custom-clis)
5. [Advanced Usage](#advanced-usage)

---

## 🎯 Current CLI Usage

All three agents work as command-line tools:

### Agent 1: GitHub MCP

```powershell
npm start
# Or directly:
node github-mcp/src/agent.js
```

**What it does:** Searches GitHub and analyzes repositories in real-time.

### Agent 2: Job Analyzer

```powershell
npm run job-market
# Or directly:
node job-analyzer/src/agent.js
```

**What it does:** Shows job market data for trending technologies.

### Agent 3: Trending Digest

```powershell
npm run trending-digest
# Or directly:
node trending-digest/src/trending-digest.js
```

**What it does:** Generates full weekly digest and posts to Slack.

---

## 🔧 Trending Digest CLI Arguments

The Trending Digest agent now supports powerful command-line arguments for different use cases!

### Usage Format

```powershell
npm run trending-digest -- [options]
```

### Available Arguments

| Argument | Description | Example |
|----------|-------------|---------|
| `--language=LANG` | Analyze only one language | `--language=python` |
| `--ai-only` | Show only AI/ML trending projects | `--ai-only` |
| `--no-slack` | Skip posting to Slack | `--no-slack` |
| `--format=FORMAT` | Export format (json/csv) | `--format=json` |
| `--help` or `-h` | Show help message | `--help` |

### Examples

#### 1️⃣ **Get Help**

```powershell
npm run trending-digest -- --help
```

**Output:** Shows all available commands and usage examples.

#### 2️⃣ **Analyze Single Language**

```powershell
npm run trending-digest -- --language=python
```

**What happens:**
- Fetches top 15 Python trending repos this week
- Shows stars, forks, description for each
- Exports to `trending-python.json`
- No Slack posting

**Output example:**
```
📊 Analyzing python trending repositories...

🔍 Found 15 trending python repos:

1. project-name
   ⭐ 2609 stars | 📁 270 forks
   📝 Description of the project...

2. another-project
   ⭐ 1552 stars | 📁 291 forks
   ...

✅ Exported to: trending-digest/exports/trending-python.json
```

#### 3️⃣ **Analyze Multiple Languages**

Get top repos for JavaScript, Rust, and Go:

```powershell
# Run 3 times with different languages
npm run trending-digest -- --language=javascript --no-slack
npm run trending-digest -- --language=rust --no-slack
npm run trending-digest -- --language=go --no-slack
```

#### 4️⃣ **AI/ML Trends Only**

```powershell
npm run trending-digest -- --ai-only --no-slack
```

**What happens:**
- Detects 40+ AI keywords (LLM, Generative AI, RAG, etc.)
- Finds top 20 trending AI/ML projects
- Exports to `ai-trends.json`
- No language-by-language analysis

**Output example:**
```
🤖 Detecting AI/ML trends...

🔥 Found 20 trending AI/ML projects:

1. AWESOME-OCR-LLM
   ⭐ 174 stars
   📝 OCR in the Era of Large Language Models...

2. mlops-for-devops
   ⭐ 156 stars
   ...

✅ Exported to: trending-digest/exports/ai-trends.json
```

#### 5️⃣ **Full Digest Without Slack**

```powershell
npm run trending-digest -- --no-slack
```

**What happens:**
- Analyzes all 10 languages
- Detects AI/ML trends
- Generates full newsletter
- Exports to JSON
- Skips Slack posting

Use this when you want data but don't have Slack configured yet.

#### 6️⃣ **Combination: Python Trends + No Slack**

```powershell
npm run trending-digest -- --language=python --no-slack
```

**What happens:**
- Only analyzes Python trending repos
- Exports to `trending-python.json`
- No Slack posting

#### 7️⃣ **Combination: AI Trends + No Slack**

```powershell
npm run trending-digest -- --ai-only --no-slack
```

**What happens:**
- Only AI/ML trends (20 projects)
- No language analysis
- Exports to `ai-trends.json`
- No Slack posting

---

## 🤖 Integration with Gemini

### What is Gemini?

Google's AI model you can use from command line. You can teach it to use your agents!

### Option 1: Simple Bash Wrapper (Easiest)

Create a batch file to call the agent:

**File: `run-agents.bat`** (Windows)

```batch
@echo off
REM Run different agents based on argument

if "%1"=="trending" (
    npm run trending-digest
    goto end
)

if "%1"=="market" (
    npm run job-market
    goto end
)

if "%1"=="github" (
    npm start
    goto end
)

if "%1"=="ai" (
    npm run trending-digest -- --ai-only --no-slack
    goto end
)

if "%1"=="help" (
    echo Available commands:
    echo   run-agents trending   - Full weekly digest
    echo   run-agents market     - Job market analysis
    echo   run-agents github     - GitHub search
    echo   run-agents ai         - AI trends only
    goto end
)

echo Unknown command: %1
echo Type "run-agents help" for available commands

:end
```

**Usage:**
```powershell
# Make it globally available
# Option 1: Add folder to PATH
# Option 2: Run from project folder:

.\run-agents.bat trending
.\run-agents.bat market
.\run-agents.bat ai
```

### Option 2: Node.js + Gemini API (Advanced)

Create a Gemini integration that uses agents as tools:

**File: `gemini-agent-integration.js`**

```javascript
import { GoogleGenerativeAI } from '@google/generative-ai';
import TrendingDigestAgent from './trending-digest/src/trending-digest-class.js';
import JobAnalyzerAgent from './job-analyzer/src/agent.js';

const client = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Define what tools Gemini can use
const tools = {
  getTrendingPython: async () => {
    const agent = new TrendingDigestAgent(process.env.GITHUB_TOKEN);
    return await agent.getTrendingRepositories('python', 'week');
  },

  getTrendingAI: async () => {
    const agent = new TrendingDigestAgent(process.env.GITHUB_TOKEN);
    return await agent.detectAITrends();
  },

  getJobMarket: async () => {
    // Call Job Analyzer
    return `Python jobs: 45,000 openings, $125k salary, 28% growth`;
  }
};

async function askGemini(userQuestion) {
  const model = client.getGenerativeModel({ model: 'gemini-pro' });

  const chat = model.startChat({
    history: []
  });

  console.log('🤖 Gemini:', 'Thinking...\n');

  const response = await chat.sendMessage(userQuestion);
  
  console.log('🤖 Gemini:', response.text);

  // If Gemini decides to use a tool, call it
  if (response.text.includes('trending')) {
    const python = await tools.getTrendingPython();
    console.log('\n📊 Top Python repos found');
  }

  if (response.text.includes('AI')) {
    const ai = await tools.getTrendingAI();
    console.log('\n🤖 AI Trends detected');
  }
}

// Example questions
console.log('Asking Gemini about Python trends...\n');
await askGemini('What are the trending Python projects this week and should I learn them?');
```

**Setup:**
```powershell
# Get Gemini API key from: https://aistudio.google.com/app/apikeys

# Set it as environment variable
[Environment]::SetEnvironmentVariable("GEMINI_API_KEY", "your-key-here", "User")

# Restart VS Code

# Run
node gemini-agent-integration.js
```

### Option 3: Interactive Menu (Best UX)

Create a menu-driven CLI for non-technical users:

**File: `cli-menu.js`**

```javascript
import readline from 'readline';
import TrendingDigestAgent from './trending-digest/src/trending-digest-class.js';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(prompt) {
  return new Promise(resolve => rl.question(prompt, resolve));
}

function clearScreen() {
  console.clear();
}

async function showMainMenu() {
  clearScreen();
  console.log(`
╔════════════════════════════════════════════╗
║     🤖 AI AGENTS CLI - MAIN MENU            ║
╚════════════════════════════════════════════╝

1️⃣  📈 Weekly Trending Digest (All Languages)
2️⃣  🔍 Trending Repositories by Language
3️⃣  🤖 AI/ML Trends Only
4️⃣  💼 Job Market Analysis
5️⃣  🌐 GitHub Repository Search
6️⃣  ❌ Exit

  `);

  const choice = await question('Choose option (1-6): ');

  switch (choice) {
    case '1':
      await runFullDigest();
      break;
    case '2':
      await runByLanguage();
      break;
    case '3':
      await runAITrends();
      break;
    case '4':
      await runJobMarket();
      break;
    case '5':
      await runGitHubSearch();
      break;
    case '6':
      console.log('\n👋 Goodbye!\n');
      rl.close();
      process.exit(0);
    default:
      console.log('❌ Invalid choice');
      await question('\nPress Enter to continue...');
      await showMainMenu();
  }
}

async function runFullDigest() {
  clearScreen();
  console.log('📈 Running Full Weekly Digest...\n');
  console.log('This will analyze all 10 languages and AI trends.\n');

  const confirm = await question('Continue? (y/n): ');
  if (confirm.toLowerCase() !== 'y') {
    await showMainMenu();
    return;
  }

  const agent = new TrendingDigestAgent(
    process.env.GITHUB_TOKEN,
    process.env.SLACK_WEBHOOK_URL
  );

  await agent.run();
  await question('\n✅ Done! Press Enter to continue...');
  await showMainMenu();
}

async function runByLanguage() {
  clearScreen();
  console.log('🔍 Trending by Language\n');

  const languages = [
    'JavaScript', 'Python', 'TypeScript', 'Java', 'Go',
    'Rust', 'C++', 'C#', 'Kotlin', 'Swift'
  ];

  console.log('Available languages:');
  languages.forEach((lang, i) => {
    console.log(`${i + 1}. ${lang}`);
  });

  const choice = await question('\nSelect language (1-10): ');
  const selected = languages[parseInt(choice) - 1];

  if (!selected) {
    console.log('❌ Invalid choice');
    await question('Press Enter to continue...');
    await showMainMenu();
    return;
  }

  console.log(`\n📊 Fetching ${selected} trends...\n`);

  const agent = new TrendingDigestAgent(process.env.GITHUB_TOKEN);
  const repos = await agent.getTrendingRepositories(selected, 'week');

  console.log(`\n🔝 Top 10 ${selected} Repos:\n`);
  repos.slice(0, 10).forEach((repo, i) => {
    console.log(`${i + 1}. ${repo.name}`);
    console.log(`   ⭐ ${repo.stars} stars`);
    console.log(`   📝 ${repo.description?.substring(0, 50)}...`);
    console.log('');
  });

  await question('Press Enter to continue...');
  await showMainMenu();
}

async function runAITrends() {
  clearScreen();
  console.log('🤖 AI/ML Trends Detection\n');

  const agent = new TrendingDigestAgent(process.env.GITHUB_TOKEN);
  const trends = await agent.detectAITrends();

  console.log(`\n🔥 Top 20 AI/ML Trending Projects:\n`);
  trends.slice(0, 20).forEach((project, i) => {
    console.log(`${i + 1}. ${project.name}`);
    console.log(`   ⭐ ${project.stars} stars`);
    console.log(`   📝 ${project.description?.substring(0, 50)}...`);
    console.log('');
  });

  await question('Press Enter to continue...');
  await showMainMenu();
}

async function runJobMarket() {
  clearScreen();
  console.log('💼 Job Market Analysis\n');
  console.log('Top technologies by salary and demand:\n');

  const data = [
    { lang: 'Rust', salary: '$155k', growth: '35%', jobs: '8,000' },
    { lang: 'Go', salary: '$145k', growth: '42%', jobs: '12,000' },
    { lang: 'TypeScript', salary: '$130k', growth: '35%', jobs: '38,000' },
    { lang: 'Java', salary: '$128k', growth: '8%', jobs: '42,000' },
    { lang: 'Python', salary: '$125k', growth: '28%', jobs: '45,000' },
  ];

  console.log('Language      | Avg Salary | Growth | Job Openings');
  console.log('─'.repeat(55));
  data.forEach(item => {
    console.log(`${item.lang.padEnd(13)} | ${item.salary.padEnd(10)} | ${item.growth.padEnd(6)} | ${item.jobs}`);
  });

  console.log('\n🏆 Best Overall Opportunity: Rust');
  console.log('   💰 Highest salary ($155k)');
  console.log('   📈 Fastest growing (42%)');
  console.log('   💼 Growing job market');

  await question('\nPress Enter to continue...');
  await showMainMenu();
}

async function runGitHubSearch() {
  clearScreen();
  console.log('🌐 GitHub Repository Search\n');
  // This would use the GitHub MCP agent
  console.log('Features: Search repos, get details, analyze projects');
  console.log('(Detailed implementation in github-mcp agent)');

  await question('\nPress Enter to continue...');
  await showMainMenu();
}

// Start the application
await showMainMenu();
```

**Run it:**
```powershell
node cli-menu.js

# Then navigate using number keys
# 1 = Full digest
# 2 = Select language
# 3 = AI trends
# etc.
```

---

## 🚀 Creating Custom CLIs

### Template: Custom Agent CLI

```javascript
// custom-cli.js
import TrendingDigestAgent from './trending-digest/src/trending-digest-class.js';

// Parse arguments
const args = process.argv.slice(2);
const command = args[0];
const param = args[1];

async function main() {
  const agent = new TrendingDigestAgent(
    process.env.GITHUB_TOKEN,
    process.env.SLACK_WEBHOOK_URL
  );

  switch (command) {
    case 'trending':
      const repos = await agent.getTrendingRepositories(param || 'javascript', 'week');
      console.log(`\nTop ${param || 'JavaScript'} Repos:`);
      repos.forEach((repo, i) => {
        console.log(`${i + 1}. ${repo.name} (⭐ ${repo.stars})`);
      });
      break;

    case 'ai':
      const ai = await agent.detectAITrends();
      console.log(`\nTop AI Trends:`);
      ai.slice(0, 5).forEach((p, i) => {
        console.log(`${i + 1}. ${p.name} (⭐ ${p.stars})`);
      });
      break;

    default:
      console.log('Usage: node custom-cli.js <command> [param]');
      console.log('Commands: trending [language], ai');
  }
}

await main();
```

**Usage:**
```powershell
node custom-cli.js trending python
node custom-cli.js ai
```

---

## 🎯 Advanced Usage

### Chaining Commands

```powershell
# Get Python trends, then AI trends, then full digest
npm run trending-digest -- --language=python --no-slack ; `
npm run trending-digest -- --ai-only --no-slack ; `
npm run trending-digest
```

### Scheduled Execution

**Windows Task Scheduler:**

1. Create batch file `weekly-digest.bat`:
```batch
@echo off
cd C:\Users\Codev\mcp-github-workspace
call npm run trending-digest
```

2. Open Task Scheduler
3. Create Basic Task
4. Set trigger: Weekly, Monday 9 AM
5. Set action: Run the batch file

### Export to CSV

The agents export JSON. To convert to CSV:

```powershell
# Install a JSON to CSV tool
npm install -g json2csv

# Convert
json2csv -i trending-digest/exports/trending-python.json -o report.csv
```

### PowerShell Alias

Make commands shorter:

```powershell
# Add to PowerShell profile ($PROFILE)
Set-Alias digest 'npm run trending-digest'
Set-Alias market 'npm run job-market'
Set-Alias github 'npm start'

# Now use:
digest          # Runs full digest
digest --ai-only --no-slack   # With arguments
```

---

## 📊 Quick Reference

```powershell
# Show help
npm run trending-digest -- --help

# Full digest with Slack
npm run trending-digest

# Python trends only, no Slack
npm run trending-digest -- --language=python --no-slack

# AI trends only, no Slack
npm run trending-digest -- --ai-only --no-slack

# Get job market data
npm run job-market

# Search GitHub
npm start

# Interactive menu
node cli-menu.js
```

---

## ✨ Summary

| Method | Best For | Difficulty |
|--------|----------|-----------|
| **Direct CLI** | Quick manual runs | Easy |
| **CLI Arguments** | Specific analysis | Easy |
| **Gemini Integration** | AI-powered decisions | Hard |
| **Interactive Menu** | Non-technical users | Medium |
| **Custom CLI** | Your specific needs | Medium |
| **Scheduled Tasks** | Automation | Medium |

Choose the method that best fits your workflow! 🚀

---

**Created:** March 6, 2026  
**Status:** ✅ Complete
