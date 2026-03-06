# 🤖 AI CONTINUITY BRIEF - MCP GitHub Agents Framework

**This document is for AI agents continuing this project in future chats**

---

## PROJECT STATE SNAPSHOT

**Repository:** https://github.com/Abteeeen/mcp-github-agents  
**Clone:** `git clone https://github.com/Abteeeen/mcp-github-agents.git`  
**Status:** ✅ LIVE & PRODUCTION-READY  
**User:** Abteeeen (GitHub)  
**Last Updated:** March 6, 2026  

---

## WHAT YOU NEED TO KNOW (EXECUTIVE SUMMARY)

### The Project
- **Type:** AI Agent Framework using GitHub MCP (Model Context Protocol)
- **Language:** JavaScript/Node.js
- **Purpose:** Build CLI agents that interact with GitHub + external data
- **Architecture:** Modular components (agents), each self-contained
- **Dependencies:** ZERO external npm packages (only Node.js built-ins)

### Current State
- 2 working agents (github-mcp, job-analyzer)
- 50+ pages of documentation
- Clean folder structure
- Production-ready code
- MIT licensed
- All code pushed to GitHub
- Ready to extend with more agents

### User's Goal
Enable any AI (including you) to:
1. Understand the project structure
2. Add new agents following the same pattern
3. Deploy to GitHub without confusion
4. Continue work in future chats

---

## EXACT REPOSITORY STRUCTURE

```
mcp-github-agents/                     ← REPO ROOT
│
├── github-mcp/                        ← AGENT 1: GitHub interaction
│   ├── src/agent.js                   ← Main code (~300 lines)
│   ├── README.md                       ← Quick start (200 lines)
│   └── docs/
│       ├── ARCHITECTURE.md             ← System design
│       ├── USAGE.md                    ← Usage patterns
│       └── EXAMPLES.md                 ← 8 code examples
│
├── job-analyzer/                      ← AGENT 2: Market analysis
│   ├── src/job-market-analyzer.js     ← Main code (~500 lines)
│   ├── README.md                       ← Quick start (200 lines)
│   └── docs/
│       ├── GUIDE.md                    ← Complete guide
│       └── EXAMPLES.md                 ← 10 code examples
│
├── docs/                              ← SHARED DOCUMENTATION
│   ├── ENV_SETUP.md                    ← Token configuration
│   ├── INSTALLATION.md                 ← Full setup guide
│   ├── COMPLETE_GUIDE.md               ← 30+ pages master guide
│   ├── QUICK_REFERENCE.md              ← One-page quick answers
│   ├── FEATURES.md                     ← Feature breakdown
│   ├── EXAMPLES.md                     ← Basic examples
│   └── SETUP.md                        ← Detailed setup
│
├── .vscode/                           ← VS CODE CONFIG
│   ├── settings.json                   ← MCP settings
│   └── launch.json                     ← Debug config
│
├── .github/                           ← GITHUB SPECIFIC
│   └── copilot-instructions.md         ← Workspace instructions
│
├── README.md                          ← MAIN PROJECT OVERVIEW
├── CONTRIBUTING.md                    ← HOW TO CONTRIBUTE
├── DEVELOPMENT_GUIDE.md               ← THIS PROJECT'S MANUAL
├── AI_CONTINUITY_BRIEF.md             ← THIS FILE
├── package.json                       ← NPM SCRIPTS & CONFIG
├── LICENSE                            ← MIT LICENSE
├── .gitignore                         ← GIT IGNORE RULES
```

---

## AGENT 1: GITHUB MCP (github-mcp/src/agent.js)

**What It Does:** Connects to GitHub API, searches repositories, analyzes project stats

**Class:** `GitHubAgent`

**Key Methods:**
```javascript
await agent.getUser()                           // Get authenticated user
await agent.searchRepos("query")                // Search repositories
await agent.getRepo("owner", "reponame")       // Get repo details  
await agent.listIssues("owner", "repo", state) // List issues
await agent.request(method, path, body)        // Generic API caller
```

