# 🚀 Quick Reference Card

## 1-Minute Setup

```powershell
# 1. Copy your GitHub token from: https://github.com/settings/tokens

# 2. Open PowerShell as Admin (Win+X → PowerShell Admin)

# 3. Run (replace ghp_xxx with YOUR token):
[Environment]::SetEnvironmentVariable("GITHUB_TOKEN", "ghp_xxxxxxxxxxxxxxxxxxxx", "User")

# 4. Close PowerShell & VS Code completely

# 5. Reopen VS Code and test:
cd C:\Users\Codev\mcp-github-workspace
npm install
npm start

# ✅ Should say: "✅ Authenticated as: [your-username]"
```

---

## What You Have

| Component | What It Does |
|-----------|-------------|
| **GitHub MCP** | Translates your requests into GitHub API calls |
| **Agent** | Your custom automation logic |
| **Token** | Authentication (like password) |
| **VS Code Config** | Enables MCP in editor |

---

## What You Can Do

### 🔍 Read from GitHub
- List repositories
- Get issues & PRs
- Search code
- Read file contents
- Get user info

### 📝 Write to GitHub
- Create issues
- Update issues
- Add labels & comments
- Create PRs
- Update PR status

### 🤖 Automate
- Daily reports
- Auto-label issues
- Bug detection
- PR monitoring
- Security scans

### 💬 Use with Copilot
- Ask: "Find security issues in repo X"
- Ask: "List my open PRs"
- Ask: "Create issue for Y"
- Copilot uses MCP → Gets real data

---

## Common Commands

```powershell
# Navigate to workspace
cd C:\Users\Codev\mcp-github-workspace

# Install dependencies (first time)
npm install

# Run agent
npm start

# Install a package
npm install package-name

# Check if token is set
echo $env:GITHUB_TOKEN
```

---

## File Reference

| File | Purpose | Edit? |
|------|---------|-------|
| `.vscode/settings.json` | MCP config | ⚠️ Only if needed |
| `.vscode/launch.json` | Debug settings | ❌ Usually don't |
| `src/agent.js` | Example agent | ✅ Copy & modify |
| `package.json` | Dependencies | ✅ Add deps here |
| `docs/*.md` | Documentation | 📖 Read |

---

## Building Your First Agent

**Template:**
```javascript
class MyAgent {
  constructor(token) {
    this.token = token;
  }

  // STEP 1: READ data
  async readData() { 
    // Get info from GitHub
  }

  // STEP 2: ANALYZE data
  async analyzeData(data) {
    // Process the data
  }

  // STEP 3: ACT on data
  async actOnData(result) {
    // Create issues, update, etc.
  }

  // RUN the agent
  async run() {
    const data = await this.readData();
    const result = await this.analyzeData(data);
    await this.actOnData(result);
  }
}
```

---

## Troubleshooting at a Glance

| Problem | Solution |
|---------|----------|
| Token not found | `[Environment]::SetEnvironmentVariable("GITHUB_TOKEN", "...")`  |
| npm not found | Install Node.js from nodejs.org |
| "Unauthorized" error | Token expired → generate new one |
| MCP not connecting | Restart VS Code completely |
| Need more help | Read `docs/COMPLETE_GUIDE.md` |

---

## GitHub Token Scopes Explained

When generating token, select:
- ✅ `repo` → Full control of repositories (you need this!)
- ✅ `gist` → Create gists (optional)
- ✅ `user` → Read user profile (optional)
- ❌ `delete_repo` → Only if you really need to delete

---

## Security Quick Tips

1. **Token is SECRET** → Like a password
2. **Never commit to Git** → Add `.env` to `.gitignore`
3. **Don't share token** → Even in screenshots
4. **Expire token** → Rotate every 90 days
5. **Use minimal scope** → Only permissions you need

---

## Environment Variable Status

Check if everything is set up:

```powershell
# Token is set?
$env:GITHUB_TOKEN

# Should output: ghp_xxxxxxxxxxxx
# If blank: follow setup steps above

# Node.js installed?
node --version

# Should output: v18.0.0 or higher

# npm installed?
npm --version

# Should output: 9.0.0 or higher
```

---

## GitHub API Rate Limits

- **Free tier**: 60 requests/hour
- **Authenticated**: 5,000 requests/hour
- **Hit limit?** → Wait 1 hour or upgrade account

**Check your limit:**
```powershell
npm start
# Output shows rate limit info
```

---

## Which Document to Read?

| Goal | Read |
|------|------|
| Just want it working | `ENV_SETUP.md` then `SETUP.md` |
| Understand everything | `COMPLETE_GUIDE.md` |
| See what's possible | `EXAMPLES.md` |
| Learn detailed API | `USAGE.md` |
| Understand architecture | `ARCHITECTURE.md` |
| Quick answers | This file! |

---

## Building Automations (Workflow)

```
1. PLAN: What do you want to automate?
   Example: "Auto-create bug issues from errors"

2. DESIGN: What are the steps?
   - Read errors from logs
   - Analyze error type
   - Create GitHub issue

3. CODE: Write the agent
   - Copy agent.js
   - Implement READ/ANALYZE/ACT

4. TEST: Run locally
   npm start → Check output

5. DEPLOY: Run automatically
   - GitHub Actions (on schedule)
   - Cron job (on your computer)
   - Webhook (on GitHub event)

6. MONITOR: Check if it works
   - Look at created issues
   - Check agent logs
   - Fix any errors
```

---

## Your Next 5 Minutes

1. ✅ Set token (if not already done)
2. ✅ Run `npm install` in workspace
3. ✅ Run `npm start` to test agent
4. ✅ See agent fetch your GitHub info
5. ✅ Read `COMPLETE_GUIDE.md` to learn

---

## Your Next Hour

1. ✅ Read `COMPLETE_GUIDE.md`
2. ✅ Read `EXAMPLES.md` - pick 2 examples
3. ✅ Modify `src/agent.js` with one example
4. ✅ Run it: `npm start`
5. ✅ See it work!

---

## Your Next Day

1. ✅ Design your first automation
2. ✅ Code it
3. ✅ Test it
4. ✅ Deploy it
5. ✅ You now have a working automation! 🎉

---

## GitHub MCP Capabilities Summary

```
┌─────────────────────────────────┐
│   GitHub MCP Server             │
├─────────────────────────────────┤
│ ✅ Search repositories          │
│ ✅ List issues                  │
│ ✅ List pull requests            │
│ ✅ Create issues                │
│ ✅ Update issues                │
│ ✅ Add labels                   │
│ ✅ Add comments                 │
│ ✅ Get file contents            │
│ ✅ Search code                  │
│ ✅ Get user info                │
│ ✅ List releases                │
│ ✅ Check PR status              │
└─────────────────────────────────┘
```

---

## Resources at a Glance

| Need | Link |
|------|------|
| GitHub Token | https://github.com/settings/tokens |
| GitHub API Docs | https://docs.github.com/en/rest |
| MCP Spec | https://modelcontextprotocol.io/ |
| Node.js | https://nodejs.org |
| VS Code | https://code.visualstudio.com |

---

## Getting Help

1. **"How does MCP work?"** → Read `ARCHITECTURE.md`
2. **"How do I use GitHub MCP?"** → Read `USAGE.md`
3. **"Show me code!"** → Read `EXAMPLES.md`
4. **"I'm stuck on setup"** → Read `ENV_SETUP.md`
5. **"Explain everything"** → Read `COMPLETE_GUIDE.md`

---

**You've got this! Start with `ENV_SETUP.md` if token isn't working, then move to `COMPLETE_GUIDE.md`. 🚀**
