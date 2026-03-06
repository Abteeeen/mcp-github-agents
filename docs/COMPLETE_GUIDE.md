# 🚀 Complete MCP GitHub Agent Setup Guide

## Part 1: Understanding MCP (Model Context Protocol)

### What is MCP?

MCP is a **bridge between AI and external tools/services**:

```
┌─────────────────────────────────────────────────────────────┐
│  Your AI (Copilot, Claude, etc.)                           │
│                                                             │
│  "Create a GitHub issue in my repo"                         │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ↓
         ┌───────────────────────┐
         │  MCP Server Gateway   │  ← Translation layer
         │  (Interprets requests)│
         └───────────┬───────────┘
                     │
                     ↓
         ┌───────────────────────┐
         │  External Service     │  ← GitHub, Notion, Slack, etc.
         │  (Performs action)    │
         └───────────────────────┘
```

### Key Points

1. **AI doesn't directly access GitHub** → It uses MCP as a mediator
2. **MCP translates commands** → "Create issue" → GitHub API call
3. **Tools become available to AI** → Copilot knows what it can do
4. **Secure & controlled** → You control what AI can access

---

## Part 2: What I Created (Step-by-Step)

### Step 1: Created Folder Structure
```
mcp-github-workspace/
├── .github/                    # GitHub-related config
├── .vscode/                    # VS Code specific settings
├── src/                        # Your agent code
├── docs/                       # Documentation
├── package.json                # JavaScript dependencies
└── README.md                   # Project overview
```

**Why?**
- Organization - keeps code clean
- VS Code recognizes `.vscode/` automatically
- `.github/` follows GitHub conventions

### Step 2: Created VS Code Configuration Files

#### `.vscode/settings.json`
```json
{
  "mcp": {
    "servers": {
      "github": {
        "command": "npx",
        "args": ["-y", "@modelcontextprotocol/server-github"],
        "env": {
          "GITHUB_API_KEY": "${env:GITHUB_TOKEN}"
        }
      }
    }
  }
}
```

**What this does:**
- Tells VS Code to start GitHub MCP server
- Uses `npx` to run the official GitHub MCP package
- Looks for `GITHUB_TOKEN` environment variable
- Makes GitHub tools available to Copilot

#### `.vscode/launch.json`
```json
{
  "configurations": [
    {
      "name": "Test AI Agent",
      "type": "node",
      "program": "${workspaceFolder}/src/agent.js"
    }
  ]
}
```

**What this does:**
- Allows you to debug/run the agent with F5 key
- Node automatically runs JavaScript files

### Step 3: Created Example Agent (`src/agent.js`)

The agent is a **JavaScript program that talks to GitHub**:

```javascript
class GitHubAgent {
  async getUser() {
    // Makes an HTTPS request to GitHub API
    // Returns user data
  }
  
  async searchRepos(query) {
    // Search GitHub repositories
  }
  
  async createIssue(owner, repo, title, body) {
    // Create a GitHub issue
  }
}
```

### Step 4: Created Documentation

I created guides so you understand:
- **SETUP.md** - How to set up everything
- **USAGE.md** - What you can do with it
- **EXAMPLES.md** - Copy-paste ready code

---

## Part 3: Setting Up Environment Variable (YOUR ISSUE)

Your token is generated ✅ but VS Code can't find it. Let's fix this:

### ❌ Problem: Environment Variable Not Found

When you set:
```powershell
$env:GITHUB_TOKEN = "ghp_xxx"
```

It only works in **that specific PowerShell window**. When you close it → it's gone.

### ✅ Solution: Permanent Environment Variable

#### Option 1: Windows Permanent Setup (Easiest)

```powershell
# 1. Open PowerShell as Administrator
# Right-click PowerShell → "Run as Administrator"

# 2. Run this command (replace with YOUR token)
[Environment]::SetEnvironmentVariable("GITHUB_TOKEN", "ghp_xxxxxxxxxxxx", "User")

# 3. Close ALL PowerShell windows and VS Code

# 4. Reopen VS Code - token is now permanent
```

**Verification:**
```powershell
$env:GITHUB_TOKEN  # Should show: ghp_xxx...
```

#### Option 2: Using `.env` File (If above doesn't work)

1. Create file: `.env` in workspace root
```
GITHUB_TOKEN=ghp_xxxxxxxxxxxx
```

2. Install package to load it:
```powershell
npm install dotenv
```

3. In your agent file, add at top:
```javascript
import dotenv from 'dotenv';
dotenv.config();
```

#### Option 3: VS Code Settings (Less Secure)

