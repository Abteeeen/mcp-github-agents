# 📝 Job Analyzer Examples

Code examples for extending and customizing the Job Market Analyzer.

---

## Example 1: Analyze Specific Language

```javascript
import JobMarketAnalyzer from './job-market-analyzer.js';

const analyzer = new JobMarketAnalyzer(process.env.GITHUB_TOKEN);

// Get detailed analysis for one language
const market = analyzer.analyzeLanguage('Rust');

console.log(`${market.language}`);
console.log(`Jobs: ${market.jobOpenings}`);
console.log(`Salary: $${market.avgSalary}/year`);
console.log(`Growth: +${market.growth}%`);
```

---

## Example 2: Rank Languages by Salary

```javascript
const JOB_MARKET_DATA = {
  'Rust': { avgSalary: 155000 },
  'Go': { avgSalary: 145000 },
  'C++': { avgSalary: 140000 },
  // ... more languages
};

const byHighestSalary = Object.entries(JOB_MARKET_DATA)
  .sort((a, b) => b[1].avgSalary - a[1].avgSalary)
  .slice(0, 5);

console.log('Top 5 Highest Paying Languages:');
byHighestSalary.forEach(([lang, data], i) => {
  console.log(`${i + 1}. ${lang}: $${data.avgSalary.toLocaleString()}/year`);
});
```

---

## Example 3: Rank by Growth Rate

```javascript
const byFastestGrowth = correlations
  .sort((a, b) => b.jobMarket.growth - a.jobMarket.growth)
  .slice(0, 5);

console.log('🚀 Fastest Growing Languages:');
byFastestGrowth.forEach(([lang, data], i) => {
  console.log(`${i + 1}. ${lang}: +${data.growth}% YoY`);
});
```

---

## Example 4: Find Best Opportunity

```javascript
function findBestOpportunity(criteria = 'balanced') {
  const scores = correlations.map(item => {
    let score = 0;
    
    if (criteria === 'balanced') {
      // Weight: growth + salary + jobs equally
      score = (item.growth * item.avgSalary * item.jobOpenings) / 1000000;
    } else if (criteria === 'salary') {
      // Prioritize salary
      score = item.avgSalary;
    } else if (criteria === 'growth') {
      // Prioritize growth
      score = item.growth * 10000;
    } else if (criteria === 'jobs') {
      // Most job openings
      score = item.jobOpenings;
    }
    
    return { language: item.language, score };
  });
  
  return scores.sort((a, b) => b.score - a.score)[0];
}

const best = findBestOpportunity('balanced');
console.log(`Best opportunity: ${best.language}`);
```

---

## Example 5: Generate Career Path Recommendation

```javascript
function recommendCareerPath(language) {
  const market = analyzer.analyzeLanguage(language);
  
  console.log(`\n📚 Career Path: ${language}`);
  console.log(`Starting Salary: $${market.avgSalary * 0.7} (Junior)`);
  console.log(`Mid-level: $${market.avgSalary} (Senior)`);
  console.log(`Senior: $${market.avgSalary * 1.3} (Lead)`);
  console.log(`\nSteps to reach senior level:`);
  
  market.careerPath.forEach((role, i) => {
    console.log(`${i + 1}. ${role}`);
  });
}

recommendCareerPath('Rust');
```

---

## Example 6: Compare Two Languages

```javascript
function compareLanguages(lang1, lang2) {
  const data1 = analyzer.analyzeLanguage(lang1);
  const data2 = analyzer.analyzeLanguage(lang2);
  
  console.log(`Comparing ${lang1} vs ${lang2}\n`);
  console.log('Metric           | ' + lang1.padEnd(20) + ' | ' + lang2);
  console.log('-'.repeat(60));
  console.log(`Job Openings     | ${data1.jobOpenings}`.padEnd(30) + ' | ' + data2.jobOpenings);
  console.log(`Avg Salary       | $${data1.avgSalary}`.padEnd(30) + ' | $' + data2.avgSalary);
  console.log(`Growth Rate      | +${data1.growth}%`.padEnd(30) + ' | +' + data2.growth + '%');
  console.log(`Demand Level     | ${data1.demand}`.padEnd(30) + ' | ' + data2.demand);
}

compareLanguages('Rust', 'Go');
```

