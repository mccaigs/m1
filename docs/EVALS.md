# Evals

## Purpose

Evals keep McCaigs systems honest.

They should test deterministic logic, AI-assisted outputs, lead scoring, project summaries, and any workflow where accuracy matters.

## Evaluation areas

### Contact enquiry scoring

Checks whether enquiries are classified correctly.

Metrics:

- Fit score accuracy.
- Budget band handling.
- Timescale classification.
- Project type classification.
- False positive rate.
- False negative rate.

### AI brief summaries

Checks whether AI summaries preserve facts from the original enquiry or document.

Metrics:

- Factual consistency.
- Missing critical details.
- Hallucinated claims.
- Tone fit.
- Actionability.

### Proposal outline generation

Checks whether generated outlines are useful and grounded.

Metrics:

- Correct problem framing.
- Clear scope.
- No unsupported claims.
- Practical next steps.
- McCaigs tone alignment.

### Deterministic workflow rules

Checks scoring, routing, and status transitions.

Metrics:

- Rule accuracy.
- Edge case handling.
- Permission safety.
- Audit trail completeness.

## Golden datasets

Create small, realistic datasets for:

- Strong-fit enquiries.
- Poor-fit enquiries.
- Ambiguous enquiries.
- Urgent but low-budget enquiries.
- High-value strategic enquiries.
- Internal project updates.
- Client document summaries.

## Required thresholds

- Critical deterministic logic: 100% expected rule pass rate.
- AI factual consistency: 95%+ on golden dataset.
- AI hallucination tolerance: 0 known critical hallucinations.
- Contact form validation: 100% required field enforcement.
- Protected route access: 100% permission enforcement.

## Evaluation process

Run evals when:

- Prompts change.
- Models change.
- Scoring rules change.
- Database schema changes.
- Contact flow changes.
- Client portal permissions change.

## Output format

Each eval run should record:

- Name
- Version
- Date
- Dataset
- Result
- Pass or fail
- Notes
- Follow-up actions

## First release verification

The initial release is verified with linting, a production build, a health-route check, homepage visual review, and an unconfigured enquiry-state check. Deterministic scoring evals begin when qualification rules are added.
