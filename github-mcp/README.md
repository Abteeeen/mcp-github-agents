# 🔗 GitHub MCP Component

**GitHub Model Context Protocol (MCP) Server Integration**

A complete implementation for connecting AI models to GitHub through the Model Context Protocol.

---

## 🎯 What This Does

Provides MCP integration that allows:
- ✅ AI models to interact with GitHub API
- ✅ Search repositories
- ✅ Analyze projects
- ✅ Track issues and PRs
- ✅ Generate intelligent reports
- ✅ Connect with VS Code Copilot

---

## ⚡ Quick Start (5 minutes)

### 1. Set GitHub Token
```powershell
# Open PowerShell as Administrator
[Environment]::SetEnvironmentVariable("GITHUB_TOKEN", "ghp_xxxxxxxxxxxx", "User")
```

### 2. Run the Agent
```powershell
npm start
```

### 3. See Output
```
✅ Authenticated as: [your-username]
✅ Repository analysis complete
```

---

## 📁 Files

| File | Purpose |
|------|---------|
| `src/agent.js` | Main GitHub agent code |
| `docs/` | Component documentation |

---

## 📚 Documentation

- **[ARCHITECTURE.md](docs/ARCHITECTURE.md)** - System design
- **[USAGE.md](docs/USAGE.md)** - How to use MCP
- **[EXAMPLES.md](docs/EXAMPLES.md)** - Code examples

---

## 🚀 Features

- Repository search
- Repository statistics
- Issue tracking
- GitHub API integration
- Error handling
- Formatted output

---

## 💡 Common Tasks

### Search Repositories
```bash
npm start
# Follow prompts to search by keyword
```

### Analyze Repository
Modify `src/agent.js` to target specific repo:
```javascript
const repo = await agent.getRepo('owner', 'repo');
```

### Auto-Generated Reports
```javascript
const issues = await agent.listIssues(owner, repo);
// Generate report from issues
```

---

## 🔧 Customization

Edit `src/agent.js`:
1. Change search queries
2. Modify data processing
3. Customize output format
4. Add new API endpoints

---

## 🆘 Troubleshooting

**Token not working?**
→ See [../docs/ENVIRONMENT_SETUP.md](../docs/ENVIRONMENT_SETUP.md)

**API errors?**
→ Verify token has correct scopes: `repo`, `gist`, `user`

**Can't authenticate?**
→ Check `.vscode/settings.json` MCP configuration

---

## 📖 Learn More

→ See main [README.md](../README.md) for full project overview

---

**Component Status:** ✅ Ready to Use  
**Version:** 1.0.0  
**Last Updated:** March 2026
