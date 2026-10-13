// Envoi vers les webhooks Make de M. Faé : JSON en UTF-8 déclaré, et deux
// protections anti-robots communes aux formulaires (champ piège, délai de saisie).

/** Un humain met plus que ça à remplir un formulaire ; un robot, non. */
const DELAI_MIN_MS = 3000

/** Vrai si la requête vient manifestement d'un robot (à ignorer en silence). */
export function estRobot(body: Record<string, unknown>): boolean {
  if (typeof body.site_web === 'string' && body.site_web.trim()) return true
  const t = Number(body.t)
  return !Number.isFinite(t) || t < DELAI_MIN_MS
}

export async function envoyerVersMake(url: string, donnees: Record<string, string>): Promise<boolean> {
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: Buffer.from(JSON.stringify(donnees), 'utf8'),
    })
    if (!res.ok) console.error('[make] réponse', res.status, (await res.text()).slice(0, 200))
    return res.ok
  } catch (e) {
    console.error('[make] envoi impossible', e)
    return false
  }
}
