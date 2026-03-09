# Integration Guide

Connect agents to your existing systems and workflows.

---

## Quick Integration Examples

### 1. SquadOfAgents (Recommended)
```
Dashboard → Create Agent → Paste Prompt → Connect Data → Deploy
```

**Step-by-step:**
1. Login to SquadOfAgents 
2. Click "New Agent"
3. Name: "Resume Screener"
4. Paste system prompt from `resume-screener.md`
5. Set data source: Connect to HR email / upload folder
6. Set output: Email hiring manager
7. Test with sample resume
8. Deploy to production

**Best for:** Most users. Purpose-built platform.

---

### 2. N8N Workflow Automation
```
Trigger (email) → Agent → Output (CRM)
```

**Complete example - Resume screening workflow:**

```n8n workflow
[HTTP Request to Trigger]
   ↓
[Resume uploaded to server]
   ↓
[Read Resume File]
   ↓
[OpenAI Chat - Resume Screener]
   System: [paste prompt from resume-screener.md]
   User: "{{ $json.resume_text }}"
   ↓
[Parse JSON Output]
   ↓
[IF score > 70]
   ├─ YES → [Send Email to Hiring Manager]
   └─ NO → [Auto-Reject Email]
```

**N8N Configuration:**

```json
{
  "nodes": [
    {
      "type": "n8n-nodes-base.httpRequest",
      "name": "Resume Upload Trigger",
      "config": {
        "method": "POST",
        "url": "your-webhook-url"
      }
    },
    {
      "type": "n8n-nodes-base.openaiChat",
      "name": "Resume Screener Agent",
      "config": {
        "model": "gpt-4",
        "systemMessage": "[PASTE PROMPT HERE]",
        "messages": "{{ $json.resume_text }}"
      }
    },
    {
      "type": "n8n-nodes-base.gmail",
      "name": "Send Email",
      "config": {
        "to": "hiring@company.com",
        "subject": "Resume Score: {{ $json.score }}/100",
        "body": "{{ $json.feedback }}"
      }
    }
  ]
}
```

**Best for:** Connecting multiple apps + complex logic

---

### 3. Zapier
```
Form submission → Agent → Slack notification
```

**Step-by-step:**
1. Create Zapier workflow
2. Trigger: Form submission / email / webhook
3. Action 1: Call OpenAI API
   - Prompt: [Agent prompt]
   - Text: [Form data]
4. Action 2: Send Slack message with result
5. Test and activate

**Best for:** Non-technical users, quick setups

---

### 4. Direct API (Python/Node.js)

**Python Example:**
```python
import anthropic

# Initialize client
client = anthropic.Anthropic(api_key="your-api-key")

# Your system prompt (from agent file)
system_prompt = """You are a sales intelligence specialist...
[Full prompt from lead-research.md]"""

# Your data to process
user_input = """
Company: TechFlow Inc
Prospect: Sarah Chen, VP Engineering
"""

# Run agent
response = client.messages.create(
    model="claude-3-opus-20240229",
    max_tokens=2000,
    system=system_prompt,
    messages=[
        {"role": "user", "content": user_input}
    ]
)

# Parse and use result
result = response.content[0].text
print(result)
```

**Node.js Example:**
```javascript
const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const systemPrompt = `You are a sales intelligence specialist...
[Full prompt from lead-research.md]`;

const userData = `
Company: TechFlow Inc
Prospect: Sarah Chen, VP Engineering
`;

async function runAgent() {
  const message = await openai.chat.completions.create({
    model: "gpt-4",
    max_tokens: 2000,
    system: systemPrompt,
    messages: [{ role: "user", content: userData }]
  });

  return message.choices[0].message.content;
}

runAgent().then(result => console.log(result));
```

**Best for:** Custom integrations, full control

---

## CRM Integrations

### Salesforce Integration

**Scenario:** Auto-analyze new leads

```
New Salesforce Lead Created
         ↓
[Flow Apex]
         ↓
Call external API (your agent service)
with lead data
         ↓
[Parse response]
         ↓
Update Lead fields:
├─ Analysis summary
├─ Fit score
└─ Recommendations
         ↓
Alert sales rep
```

**Salesforce Flow Setup:**
1. Create new flow (triggered on lead creation)
2. Add "Call External API" action
3. Endpoint: Your agent service URL
4. Body: Lead data (company, name, etc)
5. Parse response as JSON
6. Use "Update Records" to update lead
7. Save and activate

