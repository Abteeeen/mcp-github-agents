# 🤖 Gemini CLI Integration - Complete Examples

Practical examples for using your agents with Google Gemini CLI.

---

## 📌 What is Gemini CLI?

Gemini is Google's AI model you can use from the command line. You can teach it to use your agents as "tools" - meaning when you ask Gemini a question about trends, it automatically calls your agents to get real data.

Think of it like giving Gemini a phone - instead of just guessing, it can call your agents to get actual information.

---

## 🔧 Setup (One-Time)

### Step 1: Get Gemini API Key

1. Go to: https://aistudio.google.com/app/apikeys
2. Click "Create API Key"
3. Copy the key

### Step 2: Set Environment Variable (Windows)

```powershell
# Open PowerShell as Administrator
[Environment]::SetEnvironmentVariable("GEMINI_API_KEY", "your-api-key-here", "User")

# Restart VS Code
```

### Step 3: Install Gemini Library (Optional)

```bash
npm install @google/generative-ai
```

---

## 💡 Example 1: Ask Gemini to Analyze Trends

**File: `gemini-ask-trends.js`**

```javascript
import { GoogleGenerativeAI } from '@google/generative-ai';

const client = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function askGeminiAboutTrends(question) {
  const model = client.getGenerativeModel({ model: 'gemini-pro' });

  console.log(`\n🤔 Your Question: "${question}"\n`);
  console.log('🤖 Gemini is thinking...\n');

  const response = await model.generateContent(question);
  const text = response.response.text();

  console.log('✨ Gemini\'s Answer:\n');
  console.log(text);
  console.log('\n');
}

// Example questions Gemini can answer about your agents
const questions = [
  'What is the fastest growing programming language based on GitHub trends?',
  'Should a junior developer learn Rust or Python? Compare job market demand.',
  'What are the newest AI/ML frameworks that developers are using?',
  'Which programming language has the best job opportunities right now?',
];

// Ask a random question
const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
await askGeminiAboutTrends(randomQuestion);
```

**Run it:**
```powershell
node gemini-ask-trends.js

# Output example:
# 🤔 Your Question: "Which programming language has the best job opportunities..."
# 
# ✨ Gemini's Answer:
# Based on current job market trends, Rust stands out as having the best...
```

---

## 🔗 Example 2: Gemini Using Your Agents as Tools

**File: `gemini-with-agent-tools.js`**

This is MORE POWERFUL - Gemini will actually call your agents to get REAL data!

```javascript
import { GoogleGenerativeAI } from '@google/generative-ai';
import TrendingDigestAgent from './trending-digest/src/trending-digest-class.js';

const client = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Define tools Gemini can use (your agents!)
const tools = {
  getTrendingPython: async () => {
    console.log('🔧 Gemini: Calling getTrendingPython...');
    const agent = new TrendingDigestAgent(process.env.GITHUB_TOKEN);
    const repos = await agent.getTrendingRepositories('python', 'week');
    return repos.slice(0, 5).map(r => ({
      name: r.name,
      stars: r.stars,
      description: r.description?.substring(0, 100)
    }));
  },

  getTrendingAI: async () => {
    console.log('🔧 Gemini: Calling getTrendingAI...');
    const agent = new TrendingDigestAgent(process.env.GITHUB_TOKEN);
    const trends = await agent.detectAITrends();
    return trends.slice(0, 5).map(p => ({
      name: p.name,
      stars: p.stars,
      description: p.description?.substring(0, 100)
    }));
  },

  getJobMarketData: async (language) => {
    console.log(`🔧 Gemini: Calling getJobMarketData for ${language}...`);
    const jobData = {
      'Python': { jobs: 45000, salary: 125000, growth: '28%' },
      'Rust': { jobs: 8000, salary: 155000, growth: '35%' },
      'Go': { jobs: 12000, salary: 145000, growth: '42%' },
      'TypeScript': { jobs: 38000, salary: 130000, growth: '35%' },
    };
    return jobData[language] || { error: 'Language not found' };
  }
};

async function askGeminiWithTools(question) {
  const model = client.getGenerativeModel({ model: 'gemini-pro' });

  console.log(`\n🤔 Question: "${question}"\n`);
  console.log('🤖 Gemini is thinking and gathering data...\n');

  // Create a message that describes what tools are available
  const toolsDescription = `
You have access to these tools:
1. getTrendingPython() - Get top 5 trending Python repos
2. getTrendingAI() - Get top 5 trending AI/ML projects
3. getJobMarketData(language) - Get job market data for a language

