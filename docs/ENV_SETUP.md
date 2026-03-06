# ⚙️ Environment Variable Setup - Complete Guide

## Your Problem
```
❌ Generated token but environment variable is not found
```

This is a **common issue**. The solution is shown below with exact commands.

---

## Quick Fix (Copy-Paste)

### Windows PowerShell (RECOMMENDED)

**Step 1: Get Your Token**
- Go to: https://github.com/settings/tokens
- Click "Generate new token"
- Choose "Generate new token (classic)"
- Select scopes: `repo`, `gist`, `user`
- Click "Generate token"
- **Copy the token** (looks like: `ghp_xxxxxxxxxxxxxxxxxxxx`)

**Step 2: Open PowerShell as Administrator**

1. Press `Win + X`
2. Click "Windows PowerShell (Admin)" or "Terminal (Admin)"
3. Click "Yes" on the prompt

**Step 3: Set Permanent Environment Variable**

Paste this command (replace `YOUR_TOKEN` with your actual token):

```powershell
[Environment]::SetEnvironmentVariable("GITHUB_TOKEN", "ghp_xxxxxxxxxxxxxxxxxxxx", "User")
```

**Example with fake token:**
```powershell
[Environment]::SetEnvironmentVariable("GITHUB_TOKEN", "ghp_1234567890abcdef", "User")
```

**Step 4: Verify It Worked**

```powershell
# Type this command
$env:GITHUB_TOKEN

# Should output your token like: ghp_xxxxxxxxxxxx
```

**Step 5: Close Everything & Restart**

- Close PowerShell
- Close VS Code
- **Wait 5 seconds**
- Reopen VS Code
- Test agent: `npm start`

---

## Why This Works

### Without Setting Variable (❌ Current State)
```
PowerShell Window 1:
$env:GITHUB_TOKEN = "ghp_xxx"  ✅ Works in THIS window
↓
Close window
↓
Token is GONE ❌
```

### With Permanent Setup (✅ This Solution)
```
Windows Registry:
GITHUB_TOKEN = "ghp_xxx"  ✅ Stored permanently
↓
Any application can access it
↓
Survives computer restarts
```

---

## Verification Checklist

### ✅ Token is Set

```powershell
# Check if token is available
$env:GITHUB_TOKEN

# Should show: ghp_xxxxxxxxxxxx (not blank)
```

### ✅ Test Agent Works

```powershell
cd C:\Users\Codev\mcp-github-workspace

# Should show "✅ Authenticated as: [your-username]"
npm start
```

### ✅ Copilot Can Access It

1. Open VS Code
2. Open Copilot Chat (Ctrl+Shift+I)
3. Ask: `"What is my GitHub username?"`
4. If it responds with your actual username → ✅ Working!

---

## Alternative: If PowerShell Method Doesn't Work

### Method 2: Edit System Variables GUI

**Step 1: Open Environment Variables**

1. Press `Win + Pause` or search for "Environment Variables"
2. Click "Edit the system environment variables"
3. Click "Environment Variables" button (bottom right)

**Step 2: Create New Variable**

Under "User variables for [Your Name]":
1. Click "New..."
2. Variable name: `GITHUB_TOKEN`
3. Variable value: `ghp_xxxxxxxxxxxx`
4. Click "OK"
5. Click "OK" again
6. Restart VS Code

---

## Alternative: If Permanent Setup Still Doesn't Work

### Method 3: Use `.env` File (Fallback)

**Step 1: Create `.env` File**

In workspace root (`C:\Users\Codev\mcp-github-workspace`):

Create file: `.env`
```
GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxx
```

**Step 2: Install Package**

```powershell
npm install dotenv
```

**Step 3: Update `src/agent.js`**

Add this at the very top:
```javascript
import dotenv from 'dotenv';
dotenv.config();  // Load .env file

// Rest of code...
```

**Step 4: Test**

```powershell
npm start
```

⚠️ **Important**: Add to `.gitignore` so you don't share token:
```
.env
.env.local
```

---

## Troubleshooting

### Problem: "Not recognized as an internal or external command"

**Reason**: PowerShell not admin mode
**Solution**: 
1. Right-click PowerShell
2. Click "Run as administrator"
3. Try again

### Problem: "Access Denied"

**Reason**: Permission issue
**Solution**:
```powershell
# Run this instead:
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
# Type: Y and press Enter
# Then try setting environment variable again
```