**How To Use:**
```bash
npm start
```

**Output Style:**
```
🤖 GitHub MCP Agent Demo
✅ Authenticated as: Abteeeen
📊 Statistics and formatted data
✅ Complete!
```

**Code Pattern:**
```javascript
import * as https from 'https';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

class GitHubAgent {
  constructor(token) { this.token = token; }
  
  async request(method, path, body = null) {
    // Makes HTTPS call to api.github.com
    // Handles auth, errors, parsing
  }
  
  async getUser() { /* feature */ }
  async searchRepos(query) { /* feature */ }
  // ... more methods
}

async function main() {
  const agent = new GitHubAgent(GITHUB_TOKEN);
  // Use agent
}

main();
```

**Dependencies:** HTTPS (built-in Node.js)  
**Env Required:** GITHUB_TOKEN  
**Lines:** ~300  

---

## AGENT 2: JOB MARKET ANALYZER (job-analyzer/src/job-market-analyzer.js)

**What It Does:** Analyzes GitHub language trends, correlates with job market data

**Class:** `JobMarketAnalyzer`

**Embedded Data:** 10 programming languages with job market info:
- JavaScript, Python, TypeScript, Java, Go, Rust, C++, C#, Kotlin, Swift

**Per Language:** jobOpenings, avgSalary, growth, demand, companies, skills, careerPath

**Key Methods:**
```javascript
await analyzer.analyzeTrendingByLanguage()      // Get GitHub trends by language
await analyzer.correlateWithJobMarket(trends)   // Map to job data
await analyzer.generateRecommendations(data)    // Career advice
await analyzer.analyzeLanguage(language)        // Deep dive single language
await analyzer.generateWeeklyReport()           // Market summary
```

**How To Use:**
```bash
npm run job-market
```

**Output Style:**
```
🤖 GitHub Job Market Analyzer

1. 🔥 RUST
   💼 Job Market:
      • Open Positions: 12,000
      • Avg Salary: $155,000
      • Growth: +35%
   
🎯 RECOMMENDATIONS
Top opportunities: [list]
```

**Code Pattern:**
```javascript
const JOB_MARKET_DATA = {
  'JavaScript': {
    jobOpenings: 50000,
    avgSalary: 110000,
    growth: 12,
    demand: 'High',
    companies: ['Google', 'Facebook', ...],
    skills: ['React', 'Node.js', ...],
    careerPath: ['Junior', 'Mid', 'Senior', 'Lead']
  },
  // ... 9 more languages
};

class JobMarketAnalyzer {
  async analyzeTrendingByLanguage() { /* uses GitHub API */ }
  async correlateWithJobMarket(trends) { /* uses embedded data */ }
  // ... more methods
}
```

**Dependencies:** HTTPS (built-in), GitHub API, embedded JSON  
**Env Required:** GITHUB_TOKEN  
**Lines:** ~500  

---

## HOW TO ADD NEW AGENT: COMPLETE WALKTHROUGH

### Step 1: Create Folder Structure
```bash
mkdir your-agent-name
mkdir your-agent-name/src
mkdir your-agent-name/docs

touch your-agent-name/README.md
touch your-agent-name/src/your-agent-name.js
touch your-agent-name/docs/GUIDE.md
touch your-agent-name/docs/EXAMPLES.md
```

### Step 2: Create Main Code File (your-agent-name/src/your-agent-name.js)

**Template (exact pattern to follow):**

