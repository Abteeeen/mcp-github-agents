# Getting Started with Awesome Agents Library

Complete step-by-step guide to deploying your first agent.

## 5-Minute Quick Start

### 1. Choose Your Agent
Pick the problem you want to solve:
- **Need to hire faster?** → Resume Screener
- **Want better data insights?** → Insight Generator  
- **Need content?** → Blog Post Writer
- **Trying to close deals?** → Lead Researcher

### 2. Copy the Prompt
Open the agent's `.md` file and copy the "System Prompt" section (everything in the code block starting with "You are...")

### 3. Paste in Your Tool
- **SquadOfAgents:** Create new agent → Paste prompt → Save
- **ChatGPT:** New chat → Paste prompt in first message
- **Claude:** New chat → Paste prompt in first message
- **N8N:** Add LLM node → Paste prompt in system message

### 4. Add Your Data
Provide the input the agent needs:
```
[Agent Prompt]

Now process this: [Your Data/Request]
```

### 5. Review Output
Check the results, refine the prompt if needed

---

## Platform-Specific Setup

### SquadOfAgents Setup

**Best experience for most agents.**

1. **Login** to SquadOfAgents dashboard
2. **Create new agent**
3. **Copy system prompt**
   - Open agent file (e.g., `resume-screener.md`)
   - Copy everything in the "System Prompt" code block
4. **Paste into "System Instructions"** field
5. **Add data source**
   - Connect to your CRM, spreadsheet, or paste data directly
6. **Configure output**
   - Send results to Slack, Email, CRM, or view in dashboard
7. **Test** with sample data
8. **Deploy** to production

---

### N8N Workflow Setup

**Best for connecting multiple agents together.**

1. **Create new workflow** in N8N
2. **Add HTTP trigger**
   - Incoming data source (webhook, email, etc)
3. **Add OpenAI/Anthropic node**
   - Model: Claude 3 Opus or GPT-4
   - System prompt: [Paste agent prompt here]
   - User message: `{{ $json.data }}`
4. **Add output nodes**
   - Send to email, Slack, CRM, database, etc
5. **Test** with sample data
6. **Activate** workflow

**Example workflow:**
```
New Salesforce Lead
   ↓ [HTTP Trigger]
Lead Researcher Agent
   ↓ [Claude 3 LLM Node]
Format Output
   ↓ [Code Node]
Send Email to Sales Rep
   ↓ [Gmail Node]
```

---

### ChatGPT / Claude Web Setup

**Quick testing without infrastructure.**

1. Open ChatGPT or Claude
2. Start new chat
3. Paste entire system prompt as first message
4. Add your data as second message
5. Review results

---

### Python / Node.js Setup

**For custom integrations.**

#### Python (using Anthropic):
```python
import anthropic
import os

client = anthropic.Anthropic(api_key=os.environ.get("ANTHROPIC_API_KEY"))

# Read agent prompt from file
with open('lead-research.md', 'r') as f:
    content = f.read()
    # Extract system prompt (between ```text and ``` markers)
    start = content.find('You are a')
    end = content.find('```', start)
    system_prompt = content[start:end].strip()

# Your data to process
user_data = """
Company: TechFlow Inc
Prospect: Sarah Chen, VP Engineering
"""

message = client.messages.create(
    model="claude-3-opus-20240229",
    max_tokens=1024,
    system=system_prompt,
    messages=[
        {"role": "user", "content": user_data}
    ]
)

print(message.content[0].text)
```

#### Node.js (using OpenAI):
```javascript
const OpenAI = require('openai');
const fs = require('fs');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Read agent prompt
const agentContent = fs.readFileSync('./lead-research.md', 'utf8');
const systemPrompt = agentContent.substring(
  agentContent.indexOf('You are a'),
  agentContent.lastIndexOf('```')
);

const userData = `
Company: TechFlow Inc
Prospect: Sarah Chen, VP Engineering
`;

async function runAgent() {
  const message = await openai.chat.completions.create({
    model: "gpt-4",
    max_tokens: 1024,
    system: systemPrompt,
    messages: [
      {role: "user", content: userData}
    ],
  });

  console.log(message.choices[0].message.content);
}

runAgent();
```

---

## Connecting Multiple Agents

Agents work together in workflows:

### Hiring Pipeline
```
↓ New job opening
Resume Screener
   (scores resumes)
↓
Interview Scheduler
   (coordinates times)
↓
Offer Letter Generator
   (creates offer)
↓
Onboarding Coordinator
   (90-day plan)
↓
New hire productive in month 1!
```

### Data Intelligence Pipeline
```
↓ Weekly data refresh
Data Quality Checker
   (audit + alerts)
↓
Insight Generator
   (find patterns)
↓
Report Builder
   (create reports)