### Problem: Token still not found after setting

**Reason**: VS Code cached old settings
**Solution**:
1. Close VS Code completely
2. Open Task Manager
3. Kill any "Code.exe" processes
4. Wait 10 seconds
5. Reopen VS Code

### Problem: "Agent still says GITHUB_TOKEN not found"

**Reason**: Token not set before starting agent
**Solution**:
1. Verify token: `$env:GITHUB_TOKEN` → should show value
2. If blank, set it again: `[Environment]::SetEnvironmentVariable(...)`
3. Close and reopen PowerShell
4. Try again

---

## Windows vs PowerShell vs CMD

| Tool | Recommendation | Reason |
|------|---|---|
| **PowerShell** | ✅ Use this | Modern, works best |
| **Command Prompt** | ⚠️ Use if PS fails | Older but works |
| **Windows Terminal** | ✅ Easy | Modern interface |

### Command Prompt Version (If using CMD instead)

```cmd
setx GITHUB_TOKEN "ghp_xxxxxxxxxxxx"
```

Then restart Command Prompt.

---

## Quick Checklist

Follow this in order:

- [ ] Copy your GitHub token from https://github.com/settings/tokens
- [ ] Open PowerShell as Administrator (Win + X → PowerShell Admin)
- [ ] Run: `[Environment]::SetEnvironmentVariable("GITHUB_TOKEN", "ghp_xxx", "User")`
- [ ] Replace `ghp_xxx` with YOUR actual token
- [ ] Press Enter
- [ ] Verify: `$env:GITHUB_TOKEN` shows your token
- [ ] Close PowerShell
- [ ] Close VS Code completely
- [ ] Reopen VS Code
- [ ] Run: `npm start` in workspace
- [ ] Should see: `✅ Authenticated as: [your-github-username]`

---

## Test Commands

After setting token, try these:

```powershell
# 1. Check token is set
echo $env:GITHUB_TOKEN

# 2. Navigate to workspace
cd C:\Users\Codev\mcp-github-workspace

# 3. Install packages (first time only)
npm install

# 4. Run agent
npm start

# Expected output:
# 🤖 GitHub MCP Agent Demo
# ✅ Authenticated as: [your-username]
# ...
```

---

## Create an Alias (Optional)

Make token easy to set next time:

```powershell
# Add to your PowerShell profile
Add-Content $PROFILE "function Set-GithubToken {
  param([string]`$token)
  [Environment]::SetEnvironmentVariable('GITHUB_TOKEN', `$token, 'User')
  Write-Host 'Token set!'
}"

# Reload profile
. $PROFILE

# Now you can use:
Set-GithubToken "ghp_xxxx"
```

---

## Visual Guide

```
┌─ GitHub Website ────────────────────────┐
│ https://github.com/settings/tokens      │
│ Generate Token → Copy                   │
└──────────────┬──────────────────────────┘
               │
               ↓
┌─ PowerShell (Admin) ─────────────────────┐
│ $env:GITHUB_TOKEN = "ghp_xxx"            │
│           ↓                              │
│ [Environment]::SetEnvironmentVariable... │
│           ↓                              │
│ Close & Reopen PS                        │
└──────────────┬──────────────────────────┘
               │
               ↓
┌─ Verify ────────────────────────────────┐
│ $env:GITHUB_TOKEN                       │
│ Output: ghp_xxx... ✅                    │
└──────────────┬──────────────────────────┘
               │
               ↓
┌─ VS Code / npm start ───────────────────┐
│ ✅ Authenticated as: [username]         │
│ Ready to use!                           │
└─────────────────────────────────────────┘
```

---

## Still Having Issues?

If after following these steps the token still isn't working:

1. **Check token is valid**:
   - Go to https://github.com/settings/tokens
   - Make sure your token hasn't expired
   - Check it has `repo` scope

2. **Check PowerShell version**:
   ```powershell
   $PSVersionTable.PSVersion
   # Should be 5.1 or higher
   ```

3. **Check UAC (User Account Control)**:
   - Run PowerShell as Administrator
   - Not just regular user mode

4. **Clear old cache**:
   ```powershell
   Remove-Item env:GITHUB_TOKEN
   # Then set it again
   ```

---

## Next: Test It Works

Once token is set, go to: `docs/COMPLETE_GUIDE.md` → "Part 7: Step-by-Step Testing"

You're almost there! 🎉
