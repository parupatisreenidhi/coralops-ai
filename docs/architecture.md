# CoralOps AI — System Architecture

## Overview

CoralOps AI is a multi-source correlation engine wrapped in an AI agent interface. The core insight is that production incidents leave a trail of signals across many systems — and the bottleneck isn't data availability, it's correlation speed. CoralOps automates that correlation.

---

## High-Level Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                        User (SRE / Engineer)                      │
│                     "Why did payment fail?"                        │
└──────────────────────────────┬───────────────────────────────────┘
                               │
┌──────────────────────────────▼───────────────────────────────────┐
│                      Next.js Frontend                             │
│   Dashboard · Investigate · Incidents · Services · Architecture    │
└──────────────────────────────┬───────────────────────────────────┘
                               │ REST API
┌──────────────────────────────▼───────────────────────────────────┐
│                       FastAPI Backend                             │
│                                                                    │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │               Correlation Engine (Agent)                     │ │
│  │                                                               │ │
│  │  1. Query Resolution (NLP → Incident ID)                     │ │
│  │  2. Multi-Source Retrieval (parallel)                        │ │
│  │  3. Timeline Construction (chronological merge)              │ │
│  │  4. Root Cause Analysis (pattern + keyword matching)         │ │
│  │  5. Evidence Scoring (confidence per signal)                 │ │
│  │  6. Action Generation (category-based playbooks)             │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                                                                    │
│  Connectors:                                                       │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌────────┐ │
│  │  GitHub  │ │ Grafana  │ │PagerDuty │ │  Slack   │ │  Logs  │ │
│  │ (commits)│ │(metrics) │ │ (alerts) │ │  (msgs)  │ │        │ │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘ └────────┘ │
└──────────────────────────────────────────────────────────────────┘
                               │
┌──────────────────────────────▼───────────────────────────────────┐
│                     Data Layer                                     │
│   Mock JSON (MVP) → ChromaDB (vector search) → Supabase (prod)   │
└──────────────────────────────────────────────────────────────────┘
```

---

## Correlation Engine (Core Intelligence)

The correlation engine is the heart of CoralOps AI. It implements a rules-based (currently) / LLM-ready (architecture) pipeline:

### Step 1: Query Resolution
- Natural language query is parsed for service names, time references, and incident keywords
- Mapped to the most relevant incident ID from the incident registry
- Supports fuzzy matching: "payment fail" → INC-2024-0847

### Step 2: Multi-Source Signal Retrieval
Simultaneously fetches from:
- **Logs**: Application error logs, pod restarts, trace IDs
- **Commits**: Recent merges to main, files changed, PR risk labels
- **Alerts**: Triggered thresholds, on-call notifications
- **Metrics**: Error rate, p99 latency, DB connection counts
- **Slack**: Thread discussions in #incidents and #deploys

### Step 3: Timeline Construction
- All events merged into a single chronological stream
- Annotated with source, severity, and service
- Key signal: deploy timestamp relative to first error timestamp

### Step 4: Root Cause Analysis
Analyzes the pattern:
```
Deploy at T+0 → DB pool saturation at T+3m → Error spike at T+4m
       ↑                                              ↑
  Trigger                                          Effect
```

### Step 5: Evidence Confidence Scoring
Each evidence item is scored 0.0–1.0 based on:
- Source reliability (Slack engineer confirmation = 0.98)
- Signal specificity (exact commit SHA match = 0.95)
- Temporal proximity to incident start

### Step 6: Action Generation
Root cause category determines action playbook:
- `config` → fix config value, add CI validation gate
- `deploy` → rollback, post-deploy canary check
- `code` → revert change, add test coverage
- `infra` → scaling, resource limits

---

## Data Flow (Investigation Request)

```
GET /investigate?q=Why+did+payment+fail

│
├── correlation_engine.investigate(query)
│   ├── resolve_incident_from_query("why did payment fail") → "INC-2024-0847"
│   ├── build_timeline("INC-2024-0847")
│   │   ├── load commits, filter by version v2.14.3
│   │   ├── load alerts, all
│   │   ├── load logs, filter key log IDs
│   │   ├── load slack messages, filter key message IDs
│   │   └── sort all by timestamp → List[TimelineEvent]
│   ├── build_evidence("INC-2024-0847")
│   │   └── hardcoded high-signal evidence items → List[EvidenceItem]
│   ├── build_impacted_services()
│   │   └── payment-service (root), checkout-service, order-service
│   └── build_recommended_actions()
│       └── 5 prioritized actions with owner + impact estimate
│
└── return InvestigationResult (JSON)
```

---

## Production Roadmap (Beyond Hackathon)

### Real LLM Integration
Replace the rules-based correlation with Coral SDK + LLM:
```python
# With Coral SDK
result = coral_agent.run(
    task="investigate_incident",
    context={
        "logs": logs,
        "commits": commits,
        "alerts": alerts,
        "slack": slack_messages,
    }
)
```

### Vector Search (ChromaDB)
- Embed all signals at ingest time
- At query time: semantic search across all embeddings
- Enables: "similar past incident" retrieval

### Real Connectors
| Connector | Integration Path |
|---|---|
| GitHub | GitHub REST API + Webhooks |
| Grafana | Grafana HTTP API + Prometheus |
| PagerDuty | PagerDuty Events API v2 |
| Slack | Slack Bolt SDK |
| Datadog | Datadog API v1 |

### Persistent Storage (Supabase)
```sql
CREATE TABLE incidents (...);
CREATE TABLE investigation_results (...);
CREATE TABLE evidence_items (...);
CREATE TABLE timeline_events (...);
```

---

## Design Decisions

**Why FastAPI over Flask?**  
Async-first, Pydantic models for free, auto-generated OpenAPI docs, and excellent performance under load.

**Why mock data over real integrations?**  
Hackathon constraint + maximum demo reliability. The architecture is connector-agnostic — swap mock JSON files for real API calls without changing the correlation engine.

**Why confidence scores?**  
SREs need to know when to trust the agent. A 96% confidence score on config misconfiguration tells the engineer "act on this." A 62% score says "verify before acting."

**Why Executive + Engineer views?**  
Incidents involve multiple audiences. Engineering managers need the 3-sentence summary. On-call engineers need the exact commit SHA and config key.
