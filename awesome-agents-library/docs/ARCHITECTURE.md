# Architecture Guide

How the agents are designed and how they work together.

---

## Design Philosophy

Each agent follows a **single responsibility principle**:

- **Resume Screener** → Evaluates candidates
- **Interview Scheduler** → Coordinates calendars
- **Lead Researcher** → Gathers intelligence
- **Outreach Writer** → Creates messages

Agents are **composable** - they work independently OR together in workflows.

---

## Agent Anatomy

Every agent has:

### 1. **System Instructions** (200-400 lines)
- Role definition: "You are a..."
- Detailed methodology
- Framework for thinking
- Output specifications
- Rules & constraints

### 2. **Input Specification**
What data the agent needs to operate:
```
Resume Screener:
├─ Input: Resume text + Job description
├─ Format: String (unstructured or bullet points)
└─ Size: 0.5-2 pages

Lead Researcher:
├─ Input: Company name + Target person
├─ Format: Company name + brief description
└─ Size: 1-3 sentences
```

### 3. **Output Specification**
What the agent will produce:
```
Resume Screener:
├─ Score: 0-100 number
├─ Justification: 2-3 paragraphs
├─ Red flags: Bulleted list
└─ Recommendation: PASS/REVIEW/REJECT

Lead Researcher:
├─ Company profile
├─ Decision maker(s)
├─ Buying signals
├─ Fit score (A/B/C/D)
└─ Outreach recommendation
```

### 4. **Quality Standards**
How to validate output:
```
Resume Screener quality check:
✓ Score is 0-100 number
✓ Justification references both resume AND JD
✓ Red flags are specific, not generic
✓ Matches human-expert scoring 90%+ of time

Lead Researcher quality check:
✓ 3+ decision makers identified
✓ Buying signals have dates/sources
✓ Fit score justified with reasoning
✓ Decision makers have verified contact info
```

---

## Data Flow Architecture

### Single Agent Workflow
```
Input Data → [Agent] → Output
```

Example - Simple blog post:
```
Topic request → Blog Post Writer → Published post
```

### Sequential Workflow
```
Input → [Agent A] → [Agent B] → [Agent C] → Output
```

Example - Hiring pipeline:
```
Resume          Resume         Interview      Offer Letter
application  →  Screener   →   Scheduler   →  Generator  → Email offer
```

Each agent's output becomes next agent's input.

### Parallel Workflow
```
Input → [Agent A] ↘
        [Agent B] → Combine → Output
        [Agent C] ↗
```

Example - Content creation:
```
Blog topic          Blog Writer      ↘
            →       Email Writer  →  Marketing dashboard
                    Social Creator ↗
                    
All agents process simultaneously,
results combined in dashboard
```

### Branching Workflow
```
Input → [Decision Agent] → Condition Check → Route to different agents
```

Example - Sales pipeline:
```
Prospect → Lead Researcher → Fit Score check
           ├─ If A or B: → Outreach Writer
           ├─ If C: → Add to nurture list
           └─ If D: → Archive
```

---

## Integration Points

### 1. **Data Sources** (Input)
Where agents get data:

```
┌──────────────┐       ┌─────────────────┐
│ CRM Systems  │       │  Email/Chat     │
│ (Sales)      │       │  (Direct input) │
├──────────────┤       ├─────────────────┤
│ • Salesforce │       │ • Gmail         │
│ • HubSpot    │       │ • Outlook       │
│ • Pipedrive  │       │ • Slack         │
│ • Zoho       │       │ • Teams         │
└──────────────┘       └─────────────────┘
        ↓  ↓              ↓  ↓  ↓  ↓
        └──────→ [AGENTS] ←─────┘
        
┌──────────────┐       ┌─────────────────┐
│ Spreadsheets │       │  APIs/Webhooks  │
├──────────────┤       ├─────────────────┤
│ • Google     │       │ • REST APIs     │
│ • Excel      │       │ • GraphQL       │
│ • Airtable   │       │ • Webhooks      │
│ • Smartsheet │       │ • Database      │
└──────────────┘       └─────────────────┘
```

### 2. **Execution Engines** (Runners)
Platforms that execute agents:

