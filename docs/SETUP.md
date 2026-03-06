# GitHub MCP Setup Guide

Complete step-by-step guide to set up GitHub MCP server in VS Code.

## Prerequisites

- VS Code (latest version with Copilot)
- Node.js 18+ installed
- Git installed
- GitHub account

## Step 1: Generate GitHub Token

1. Open https://github.com/settings/tokens
2. Click **"Generate new token"** → **"Generate new token (classic)"**
3. Give it a name: `MCP-VSCode`
4. Select **Expiration**: 90 days (or your preference)
5. Select **Scopes**:
   - ✅ `repo` (full control of private repositories)
   - ✅ `gist` (create gists)
   - ✅ `user` (read user information)
   - ✅ `read:org` (read organization data)
6. Click **"Generate token"**
7. **Copy and save the token** (you won't see it again!)

## Step 2: Set Environment Variable

### Windows (PowerShell)

```powershell
# Set in current session
$env:GITHUB_TOKEN = "ghp_xxxxxxxxxxxx"

# Permanent: Add to user environment
[Environment]::SetEnvironmentVariable("GITHUB_TOKEN", "ghp_xxxxxxxxxxxx", "User")

# Verify
$env:GITHUB_TOKEN
```

### Windows (Command Prompt)

```cmd
setx GITHUB_TOKEN "ghp_xxxxxxxxxxxx"
```

### macOS/Linux

```bash
export GITHUB_TOKEN="ghp_xxxxxxxxxxxx"

# Make permanent: add to ~/.bashrc or ~/.zshrc
echo 'export GITHUB_TOKEN="ghp_xxxxxxxxxxxx"' >> ~/.bashrc
source ~/.bashrc
```

## Step 3: Verify Installation

Open the workspace in VS Code, then run in terminal:

```bash
# This should show no output errors
echo $GITHUB_TOKEN

# You should see your token (first few characters): ghp_xxx...
```

## Step 4: VS Code Configuration

The workspace is pre-configured in `.vscode/settings.json`:

```json
{
  "mcp": {
    "servers": {
      "github": {
        "command": "npx",
        "args": ["-y", "@modelcontextprotocol/server-github"],
        "env": {
          "GITHUB_API_KEY": "${env:GITHUB_TOKEN}"
        }
      }
    }
  }
}
```

This automatically:
- Starts the GitHub MCP server when VS Code opens
- Uses your `GITHUB_TOKEN` environment variable for authentication
- Makes GitHub tools available to Copilot Chat

## Step 5: Test the Connection

### Method 1: Run Example Agent

```bash
npm install
npm start
```

You should see:
```
🤖 GitHub MCP Agent Demo
✅ Authenticated as: [your-username]
...
```

### Method 2: Test with Copilot Chat

1. Open Copilot Chat (Ctrl+Shift+I)
2. Ask: `"List my recent repositories"`
3. If it works, Copilot will fetch your repos using MCP

## Step 6: Configure Optional Settings

Edit `.vscode/settings.json` to customize:

```json
{
  "mcp.debug": true,           // Enable debug logging
  "mcp.timeout": 30000,        // Request timeout (ms)
  "mcp.maxConcurrent": 5       // Max concurrent requests
}
```

## Troubleshooting

### "GITHUB_TOKEN not set"

**Solution:** Make sure you've set the environment variable and restarted VS Code.

```powershell
# Verify it's set
$env:GITHUB_TOKEN
# Should output: ghp_xxxxxxxxxxxx
```

### "Unauthorized" or "403 Forbidden"

**Possible causes:**
- Token is invalid or expired → Generate a new one
- Token doesn't have required scopes → Regenerate with correct scopes
- Token was revoked → Generate a new one

### MCP Server won't start

**Solution:** Check VS Code output panel (View → Output → MCP):

```bash
# Check if GitHub MCP server is installed
npx @modelcontextprotocol/server-github --version
```

If not found, install it:

```bash
npm install -g @modelcontextprotocol/server-github
```

### Copilot doesn't see GitHub tools

**Solution:**
1. Restart VS Code
2. Wait 10-15 seconds for MCP server to initialize
3. Check VS Code Output panel for MCP logs
4. Try asking again in Copilot Chat

## Security Best Practices

⚠️ **Important**: Never commit your token to Git!

1. Add to `.gitignore`:
   ```
   .env
   .env.local
   *.env
   ```

2. Use environment variables (already set in Step 2)

3. Keep token scope minimal (only what you need)

4. Rotate token every 90 days

5. Revoke immediately if exposed

## Common Issues

| Issue | Solution |
|-------|----------|
| **"Cannot find module"** | Run `npm install` |
| **"Timeout"** | Check internet, GitHub API status |
| **"Rate limit exceeded"** | Free tier: 60 req/hour, wait or upgrade |
| **MCP not connecting** | Restart VS Code, check token |

## Next Steps

- [Usage Guide](USAGE.md) - Learn what you can do with GitHub MCP
- [Code Examples](EXAMPLES.md) - Ready-to-use code snippets
- Run the example agent: `npm start`
- Build your own agent: see `src/agent.js`

## Support

- GitHub MCP Issues: https://github.com/modelcontextprotocol/servers/issues
- MCP Docs: https://modelcontextprotocol.io/
- GitHub API: https://docs.github.com/en/rest
