# 🚀 GitHub MCP + AI Agents Framework

**Building autonomous AI agents that interact with GitHub and job market intelligence**

A complete framework for building intelligent agents using GitHub MCP (Model Context Protocol) with pre-built agents for GitHub automation and tech career insights.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green)](https://nodejs.org/)
[![GitHub API](https://img.shields.io/badge/GitHub-API%20v3-blue)](https://docs.github.com/en/rest)

---

## 🎯 What This Project Does

This is a **production-ready AI agent framework** that lets you:

### 🤖 Build GitHub Automation Agents
- Automate repository management tasks
- Analyze GitHub trends and repositories  
- Monitor issues, PRs, and project activity
- Generate intelligent reports

### 📊 Analyze Job Market Trends
- Track trending technologies on GitHub
- Correlate with real job market demand
- Get salary insights by programming language
- Receive career recommendations

### 🔗 Use GitHub MCP for Advanced Integrations
- Connect AI models to GitHub through MCP
- Extend with custom agents
- Build multi-agent systems
- Deploy as GitHub Apps

---

## ⚡ Quick Start (5 minutes)

### Step 1: Get GitHub Token
1. Go to https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Select scopes: `repo`, `gist`, `user`
4. Copy the token (looks like: `ghp_xxxxxxxxxxxx`)

### Step 2: Set Environment Variable

**Windows PowerShell (Recommended):**
```powershell
# Open PowerShell as Administrator
# Right-click PowerShell → "Run as Administrator"

# Run this command (replace with YOUR token):
[Environment]::SetEnvironmentVariable("GITHUB_TOKEN", "ghp_xxxxxxxxxxxx", "User")

# Verify it worked:
$env:GITHUB_TOKEN
# Should output: ghp_xxxxxxxxxxxx...

# Close PowerShell and VS Code completely
# Reopen them both
```

### Step 3: Install & Run

```powershell
# Navigate to project
cd mcp-github-workspace

# Install dependencies
npm install

# Run main agent
npm start

# OR run Job Market Analyzer
npm run job-market
```

### Step 4: See Results
```
✅ Authenticated as: [your-username]
✅ Found repositories and analyzed job market data
```

**Troubleshooting?** → See [docs/ENV_SETUP.md](docs/ENV_SETUP.md)

---

## 🎯 Use Cases

### 1. 📊 Job Market Intelligence
**Discover which tech skills are in highest demand**
```powershell
npm run job-market
```
Output:
- Top trending languages on GitHub
- Job openings for each language
- Average salaries
- Career progression paths
- Top companies hiring

### 2. 🔍 GitHub Repository Analysis
**Analyze repositories and trends**
```powershell
npm start
```
Output:
- Search repositories by keyword
- Get repository statistics
- Analyze trending projects
- List issues and PRs

### 3. 🤖 Build Custom Agents
**Extend with your own agents**
```javascript
// Create new agent in src/
// Automate GitHub workflows
// Analyze project metrics
// Generate reports
```

---

## 📦 Project Structure

```
mcp-github-workspace/
├── src/
│   ├── agent.js                    # Main GitHub agent
│   └── job-market-analyzer.js      # Job market analysis agent
│
├── docs/
│   ├── README.md                   # This file
│   ├── QUICK_REFERENCE.md          # Commands & usage
│   ├── SETUP.md                    # Detailed setup
│   ├── ENV_SETUP.md                # Environment variable help
│   ├── COMPLETE_GUIDE.md           # Everything explained
│   ├── JOB_MARKET_ANALYZER.md      # Job market agent guide
│   ├── USAGE.md                    # How to use MCP
│   ├── EXAMPLES.md                 # Code examples
│   ├── ARCHITECTURE.md             # System design
│   └── FEATURES.md                 # Feature list
│
├── .vscode/
│   ├── settings.json               # VS Code MCP settings
│   └── launch.json                 # Debug configuration
│
├── .github/
│   └── copilot-instructions.md     # Workspace instructions
│
├── package.json                    # Dependencies
└── .gitignore                      # Git ignore rules
```

---

## 🚀 Main Features

### ✅ GitHub Agent (`npm start`)
- 🔐 Authenticate with GitHub
- 🔍 Search repositories
- 📊 Get repository statistics
- 🎫 List open issues
- 📈 Analyze trends

### ✅ Job Market Analyzer (`npm run job-market`)
- 📊 Track trending tech on GitHub
- 💼 Correlate with job market demand
- 💰 Show salary data by language
- 🚀 Identify career paths
- 📈 Growth rate analysis

### ✅ GitHub MCP Integration
- 🔗 Connect to VS Code Copilot
- 🤖 Enable AI to interact with GitHub
- 🔌 Extensible plugin architecture
- 🌐 RESTful GitHub API support

---

## 📚 Documentation

### Getting Started
- **First time?** → [QUICK_REFERENCE.md](docs/QUICK_REFERENCE.md)
- **Environment issues?** → [ENV_SETUP.md](docs/ENV_SETUP.md)
- **Want everything?** → [COMPLETE_GUIDE.md](docs/COMPLETE_GUIDE.md)

### How-To Guides
- **Job market analysis** → [JOB_MARKET_ANALYZER.md](docs/JOB_MARKET_ANALYZER.md)
- **Using MCP** → [USAGE.md](docs/USAGE.md)
- **Code examples** → [EXAMPLES.md](docs/EXAMPLES.md)

### Architecture & Design
- **System design** → [ARCHITECTURE.md](docs/ARCHITECTURE.md)
- **Full setup guide** → [SETUP.md](docs/SETUP.md)

---

## 🔧 Commands

| Command | Action |
|---------|--------|
| `npm start` | Run GitHub analysis agent |
| `npm run job-market` | Run job market analyzer |
| `npm test` | Run tests |
| `npm server` | Start MCP server |

---

## 💡 Example Output

### Job Market Analyzer
```
🤖 GitHub Job Market Analyzer

1. 🔥 RUST
   💼 Job Market:
      • Open Positions: 12,000
      • Avg Salary: $155,000/year
      • YoY Growth: +35%
      • Demand Level: GROWING

   ⭐ GitHub Trends:
      • Trending Repos: astral-sh/uv, unionlabs/union
      • Avg Stars: 56,907

   🎯 Skills in Demand:
      • Systems Programming
      • Memory Safety
      • Performance

   🏢 Top Companies Hiring:
      Mozilla, AWS, Meta, Microsoft, Dropbox
```

### GitHub Agent
```
🤖 GitHub MCP Agent Demo

✅ Authenticated as: YourUsername
   Repos: 18

🔍 Searching repos for: "nodejs"...

✅ Found 3 repositories:
   ⭐ freeCodeCamp/freeCodeCamp (437823 stars)
   ⭐ Chalarangelo/30-seconds-of-code (126958 stars)
   ⭐ electron/electron (120325 stars)
```

---

## 🔌 Technology Stack

- **Runtime**: Node.js 18+
- **API**: GitHub REST API v3
- **Protocol**: Model Context Protocol (MCP)
- **Integration**: VS Code Copilot Chat
- **Language**: JavaScript (ES6+)

---

## 🤝 Contributing

We welcome contributions! Here's how:

1. **Fork the repo**
   ```bash
   git clone https://github.com/yourusername/mcp-github-agents.git
   cd mcp-github-agents
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature
   ```

3. **Make your changes**
   - Add new agents in `src/`
   - Update documentation in `docs/`
   - Test thoroughly

4. **Commit your work**
   ```bash
   git add .
   git commit -m "feat: add new feature"
   ```

5. **Push and create pull request**
   ```bash
   git push origin feature/your-feature
   ```

---

## 📖 Learning Resources

### Understanding MCP
- [Model Context Protocol Docs](https://modelcontextprotocol.io/)
- [GitHub API Documentation](https://docs.github.com/en/rest)
- [VS Code MCP Integration](https://github.com/modelcontextprotocol/vscode-mcp)

### AI Agents
- [OpenAI Agents](https://platform.openai.com/docs/guides/agents)
- [Agent Design Patterns](https://arxiv.org/abs/2309.10025)
- [Multi-Agent Systems](https://arxiv.org/abs/2308.11432)

---

## ❓ FAQ

**Q: Do I need to be a developer to use this?**  
A: Basic command-line knowledge helps. The agents are ready to use out-of-the-box!

**Q: Can I modify the agents?**  
A: Yes! The code is simple JavaScript. Modify `src/` agents for your needs.

**Q: How often is job market data updated?**  
A: Market data is from 2024-2025. Run monthly for updated insights.

**Q: Can I create my own agents?**  
A: Absolutely! Follow the pattern in `src/agent.js`. See [CONTRIBUTING.md](CONTRIBUTING.md).

**Q: Does this work with other platforms?**  
A: This version is GitHub-focused, but MCP works with any service that has an API.

**Q: Is my GitHub token secure?**  
A: Yes! The token stays local in your environment variable. Never commit tokens!

---

## 📜 License

This project is licensed under the MIT License - see [LICENSE](LICENSE) file for details.

---

## 🌟 Star This Project!

If you find this useful, please star it on GitHub! It helps others discover this framework.

---

## 🚀 Next Steps

1. **[Quick Reference](docs/QUICK_REFERENCE.md)** - Common commands
2. **[Job Market Guide](docs/JOB_MARKET_ANALYZER.md)** - Analyze tech trends
3. **[Usage Guide](docs/USAGE.md)** - Build custom agents
4. **[Contributing](CONTRIBUTING.md)** - Submit your agents

---

## 📞 Support

- 📖 **Read the docs** → [docs/](docs/)
- 🐛 **Found a bug?** → Create an Issue
- 💡 **Have an idea?** → Open a Discussion
- 🤝 **Want to contribute?** → See [CONTRIBUTING.md](CONTRIBUTING.md)

---

**Built with ❤️ for developers who want to automate with AI**
