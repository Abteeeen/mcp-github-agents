# 💼 Job Market Analyzer Component

**Analyze GitHub trends and correlate with real job market data**

An intelligent agent that tracks trending technologies on GitHub and shows job market demand, salary data, and career growth paths.

---

## 🎯 What This Does

Analyzes:
- ✅ Trending technologies on GitHub
- ✅ Real job market demand for each language
- ✅ Salary data by programming language
- ✅ Year-over-year growth rates
- ✅ Top companies hiring
- ✅ Required skills
- ✅ Career progression paths

---

## ⚡ Quick Start (5 minutes)

### 1. Set GitHub Token
```powershell
# Open PowerShell as Administrator
[Environment]::SetEnvironmentVariable("GITHUB_TOKEN", "ghp_xxxxxxxxxxxx", "User")
```

### 2. Run the Analyzer
```powershell
npm run job-market
```

### 3. See Output
```
🔥 RUST (Fastest Growing)
   • 12,000 job openings
   • $155,000/year salary
   • +35% growth YoY
   Top Companies: Mozilla, AWS, Meta, Microsoft
```

---

## 📁 Files

| File | Purpose |
|------|---------|
| `src/job-market-analyzer.js` | Main analyzer code |
| `docs/` | Component documentation |

---

## 📚 Documentation

- **[GUIDE.md](docs/GUIDE.md)** - Complete agent guide
- **[EXAMPLES.md](docs/EXAMPLES.md)** - Code examples
- **[DATA.md](docs/DATA.md)** - Data sources & coverage

---

## 🚀 Features

- GitHub trending analysis
- Job market correlation
- Salary analysis
- Growth rate tracking
- Opportunity scoring
- Weekly reports
- Language deep-dive
- Career path recommendations

---

## 📊 Covers

10+ programming languages:
- JavaScript, Python, TypeScript
- Java, Go, Rust
- C++, C#, Kotlin, Swift

With data for:
- Job openings
- Average salary
- YoY growth rate
- Demand level
- Top companies
- Required skills
- Career paths

---

## 💡 Common Use Cases

### Career Planning
Find best language to learn:
```bash
npm run job-market
# See which languages have:
# - High demand + High salary + High growth
```

### Market Research
Understand tech trends:
```bash
npm run job-market
# Track trending vs job market
# Identify emerging opportunities
```

### Skill Development
Choose learning path:
```bash
npm run job-market
# See career progression
# Get skill recommendations
# Check salary growth
```

---

## 🔧 Customization

Edit `src/job-market-analyzer.js`:

1. **Add languages**
   ```javascript
   'Dart': {
     jobOpenings: 8000,
     avgSalary: 115000,
     // ... more data
   }
   ```

2. **Change metrics**
   - Modify opportunity calculation
   - Adjust weighting
   - Set thresholds

3. **Export data**
   - To CSV
   - To JSON
   - Create charts

---

## 📈 Output Examples

### Ranked by Opportunity
```
1. 🔥 RUST       (355.7/100 score)
2. 🔥 KOTLIN     (282.3/100 score)
3. 📈 TYPESCRIPT (275.1/100 score)
...
```

### Career Recommendations
```
Top 3 Best Opportunities:
1. Rust (Trending + High Demand + High Pay)
2. Kotlin (Growing + Mobile Boom)
3. TypeScript (High Jobs + Growing Fast)
```

### Salary Insights
```
Average Salary: $131,500/year
Highest Paid: Rust ($155k)
Most Jobs: JavaScript (125k positions)
```

---

## 🆘 Troubleshooting

**Token not working?**
→ See [../docs/ENVIRONMENT_SETUP.md](../docs/ENVIRONMENT_SETUP.md)

**No results?**
→ Check GitHub API rate limits

**Data outdated?**
→ Run the analyzer monthly for current trends

---

## 🎓 Learn More

Want to extend this?
→ See [GUIDE.md](docs/GUIDE.md) for integration patterns

---

## 📖 Main Project

→ See [README.md](../README.md) for full project overview

---

**Component Status:** ✅ Ready to Use  
**Data Last Updated:** March 2026  
**Version:** 1.0.0