**Python backend (Flask example):**
```python
from flask import Flask, request
from anthropic import Anthropic

app = Flask(__name__)
client = Anthropic()

SYSTEM_PROMPT = """
[Lead Researcher prompt from lead-research.md]
"""

@app.route('/analyze-lead', methods=['POST'])
def analyze_lead():
    data = request.json
    
    user_message = f"""
    Company: {data['company']}
    Prospect: {data['name']}, {data['title']}
    """
    
    response = client.messages.create(
        model="claude-3-opus-20240229",
        max_tokens=1500,
        system=SYSTEM_PROMPT,
        messages=[{"role": "user", "content": user_message}]
    )
    
    return {
        "analysis": response.content[0].text,
        "success": True
    }

if __name__ == '__main__':
    app.run(port=5000)
```

### HubSpot Integration

**Scenario:** Auto-generate personalized outreach

```
Contact added to HubSpot
         ↓
[Workflow trigger]
         ↓
Contact Lead Researcher agent
         ↓
Get back: Fit score + angle
         ↓
Contact Outreach Writer agent
         ↓
Get back: Personalized email
         ↓
Create task: "Send email from Lead Outreach Writer"
         ↓
Sales rep clicks to send
```

**Setup:**
1. HubSpot → Workflows → Create workflow
2. Trigger: New contact added
3. Action: Call webhook to your agent service
4. Webhook receives: contact data
5. Agent analyzes + returns fit score
6. Action: Update HubSpot contact properties
7. Action: Create task with email to send

---

## Email Integration

### Gmail Integration

**Scenario:** Auto-respond to inquiries

```
Email received (info@company.com)
         ↓
[Gmail filter trigger]
         ↓
Forward to webhook
         ↓
Email Parser extracts info
         ↓
Agent processes (insights/compliance check)
         ↓
Draft response email
         ↓
Sales rep reviews + sends
```

**Implementation:**
1. Google Apps Script
2. Trigger: onReceive
3. Check if email matches pattern
4. Parse email body
5. Call agent API with question
6. Create draft reply with agent response
7. Send for human approval

### Outlook Integration

Similar to Gmail but using Microsoft Graph API

---

## Slack Integration

**Scenario:** Daily insights to team**

```
Database
   ↓
Scheduled trigger (9 AM daily)
   ↓
Data Quality Checker Agent
   ↓
Insight Generator Agent
   ↓
Report Builder
   ↓
Format for Slack
   ↓
Post to #analytics channel
```

**Slack Bot Code:**
```python
from slack_sdk import WebClient
import anthropic

slack = WebClient(token="xoxb-your-token")
claude = anthropic.Anthropic()

def post_daily_insights():
    # Get latest data
    data = fetch_latest_sales_data()
    
    # Run agents
    prompt = "Daily insights from sales data"
    insights = claude.messages.create(
        model="claude-3-opus-20240229",
        max_tokens=1500,
        system="[Insight Generator prompt]",
        messages=[{"role": "user", "content": str(data)}]
    ).content[0].text
    
    # Format for Slack
    message = f":chart_with_upwards_trend: Daily Sales Insights\n\n{insights}"
    
    # Post to Slack
    slack.chat_postMessage(
        channel="#analytics",
        text=message
    )

# Schedule this to run every day at 9 AM
# (using APScheduler or similar)
```

---

## Google Sheets Integration

**Scenario:** Process spreadsheet data**

```
Google Sheet with leads
   ↓
[onEdit trigger]
   ↓
New row added
   ↓
Apps Script reads row
   ↓
Call agent API
   ↓
Write results back to sheet
```

**Google Apps Script:**
```javascript
function onEdit(e) {
  const sheet = e.source.getActiveSheet();
  const range = e.range;
  
  // If editing column A (company name)
  if (range.getColumn() == 1) {
    const company = range.getValue();
    
    // Call agent
    const result = UrlFetchApp.fetch(
      'https://your-agent-api/research',
      {
        method: 'post',
        payload: JSON.stringify({company: company}),
        headers: {Authorization: 'Bearer YOUR_KEY'}
      }
    );
    
    const analysis = JSON.parse(result.getContentText());
    
    // Write back fit score
    sheet.getRange(range.getRow(), 3).setValue(analysis.fit_score);
  }
}
```

---

## Database Integration

**Scenario:** Auto-analyze customer data**

```
PostgreSQL database
   ↓
[Scheduled job runs hourly]
   ↓
Query new/updated records
   ↓
Send to agents for analysis
   ↓
Write results back to DB
   ↓
Dashboard displays insights
```

