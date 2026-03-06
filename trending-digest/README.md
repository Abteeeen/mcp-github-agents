# 📈 Trending Repository Digest

Proactive weekly digest of trending GitHub repositories by language, AI/ML trends, job market correlations, and Slack integration.

---

## 🎯 What This Does

- 🔍 **Curates trending repos** by all 10 supported programming languages
- 🤖 **Detects AI/ML trends** - finds latest AI, ML, LLM, and generative AI projects
- 💼 **Correlates job market data** - shows salary, demand, growth for trending tech
- 📰 **Generates newsletter** - formatted weekly digest report
- 📊 **Exports to JSON** - structured data for further analysis
- 💬 **Posts to Slack** - sends weekly digest to your Slack channel
- 🚀 **Proactive scheduling** - can run on a schedule (weekly)

---

## ⚡ Quick Start (5 minutes)

### 1. Set GitHub Token

```powershell
# Windows PowerShell (admin)
[Environment]::SetEnvironmentVariable("GITHUB_TOKEN", "ghp_xxxx", "User")
```

### 2. (Optional) Set Slack Webhook

See [SLACK_SETUP.md](docs/SLACK_SETUP.md) for detailed instructions.

### 3. Run the Agent

```bash
npm run trending-digest
```

### 4. See Output

```
🤖 Trending Repository Digest Agent

📊 Fetching trending JavaScript repos (week)...
📊 Fetching trending Python repos (week)...
🤖 Detecting AI/ML trends...
📰 Generating newsletter...
✅ Exported to: trending-digest/exports/trending-digest.json
📢 Sending to Slack...
✅ Message sent to Slack successfully!

✅ Digest Generation Complete!

📊 Summary:
   • Repos Analyzed: 150
   • AI/ML Trending: 18
   • Languages: 10
   • Exported To: trending-digest/exports/trending-digest.json
   • Slack: ✅ Sent
```

---

## 📁 Files

| File | Purpose |
|------|---------|
| src/trending-digest.js | Main agent code (~600 lines) |
| docs/GUIDE.md | Complete feature guide |
| docs/EXAMPLES.md | Code examples & customization |
| docs/SLACK_SETUP.md | How to set up Slack integration |
| README.md | This file |

---

## 🚀 Features

✅ **Multi-Language Trending**
- Monitors: JavaScript, Python, TypeScript, Java, Go, Rust, C++, C#, Kotlin, Swift
- Gets top 15 repos per language each week

✅ **AI/ML Trend Detection**
- Detects: AI, ML, LLMs, generative AI, deep learning, NLP, computer vision, RAG
- Finds top 20 trending AI projects in last 30 days

✅ **Job Market Correlation**
- Shows job openings, average salary, growth rate, demand level
- Calculates opportunity score for each trending tech

✅ **Smart Recommendations**
- Suggests how to get started with trending AI projects
- Provides learning path and career insights

✅ **Newsletter Generation**
- Formatted markdown newsletter
- Statistics and insights
- Career recommendations

✅ **Data Export**
- JSON export of all trending data
- Structured format for analysis
- Includes job market correlations

✅ **Slack Integration**
- Sends formatted message to Slack channel
- Uses Slack Incoming Webhooks
- Automatic weekly updates

---

## 💡 Common Tasks

### Run Weekly Digest
```bash
npm run trending-digest
```

### Check JSON Export
```bash
cat trending-digest/exports/trending-digest.json
```

### Get Only AI Trends
See `docs/EXAMPLES.md` for code snippets

### Customize Languages
Edit `src/trending-digest.js` and modify JOB_MARKET_DATA

### Schedule Weekly (Node.js)
See `docs/EXAMPLES.md` for scheduling examples

---

## 🔧 Customization

### Add More Languages

In `src/trending-digest.js`, add to `JOB_MARKET_DATA`:

```javascript
const JOB_MARKET_DATA = {
  'Golang': {
    jobOpenings: 12000,
    avgSalary: 145000,
    growth: 42,
    demand: 'High'
  },
  // ... more
};
```

### Change Trending Time Range

```bash
# See docs/EXAMPLES.md for code
const repos = await agent.getTrendingRepositories('JavaScript', 'month');
```

### Customize Slack Message Format

Edit `sendToSlack()` method in `trending-digest.js`

### Add Discord Integration

See `docs/EXAMPLES.md` for Discord integration example

---

## 🆘 Troubleshooting

**Q: "GITHUB_TOKEN not set"**  
A: Set in PowerShell admin:
```powershell
[Environment]::SetEnvironmentVariable("GITHUB_TOKEN", "ghp_...", "User")
```

**Q: "Slack message failed to send"**  
A: Check SLACK_WEBHOOK_URL is valid and properly formatted
See `docs/SLACK_SETUP.md`

**Q: "No results found for AI trends"**  
A: This is normal during quiet periods. All AI projects may be older than 30 days.

**Q: "Rate limit exceeded"**  
A: GitHub allows 5000 requests/hour with token. Reduce language count or wait.

**Q: "JSON not exporting"**  
A: Ensure trending-digest/exports/ folder exists and has write permissions

---

## 📖 More

- See [GUIDE.md](docs/GUIDE.md) for complete feature documentation
- See [EXAMPLES.md](docs/EXAMPLES.md) for 15+ code examples
- See [SLACK_SETUP.md](docs/SLACK_SETUP.md) for Slack setup
- See [Main README](../README.md) for project overview
