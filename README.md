# CoralOps AI — Autonomous SRE Incident Investigation Agent

> **"Stop firefighting in the dark. CoralOps AI surfaces root cause, blast radius, and fix in seconds — not hours."**

![CoralOps AI](docs/assets/screenshot-placeholder.png)

---

## What It Does

CoralOps AI is an autonomous incident investigation agent built for SRE and platform engineering teams. When a production incident fires, instead of spending 30–90 minutes manually correlating logs, checking recent deploys, hunting Slack threads, and reading alert histories — you ask CoralOps.

**Example:** *"Why did the payment API fail yesterday?"*

CoralOps AI automatically:
1. Finds the relevant incident (INC-2024-0847)
2. Correlates the deployment timeline (v2.14.3 shipped 4 min before error spike)
3. Identifies the config regression (pool_size=5 vs expected 50)
4. Cross-references GitHub commits (PR #1284 — async pool manager migration)
5. Reads Slack discussion (engineer confirmed root cause at 14:35 UTC)
6. Generates a confidence-scored root cause summary
7. Returns prioritized remediation steps

**Result:** 42-minute incident resolved with full investigation available in seconds.

---

## Demo Flow (3 Minutes)

1. Open dashboard → see active incident `INC-2024-0847` (payment service, critical)
2. Navigate to **Investigate** → type: *"Why did payment API fail?"*
3. Watch the investigation steps animate in real-time
4. See: Root Cause (96% confidence) · Timeline · Evidence · Recommended Actions
5. Switch between **Executive View** and **Engineer View**
6. Click **Services** → see blast radius across 3 services
7. Click **Architecture** → explain the system design to judges

---

## Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14 · TypeScript · Tailwind CSS |
| Backend | FastAPI · Python 3.11+ |
| AI/Agent | Coral SDK (conceptual) · LLM-ready orchestration |
| Data | Mock JSON (realistic, internally consistent) |
| Architecture | ChromaDB-ready · Supabase-ready |

---

## Quick Start

### Prerequisites
- Node.js 18+
- Python 3.11+

### 1. Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

Backend runs at `http://localhost:8000`  
API docs at `http://localhost:8000/docs`

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:3000`

### Environment Variables

Create `frontend/.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

---

## Project Structure

```
coralops-ai/
├── frontend/               # Next.js 14 app
│   ├── app/               # Pages (dashboard, investigate, incidents, services)
│   ├── components/        # UI components (sidebar, cards, timeline, panels)
│   ├── lib/               # API client, utilities
│   └── types/             # TypeScript types
├── backend/               # FastAPI app
│   ├── main.py            # App entry point
│   ├── api/routes/        # HTTP route handlers
│   ├── agents/            # Correlation engine (core AI logic)
│   ├── services/          # Data loaders
│   └── models/            # Pydantic models
├── mock-data/             # Realistic JSON fixtures
│   ├── incidents.json
│   ├── logs.json
│   ├── commits.json
│   ├── slack.json
│   ├── metrics.json
│   └── alerts.json
└── docs/                  # Architecture, demo script, submission
```

---

## API Reference

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Service health |
| GET | `/incidents` | List all incidents |
| GET | `/incidents/{id}` | Get incident by ID |
| GET | `/investigate?q=...` | Run investigation query |
| POST | `/investigate` | Run investigation (JSON body) |

### Example Investigation Response

```json
{
  "incident_id": "INC-2024-0847",
  "probable_root_cause": "DB connection pool exhaustion caused by pool_size misconfiguration...",
  "root_cause_category": "config",
  "confidence_score": 0.96,
  "confidence_label": "High",
  "blast_radius": "3 services impacted · 18,400 users affected · 42 min MTTMitigate",
  "impacted_services": [...],
  "timeline": [...],
  "evidence": [...],
  "recommended_actions": [...]
}
```

---

## Hackathon: Coral x Kunal Kushwaha

This project was built for the **Coral x Kunal Kushwaha hackathon** as an enterprise AI agent submission.

**Category:** Enterprise AI Agent  
**Differentiator:** SRE-specific incident investigation with multi-source correlation, confidence scoring, and blast radius analysis

---

## License

MIT
