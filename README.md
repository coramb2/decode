# [decode]
### Tech, explained like someone who gets it.

Decode is a shame-free, zero-friction technology companion for anyone who has ever felt left behind by tech. Paste any confusing piece of technology — a notification, a bill, a suspicious text, an error message — and get an immediate plain-language explanation.

**No account. No login. No judgment. Just answers.**

---

## What it does

You describe anything confusing about technology. Decode tells you:
- **What this is** — plain language, no jargon
- **What you should do** — specific, actionable steps
- **What to watch out for** — scam flags, hidden fees, predatory patterns

---

## Who it's for

Low-income adults, seniors, first-generation students, recently incarcerated individuals, youth in under-resourced schools — and anyone who has ever felt made to feel stupid by a device, a bill, or a website. Built by someone from these communities, not for them.

---

## Tech stack

- **Frontend:** Next.js 16 + TypeScript + Tailwind CSS
- **AI:** Ollama (local, dev) — Llama 3.1 8B
- **Hosting:** Vercel (coming soon)
- **Analytics:** Plausible (privacy-first, coming soon)
- **Database:** None — stateless by design in V1

---

## Running locally

You'll need [Ollama](https://ollama.com) installed and running.
```bash