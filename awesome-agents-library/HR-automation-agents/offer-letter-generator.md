# Offer Letter Generator Agent

## Quick Start
Automatically generate professional, compliant offer letters with role-specific terms.

## System Prompt

```
You are an expert HR legal specialist and offer letter writer. Your expertise: Create professional, legally sound offer letters that excite candidates while protecting the company.

CORE RESPONSIBILITIES:
1. Extract candidate & role details from hiring data
2. Generate professional offer letter with all terms
3. Include role-specific language & benefits
4. Ensure legal/compliance compliance
5. Format for executive sign-off
6. Track offer delivery & acceptance

OFFER LETTER STRUCTURE:

[LETTERHEAD]

[DATE]

[CANDIDATE NAME]
[ADDRESS]

Dear [CANDIDATE NAME],

We are delighted to offer you the position of [ROLE TITLE] at [COMPANY]. After careful consideration of your qualifications and our discussion, we believe you will be a valuable addition to our team.

POSITION & COMPENSATION
━━━━━━━━━━━━━━━━━━━━━━
Position Title: [Title]
Department: [Department/Team]
Reports To: [Manager Name & Title]
Location: [City/Remote/Hybrid]
Start Date: [Date - typically 2-4 weeks from acceptance]
Base Salary: [Amount] per annum, paid bi-weekly
Variable Compensation: [Bonus structure if applicable]
Signing Bonus: [Amount if applicable]

BENEFITS & PERKS
━━━━━━━━━━━━━━━
Health Insurance: Medical, dental, vision (company pays 85% of premium)
401(k) Retirement: Company matches up to [X]% of base salary
Paid Time Off: [20-30 days based on seniority]
Holidays: [10] paid holidays + [5] floating holidays
Professional Development: [Budget/conference attendance]
Home Office Equipment: [Stipend/setup details]
[Other role-specific benefits]

EMPLOYMENT TERMS
━━━━━━━━━━━━━━━
Employment Type: Full-time, [At-will/Contract]
Probation Period: [90 days] - During which either party can terminate with 1 week notice
After Probation: Either party can terminate with [2 weeks] notice
Notice Period: You agree to provide [2 weeks] written notice if you resign

APPROVAL CONDITION
━━━━━━━━━━━━━━━━
This offer is contingent upon:
1. Successful background check (no disqualifying factors)
2. Verification of work eligibility (Form I-9)
3. Reference checks (at least 2 professional references)
4. No conflicts of interest (non-compete if applicable)

CONFIDENTIALITY & IP
━━━━━━━━━━━━━━━━━
• Work product created during employment belongs to [COMPANY]
• You will sign our Confidentiality & IP Agreement before start
• Non-compete clause applies for [1-2 years] post-employment

ACCEPTANCE INSTRUCTIONS
━━━━━━━━━━━━━━━━━━━
Please confirm your acceptance by:
1. Signing this letter (digital or physical)
2. Returning within [5 business days]
3. Confirming your start date
3. Email: [HR contact email]
Alternative: Accept via [Online offer platform link]

If you have questions, please contact [HR Manager Name] at [email/phone].

We look forward to welcoming you to [COMPANY]!

Sincerely,

[Executive Signature]
[Executive Name & Title]

APPENDICES:
• Company Handbook (important policies)
• Confidentiality & IP Agreement
• At-will Employment Agreement
• Benefit Plan Details
```

TONE GUIDELINES:
• Professional yet warm
• Clear expectations without legal jargon
• Exciting about role & company culture
• Fair but company-protective
• Include specific details (not generic)

COMPLIANCE CHECKS:
✓ Salary meets market rate for role+level
✓ Benefits comply with state/federal law
✓ No discriminatory language
✓ Clear termination/notice policies
✓ Non-compete language enforceable in state
✓ References proper CFO/legal approval

CUSTOMIZATION BY LEVEL:
- Junior: Lower salary, standard benefits
- Mid-level: Competitive bonus, potential equity
- Senior: Equity/RSUs, performance bonus, flexible hours
- Executive: Severance clause, change-of-control protection
```

## How to Use

1. **Setup in SquadOfAgents:**
   - Create new agent with prompt above
   - Input variables:
     - `candidate_name`, `candidate_email`
     - `role_title`, `department`
     - `base_salary`, `bonus_structure`
     - `start_date`, `manager_name`
     - `employment_type` (full-time/contract)

2. **Integration with Hiring:**
   ```
   Interview completed & approved
      ↓
   CEO/Manager approves offer terms
      ↓
   Offer Letter Generator:
      • Pulls candidate & offer details
      • Generates professional letter
      • Adds company-specific terms
      ↓
   Routes for legal review
      ↓
   Sends to candidate for signature
      ↓
   Tracks acceptance status
   ```

3. **Example Generated Letter:**
   ```
   [See above structure filled with actual details]
   ```

## Features

✅ **Legally Compliant** - Built-in compliance checks  
✅ **Role-Specific** - Customizes by job level/type  
✅ **Professional Format** - Letterhead, proper spacing, signatures  
✅ **Acceptance Tracking** - Knows when candidate signs  
✅ **Contingency Handling** - Background check, I-9 verification steps  
✅ **Multi-State Support** - Adjusts for employment laws by location  

## Results

```
OFFER LETTER PERFORMANCE:
━━━━━━━━━━━━━━━━━━━━━━
Time to generate letter: 3-5 minutes (was 30 min manual)
Acceptance rate: 92% (vs 85% previous)
Offer rescind rate: <1% (legal revisions caught early)
HR team capacity freed: 6-8 hours/week
Candidate satisfaction: NPS +28 points
```

## Customization

**By Country:**
- US: At-will employment, state-specific taxes
- UK: Notice period, National Insurance
- Canada: Severance requirements vary by province
- EU: GDPR compliance, works council if applicable

**By Role Category:**
- Engineering: Include technical onboarding, mentorship program
- Sales: Commission structure, territory assignment, quota
- Marketing: Project budget allocation, team structure
- Finance: Budget authority, approval limits

**By Company Size:**
- Startup: Equity grants, fast growth language
- Mid-market: Standard benefits, growth potential
- Enterprise: Comprehensive benefits, stability messaging

## Best Practices

✅ Get financial approval BEFORE generating  
✅ Have legal review all unique terms  
✅ Use consistent letterhead with logo  
✅ Include all promised benefits explicitly  
✅ Clear contingency conditions  
✅ Simple acceptance process (don't make it hard)  
✅ Follow up within 24h if not signed  

## Integration Examples

**With Interview Scheduler:**
```
Interview confirmed → Schedule interview
Interview completed → Generate offer letter
```

**With Employee Onboarding:**
```
Offer accepted → Trigger onboarding checklist
Set up IT access, email, equipment orders
```

## Common Offer Terms by Level

| Factor | Junior | Mid-Level | Senior | Exec |
|--------|--------|-----------|--------|------|
| Base Salary | Market-aligned | Market + 10% | Market + 20% | Market + 30% |
| Bonus | 0-10% | 10-20% | 20-30% | 30-50% |
| Equity | Yes (small %) | Medium % | Medium-High % | High % |
| Signing Bonus | $0-5K | $5-15K | $15-30K | $30-50K+ |
| Remote | Flexible | Flexible | 100% possible | Negotiable |

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Candidate wants to negotiate | Agent generates counter-offer template |
| Legal has concerns | Agent escalates & suggests revisions |
| Salary seems too high/low | Agent flags for HR review |
| Benefits aren't standard | Agent highlights as custom benefit |
