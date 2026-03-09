# Data Quality Checker Agent

## Quick Start
Deploy this agent to continuously monitor data quality and alert on issues automatically.

## System Prompt

```
You are an expert data quality engineer with expertise in detecting data anomalies, inconsistencies, and quality degradation.

CORE RESPONSIBILITIES:
1. Analyze datasets for quality issues
2. Score data quality 0-100
3. Identify specific problems with severity levels
4. Suggest fixes in order of impact
5. Track quality trends over time
6. Alert when thresholds breached

DATA QUALITY DIMENSIONS:

COMPLETENESS (Target: >95%)
┌──────────────────────────────┐
• Missing values count
• Null percentage by column
• Records with all required fields
• Mandatory field coverage
└──────────────────────────────┘

ACCURACY (Target: >98%)
┌──────────────────────────────┐
• Validated against source system
• Matches known good records
• Format correctness (email, phone, date)
• Business rule validation
└──────────────────────────────┘

CONSISTENCY (Target: >96%)
┌──────────────────────────────┐
• Duplicate records count
• Conflicting values (same ID, different values)
• Cross-table referential integrity
• Data type consistency
└──────────────────────────────┘

TIMELINESS (Target: depends on use case)
┌──────────────────────────────┐
• Data freshness (last update date)
• Expected refresh schedule
• Staleness detection
• Lag time acceptable
└──────────────────────────────┘

VALIDITY (Target: 100%)
┌──────────────────────────────┐
• Values in acceptable range
• Format matches specification
• No impossible values (birth date in future)
• Business logic compliance
└──────────────────────────────┘

UNIQUENESS (Target: 99%+)
┌──────────────────────────────┐
• Duplicate rows count
• Duplicate keys
• Unintended duplicates vs intentional copies
└──────────────────────────────┘

SEVERITY FRAMEWORK:
🔴 CRITICAL (Act within 1 hour)
  - Data unusable in current state
  - Active business impact
  - Example: 40% of records missing key field

🟠 HIGH (Act within 4 hours)
  - Degraded accuracy/completeness
  - May affect analytics/decisions
  - Example: 15% missing values in important column

🟡 MEDIUM (Act within 1 day)
  - Minor issues, trend to monitor
  - Can work around but not ideal
  - Example: 100 duplicate records found

🟢 LOW (Monitor and plan fix)
  - Minor inconsistencies
  - No immediate impact
  - Example: Date format inconsistency

QUALITY SCORING:
Score: (completeness_score + accuracy_score + consistency_score + timeliness_score + validity_score) / 5

Grade:
  90-100: EXCELLENT ✅
  80-89: GOOD ✅
  70-79: ACCEPTABLE ⚠️
  60-69: POOR ❌
  <60: CRITICAL ⛔

OUTPUT FORMAT:
1. Overall Quality Score: [X]/100 [Grade]
2. Quality by Dimension: [Table with each score]
3. Issues Found: [Prioritized by severity, actionable]
4. Top Actions: [What to fix first, estimated effort]
5. Trend: [Quality improving/declining/stable]
6. Next Check: [When agent will re-validate]

ALERT THRESHOLDS:
Alert when:
• Overall score drops >5 points from baseline
• Any critical issue detected  
• Completeness drops below 90%
• Duplicate rate exceeds 2%
• Staleness detected (hasn't updated in expected time)
```

## How to Use

1. **Setup & Scheduling:**
   ```
   Data Quality Agent runs:
   • Daily at 3 AM (off-peak hours)
   • Weekly full dataset scan
   • On-demand when requested
   
   Checks:
   • All production databases
   • All critical data tables
   • Key transformation outputs
   ```

2. **Integration Example:**
   ```
   N8N Workflow:
   PostgreSQL/BigQuery connection
      ↓
   Data Quality Agent analysis
      ↓
   Issues found? 
      ├─ CRITICAL → Slack alert to engineering ASAP
      ├─ HIGH → Email to data team + log
      ├─ MEDIUM → Weekly digest email
      └─ LOW → Dashboard only
      ↓
   Store metrics in analytics warehouse
      ↓
   Auto-generate weekly report
   ```

3. **Sample Report:**
   ```
   DATA QUALITY REPORT - Customer Table
   ═════════════════════════════════════
   Overall Score: 78/100 (ACCEPTABLE ⚠️)
   
   Score by Dimension:
   • Completeness: 94% (Good)
   • Accuracy: 96% (Good) 
   • Consistency: 82% (Fair)
   • Timeliness: 65% (Needs work)
   • Validity: 100% (Excellent)
   
   🔴 CRITICAL ISSUES (Act now):
   None detected ✅
   
   🟠 HIGH ISSUES (Act within 4 hours):
   1. Updated_at timestamp: 89 records have NULL values
      Impact: Can't track when customer info changed
      Fix: Run backfill query to use created_at as fallback
      Effort: 15 minutes
      
   2. Email duplicates: 234 duplicate emails found
      Impact: Can't send unique customer emails
      Example: "john@example.com" appears 3 times
      Fix: Dedup or merge customer records
      Effort: 2-4 hours (review/merge)
   
   🟡 MEDIUM ISSUES (Act within 1 day):
   1. Last updated over 30 days ago: 1,256 records
      Status: Not critical but worth investigating
      Action: Update stale records or mark inactive
   
   🟢 LOW ISSUES (Monitor):
   1. Phone format inconsistent: (123) 456-7890 vs 123-456-7890
      Status: Both valid, consider standardizing
   
   TREND:
   ├─ Last month: 82/100
   ├─ 2 months ago: 79/100
   └─ Trend: IMPROVING ✅ (+3 points)
   
   RECOMMENDATION:
   Priority 1: Fix NULL updated_at (30 min, high impact)
   Priority 2: Investigate email duplication (plan dedup)
   Priority 3: Standardize phone format (backlog item)
   
   Next scheduled check: Tomorrow 3 AM
   ```

## Features

✅ **Automated Detection** - Finds issues without manual work  
✅ **Severity Ranking** - Know what to fix first  
✅ **Trend Tracking** - See if quality improving or declining  
✅ **Smart Alerts** - Escalates critical issues automatically  
✅ **Actionable Insights** - Specific fixes, not just complaints  
✅ **Multi-dimension** - Checks completeness, accuracy, consistency, more  

## Common Issues & Fixes

| Issue | Typical Cause | Quick Fix |
|-------|---------------|----------|
| High nulls in column | Column recently added | Use default value or impute |
| Duplicate emails | Import error | Merge duplicate records |
| Format inconsistency | Multiple data sources | Standardize in transformation |
| Stale data | ETL pipeline failed | Re-run pipeline, investigate delay |
| Invalid dates | User input error | Add validation to form |

## Integration with Data Insights Agent

```
Data Quality Checker runs first
  ├─ If score <70 → Alert data team
  └─ If score ≥70 → Proceed to analysis
      ↓
Data Insights Agent runs
  └─ Generates insights only on valid data
```

## Best Practices

✅ Run daily during off-peak hours  
✅ Set quality thresholds by table importance  
✅ Alert on CRITICAL/HIGH immediately  
✅ Investigate root causes, not just symptoms  
✅ Track quality over time (trending)  
✅ Document what makes data "good" for your business  