```
┌──────────────────┐  ┌────────────────┐  ┌─────────────┐
│ SquadOfAgents    │  │ Orchestration  │  │ LLM APIs    │
├──────────────────┤  ├────────────────┤  ├─────────────┤
│ Native support   │  │ • N8N          │  │ • Claude    │
│ Purpose-built    │  │ • Make         │  │   API       │
│ Recommended!     │  │ • Zapier       │  │ • OpenAI    │
└──────────────────┘  │ • Hugging Face │  │   API       │
                      │ • Custom code  │  │ • Gemini    │
                      └────────────────┘  └─────────────┘
```

### 3. **Destinations** (Output)
Where agent results go:

```
┌──────────────┐      ┌──────────────┐      ┌──────────────┐
│ CRM/Systems  │      │ Chat/Email   │      │ Files/DB     │
├──────────────┤      ├──────────────┤      ├──────────────┤
│ • Salesforce │      │ • Slack      │      │ • Google     │
│ • HubSpot    │      │ • Gmail      │      │   Drive      │
│ • Airtable   │      │ • Teams      │      │ • Airtable   │
│ • Shopify    │      │ • Discord    │      │ • Database   │
└──────────────┘      └──────────────┘      └──────────────┘
              ↑              ↑                    ↑
              └──────────────────────────────────┘
```

---

## Multi-Agent Coordination

### Example: Complete Sales Workflow

```
NEW ACCOUNT ADDED TO SALESFORCE
         ↓
    [API Trigger]
         ↓
   Lead Researcher
   ├─ Research company
   ├─ Find 3 decision makers  
   ├─ ID buying signals
   └─ Generate fit score (A/B/C/D)
         ↓
   [Decision: Fit ≥ B?]
       ✓ YES          ✗ NO
         ↓               ↓
   Outreach Writer    Archive
   ├─ Read brief
   ├─ Person type
   ├─ Pain point
   └─ Generate email
         ↓
   [Manual review & approval]
         ↓
   Send email (Gmail/Outlook)
         ↓
   Follow-Up Reminder
   ├─ Create reminder (3 days)
   ├─ Monitor email open/click
   └─ Auto-schedule follow-up
         ↓
   [If opened = engaged]
         ↓
   Pipeline Analyzer
   ├─ Add to pipeline
   ├─ Update forecast
   └─ Alert manager
```

### Example: Weekly Data Intelligence

```
EVERY MONDAY 9 AM
         ↓
   [Scheduler Trigger]
         ↓
   Data Quality Checker
   ├─ Run quality audit
   ├─ Generate score
   └─ Flag critical issues
         ↓
   [If score < 80]
       ✓ ALERT    ✗ PROCEED
         ↓          ↓
      Slack    Insight Generator
      Alert    ├─ Analyze patterns
             ├─ Find anomalies
             ├─ Identify trends
             └─ Priority rank
                    ↓
             Report Builder
             ├─ Create exec report
             ├─ Add data/charts
             └─ Format HTML
                    ↓
             Email to leadership
```

### Example: Hiring Pipeline

```
JOB OPENING CREATED
         ↓
    [Set up workflow]
         ↓
   Resume Application Received
         ↓
   Resume Screener
   ├─ Score 0-100
   ├─ Flag red flags
   └─ Generate Q&A
         ↓
   [Score > 70?]
       ✓ PASS         ✗ REJECT
         ↓               ↓
   Interview        Auto-reject
   Scheduler        email sent
   ├─ Check calendars
   ├─ Find 3 times
   ├─ Send options
   └─ Confirm both
         ↓
   [Interview completed]
         ↓
   Offer Generator
   ├─ Create letter
   ├─ Legal review
   └─ Send for approval
         ↓
   [Approved]
         ↓
   Onboarding
   Coordinator
   ├─ Build 90-day plan
   ├─ Assign mentor
   └─ Schedule milestones
         ↓
   NEW HIRE READY DAY 1
```

---

## Agent Dependencies & Handoff

### Dependency Matrix

|  | Screener | Scheduler | Letter | Onboard |
|---|---|---|---|---|
| **Screener** | Self | Depends | Depends | Depends |
| **Scheduler** | Requires | Self | Depends | Depends |
| **Letter** | Requires | Requires | Self | Depends |
| **Onboard** | Optional | Requires | Requires | Self |

**Definition:**
- **Requires:** Must run first
- **Depends:** Needs output from other agent
- **Optional:** Improves but not required

### Data Handoff Checklist

When one agent hands off to next:

