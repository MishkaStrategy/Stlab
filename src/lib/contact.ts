export type LeadPayload = {
  name: string
  phone: string
  service: string
}

export type LeadResult = {
  ok: boolean
  reason?: 'not-configured' | 'request-failed'
}

export async function submitLead(payload: LeadPayload): Promise<LeadResult> {
  const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined
  if (!endpoint) return { ok: false, reason: 'not-configured' }

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    return response.ok ? { ok: true } : { ok: false, reason: 'request-failed' }
  } catch {
    return { ok: false, reason: 'request-failed' }
  }
}