```javascript
/**
 * Your Agent Name
 * Brief description of what it does
 */

import * as https from 'https';

// CRITICAL: Check environment
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
if (!GITHUB_TOKEN) {
  console.error('❌ ERROR: GITHUB_TOKEN environment variable not set');
  process.exit(1);
}

// CRITICAL: Name your class YourAgentName (PascalCase)
class YourAgentName {
  constructor(token) {
    this.token = token;
    this.baseUrl = 'api.github.com';  // Or use different API
  }

  // CRITICAL: Keep generic request method for API calls
  async request(method, path, body = null) {
    return new Promise((resolve, reject) => {
      const options = {
        hostname: this.baseUrl,
        path: path,
        method: method,
        headers: {
          'Authorization': `token ${this.token}`,
          'User-Agent': 'Your-Agent-Name',
          'Accept': 'application/vnd.github.v3+json'
        }
      };

      const req = https.request(options, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(JSON.parse(data || '{}'));
          } else {
            reject(new Error(`API error: ${res.statusCode}`));
          }
        });
      });

      req.on('error', reject);
      if (body) req.write(JSON.stringify(body));
      req.end();
    });
  }

  // TODO: Add your feature methods here
  async feature1() {
    console.log('📊 Doing feature 1...');
    // Your implementation
    return await this.request('GET', '/some/endpoint');
  }

  async feature2() {
    console.log('📈 Doing feature 2...');
    // Your implementation
  }
}

// CRITICAL: Main function
async function main() {
  try {
    const agent = new YourAgentName(GITHUB_TOKEN);

    console.log('\n🤖 Your Agent Name\n');
    console.log('═'.repeat(80));

    // Show results
    const result = await agent.feature1();
    console.log('Result:', result);

    console.log('\n✅ Complete!\n');

  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
}

// CRITICAL: Call main
main();
```

**Key Points:**
- Import `https` (Node.js built-in)
- Check GITHUB_TOKEN exists
- Class name is PascalCase: `YourAgentName`
- Constructor takes token
- `request()` method is generic for API
- Methods for each feature
- main() function at bottom
- Use console.log with emojis for output

### Step 3: Create README (your-agent-name/README.md)

**Length:** 150-250 lines  
**Template:**

```markdown
# 📱 Your Agent Name

One-line description of what it does.

---

## 🎯 What This Does

- Feature 1
- Feature 2
- Feature 3

---

## ⚡ Quick Start (5 minutes)

### 1. Verify GITHUB_TOKEN

Windows PowerShell:
\`\`\`bash
$env:GITHUB_TOKEN
\`\`\`

Should print your token starting with `ghp_`

### 2. Run Agent

\`\`\`bash
npm run your-agent-name
\`\`\`

### 3. See Output

[Show example output]

---

## 📁 Files

| File | Purpose |
|------|---------|
| src/your-agent-name.js | Main code |
| docs/GUIDE.md | Complete guide |
| docs/EXAMPLES.md | Code examples |

---

## 🚀 Features

- Feature 1 description
- Feature 2 description
- Feature 3 description

---

## 💡 Common Tasks

### Task 1
\`\`\`javascript
const agent = new YourAgentName(token);
const result = await agent.feature1();
\`\`\`

### Task 2
\`\`\`javascript
const data = await agent.feature2();
\`\`\`

---

## 🔧 Customization

To customize:
1. Edit src/your-agent-name.js
2. Modify feature methods
3. Update requests
4. Test: npm run your-agent-name

---

## 🆘 Troubleshooting

**Q: GITHUB_TOKEN not set**
A: Run on Windows PowerShell as admin:
\`\`\`
[Environment]::SetEnvironmentVariable("GITHUB_TOKEN", "YOUR_TOKEN", "User")
\`\`\`

**Q: API error**
A: Verify token is valid: https://github.com/settings/tokens

---

## 📖 More

See [Main README](../README.md)
```

### Step 4: Create GUIDE.md (your-agent-name/docs/GUIDE.md)

**Length:** 300-400 lines  
**Include:**
- Overview (what it does)
- Installation
- Features (detailed)
- Data returned
- Use cases
- Examples per feature
- Extending agent
- Troubleshooting

See DEVELOPMENT_GUIDE.md for full template.

### Step 5: Create EXAMPLES.md (your-agent-name/docs/EXAMPLES.md)

**Length:** 200-300 lines  
**Include:** 8-10 complete, runnable code examples

Example format:
```markdown
## Example 1: Basic Usage

\`\`\`javascript
const agent = new YourAgentName(token);
const data = await agent.feature1();
console.log(data);
\`\`\`

## Example 2: Advanced Usage

\`\`\`javascript
// More complex example
\`\`\`

[Continue for 8-10 examples]
```