```
Resume Screener → Interview Scheduler

Handoff checklist:
✓ Candidate name  
✓ Score/approval
✓ Interview questions
✓ Suggested dates
✓ Manager contact info

Interview Scheduler → Offer Letter Generator

Handoff checklist:
✓ Candidate name
✓ Role title
✓ Target salary
✓ Start date
✓ Manager approval
```

---

## Error Handling & Validation

### Quality Gates Between Agents

```
Agent A Output
      ↓
   [Validation]
      ├─ Format valid? (is it JSON/markdown/structured?)
      ├─ Required fields present?
      ├─ Data types correct?
      └─ Within acceptable ranges?
      ↓
  ✓ PASS          ✗ FAIL
    ↓               ↓
  Agent B ←─── Retry Agent A
            (with clearer instruction)
```

### Fallback Strategies

```
Agent → Check result quality
        ├─ If excellent (90%+ confident) → Proceed to next agent
        ├─ If good (70-90% confident) → Add human review gate
        └─ If poor (<70% confident) → Retry with refined prompt
```

---

## Scalability Patterns

### Pattern 1: Batch Processing
```
100 resumes in spreadsheet
        ↓
   [Batch trigger]
        ↓
Resume Screener
├─ Resume 1
├─ Resume 2
├─ ...
└─ Resume 100
        ↓
Results spreadsheet (100 scored resumes)
```

### Pattern 2: Event-Driven
```
INDIVIDUAL action triggers
        ↓
   Form fill → Agent runs
   Email received → Agent runs
   API call → Agent runs
        ↓
Immediate response
```

### Pattern 3: Scheduled Processing
```
Every Monday 9 AM
        ↓
   [Scheduler trigger]
        ↓
Run agents on all data
        ↓
Generate reports
        ↓
Send to stakeholders
```

---

## Performance Considerations

### Execution Time by Agent

| Agent | Avg Time | Min | Max |
|-------|----------|-----|-----|
| Resume Screener | 45 sec | 20 sec | 2 min |
| Interview Scheduler | 1-2 min | 30 sec | 5 min |
| Offer Letter Generator | 30 sec | 15 sec | 1 min |
| Lead Researcher | 2-3 min | 1 min | 5 min |
| Blog Post Writer | 3-5 min | 2 min | 10 min |
| Insight Generator | 2-3 min | 1 min | 5 min |

### Cost Optimization

**Option 1: Batch processing (cheaper)**
```
100 resumes as batch → 1 agent call → $2
vs
100 resumes individually → 100 calls → $20
SAVES: 90% of cost, 10x slower
```

**Option 2: Async processing (faster)**
```
User submits → Acknowledge immediately
Email me results in 5 min → Better experience
```

**Option 3: Caching (smart)**
```
If you've already researched "Google"
→ Skip research, use cached result
SAVES: Time + cost
```

---

## Monitoring & Observability

### What to Track

```
For each agent run:
├─ Input data 
├─ Execution time
├─ Tokens used (cost)
├─ Output quality/validation
├─ Success/failure
├─ Error messages
└─ Timestamp

Dashboard shows:
├─ Agent health (% success rate)
├─ Performance (avg time)
├─ Cost (total tokens/month)
├─ Quality trends (improving?)
└─ Error patterns (what's failing?)
```

### Sample Metrics

```
Resume Screener:
├─ Success rate: 98.5%
├─ Avg time: 42 seconds
├─ Cost/resume: $0.045
├─ Accuracy: 92% match with humans
└─ Top error: OCR failures on scanned PDFs

Lead Researcher:
├─ Success rate: 94%
├─ Avg time: 2m 15s
├─ Cost/prospect: $0.065
├─ Accuracy: 85% contact info accuracy
└─ Top error: LinkedIn not accessible
```

---

## Design Principles

1. **Clear Input/Output** - Know what each agent accepts & produces
2. **Single Responsibility** - One agent does one thing well
3. **Composable** - Agents work alone or in workflows
4. **Validatable** - Can check if output is good
5. **Atomic** - Each agent run is independent
6. **Idempotent** - Running twice produces same result
7. **Documented** - Every agent is self-documenting
8. **Customizable** - Prompts are starting points

---

## Next Steps

- **Run an agent** on real data and measure
- **Chain 2-3 agents** together in a workflow  
- **Monitor results** and refine
- **Share workflows** with team
- **Iterate** based on feedback
