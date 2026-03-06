# 📢 Slack Integration Setup Guide

Complete step-by-step guide to set up Slack integration for the Trending Digest Agent.

---

## Overview

Use Slack Incoming Webhooks to automatically send weekly trending digests to your Slack channel.

### What You Get

- ✅ Weekly digest posted to Slack automatically
- ✅ Formatted message with trending repos and AI projects
- ✅ Job market correlation included
- ✅ Easy to share with team

---

## Prerequisites

- ✅ Slack workspace (your team's Slack)
- ✅ Permission to create apps/webhooks
- ✅ A Slack channel to post to (or create new)

---

## Step-by-Step Setup

### Step 1: Go to Slack API Dashboard

1. Open https://api.slack.com/apps
2. Sign in with your Slack workspace credentials
3. You should see "Your Apps" page

### Step 2: Create New App

1. Click **"Create New App"** button
2. Select **"From scratch"**
3. Fill in:
   - **App Name:** `Trending Digest` (or your name)
   - **Workspace:** Select your workspace from dropdown
4. Click **"Create App"**

### Step 3: Enable Incoming Webhooks

1. On your app page, click **"Incoming Webhooks"** in left sidebar
2. Toggle **"Incoming Webhooks"** to **ON**
3. Click **"Add New Webhook to Workspace"**
4. A popup appears asking "Where should we post this?"
5. **Select your channel:**
   - Existing channel: Search and select (e.g., #tech-news)
   - New channel: Create new channel first, then select
6. Click **"Allow"** (bottom right of popup)

### Step 4: Copy Your Webhook URL

1. After authorizing, you'll see your new webhook listed
2. **Copy the URL** (long string starting with `https://hooks.slack.com/services/...`)
3. Keep this secret! Anyone with this URL can post to your channel.

**Example URL:**
```
https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXX
```

### Step 5: Set Environment Variable (Windows)

1. **Open PowerShell as Administrator**
   - Right-click PowerShell → "Run as administrator"

2. **Run this command** (replace with YOUR webhook URL):
   ```powershell
   [Environment]::SetEnvironmentVariable("SLACK_WEBHOOK_URL", "https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXX", "User")
   ```

3. **Verify it was set:**
   ```powershell
   $env:SLACK_WEBHOOK_URL
   ```
   Should print your webhook URL

4. **Restart VS Code completely** (close and reopen)

### Step 6: Test

1. Run the agent:
   ```bash
   npm run trending-digest
   ```

2. Check your Slack channel
3. You should see the digest message!

---

## Troubleshooting

### Issue: "Slack webhook URL not configured"

**Cause:** SLACK_WEBHOOK_URL environment variable not set

**Fix:**
```powershell
# Check if set
$env:SLACK_WEBHOOK_URL

# If blank, set it
[Environment]::SetEnvironmentVariable("SLACK_WEBHOOK_URL", "https://hooks.slack.com/services/...", "User")

# Restart VS Code
```

### Issue: "Requested resource not found" (404)

**Cause:** Webhook URL is invalid or expired

**Fix:**
1. Go to https://api.slack.com/apps
2. Click your "Trending Digest" app
3. Click "Incoming Webhooks"
4. Delete old webhook
5. Click "Add New Webhook to Workspace"
6. Re-authorize and copy NEW URL
7. Update environment variable
8. Restart VS Code

### Issue: "No permission to post to channel"

**Cause:** Webhook wasn't authorized for the channel, or permissions changed

**Fix:**
1. Create new webhook for the channel
2. Ensure bot has post permissions
3. Try a public channel first (#general)

### Issue: "Message didn't appear in Slack"

**Cause:** Several possibilities

**Fix (checklist):**
- [ ] SLACK_WEBHOOK_URL is set: `$env:SLACK_WEBHOOK_URL`
- [ ] VS Code was restarted after setting env var
- [ ] Webhook URL is correct (no typos)
- [ ] Channel exists and is visible to you
- [ ] Check console output for error message
- [ ] Webhook is still active (check API dashboard)

**Check console output:**
```bash
npm run trending-digest

# Look for:
# ✅ Message sent to Slack successfully!
# OR
# ❌ Slack send error: ...
```

### Issue: Message truncated or formatting wrong

**Cause:** Slack has message size limits or block format issue

**Fix:**
1. Edit `sendToSlack()` in trending-digest.js
2. Reduce newsletter length
3. Adjust block formatting
4. See "Customizing Messages" below

---

## Customizing Slack Messages

### Change Message Size

The newsletter is limited to first 3000 characters for Slack. To change:

In `src/trending-digest.js`, find `sendToSlack()` method:

```javascript
async sendToSlack(newsletter, topic = 'Weekly Trending Repos') {
  // ...
  text: newsletter.substring(0, 3000)  // ← Change 3000 to larger number
  // ...
}
```

### Change Message Appearance

Slack uses "Blocks" for formatting. To customize:

```javascript
const message = {
  text: 'Your header',
  blocks: [
    // Block 1: Header
    {
      type: 'header',
      text: {
        type: 'plain_text',
        text: '📈 Custom Header',
        emoji: true
      }
    },
    
    // Block 2: Section with markdown
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: '*Bold text* and _italic_ and `code`'
      }
    },
    
    // Block 3: Divider
    {
      type: 'divider'
    },
    
    // Block 4: Context (small text)
    {
      type: 'context',
      elements: [
        {
          type: 'mrkdwn',
          text: '📅 Generated: Today'
        }
      ]
    }
  ]
};
```

### Add Colors & Attachments

```javascript
const message = {
  text: 'Digest',
  attachments: [
    {
      color: '#FF6B6B',  // Red color
      title: 'Top 5 AI Projects',
      text: 'List of trending AI...',
      fields: [
        {
          title: 'Project 1',
          value: 'Description',
          short: true
        }
      ]
    }
  ]
};
```

### Add Images & Buttons

```javascript
blocks: [
  {
    type: 'image',
    image_url: 'https://example.com/image.png',
    alt_text: 'Trending chart'
  },
  {
    type: 'actions',
    elements: [
      {
        type: 'button',
        text: {
          type: 'plain_text',
          text: 'View Full Report'
        },
        url: 'https://example.com/digest'
      }
    ]
  }
]
```

---

## Multiple Channels

Send the digest to multiple channels:

```javascript
const webhookUrls = [
  process.env.SLACK_WEBHOOK_TECH,    // #tech-news
  process.env.SLACK_WEBHOOK_MANAGEMENT  // #leadership
];

for (const webhookUrl of webhookUrls) {
  const agent = new TrendingDigestAgent(
    process.env.GITHUB_TOKEN,
    webhookUrl
  );
  await agent.sendToSlack(newsletter);
}
```

Set multiple env vars:
```powershell
[Environment]::SetEnvironmentVariable("SLACK_WEBHOOK_TECH", "https://...", "User")
[Environment]::SetEnvironmentVariable("SLACK_WEBHOOK_MANAGEMENT", "https://...", "User")
```

---

## Scheduled Sends

### Option 1: Windows Task Scheduler

1. Create batch file `run-digest.bat`:
```batch
@echo off
cd C:\Users\Codev\mcp-github-workspace
set GITHUB_TOKEN=ghp_xxxx
set SLACK_WEBHOOK_URL=https://hooks.slack.com/services/...
npm run trending-digest
pause
```

2. Open **Task Scheduler**
3. Create Basic Task
   - Name: "Weekly Trending Digest"
   - Trigger: Weekly (Monday 9 AM)
   - Action: Run batch file
   - Run with admin privs

### Option 2: Node.js Script with Schedule

Install: `npm install node-schedule`

```javascript
import schedule from 'node-schedule';
import { TrendingDigestAgent } from './src/trending-digest.js';

// Every Monday at 9 AM
schedule.scheduleJob('0 9 * * 1', async () => {
  console.log('📅 Running weekly digest...');
  const agent = new TrendingDigestAgent(
    process.env.GITHUB_TOKEN,
    process.env.SLACK_WEBHOOK_URL
  );
  await agent.run();
});

console.log('⏰ Scheduled: Weekly Monday 9 AM');
```

### Option 3: GitHub Actions

Create `.github/workflows/digest.yml`:

```yaml
name: Weekly Trending Digest

on:
  schedule:
    - cron: '0 9 * * 1'  # Monday 9 AM UTC

jobs:
  digest:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - run: npm run trending-digest
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}
```

---

## Security Best Practices

1. **Never commit webhook URLs** to git
   - Add `.env` to `.gitignore`
   - Use environment variables only

2. **Rotate webhook URLs periodically**
   - Delete old webhooks in Slack API
   - Create new webhooks
   - Update env var

3. **Limit app permissions**
   - Only enable "Incoming Webhooks"
   - Don't give unnecessary scopes

4. **Monitor usage**
   - Check Slack API dashboard for activity
   - Revoke unused webhooks

5. **Private webhook is public URL**
   - Treat like a password
   - Don't share in emails/docs
   - Use environment variables

---

## Slack App Configuration

### Current Configuration

Your "Trending Digest" app is set up with:

**Enabled Features:**
- ✅ Incoming Webhooks (for posting)

**No need for:**
- Bot tokens (not needed)
- OAuth scopes (not needed)  
- Event subscriptions (not needed)
- Slash commands (not needed)

This simple setup is recommended - fewer permissions = more secure

### View/Modify Settings

1. Go to https://api.slack.com/apps
2. Click "Trending Digest"
3. Left sidebar options:
   - **Incoming Webhooks** - Manage webhook URLs
   - **App Home** - Configure bot name/icon
   - **Basic Information** - View app details

---

## Webhook Limits & Quotas

- **Rate limit:** 20 requests/second per webhook
- **Message size:** Up to 4000 characters
- **No cost:** Webhook posting is free
- **Retention:** Slack keeps message history based on plan

---

## Alternative: Slack Bot (More Complex)

If you want more control, create a Slack Bot instead of webhook:

**Webhook advantages:**
- ✅ Simple setup
- ✅ No token management
- ✅ Perfect for automated messages

**Bot advantages:**
- ✅ More control
- ✅ Can respond to mentions
- ✅ More Slack features
- ❌ More complex setup

**For this use case, Incoming Webhooks are recommended.**

---

## Testing Your Setup

### Manual Test

```javascript
// create test.js
import https from 'https';

const webhookUrl = process.env.SLACK_WEBHOOK_URL;
const message = {
  text: '🧪 Testing Slack integration!',
  blocks: [
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: '*Test Message* \nSlack integration is working! ✅'
      }
    }
  ]
};

const url = new URL(webhookUrl);
const options = {
  hostname: url.hostname,
  path: url.pathname,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }
};

const req = https.request(options, (res) => {
  console.log('Status:', res.statusCode);
  console.log(res.statusCode === 200 ? '✅ Success!' : '❌ Failed');
});

req.write(JSON.stringify(message));
req.end();
```

Run: `node test.js`

---

## Troubleshooting Checklist

Before asking for help, verify:

- [ ] Webhook URL starts with `https://hooks.slack.com/services/`
- [ ] SLACK_WEBHOOK_URL environment variable is set
- [ ] VS Code restarted after setting env var
- [ ] Slack channel exists and you can post to it
- [ ] Webhook is active in API dashboard
- [ ] No typos in webhook URL
- [ ] Running latest agent code
- [ ] GITHUB_TOKEN also set and working
- [ ] Console shows "Message sent to Slack successfully"

---

## Support & Resources

- **Slack API Docs:** https://api.slack.com/apps
- **Block Kit Guide:** https://api.slack.com/block-kit
- **Webhook Reference:** https://api.slack.com/messaging/webhooks
- **Help:** See parent README.md or GUIDE.md

---

**Created:** March 6, 2026  
**Guide Version:** 1.0  
**Status:** Complete ✅