**Python with SQLAlchemy:**
```python
from sqlalchemy import create_engine, select
from apscheduler.schedulers.background import BackgroundScheduler
import anthropic

engine = create_engine("postgresql://user:pass@host/db")
claude = anthropic.Anthropic()

def analyze_customers():
    with engine.connect() as conn:
        # Get unanalyzed customers
        result = conn.execute(select(Customer).where(
            Customer.analysis_status == 'pending'
        ))
        
        for customer in result:
            # Run insight generator
            response = claude.messages.create(
                model="claude-3-opus-20240229",
                max_tokens=1000,
                system="[Insight Generator prompt]",
                messages=[{
                    "role": "user", 
                    "content": f"Customer data: {customer.data}"
                }]
            )
            
            # Store insights
            customer.insights = response.content[0].text
            customer.analysis_status = 'complete'
        
        conn.commit()

# Schedule to run every hour
scheduler = BackgroundScheduler()
scheduler.add_job(analyze_customers, 'interval', hours=1)
scheduler.start()
```

---

## API Gateway Setup

**Build your own agent service:**

```python
from flask import Flask, request, jsonify
import anthropic

app = Flask(__name__)
claude = anthropic.Anthropic()

# Define agents as endpoints
agents = {
    "lead-researcher": {
        "prompt": "[Lead Researcher prompt]",
        "model": "claude-3-opus-20240229"
    },
    "insight-generator": {
        "prompt": "[Insight Generator prompt]",
        "model": "claude-3-opus-20240229"
    }
}

@app.route('/agents/<agent_name>', methods=['POST'])
def run_agent(agent_name):
    if agent_name not in agents:
        return jsonify({"error": "Agent not found"}), 404
    
    data = request.json
    agent_config = agents[agent_name]
    
    try:
        response = claude.messages.create(
            model=agent_config["model"],
            max_tokens=2000,
            system=agent_config["prompt"],
            messages=[{"role": "user", "content": str(data)}]
        )
        
        return jsonify({
            "agent": agent_name,
            "response": response.content[0].text,
            "success": True
        })
    
    except Exception as e:
        return jsonify({
            "error": str(e),
            "success": False
        }), 500

# Usage:
# POST /agents/lead-researcher
# Body: {"company": "TechFlow", "prospect": "Sarah Chen"}
```

---

## Monitoring & Logging

**Track agent usage & performance:**

```python
import logging
from datetime import datetime

logging.basicConfig(
    filename='agents.log',
    level=logging.INFO
)

def run_agent_with_logging(agent_name, input_data):
    start_time = datetime.now()
    
    try:
        response = claude.messages.create(
            model="claude-3-opus-20240229",
            max_tokens=2000,
            system=agents[agent_name]["prompt"],
            messages=[{"role": "user", "content": str(input_data)}]
        )
        
        elapsed = (datetime.now() - start_time).total_seconds()
        
        logging.info(
            f"Agent:{agent_name} | "
            f"Status:success | "
            f"Time:{elapsed}s | "
            f"Tokens:{response.usage.input_tokens}"
        )
        
        return response.content[0].text
    
    except Exception as e:
        logging.error(
            f"Agent:{agent_name} | "
            f"Status:error | "
            f"Error:{str(e)}"
        )
        raise

# Dashboard shows:
# - Success rate by agent
# - Average execution time
# - Token usage (cost)
# - Error patterns
```

---

## Deployment Checklist

- [ ] Agent prompt copied correctly
- [ ] Input/output format specified
- [ ] API key configured (OPENAI_KEY / ANTHROPIC_KEY)
- [ ] Data source connected (CRM / file / API)
- [ ] Output destination ready (email / Slack / CRM)
- [ ] Error handling implemented
- [ ] Logging enabled
- [ ] Monitoring dashboard set up
- [ ] Test with sample data
- [ ] Production deploy
- [ ] Team trained on usage
- [ ] Success metrics tracked

---

## Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Agent times out | Increase timeout limit or batch smaller datasets |
| High token usage | Optimize prompt, use smaller model |
| Inconsistent output | Add clearer formatting instructions to prompt |
| API rate limits | Implement queue/throttling |
| Data not flowing | Check API key, network, payload format |

---

## Next Steps

1. **Pick an integration method** (SquadOfAgents / N8N / Custom)
2. **Follow setup guide** for your method
3. **Test with sample data**
4. **Monitor performance**
5. **Iterate & optimize**
