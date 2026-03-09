# Example Workflows

Real-world agent workflows and implementation examples.

---

## 1. Complete Hiring Pipeline Workflow

### Use Case
HR team needs to screen 50 resumes and hire within 2 weeks.

### Workflow

```
Job posting opens
       ↓
50 resumes received
       ↓
Resume Screener Agent
├─ Score each resume 0-100
├─ Flag skill gaps
├─ Generate interview questions
└─ Output: 15 candidates with score > 70
       ↓
Interview Scheduler Agent
├─ Check hiring manager calendar
├─ Find 3 time slots per candidate
├─ Send calendar options
└─ Get confirmations
       ↓
Interviews conducted
       ↓
[Manager approves finalist]
       ↓
Offer Letter Generator
├─ Create professional offer
├─ Add customized terms
└─ Send for legal review
       ↓
[Legal approves]
       ↓
Offer sent to candidate
       ↓
Onboarding Coordinator
├─ Build 90-day plan
├─ Assign mentor
├─ Schedule milestones
└─ Prepare day 1
       ↓
Hire starts → Productive in month 1!
```

### Time Savings
- **Resume screening:** 4 hours → 45 min (5x faster)
- **Interview scheduling:** 2-3 days → 2-3 hours (10x faster)
- **Offer creation:** 1 hour → 5 min (12x faster)
- **Onboarding planning:** 8 hours → 1 hour (8x faster)

**Total:** 5-6 day hiring cycle reduced to 2-3 days

### Implementation (N8N)

```json
{
  "workflow": "hiring-pipeline",
  "triggers": [
    {
      "type": "webhook",
      "event": "resume_uploaded"
    }
  ],
  "nodes": [
    {
      "name": "Resume Screener",
      "type": "openai_chat",
      "system": "[Resume Screener prompt]",
      "message": "{{ $json.resume_text }}"
    },
    {
      "name": "Score Filter",
      "type": "if",
      "condition": "score > 70"
    },
    {
      "name": "Interview Scheduler",
      "type": "openai_chat",
      "system": "[Interview Scheduler prompt]",
      "message": "{{ resume_screener_output }}"
    },
    {
      "name": "Send Calendar Options",
      "type": "gmail",
      "to": "{{ $json.candidate_email }}"
    }
  ]
}
```

---

## 2. Daily Sales Intelligence Workflow

### Use Case
Sales team wants daily pipeline health report.

### Workflow

```
Every morning 9 AM
       ↓
[Scheduler trigger]
       ↓
Pull data from:
├─ Salesforce (pipeline)
├─ Gmail (recent communications)
└─ Calendar (upcoming calls)
       ↓
Pipeline Analyzer Agent
├─ Calculate conversion rates
├─ Identify stalled deals
├─ Forecast month-end
└─ Flag at-risk opportunities
       ↓
Lead Researcher Agent (for at-risk deals)
├─ Re-research competition
├─ Identify new angles
└─ Generate recovery strategy
       ↓
Report Builder
├─ Create executive summary
├─ Highlight top 5 actions today
└─ Format for Slack
       ↓
Post to #sales-daily channel
       ↓
Sales reps review → Take action
```

### Output Example
```
📊 PIPELINE FORECAST - MARCH 15
========================================

🎯 MONTH-END FORECAST: $580K (89% of $650K quota)
├─ Committed: $400K ✅
├─ High probability: $180K
└─ ⚠️ At risk: -$100K losses expected

🚨 TODAY'S PRIORITIES (3 actions):
1. 🔴 TechFlow lead - 18 days in proposal
   │  Action: Sarah Chen call today to unblock legal review
   │
2. 🟡 Global Corp - Budget waiting on CFO approval  
   │  Action: Check status, may slip to April
   │
3. 🟢 Acme Corp - Closing this week
   │  Action: Confirm close, prepare docs

🏆 TOP PERFORMER: Mike (42% win rate, 120% of quota)
   → Share secrets with team in Monday standup

📈 TEAM FORECAST: 105% of Q1 quota (on track!)
```

### Implementation (Python + Scheduled Job)

