/**
 * Example AI Agent using GitHub MCP
 * This agent demonstrates how to use GitHub MCP server to interact with GitHub
 */

import * as https from 'https';

// Configuration
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
if (!GITHUB_TOKEN) {
  console.error('ERROR: GITHUB_TOKEN environment variable not set');
  console.error('Set it with: export GITHUB_TOKEN="your_token_here"');
  process.exit(1);
}

class GitHubAgent {
  constructor(token) {
    this.token = token;
    this.baseUrl = 'api.github.com';
  }

  /**
   * Make a request to GitHub API
   */
  async request(method, path, body = null) {
    return new Promise((resolve, reject) => {
      const options = {
        hostname: this.baseUrl,
        path: path,
        method: method,
        headers: {
          'Authorization': `token ${this.token}`,
          'User-Agent': 'MCP-GitHub-Agent',
          'Accept': 'application/vnd.github.v3+json'
        }
      };

      const req = https.request(options, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(JSON.parse(data || '{}'));
          } else {
            reject(new Error(`GitHub API error: ${res.statusCode} ${data}`));
          }
        });
      });

      req.on('error', reject);
      if (body) req.write(JSON.stringify(body));
      req.end();
    });
  }

  /**
   * Get authenticated user
   */
  async getUser() {
    console.log('📦 Getting authenticated user...');
    const user = await this.request('GET', '/user');
    return user;
  }

  /**
   * Search repositories
   */
  async searchRepos(query, limit = 5) {
    console.log(`🔍 Searching repos for: "${query}"...`);
    const response = await this.request(
      'GET',
      `/search/repositories?q=${encodeURIComponent(query)}&sort=stars&order=desc&per_page=${limit}`
    );
    return response.items || [];
  }

  /**
   * Get repository details
   */
  async getRepo(owner, repo) {
    console.log(`📂 Getting repo: ${owner}/${repo}...`);
    return await this.request('GET', `/repos/${owner}/${repo}`);
  }

  /**
   * List open issues
   */
  async listIssues(owner, repo, state = 'open', limit = 10) {
    console.log(`🎫 Listing ${state} issues for ${owner}/${repo}...`);
    const response = await this.request(
      'GET',
      `/repos/${owner}/${repo}/issues?state=${state}&per_page=${limit}`
    );
    return response;
  }

  /**
   * List pull requests
   */
  async listPRs(owner, repo, state = 'open', limit = 10) {
    console.log(`🔄 Listing ${state} PRs for ${owner}/${repo}...`);
    const response = await this.request(
      'GET',
      `/repos/${owner}/${repo}/pulls?state=${state}&per_page=${limit}`
    );
    return response;
  }

  /**
   * Create an issue
   */
  async createIssue(owner, repo, title, body) {
    console.log(`✏️  Creating issue in ${owner}/${repo}...`);
    return await this.request('POST', `/repos/${owner}/${repo}/issues`, {
      title,
      body
    });
  }

  /**
   * Get file content
   */
  async getFileContent(owner, repo, path) {
    console.log(`📄 Getting file: ${path}...`);
    const response = await this.request('GET', `/repos/${owner}/${repo}/contents/${path}`);
    if (response.content) {
      return Buffer.from(response.content, 'base64').toString('utf-8');
    }
    return response;
  }
}

/**
 * Main demo
 */
async function main() {
  console.log('🤖 GitHub MCP Agent Demo\n');
  console.log('═'.repeat(50));

  const agent = new GitHubAgent(GITHUB_TOKEN);

  try {
    // 1. Get user info
    const user = await agent.getUser();
    console.log(`\n✅ Authenticated as: ${user.login}`);
    console.log(`   Name: ${user.name || 'N/A'}`);
    console.log(`   Repos: ${user.public_repos}`);

    // 2. Search for repos
    console.log('\n' + '-'.repeat(50));
    const repos = await agent.searchRepos('nodejs', 3);
    console.log(`\n✅ Found ${repos.length} repositories:`);
    repos.forEach(repo => {
      console.log(`   ⭐ ${repo.full_name} (${repo.stargazers_count} stars)`);
      console.log(`      ${repo.description}\n`);
    });

    // 3. Get detail about a specific repo
    console.log('-'.repeat(50));
    const repoDetail = await agent.getRepo('nodejs', 'node');
    console.log(`\n✅ Repository Details: ${repoDetail.full_name}`);
    console.log(`   Language: ${repoDetail.language}`);
    console.log(`   Stars: ${repoDetail.stargazers_count}`);
    console.log(`   Forks: ${repoDetail.forks_count}`);
    console.log(`   URL: ${repoDetail.html_url}`);

    // 4. List recent issues
    console.log('\n' + '-'.repeat(50));
    const issues = await agent.listIssues('nodejs', 'node', 'open', 3);
    console.log(`\n✅ Top 3 Open Issues:`);
    issues.slice(0, 3).forEach(issue => {
      console.log(`   🎫 #${issue.number}: ${issue.title}`);
    });

    console.log('\n' + '═'.repeat(50));
    console.log('✅ Demo completed successfully!');
    console.log('\nNext steps:');
    console.log('1. Modify this agent to perform your desired actions');
    console.log('2. Check docs/USAGE.md for more examples');
    console.log('3. Integrate with VS Code Copilot for AI-powered automation');

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

main();