### Step 6: Update package.json

Add npm script:
```json
{
  "scripts": {
    "your-agent-name": "node your-agent-name/src/your-agent-name.js"
  }
}
```

### Step 7: Test Locally

```bash
npm run your-agent-name
# Should output without errors
```

### Step 8: Commit & Push

```bash
git add .
git commit -m "feat: add your-agent-name component"
git push origin main
```

### Step 9: Verify on GitHub

Visit: https://github.com/Abteeeen/mcp-github-agents

---

## SETTING UP GITHUB_TOKEN (CRITICAL)

### Windows PowerShell (RECOMMENDED)

```powershell
# Open PowerShell as Administrator
# Run this command:
[Environment]::SetEnvironmentVariable("GITHUB_TOKEN", "ghp_xxxxx", "User")

# Replace ghp_xxxxx with your actual token
# Then restart VS Code completely
```

### Generate Token

1. Go to https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Name: MCP Dev
4. Select scopes: `repo`, `gist`, `user`
5. Click "Generate token"
6. Copy token (looks like `ghp_xxxxxxxxxxxx`)
7. Never commit or share this token!

### Verify It Works

```bash
# In PowerShell, check:
$env:GITHUB_TOKEN

# Should print your token starting with ghp_
```

---

## GIT WORKFLOW

### Current Status
```
Repository: mcp-github-agents
Branch: main
Last commit: docs: add comprehensive development guide for ai agents
```

### Making Changes

```bash
# 1. Make edits to any files

# 2. Check status
git status

# 3. Add all changes
git add .

# 4. Commit
git commit -m "type: description"

# 5. Push
git push origin main

# 6. Verify at GitHub
# https://github.com/Abteeeen/mcp-github-agents
```

### Commit Types
```
feat:     New agent/feature
fix:      Bug fix
docs:     Documentation
refactor: Reorganize code
cleanup:  Remove files
test:     Add tests
```

---

## FILE SIZES & PATTERNS

| Component | Src Code | Docs | Total |
|-----------|----------|------|-------|
| github-mcp | 300 lines | 600 lines | 900 |
| job-analyzer | 500 lines | 1000 lines | 1500 |
| New Agent | 200-500 | 800-1200 | 1000-1700 |

**Pattern:** Always more docs than code (ratio ~2:1 or 3:1)

---

## JAVASCRIPT CODE STANDARDS FOR THIS PROJECT

```javascript
// ✅ DO:
import * as https from 'https';              // Use Node.js imports
const token = process.env.GITHUB_TOKEN;      // Use environment
class MyAgent { }                              // PascalCase for classes
async function main() { }                      // Clear function names
console.log('✅ Result:', data);              // Use emojis in logs

// ❌ DON'T:
const axios = require('axios');               // Avoid external packages
new MyAgent();                                 // Without env check
myAgent = new MyAgent();                       // Lowercase class names
console.log(data);                             // No context in logs
```

---

## DEPENDENCIES & MODULES

**Only use Node.js built-ins:**

```javascript
import * as https from 'https';     // ✅ Makes HTTP requests
import process from 'process';       // ✅ Access env variables
// console automatically available   // ✅ Print output
```

**DO NOT use** (unless absolutely necessary then document):
```javascript
import axios from 'axios';           // ❌ Use https instead
import fetch from 'node-fetch';      // ❌ Use https instead
```

If you MUST add external package:
1. Add to package.json `devDependencies`
2. Document why in CONTRIBUTING.md
3. Update this file to note the change

---

## FOLDER NAMING CONVENTION

All agents use kebab-case for folder names:

```
✅ do:
npm-analyzer
github-mcp
job-analyzer
twitter-tracker

❌ don't:
npmAnalyzer
npm_analyzer
NPMAnalyzer
```

Class names are PascalCase:
```
✅ do:
class NPMAnalyzer { }
class TwitterTracker { }

❌ don't:
class npm_analyzer { }
class npmAnalyzer { }
```