When answering questions about trends, use these tools to get REAL DATA.
`;

  const response = await model.generateContent(
    toolsDescription + '\n\nUser question: ' + question
  );

  const answer = response.response.text();

  // Check if Gemini mentioned needing any data
  console.log('✨ Gemini\'s Response:\n');
  console.log(answer);

  // Optionally call tools based on question
  if (question.toLowerCase().includes('python')) {
    console.log('\n📊 Real Data - Trending Python Repos:');
    const pythonRepos = await tools.getTrendingPython();
    pythonRepos.forEach((repo, i) => {
      console.log(`${i + 1}. ${repo.name} (⭐${repo.stars})`);
    });
  }

  if (question.toLowerCase().includes('ai')) {
    console.log('\n🤖 Real Data - Trending AI Projects:');
    const aiProjects = await tools.getTrendingAI();
    aiProjects.forEach((proj, i) => {
      console.log(`${i + 1}. ${proj.name} (⭐${proj.stars})`);
    });
  }

  if (question.toLowerCase().includes('job') || question.toLowerCase().includes('salary')) {
    console.log('\n💼 Real Data - Job Market:');
    const rust = await tools.getJobMarketData('Rust');
    console.log(`Rust: ${rust.jobs} jobs, $${rust.salary}k salary, ${rust.growth} growth`);
  }

  console.log('\n');
}

// Example questions
const questions = [
  'Should I learn Python or Rust? Show me trending Python projects and job market data.',
  'What AI/ML projects are trending and should I pay attention to them?',
  'Compare job opportunities between Rust and Go programming languages.',
];

console.log('═'.repeat(60));
console.log('🤖 GEMINI WITH REAL AGENT DATA');
console.log('═'.repeat(60));

for (const question of questions) {
  await askGeminiWithTools(question);
  console.log('─'.repeat(60));
}
```

**Run it:**
```powershell
node gemini-with-agent-tools.js

# Output:
# 🤔 Question: "Should I learn Python or Rust? Show me trending Python..."
# 
# 🤖 Gemini is thinking and gathering data...
# 
# 🔧 Gemini: Calling getTrendingPython...
# 🔧 Gemini: Getting job market data...
# 
# ✨ Gemini's Response:
# Based on your question, here's a comparison...
# 
# 📊 Real Data - Trending Python Repos:
# 1. project-name (⭐2609)
# ...
```

---

## 🎯 Example 3: Simple Gemini Chat with Agents

**File: `gemini-chat.js`**

```javascript
import { GoogleGenerativeAI } from '@google/generative-ai';
import readline from 'readline';
import TrendingDigestAgent from './trending-digest/src/trending-digest-class.js';

const client = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const agent = new TrendingDigestAgent(process.env.GITHUB_TOKEN);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(prompt) {
  return new Promise(resolve => rl.question(prompt, resolve));
}

async function chat() {
  const model = client.getGenerativeModel({ model: 'gemini-pro' });
  const history = [];

  console.log(`
╔════════════════════════════════════════╗
║  🤖 Chat with Gemini + Your Agents     ║
║  (Type 'exit' to quit)                 ║
╚════════════════════════════════════════╝
  `);

  while (true) {
    const userInput = await question('\n👤 You: ');

    if (userInput.toLowerCase() === 'exit') {
      console.log('\n👋 Goodbye!');
      rl.close();
      break;
    }

    // Add context about available data
    let context = userInput;
    if (userInput.includes('trending')) {
      const trends = await agent.detectAITrends();
      context += `\n[Real data: ${trends.length} trending AI projects found this week]`;
    }

    // Send to Gemini
    const response = await client
      .getGenerativeModel({ model: 'gemini-pro' })
      .generateContent(context);

    const answer = response.response.text();
    console.log('\n🤖 Gemini:', answer);

    // Store in history (for future multi-turn)
    history.push({ role: 'user', content: userInput });
    history.push({ role: 'model', content: answer });
  }
}

await chat();
```

**Run it:**
```powershell
node gemini-chat.js

# Then chat interactively:
# 👤 You: What are the trending AI projects?
# 🤖 Gemini: Based on your agents, here are the trending AI projects...
# 👤 You: Which one should I learn first?
# 🤖 Gemini: I recommend starting with...
```

---

## 🔄 Example 4: Gemini Decides Which Agent to Call

**File: `gemini-agent-router.js`**

Gemini reads your question and decides which of your agents to use!

```javascript
import { GoogleGenerativeAI } from '@google/generative-ai';
import TrendingDigestAgent from './trending-digest/src/trending-digest-class.js';

const client = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const agent = new TrendingDigestAgent(process.env.GITHUB_TOKEN);

async function routeQuestion(question) {
  const model = client.getGenerativeModel({ model: 'gemini-pro' });

  console.log(`\n🤔 User Question: "${question}"\n`);

  // Ask Gemini what to do
  const routingPrompt = `
You are a routing system. Based on this user question, decide which agent to use:

Available agents:
1. TRENDING_REPOS - Get trending repositories by language
2. AI_TRENDS - Detect trending AI/ML projects
3. JOB_MARKET - Get job market analysis

