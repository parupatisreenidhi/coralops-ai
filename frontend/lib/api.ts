import { Incident, InvestigationResult } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function fetchIncidents(): Promise<Incident[]> {
  const res = await fetch(`${API_URL}/incidents`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch incidents");
  const data = await res.json();
  return data.incidents;
}

export async function fetchIncident(id: string): Promise<Incident> {
  const res = await fetch(`${API_URL}/incidents/${id}`, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to fetch incident ${id}`);
  return res.json();
}

export async function investigate(query: string, incidentId?: string): Promise<InvestigationResult> {
  const params = new URLSearchParams({ q: query });
  if (incidentId) params.set("incident_id", incidentId);
  const res = await fetch(`${API_URL}/investigate?${params}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Investigation failed");
  return res.json();
}