Edit `.vscode/settings.json`:
```json
{
  "mcp": {
    "servers": {
      "github": {
        "env": {
          "GITHUB_API_KEY": "ghp_xxxxxxxxxxxx"
        }
      }
    }
  }
}
```

⚠️ **WARNING**: Don't commit this to Git! Add to `.gitignore`

---

## Part 4: Understanding What Each File Does

### `package.json`
```json
{
  "name": "mcp-github-workspace",
  "scripts": {
    "start": "node src/agent.js",      // npm start → runs agent
    "test": "node src/test.js",        // npm test → runs tests
    "server": "npx ... server-github"  // npm run server → starts MCP
  },
  "dependencies": {
    "@modelcontextprotocol/sdk": "..."  // Required for MCP
  }
}
```

**What this means:**
- **Dependencies** = Libraries your code needs
- **Scripts** = Shortcuts for common commands
- Run: `npm install` to download dependencies

### `src/agent.js`
```javascript
// 1. Creates a class that talks to GitHub
class GitHubAgent {
  async getUser() { ... }
  async searchRepos(query) { ... }
  async createIssue(...) { ... }
}

// 2. Creates an instance
const agent = new GitHubAgent(GITHUB_TOKEN);

// 3. Runs example commands
async function main() {
  const user = await agent.getUser();
  console.log(user.login);  // Prints your GitHub username
}
```

**Flow:**
```
main() starts
  ↓
getUser() calls GitHub API
  ↓
GitHub returns user data
  ↓
Print username to console
```

---

## Part 5: Using This for Automations & Agents

### 🎯 What You Can Automate

#### 1. **Auto-Create Issues from Errors**
```javascript
// When your app crashes, automatically create a GitHub issue
async function createBugReport(error) {
  await agent.createIssue('my-org', 'my-repo', {
    title: `Bug: ${error.message}`,
    body: `Stack: ${error.stack}`
  });
}

// Example: Error happens → Issue created automatically
```

#### 2. **Monitor Repository Health**
```javascript
// Check daily: How many open issues? Stale PRs?
async function checkHealth() {
  const issues = await agent.listIssues('my-org', 'my-repo');
  const prs = await agent.listPRs('my-org', 'my-repo');
  
  if (issues.length > 50) {
    console.log('⚠️ Too many open issues! ' + issues.length);
  }
}

// Run daily with GitHub Actions
```

#### 3. **Auto-Label Issues**
```javascript
// Read new issue → auto-assign labels based on content
async function autolabel(issue) {
  if (issue.title.includes('bug')) {
    await agent.addLabel('my-org', 'my-repo', issue.number, ['bug']);
  }
  if (issue.title.includes('feature')) {
    await agent.addLabel('my-org', 'my-repo', issue.number, ['enhancement']);
  }
}
```

#### 4. **Generate Weekly Reports**
```javascript
// Every Monday, create a summary of last week's activity
async function weeklyReport() {
  const issues = await agent.listIssues('my-org', 'my-repo');
  const prs = await agent.listPRs('my-org', 'my-repo');
  
  // Filter by date, create summary, post to GitHub discussion
}
```

#### 5. **AI-Powered Code Review**
```javascript
// Use Copilot + GitHub MCP to review PRs
// "Analyze PR #42 for potential security issues"
// Copilot fetches PR data → analyzes it → posts review
```

### Building Custom Agents

#### Agent Rules

An agent should:
1. **Read** data from GitHub
2. **Analyze** the data (logic, AI, etc.)
3. **Act** based on analysis (create issues, update PRs, etc.)

#### Simple Agent Example

```javascript
class AutoTaggerAgent {
  async run() {
    // 1. READ: Get all open issues
    const issues = await this.agent.listIssues('my-org', 'my-repo');
    
    // 2. ANALYZE: Check each issue
    for (const issue of issues) {
      const hasTestCode = issue.body.includes('```');
      const hasBugKeyword = issue.title.toLowerCase().includes('bug');
      
      // 3. ACT: Add appropriate label
      if (hasBugKeyword && hasTestCode) {
        await this.agent.addLabel('my-org', 'my-repo', issue.number, ['confirmed-bug']);
      }
    }
  }
}

// Run agent
const autoTagger = new AutoTaggerAgent();
await autoTagger.run();
```

---

## Part 6: Connecting to Copilot for AI Automation

### How Copilot + MCP Works

```
You in Copilot Chat:          "Find all open bugs in my repo"
            ↓
Copilot reads MCP description: "Can search issues"
            ↓
Copilot calls GitHub MCP:    searchIssues('bug', state='open')
            ↓
GitHub API returns data
            ↓
Copilot analyzes & responds:  "Found 5 open bugs: ..."
```

### Using in Copilot Chat

```
You: "List all open issues in nodejs/node and summarize them"

