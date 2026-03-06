# 🚀 GitHub MCP + AI Agents Framework

**Two powerful agents for GitHub automation and job market intelligence**

A clean, organized framework with 2 main components:
- **🔗 GitHub MCP** - Connect AI to GitHub
- **💼 Job Analyzer** - Analyze tech trends & job market

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green)](https://nodejs.org/)

---

## 🎯 Two Components, Two Superpowers

### 1️⃣ **GitHub MCP** - AI Meets GitHub
```
📁 github-mcp/
```

Connect AI models to GitHub through Model Context Protocol.

**Can:**
- ✅ Search repositories
- ✅ Analyze projects
- ✅ Track issues & PRs
- ✅ Generate reports
- ✅ Integrate with VS Code Copilot

**Run:** `npm start`

[→ Go to GitHub MCP →](github-mcp/)

---

### 2️⃣ **Job Analyzer** - Market Intelligence
```
📁 job-analyzer/
```

Analyze GitHub trends and correlate with real job market data.

**Shows:**
- ✅ Trending technologies
- ✅ Job market demand
- ✅ Salary data by language
- ✅ Career progression paths
- ✅ Top companies hiring

**Run:** `npm run job-market`

[→ Go to Job Analyzer →](job-analyzer/)

---

## ⚡ Quick Start (5 minutes)

### Step 1: Get GitHub Token
1. Go to https://github.com/settings/tokens
2. Generate new token (classic)
3. Select: `repo`, `gist`, `user`
4. Copy token

### Step 2: Set Environment Variable
```powershell
# PowerShell as Administrator:
[Environment]::SetEnvironmentVariable("GITHUB_TOKEN", "ghp_xxxxxxxxxxxx", "User")
```

### Step 3: Install & Run
```powershell
npm install

# Try GitHub MCP:
npm start

# Try Job Analyzer:
npm run job-market
```

**Troubleshooting?** → See [docs/ENVIRONMENT_SETUP.md](docs/ENVIRONMENT_SETUP.md)

---

## 📁 Project Structure

```
mcp-github-agents/
│
├── 🔗 github-mcp/          ← Component 1: GitHub MCP
│   ├── README.md           (Setup & quick start)
│   ├── src/agent.js        (GitHub agent code)
│   └── docs/               (MCP documentation)
│       ├── ARCHITECTURE.md
│       ├── USAGE.md
│       └── EXAMPLES.md
│
├── 💼 job-analyzer/        ← Component 2: Job Analyzer
│   ├── README.md           (Setup & quick start)
│   ├── src/job-market-analyzer.js
│   └── docs/               (Analyzer documentation)
│       ├── GUIDE.md
│       ├── EXAMPLES.md
│       └── DATA.md
│
├── 📚 docs/                ← Shared documentation
│   ├── ENVIRONMENT_SETUP.md
│   ├── QUICK_REFERENCE.md
│   ├── INSTALLATION.md
│   └── TROUBLESHOOTING.md
│
├── .vscode/                (VS Code MCP config)
├── package.json
├── README.md               (This file)
├── CONTRIBUTING.md
└── LICENSE
```

---

## 🚀 Commands

| Command | Component | What It Does |
|---------|-----------|--------------|
| `npm start` | GitHub MCP | Run GitHub analysis agent |
| `npm run job-market` | Job Analyzer | Analyze job market trends |
| `npm install` | Both | Install dependencies |

---

## 📚 Documentation

### For GitHub MCP
- **[github-mcp/README.md](github-mcp/README.md)** - Quick start
- **[github-mcp/docs/ARCHITECTURE.md](github-mcp/docs/ARCHITECTURE.md)** - System design
- **[github-mcp/docs/USAGE.md](github-mcp/docs/USAGE.md)** - How to use
- **[github-mcp/docs/EXAMPLES.md](github-mcp/docs/EXAMPLES.md)** - Code examples

### For Job Analyzer
- **[job-analyzer/README.md](job-analyzer/README.md)** - Quick start
- **[job-analyzer/docs/GUIDE.md](job-analyzer/docs/GUIDE.md)** - Complete guide
- **[job-analyzer/docs/EXAMPLES.md](job-analyzer/docs/EXAMPLES.md)** - Code examples

### Shared Documentation
- **[docs/ENVIRONMENT_SETUP.md](docs/ENVIRONMENT_SETUP.md)** - Token setup (both)
- **[docs/QUICK_REFERENCE.md](docs/QUICK_REFERENCE.md)** - Commands list
- **[docs/INSTALLATION.md](docs/INSTALLATION.md)** - Full setup guide
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - How to contribute

---

## 🎓 Choose Your Learning Path

### 👶 Complete Beginner?
1. Read this README
2. Pick a component
3. Read its README.md
4. Run it: `npm start` or `npm run job-market`
5. Explore examples

### ⚡ Want Examples Immediately?
1. Run: `npm install`
2. Set GitHub token
3. Run: `npm start`
4. Check output
5. Read [github-mcp/docs/EXAMPLES.md](github-mcp/docs/EXAMPLES.md)

### 🔧 Technical Dive?
1. Read [github-mcp/docs/ARCHITECTURE.md](github-mcp/docs/ARCHITECTURE.md)
2. Check [github-mcp/src/agent.js](github-mcp/src/agent.js)
3. Explore [job-analyzer/src/job-market-analyzer.js](job-analyzer/src/job-market-analyzer.js)
4. Read examples in each component

### 💼 Career Planning?
1. Read [job-analyzer/README.md](job-analyzer/README.md)
2. Run: `npm run job-market`
3. Review [job-analyzer/docs/GUIDE.md](job-analyzer/docs/GUIDE.md)
4. Check [job-analyzer/docs/EXAMPLES.md](job-analyzer/docs/EXAMPLES.md)

---

## ✨ Features

### GitHub MCP Component
- Repository search by keyword
- Get repository statistics
- List open issues
- GitHub API integration
- Error handling & validation
- Formatted console output
- VS Code Copilot integration

### Job Analyzer Component
- GitHub trending by language
- Real job market data (10+ languages)
- Salary analysis
- Growth rate tracking
- Company hiring information
- Career progression paths
- Opportunity scoring
- Weekly market reports

---

## 🔒 Security

✅ GitHub token stored in environment variables (not in code)  
✅ .gitignore configured to prevent secrets  
✅ No credentials in documentation  
✅ Secure HTTPS connections  

---

## 🤝 Contributing

Want to improve or add features?

→ See [CONTRIBUTING.md](CONTRIBUTING.md)

**How to Contribute:**
1. Fork the repository
2. Create feature branch: `git checkout -b feature/your-feature`
3. Make changes (update code & docs)
4. Commit: `git commit -m "feat: describe change"`
5. Push and create pull request

---

## ❓ FAQ

**Q: Do I need both components?**  
A: No! Use just the one you need. They work independently.

**Q: How do I extend with my own agent?**  
A: Follow the component structure. See [CONTRIBUTING.md](CONTRIBUTING.md).

**Q: Is my GitHub token safe?**  
A: Yes! It's stored locally in environment variables, never in code.

**Q: Can I use this commercially?**  
A: Yes! MIT license allows commercial use. See [LICENSE](LICENSE).

**Q: How often is job market data updated?**  
A: Manually updated (2024-2025 stats). We recommend running monthly for trends.

---

## 🌟 What's Inside

### Source Code
```
github-mcp/src/agent.js                      ~300 lines  ✅ Clean & documented
job-analyzer/src/job-market-analyzer.js      ~500 lines  ✅ Rich features
```

### Documentation
```
15+ documentation files
50+ pages
30+ code examples
5+ architecture diagrams
20+ FAQ entries
Complete setup guides
```

---

## 🚀 Next Steps

1. **Start with one component** - Pick GitHub MCP OR Job Analyzer
2. **Run locally** - `npm start` or `npm run job-market`
3. **Explore examples** - See component docs/EXAMPLES.md
4. **Customize** - Modify for your needs
5. **Extend** - Build your own agents
6. **Share** - Contribute back to the project

---

## 📞 Support

**Problem?** Check these:
- 📖 [Specific component README](github-mcp/) or [job-analyzer/](job-analyzer/)
- 🔧 [INSTALLATION.md](docs/INSTALLATION.md)
- 🆘 [TROUBLESHOOTING.md](docs/TROUBLESHOOTING.md)
- 📋 [ENVIRONMENT_SETUP.md](docs/ENVIRONMENT_SETUP.md)

**Want to help?** → [CONTRIBUTING.md](CONTRIBUTING.md)

---

## 📜 License

MIT License © 2024-2026  
See [LICENSE](LICENSE) for details.

---

## 🌍 Ready to Explore?

```
Choose your path:

🔗 GitHub MCP          →  [github-mcp/README.md](github-mcp/README.md)

💼 Job Analyzer        →  [job-analyzer/README.md](job-analyzer/README.md)

📚 Full Docs           →  [docs/](docs/)
```

---

**Built with ❤️ for developers who want to automate with AI**

Start exploring: `npm start` 🚀