```python
from apscheduler.schedulers.background import BackgroundScheduler
from slack_sdk import WebClient
import anthropic
import salesforce

scheduler = BackgroundScheduler()
slack_client = WebClient(token="xoxb-...")
claude = anthropic.Anthropic()

def daily_sales_report():
    # Pull Salesforce data
    pipeline = salesforce.get_pipeline_data()
    
    # Run Pipeline Analyzer
    analysis = claude.messages.create(
        model="claude-3-opus-20240229",
        max_tokens=1500,
        system="[Pipeline Analyzer prompt]",
        messages=[{"role": "user", "content": str(pipeline)}]
    ).content[0].text
    
    # Post to Slack
    slack_client.chat_postMessage(
        channel="#sales-daily",
        text=f":chart_with_upwards_trend: Daily Pipeline Report\n\n{analysis}"
    )

# Run every weekday at 9 AM
scheduler.add_job(daily_sales_report, 'cron', 
                 day_of_week='mon-fri', hour=9, minute=0)
scheduler.start()
```

---

## 3. Content Marketing Machine

### Use Case
Marketing team needs 2 months of content (blog, social, email).

### Workflow

```
Content calendar request
│
├─ Topic 1: "5 Ways to Scale Hiring"
├─ Topic 2: "ATS Systems Compared"
└─ Topic 3: "Remote Team Management"
       ↓
PARALLEL AGENTS:
├─→ Blog Post Writer
│   ├─ 1,500-2,500 word article
│   ├─ SEO-optimized
│   └─ Ready to publish
│
├─→ Social Media Creator
│   ├─ 30-day calendar
│   ├─ 4 platforms (LinkedIn, Twitter, Insta, TikTok)
│   └─ Unique content per platform
│
└─→ Email Campaign Writer
    ├─ 5-email sequence
    ├─ High-converting copy
    └─ Ready to send
       ↓
SEO Optimizer
├─ Audits blog posts
├─ Optimizes for rankings
└─ Finds quick wins
       ↓
Marketing dashboard
├─ Blog post with sharing buttons
├─ Social calendar synced
└─ Email campaign ready to launch
```

### Output Example
```
📝 BLOG POST: "5 Ways to Scale Hiring"
Length: 2,100 words
SEO score: 92/100 (Excellent)
Estimated search traffic: 120-180 visits/month
Publish date: Monday 8 AM
CTAs: 2 (ebook download, demo signup)

📱 SOCIAL CALENDAR (30 days)
LinkedIn: 5 posts (professional, discussion focus)
Twitter: 15 posts (casual, engagement focus)
Instagram: 4 posts (behind-the-scenes)
TikTok: 6 posts (trend-based, entertainment)

✉️ EMAIL SEQUENCE
├─ Email 1: "The Hiring Crisis" (Mon 9 AM)
├─ Email 2: "Why It's Getting Worse" (Wed 9 AM)
├─ Email 3: "Here's The Solution" (Fri 9 AM)
├─ Email 4: "How Others Solved It" (Tue 9 AM)
└─ Email 5: "Try It Free" (Thu 9 AM)

Open rate forecast: 28-32% (vs 18% average)
Click rate forecast: 3-4% (vs 2% average)
```

### Implementation (SquadOfAgents)

```
1. Create workflow
2. Input: 3 topics for the week

3. Run in parallel:
   - Blog Post Writer agent
   - Social Media Creator agent  
   - Email Campaign Writer agent
   
4. Collect outputs

5. Run SEO Optimizer on blog

6. Export results to:
   - Google Drive (blog drafts)
   - Buffer (social calendar)
   - Mailchimp (email template)
```

---

## 4. Data-Driven Decision Making

### Use Case
Executive needs weekly business health snapshot.

### Workflow

```
EVERY FRIDAY 5 PM
       ↓
Trigger data refresh:
├─ Salesforce (revenue, pipeline)
├─ Spreadsheet (expenses, KPIs)
└─ Analytics (product metrics)
       ↓
Data Quality Checker
├─ Audit data completeness
├─ Check for anomalies
└─ Generate health score
       ↓
[Quality < 90?] → Alert data team
       ↓
Insight Generator
├─ Analyze all metrics
├─ Find patterns
├─ Identify risks
└─ Suggest opportunities
       ↓
Report Builder
├─ Create exec summary (1-2 pages)
├─ Add key visuals
├─ Highlight top 3 decisions
└─ Include risk assessment
       ↓
Email to CEO + leadership team
       ↓
Leadership makes decisions based on real data
```