↓
Email dashboard to exec team
```

### Sales Execution Pipeline
```
↓ Target accounts
Lead Researcher
   (gather intelligence)
↓
Outreach Email Writer
   (personalized emails)
↓
Send via Gmail
↓
Follow-Up Reminder
   (track + escalate)
↓
Pipeline Analyzer
   (forecast accuracy)
```

---

## Configuration Examples

### Example 1: Resume Screening Automation

**Trigger:** New job application submitted  
**Agent:** Resume Screener  
**Output:** Scored applicant brief → Hiring manager email

#### N8N Setup:
```
1. Webhook trigger (form submission)
2. Extract resume file
3. Claude node with resume-screener.md prompt
4. Filter: Only pass score >70
5. Email to hiring manager
```

#### SquadOfAgents Setup:
```
1. Connect to job application form
2. Add Resume Screener agent
3. Output to email + Airtable
```

---

### Example 2: Daily Insight Generation

**Trigger:** Daily at 9 AM  
**Agent:** Insight Generator  
**Input:** Sales data from Salesforce  
**Output:** Slack message to leadership

#### N8N Setup:
```
1. Schedule trigger (daily 9 AM)
2. Salesforce query (get sales data)
3. Claude node with insight-generator.md prompt
4. Format as Slack message
5. Send to #leadership channel
```

---

### Example 3: Email Campaign Creation

**Trigger:** Marketing requests new campaign  
**Agent 1:** Email Campaign Writer  
**Agent 2:** SEO Optimizer  
**Output:** Ready-to-send emails + optimization notes

#### SquadOfAgents Setup:
```
1. Form input: Campaign topic, audience
2. Email Campaign Writer → Creates 5 emails
3. SEO Optimizer → Optimizes subject lines
4. Output to marketing team with tracking setup
```

---

## Testing Your Agent

Before deploying:

### 1. Functional Test
- Input sample data
- Check output quality
- Look for accuracy/completeness

### 2. Edge Case Test
- Empty/incomplete data
- Large volumes
- Unusual inputs

### 3. Integration Test
- Connect to real data source
- Verify output formatting
- Check destination system

### 4. Performance Test
- Track execution time
- Monitor token usage (costs)
- Verify rate limits

---

## Customizing an Agent

Every agent can be customized:

### Change the Tone
```
Original: "Professional, data-driven analysis"
Modified: "Witty, conversational tone for social media"
```

### Add Constraints
```
Original: [full prompt]
Add: "Keep responses under 100 words"
     "Use metric system, not imperial"
     "Avoid jargon, explain like I'm 8 years old"
```

### Add Your Company Context
```
Original: "analyze prospect"
Add at end: "Add how this compares to our existing 
customers in the automotive industry (our focus market)"
```

### Change Output Format
```
Original: "Return as paragraph"
Change to: "Return as JSON with fields: name, signal, pain"
```

---

## Troubleshooting

### Agent not working?

**Issue:** Output is generic, not personalized  
**Fix:** Make sure data included specific details

**Issue:** Too long/too short  
**Fix:** Add to prompt: "Keep output under 200 words"

**Issue:** Hallucinating (making things up)  
**Fix:** Make system prompt constraints tighter

**Issue:** Wrong format  
**Fix:** Add "output as JSON" or "as markdown table" to prompt

---

## Cost Estimation

| Agent | Tokens per run | Cost (Claude 3) | Cost (GPT-4) |
|-------|---|---|---|
| Resume Screener | 1,500-2,000 | $0.02-0.03 | $0.05-0.07 |
| Insight Generator | 2,000-3,000 | $0.03-0.04 | $0.07-0.10 |
| Report Builder | 3,000-4,000 | $0.04-0.05 | $0.10-0.15 |
| Lead Researcher | 1,500-2,000 | $0.02-0.03 | $0.05-0.07 |

**Cost example:** 100 resumes/week = ~$2-3/week = ~$100-150/year

---

## Best Practices

✅ **Start simple** - Test one agent first  
✅ **Use templates** - Don't rewrite, customize existing  
✅ **Monitor costs** - Track token usage if using paid APIs  
✅ **Iterate** - Refine prompts based on results  
✅ **Document changes** - Keep notes on customizations  
✅ **Batch processing** - Process multiple items together when possible  
✅ **Validate output** - Have human review initially  

---

## Next Steps

1. **Pick an agent** that solves your immediate problem
2. **Set it up** on your chosen platform
3. **Test** with sample data
4. **Deploy** to production
5. **Measure results** and iterate
6. **Share success** with team

---

## Need Help?

- **Questions about specific agent?** Read its detailed `.md` file
- **Want workflow ideas?** Check `examples/` folder
- **Need integration help?** See `INTEGRATION-GUIDE.md`
- **Want to learn how agents work?** Read `ARCHITECTURE.md`