Copilot will:
1. Use GitHub MCP to fetch issues
2. Analyze the list
3. Provide summary

Result:
✅ Auto-fetched real GitHub data
✅ AI analyzed it
✅ No manual API calls needed
```

---

## Part 7: Step-by-Step Testing

### Step 1: Verify Token is Set
```powershell
# In PowerShell, check if token exists
$env:GITHUB_TOKEN

# Should output: ghp_xxxxxxxxxxxxxxxx...
```

### Step 2: Test Agent
```powershell
cd C:\Users\Codev\mcp-github-workspace

# Install dependencies first time
npm install

# Run the example agent
npm start

# You should see:
# 🤖 GitHub MCP Agent Demo
# ✅ Authenticated as: [your-username]
# ...
```

### Step 3: Test with Copilot Chat
1. Open VS Code
2. Ctrl+Shift+I (Copilot Chat)
3. Ask: `"List my recent repositories"`
4. Copilot should fetch real data using MCP

### Step 4: Build Custom Agent
1. Edit `src/agent.js`
2. Add your custom logic
3. Run: `npm start`

---

## Part 8: Real-World Workflow

### Workflow: Auto-Bug-Report System

**Goal**: When your app crashes, automatically create a GitHub issue

**Steps:**

1. **Create error handler**
```javascript
// In your app
process.on('uncaughtException', async (error) => {
  await createBugReportAgent.report(error);
});
```

2. **Agent creates issue**
```javascript
class CreateBugReportAgent {
  async report(error) {
    await this.agent.createIssue('my-org', 'my-app', {
      title: `🐛 ${error.message}`,
      body: `
## Error
\`\`\`
${error.stack}
\`\`\`

## Environment
- Node: ${process.version}
- Time: ${new Date()}
      `,
      labels: ['bug', 'auto-created']
    });
  }
}
```

3. **Run in production**
```javascript
// App crashes → Issue created automatically → You get notified
```

---

## Part 9: Where to Go From Here

### Next Steps

1. **✅ Complete Setup**
   - [ ] Set environment variable (permanent)
   - [ ] Run: `npm install`
   - [ ] Run: `npm start`
   - [ ] Check agent output

2. **📝 Understand Basics**
   - [ ] Read `docs/USAGE.md`
   - [ ] Read `docs/EXAMPLES.md`
   - [ ] Try code examples

3. **🤖 Build Custom Agent**
   - [ ] Copy example agent
   - [ ] Modify for your use case
   - [ ] Test locally

4. **🔗 Integrate with Projects**
   - [ ] Connect to your GitHub repo
   - [ ] Automate a specific task
   - [ ] Deploy as scheduled job

5. **🧠 Add AI Decision Making**
   - [ ] Use Copilot API
   - [ ] Let AI decide what actions to take
   - [ ] Create intelligent workflows

### Resources

| Resource | Purpose |
|----------|---------|
| [GitHub API Docs](https://docs.github.com/en/rest) | Full API reference |
| [MCP Docs](https://modelcontextprotocol.io/) | MCP specification |
| [Copilot Docs](https://github.com/features/copilot) | How to use Copilot |
| `docs/EXAMPLES.md` | Copy-paste code examples |

---

## Part 10: Troubleshooting

### Problem: "Command not found: GITHUB_TOKEN"
**Cause**: Environment variable not set
**Solution**: 
```powershell
[Environment]::SetEnvironmentVariable("GITHUB_TOKEN", "ghp_xxx", "User")
# Close ALL windows
# Reopen VS Code
```

### Problem: "401 Unauthorized"
**Cause**: Token is invalid
**Solution**:
1. Go to https://github.com/settings/tokens
2. Delete old token
3. Generate new one
4. Set new token

### Problem: "npm command not found"
**Cause**: Node.js not installed
**Solution**:
1. Download from https://nodejs.org
2. Install
3. Restart PowerShell
4. Try again

### Problem: "MCP server not connecting"
**Cause**: `.vscode/settings.json` wrong
**Solution**:
1. Check settings file is valid JSON
2. Restart VS Code
3. Check Output panel for errors

---

## Summary

### What I Created
- ✅ Folder structure for organization
- ✅ VS Code config to enable MCP
- ✅ Example agent to interact with GitHub
- ✅ Setup and documentation

### How to Use It
1. Set `GITHUB_TOKEN` permanently
2. Run `npm install`
3. Run `npm start` to test agent
4. Modify agent code for your needs
5. Create automations and custom agents

### What You Can Build
- Auto-create issues
- Monitor repos
- Generate reports
- AI-powered workflows
- Task automation

**You now have a complete framework for building GitHub automations! 🚀**