---

## Example 7: Export Analysis to JSON

```javascript
function exportAnalysis() {
  const analysis = {
    timestamp: new Date().toISOString(),
    languages: correlations.map(item => ({
      language: item.language,
      jobOpening: item.jobMarket.jobOpenings,
      salary: item.jobMarket.avgSalary,
      growth: item.jobMarket.growth,
      demand: item.jobMarket.demand,
      companies: item.jobMarket.companies,
      skills: item.jobMarket.skills,
      opportunityScore: (item.opportunity * 10).toFixed(1)
    }))
  };
  
  return JSON.stringify(analysis, null, 2);
}

const json = exportAnalysis();
console.log(json);
```

---

## Example 8: Create CSV Report

```javascript
function exportToCSV() {
  let csv = 'Language,Job Openings,Avg Salary,YoY Growth,Demand,Top Company\n';
  
  correlations.forEach(item => {
    const row = [
      item.language,
      item.jobMarket.jobOpenings,
      item.jobMarket.avgSalary,
      item.jobMarket.growth + '%',
      item.jobMarket.demand,
      item.jobMarket.companies[0] || 'N/A'
    ];
    
    csv += row.map(cell => `"${cell}"`).join(',') + '\n';
  });
  
  return csv;
}

// Save to file
const fs = require('fs');
fs.writeFileSync('job-market-analysis.csv', exportToCSV());
```

---

## Example 9: Add Custom Language Data

```javascript
// Extend JOB_MARKET_DATA with a new language
const customData = {
  ...JOB_MARKET_DATA,
  'Elixir': {
    jobOpenings: 5000,
    avgSalary: 135000,
    growth: 30,
    demand: 'GROWING',
    companies: ['Slack', 'Discord', 'Elixir School'],
    skills: ['Functional Programming', 'Concurrency', 'Erlang VM'],
    careerPath: ['Backend Engineer', 'Distributed Systems', 'Platform Architect']
  }
};

analyzer.JOB_MARKET_DATA = customData;
analyzer.analyzeLanguage('Elixir');
```

---

## Example 10: Create Skill Development Plan

```javascript
function createLearningPlan(targetLanguage) {
  const market = analyzer.analyzeLanguage(targetLanguage);
  
  const plan = {
    goal: `Become ${targetLanguage} developer`,
    timeline: '6-12 months',
    expectedSalary: `$${market.avgSalary.toLocaleString()}/year`,
    jobMarket: `${market.jobOpenings.toLocaleString()} positions available`,
    growth: `Growing ${market.growth}% YoY`,
    careerPath: market.careerPath,
    companies: market.companies,
    skillsToLearn: market.skills,
    resources: [
      'Official documentation',
      'Online courses (Udemy, Coursera)',
      'Build projects',
      'Open source contributions',
      'Networking with community'
    ]
  };
  
  return plan;
}

const plan = createLearningPlan('Kotlin');
console.log(JSON.stringify(plan, null, 2));
```

---

## Tips

✅ Always validate data is current (update annually)  
✅ Consider regional salary variations  
✅ Growth rate may vary by region/company size  
✅ Base recommendations on multiple factors  
✅ Keep track of market changes quarterly  

---

## Integration Ideas

- Create a dashboard to visualize trends
- Send weekly email alerts for top opportunities
- Build a Slack bot for job market queries
- Create a Discord bot for career advice
- Integrate with LinkedIn data (if available)
- Add historical trending data

---

See [GUIDE.md](GUIDE.md) for complete documentation and [../../github-mcp](../../github-mcp) for GitHub MCP integration.