### Sample Executive report
```
WEEKLY BUSINESS SUMMARY - MARCH 15
=====================================

📊 KEY METRICS (vs target)
├─ Revenue: $385K (102% of target) ✅
├─ Customers: 1,247 (+3% week/week) ✅
├─ Churn: 1.2% (below 2% target) ✅
└─ CAC: $850 (within $900 target) ✅

🚀 TOP OPPORTUNITIES (act this week):
1. Upsell: 187 customers fit premium tier
   Potential: $45K MRR
   Action: Launch campaign Monday

2. Reduce CAC: 12% of ads underperforming
   Savings: $8K/month
   Action: Pause low-performers, reallocate

3. Expand: Germany showing 3x growth vs other regions
   Potential: New market opportunity
   Action: Investigate localization effort

⚠️ RISKS TO MONITOR (address this month):
1. Enterprise deal ($250K) - Legal review is slow
   Impact: 64% of April forecast
   Action: Escalate, offer legal support

2. Churn spike in small-tier customers
   Trend: Up from 0.8% → 1.2% → 1.5%?
   Action: Investigate, early intervention

3. Lead quality declining
   Note: Cost down 15% but quality down 8%
   Action: Review ad targeting, rebalance

💡 RECOMMENDATION:
Launch upsell campaign immediately (2-week sprint).
This alone could hit April forecast.
```

---

## 5. Sales Prospecting Campaign

### Use Case
Sales team targeting 100 accounts this quarter.

### Workflow

```
[List of 100 target accounts provided]
       ↓
BATCH PROCESSING (daily batches of 10):
       ↓
Lead Researcher Agent
├─ Research each company
├─ Find 2-3 decision makers  
├─ Identify buying signals
├─ Grade fit (A/B/C/D)
└─ Output: Full brief per account
       ↓
[Filter: Grade A or B only] → 35 qualified accounts
       ↓
Outreach Email Writer Agent
├─ Generate personalized email
├─ Custom angle per prospect
├─ Include social proof
└─ A/B test variations (A vs B)
       ↓
Send emails (35 high-quality outreaches)
       ↓
Follow-Up Reminder Agent
├─ Monitor opens/clicks
├─ Auto-schedule follow-ups
├─ Escalate if still no response
└─ Track engagement
       ↓
Pipeline Analyzer Agent
├─ Update forecast with new leads
├─ Track conversion rates
└─ Optimize next batch
       ↓
RESULTS (after 4 weeks):
├─ Emails sent: 35
├─ Open rate: 42% (vs 3% generic)
├─ Response rate: 8% (vs 1% generic)
├─ Qualified leads: 3 (converts to deals)
├─ Pipeline added: $180K
└─ ROI: ~$45K cost per deal ($15K invested)
```

### Cost & Time Savings
```
WITHOUT agents:
├─ Research per account: 30 min
├─ Email personalization: 15 min
├─ Follow-ups: 10 min
└─ Total: 55 min × 100 = 92 hours

WITH agents:
├─ Research per account: 2 min (agent)
├─ Email per account: 1 min (agent)
├─ Follow-ups: 0 min (automated)
└─ Total: 3 min × 100 = 5 hours

SAVINGS: 87 hours!! That's 2+ weeks of pure sales time
```

---

## 6. Custom Agent Combination

### Use Case
Combined agent for quick lead qualification.

```python
# Define a sequence
async def qualify_lead(lead_data):
    # Step 1: Research the company
    research = await run_agent(
        "lead-researcher",
        lead_data
    )
    
    # Step 2: Based on research, generate email
    email = await run_agent(
        "outreach-writer",
        research + lead_data
    )
    
    # Step 3: Send and track
    await send_email(
        to=lead_data["email"],
        body=email,
        track_opens=True
    )
    
    # Step 4: Schedule follow-up
    await schedule_followup(
        lead_id=lead_data["id"],
        days=3
    )
    
    return {
        "research": research,
        "email_sent": email,
        "followup_scheduled": True
    }
```

---

## Quick Reference

| Goal | Agents to Use | Time Saved |
|------|---------------|-----------|
| Hire faster | Screener → Scheduler → Letter → Onboarding | 3-4 days |
| Better data | Quality → Insights → Reports | 20+ hours/week |
| More content | Blog → Social → Email → SEO | 40 hours/week |
| Close more deals | Lead Research → Email → Follow-up → Pipeline | 10+ hours/week |
| Better decisions | Quality → Insights → Reports (dashboard) | 5+ hours/week |

---

## Next Steps

1. **Pick a workflow** that solves your problem
2. **Follow the integration guide** for your platform
3. **Test with real data**
4. **Measure impact** (time saved, quality improved)
5. **Iterate** based on results
6. **Share with team** and scale
