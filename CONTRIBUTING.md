# Contributing to GitHub MCP + AI Agents Framework

Thank you for your interest in contributing! This document provides guidelines and instructions.

---

## 🤝 Ways to Contribute

### Code Contributions
- **New Agents** - Create agents for new use cases
- **Improvements** - Enhance existing agents
- **Bug Fixes** - Fix issues and edge cases
- **Tests** - Add test coverage
- **Performance** - Optimize existing code

### Documentation
- **Guides** - Create how-to guides
- **Examples** - Add code examples
- **FAQs** - Answer common questions
- **Videos** - Create tutorials

### Community
- **Issues** - Report bugs or request features
- **Discussions** - Share ideas and feedback
- **Testing** - Test new features
- **Feedback** - Help improve the project

---

## 🚀 Getting Started

### 1. Fork & Clone
```bash
# Fork on GitHub, then:
git clone https://github.com/YOUR_USERNAME/mcp-github-agents.git
cd mcp-github-agents
```

### 2. Create Feature Branch
```bash
git checkout -b feature/your-feature-name
```

### 3. Make Changes
- Write clean, readable code
- Follow the existing code style
- Add comments for complex logic
- Update documentation

### 4. Test Your Changes
```bash
npm test
npm run job-market
npm start
```

### 5. Commit & Push
```bash
git add .
git commit -m "feat: describe your change"
git push origin feature/your-feature-name
```

### 6. Create Pull Request
- Go to GitHub and create a PR
- Add a clear title and description
- Reference any related issues

---

## 📝 Code Style

### JavaScript/Node.js
```javascript
// Use clear variable names
const userRepositories = data.repositories;

// Add comments for non-obvious code
// Fetch trending repositories for the past week
async function getTrendingRepos() {
  // ...
}

// Use async/await for promises
async function fetchData() {
  const data = await request('GET', '/path');
  return data;
}

// Keep functions focused and small
// One responsibility per function
```

### Documentation
```markdown
# Clear Heading Hierarchy
## Use proper markdown format
### Three levels max

**Bold for important terms**
`Code for variables/functions`

- Use bullet points
- For lists
- When appropriate
```

---

## 📦 Creating a New Agent

### File Structure
```
src/
└── your-agent.js

docs/
└── YOUR_AGENT.md
```

### Basic Agent Template
```javascript
/**
 * Description of what your agent does
 */

import * as https from 'https';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
if (!GITHUB_TOKEN) {
  console.error('ERROR: GITHUB_TOKEN environment variable not set');
  process.exit(1);
}

class YourAgent {
  constructor(token) {
    this.token = token;
    this.baseUrl = 'api.github.com';
  }

  async request(method, path, body = null) {
    // Implementation...
  }

  async mainFeature() {
    console.log('🤖 Starting analysis...');
    // Your logic here
  }
}

async function main() {
  try {
    const agent = new YourAgent(GITHUB_TOKEN);
    await agent.mainFeature();
    console.log('✅ Complete!');
  } catch (error) {
    console.error('Error:', error.message);
  }
}

main();
```

### Add to package.json
```json
{
  "scripts": {
    "your-agent": "node src/your-agent.js"
  }
}
```

### Document Your Agent
Create `docs/YOUR_AGENT.md`:
- What it does
- How to use it
- Example output
- How to customize

---

## ✅ Commit Message Format

Use clear, descriptive commit messages:

```
feat: add new agent for repository analysis
fix: correct authentication error handling
docs: update setup guide with examples
refactor: simplify job market correlation logic
test: add test cases for GitHub API
```

### Types
- `feat` - New feature/agent
- `fix` - Bug fix
- `docs` - Documentation
- `refactor` - Code refactoring
- `test` - Tests
- `chore` - Maintenance

---

## 📋 Pull Request Checklist

Before submitting a PR:

- [ ] Code follows project style
- [ ] Comments added for complex logic
- [ ] Documentation updated
- [ ] No console.log left in code
- [ ] Tests pass (if applicable)
- [ ] No new dependencies added without justification
- [ ] Commit messages are clear

---

## 🐛 Reporting Issues

### Bug Report
```
**Description:** Clear description of the bug

**Steps to Reproduce:**
1. Step one
2. Step two
3. Result

**Expected Behavior:** What should happen

**Actual Behavior:** What actually happened

**Environment:** Windows 10, Node.js 18, etc.
```

### Feature Request
```
**Description:** What you want to build

**Use Case:** Why you need it

**Example:** How it would work
```

---

## 📚 Documentation Guidelines

### For New Agents
1. Create `docs/AGENT_NAME.md`
2. Include:
   - What it does
   - How to use
   - Example output
   - Customization guide
   - FAQ

### For Updates
1. Update relevant docs
2. Add examples if applicable
3. Update README if needed

---

## 🧪 Testing

### Manual Testing
```bash
# Test your agent
npm run your-agent

# Test main agent
npm start

# Test job market analyzer
npm run job-market
```

### What to Test
- Authentication works
- Error handling
- Output format
- Edge cases

---

## 🎓 Code Review Process

During review, maintainers may:
- Ask questions about your code
- Suggest improvements
- Request documentation updates
- Ask for test cases

### Be Respectful
- Be open to feedback
- Ask questions if unclear
- Thank reviewers
- Iterate on suggestions

---

## 🚀 Deployment

For maintainers:
1. Review and approve PR
2. Merge to main branch
3. Update version in package.json
4. Create GitHub release
5. Announce new features

---

## ❓ Questions?

- **Check the docs** → [docs/](docs/)
- **Open an issue** → Ask your question
- **Discussions** → For general questions
- **Read COMPLETE_GUIDE.md** → For detailed info

---

## 📜 License

By contributing, you agree your code is licensed under MIT License.

---

## 🌟 Recognition

Significant contributors will be listed in:
- README.md contributors section
- Release notes
- Project acknowledgments

---

**Thank you for contributing! Together we build better tools for developers.** ❤️
