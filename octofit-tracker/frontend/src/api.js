const codespaceName = import.meta.env.VITE_CODESPACE_NAME

export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

export async function fetchCollection(path) {
  const response = await fetch(`${API_BASE_URL}/api/${path}/`)

  if (!response.ok) {
    throw new Error(`Unable to load ${path} (${response.status})`)
  }

  const payload = await response.json()
  return normalizeCollection(payload)
}

function normalizeCollection(payload) {
  if (Array.isArray(payload)) return payload
  if (!payload || typeof payload !== 'object') return []

  for (const key of ['results', 'items', 'data']) {
    if (key in payload) return normalizeCollection(payload[key])
  }

  return []
}
