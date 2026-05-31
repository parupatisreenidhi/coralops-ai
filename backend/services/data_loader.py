import json
import os
from typing import List, Dict, Any

MOCK_DATA_DIR = os.path.join(os.path.dirname(__file__), "..", "..", "mock-data")


def _load(filename: str) -> Any:
    path = os.path.join(MOCK_DATA_DIR, filename)
    with open(path, "r") as f:
        return json.load(f)


def get_incidents() -> List[Dict]:
    return _load("incidents.json")


def get_logs() -> List[Dict]:
    return _load("logs.json")


def get_commits() -> List[Dict]:
    return _load("commits.json")


def get_slack_messages() -> List[Dict]:
    return _load("slack.json")


def get_metrics() -> Dict:
    return _load("metrics.json")


def get_alerts() -> List[Dict]:
    return _load("alerts.json")


def get_incident_by_id(incident_id: str) -> Dict | None:
    incidents = get_incidents()
    return next((i for i in incidents if i["id"] == incident_id), None)