---

## TESTING AGENTS LOCALLY

```bash
# In PowerShell/Terminal at repo root:

# Check token is set
$env:GITHUB_TOKEN

# Run GitHub MCP
npm start

# Run Job Analyzer
npm run job-market

# Run your new agent
npm run your-agent-name

# All should print without errors
```

---

## QUICK CHECKLIST FOR NEW AGENT

```
Agent: [Agent Name]

[ ] 1. Create folder structure
[ ] 2. Write src/[agent].js following template
[ ] 3. Create README.md with quick start
[ ] 4. Create docs/GUIDE.md with full guide
[ ] 5. Create docs/EXAMPLES.md with examples
[ ] 6. Update package.json with npm script
[ ] 7. Test locally: npm run [agent]
[ ] 8. Git: add, commit, push
[ ] 9. Verify on GitHub
```

---

## COMMON PROBLEMS & SOLUTIONS

| Problem | Solution |
|---------|----------|
| GITHUB_TOKEN not found | Set in PowerShell as admin: `[Environment]::SetEnvironmentVariable("GITHUB_TOKEN", "ghp_...", "User")` |
| API error 403 | Rate limit exceeded - wait 1 hour or check token scopes at https://github.com/settings/tokens |
| Cannot find module 'https' | Add: `import * as https from 'https';` |
| Files not in GitHub | Check: `git add .` and `git push origin main` |
| npm run fails | Verify path in package.json matches file location |

---

## PROJECT TIMELINE

```
Day 1: Created 2 working agents (github-mcp, job-analyzer)
Day 1: Created 50+ pages of documentation
Day 1: Set up GitHub repository
Day 1: Reorganized into clean component structure
Day 1: Cleaned up redundant files
Day 1: Created DEVELOPMENT_GUIDE.md
Day 1: Created this AI_CONTINUITY_BRIEF.md
```

**All in single development session.**

---

## WHAT TO TELL ME IN NEXT CHAT

When starting new chat to continue work, include:

```
"Hey, I'm continuing the MCP GitHub Agents project.

Repository: https://github.com/Abteeeen/mcp-github-agents
User: Abteeeen
Current agents: github-mcp, job-analyzer
Status: Live & production-ready

I want to add a new agent called [AGENT_NAME].

Please reference:
- DEVELOPMENT_GUIDE.md (step-by-step instructions)
- AI_CONTINUITY_BRIEF.md (this file)
- Existing agents as pattern (github-mcp, job-analyzer)

Let me know if you need any context!"
```

---

## FINAL NOTES

This project demonstrates:
- ✅ Clean architecture (modular components)
- ✅ Excellent documentation (50+ pages)
- ✅ Easy to extend (clear patterns)
- ✅ Production-ready (error handling, validation)
- ✅ Secure (GITHUB_TOKEN protection)
- ✅ Professional (MIT licensed, GitHub hosted)
- ✅ Low maintenance (no external dependencies)

The template and patterns established here work for ANY number of agents. Just follow the same structure and you can build out a suite of AI agents interacting with different services.

---

## QUICK REFERENCE: Key Files

| File | When to Read |
|------|--------------|
| README.md | Project overview |
| DEVELOPMENT_GUIDE.md | How to add agents |
| AI_CONTINUITY_BRIEF.md | This file - AI-to-AI reference |
| package.json | What npm scripts do |
| github-mcp/README.md | GitHub agent quickstart |
| job-analyzer/README.md | Job analyzer quickstart |
| CONTRIBUTING.md | How to contribute |
| github-mcp/docs/EXAMPLES.md | GitHub API examples |
| job-analyzer/docs/EXAMPLES.md | Job analysis examples |

---

**Created:** March 6, 2026  
**For:** Any AI Agent Continuing This Project  
**Repository:** https://github.com/Abteeeen/mcp-github-agents  
**Version:** 1.0  
**Status:** ✅ COMPLETE & READY TO EXTEND