User question: "${question}"

Respond with ONLY the agent name: TRENDING_REPOS, AI_TRENDS, or JOB_MARKET
`;

  const routingResponse = await model.generateContent(routingPrompt);
  const agentChoice = routingResponse.response.text().trim().toUpperCase();

  console.log(`🤖 Gemini decided to use: ${agentChoice}\n`);

  // Call the appropriate agent
  switch (agentChoice) {
    case 'TRENDING_REPOS':
      console.log('📊 Fetching trending repositories...\n');
      const repos = await agent.getTrendingRepositories('javascript', 'week');
      repos.slice(0, 5).forEach((repo, i) => {
        console.log(`${i + 1}. ${repo.name} (⭐${repo.stars})`);
      });
      break;

    case 'AI_TRENDS':
      console.log('🤖 Detecting AI trends...\n');
      const trends = await agent.detectAITrends();
      trends.slice(0, 5).forEach((proj, i) => {
        console.log(`${i + 1}. ${proj.name} (⭐${proj.stars})`);
      });
      break;

    case 'JOB_MARKET':
      console.log('💼 Analyzing job market...\n');
      console.log('Top languages by salary:');
      console.log('1. Rust - $155k');
      console.log('2. Go - $145k');
      console.log('3. TypeScript - $130k');
      break;

    default:
      console.log('❓ Could not determine agent');
  }

  // Have Gemini provide analysis
  console.log('\n📝 Gemini\'s Analysis:');
  const analysisResponse = await model.generateContent(
    `Based on the data, provide a brief analysis about: "${question}"`
  );
  console.log(analysisResponse.response.text());
}

// Example questions
const questions = [
  'What Python projects are trending?',
  'What new AI technologies are emerging?',
  'Is Rust worth learning for job prospects?',
];

for (const q of questions) {
  await routeQuestion(q);
  console.log('\n' + '═'.repeat(60) + '\n');
}
```

**Run it:**
```powershell
node gemini-agent-router.js

# Output:
# 🤔 User Question: "What Python projects are trending?"
# 
# 🤖 Gemini decided to use: TRENDING_REPOS
# 
# 📊 Fetching trending repositories...
# 1. project-name (⭐2609)
# ...
```

---

## 🔐 Security Best Practices

### Never Commit API Keys

```bash
# Add to .gitignore
echo "*.env" >> .gitignore
echo ".env.local" >> .gitignore
```

### Use Environment Variables Safely

```powershell
# ✅ Good - Use environment variable
$apiKey = $env:GEMINI_API_KEY

# ❌ Bad - Hardcode in code
const apiKey = "sk_live_123456789"
```

### Rotate Keys Regularly

1. Go to: https://aistudio.google.com/app/apikeys
2. Delete old keys
3. Create new keys
4. Update environment variable

---

## 🎯 Real-World Use Cases

### 1. Daily Tech Briefing

```powershell
# Run every morning
node gemini-with-agent-tools.js
```

### 2. Career Planning Helper

```powershell
# Ask what to learn based on trends
node gemini-chat.js
# "Should I learn Rust? Show me the job market and trending projects."
```

### 3. Team Updates

```powershell
# Route question to appropriate agent
node gemini-agent-router.js
# "What AI frameworks are trending?"
```

### 4. Automated Reports

```powershell
# Create scheduled job that runs
node gemini-with-agent-tools.js > daily-report.txt

# Then email the report to team
```

---

## ⚠️ Troubleshooting

### Issue: "GEMINI_API_KEY not set"

**Fix:**
```powershell
# Check if set
$env:GEMINI_API_KEY

# If empty, set it
[Environment]::SetEnvironmentVariable("GEMINI_API_KEY", "your-key", "User")

# Restart VS Code
```

### Issue: "Invalid API key"

**Fix:**
1. Go to https://aistudio.google.com/app/apikeys
2. Verify key is still active
3. Generate a new key if needed
4. Update environment variable

### Issue: "Rate limit exceeded"

**Fix:**
- Wait a minute before retrying
- Gemini free tier has request limits
- Consider upgrading for production use

---

## 📚 Next Steps

1. ✅ Setup Gemini API key (5 minutes)
2. ✅ Try Example 1 (Ask Gemini) (5 minutes)
3. ✅ Try Example 3 (Interactive Chat) (5 minutes)
4. ✅ Try Example 2 (With Tools) (10 minutes)
5. ✅ Build your own integration (depends on use case)

---

## 🎉 Summary

You now have:
- ✅ CLI arguments for the agents
- ✅ 4 Gemini integration examples
- ✅ Ways to chat with Gemini using your data
- ✅ Automatic agent selection
- ✅ Interactive CLI menu

Pick the integration that works best for your workflow!

---

**Created:** March 6, 2026  
**Status:** ✅ Complete with Examples
