# Auth Site – Descrizione del progetto (versione aggiornata)

Questo repository contiene un sito didattico realizzato con **Next.js** per esplorare e dimostrare in modo **interattivo e visivo** i concetti di **autenticazione moderna**, **OAuth 2.0** e **Single Sign-On (SSO)** tramite **NextAuth**.
L’obiettivo è fornire una **demo educativa dinamica** utilizzabile nel contesto del corso universitario *Service Design & Engineering Lab*, che aiuti a comprendere **come avviene la comunicazione tra client, server e identity provider** durante un flusso di autenticazione reale.

---

## 🎯 Obiettivo educativo

Il sito non vuole solo permettere il login con GitHub o Google, ma **visualizzare passo per passo il flusso OAuth**:

1. Durante l’autenticazione, ogni messaggio o interazione con il provider (richiesta, redirect, scambio di token, ecc.) viene **mostrato all’utente tramite un popup in basso a destra**, con un’animazione chiara e un timeout di scomparsa automatico.
2. Dopo l’autenticazione, l’utente viene reindirizzato a una **pagina protetta (`/dashboard`)** che mostra **un riepilogo statico e ordinato di tutti i messaggi** scambiati durante il flusso.

L’obiettivo è rendere **visibile e comprensibile** ciò che normalmente resta “nascosto” nel protocollo OAuth 2.0, in modo intuitivo e adatto a un laboratorio didattico.

---

## 🧱 Panoramica tecnica

* **Next.js 15 (App Router)** con **TypeScript**
* **NextAuth v4** (sessione JWT)
* **Tailwind CSS v4** + componenti **shadcn/ui**
* Librerie UI: `@radix-ui/react-toast`, `lucide-react`
* Utility: `react-hook-form`, `zod`, `date-fns`
* Animazioni popup: `framer-motion` o componenti `Toast` di Radix

---

## 🗂️ Struttura aggiornata del progetto

```
app/
  page.tsx                 → Home introduttiva con concetti base
  login/page.tsx           → Demo login con pulsanti SSO + visualizzatore flusso OAuth
  dashboard/page.tsx       → Area protetta + riepilogo statico del flusso OAuth
  concepts/page.tsx        → Sezione didattica su Autenticazione, OAuth, SSO, Sicurezza
  api/auth/[...nextauth]/  → Route API NextAuth (handlers GET/POST)
components/
  header.tsx               → Navigazione (Home, Concetti, Demo Login, Dashboard)
  protected-route.tsx      → Wrapper che controlla la sessione
  sso-login-button.tsx     → Pulsanti SSO per GitHub/Google
  oauth-popup.tsx          → 💡 Nuovo componente per popup dinamici (toast educativi)
  oauth-flow-visualizer.tsx→ Componente che coordina e invia eventi ai popup
  oauth-summary.tsx        → 💡 Nuovo componente per mostrare il riepilogo statico post-login
lib/
  auth.ts                  → Configurazione NextAuth dinamica con provider
  auth-context.tsx         → SessionProvider + hook `useAuth`
  oauth-simulator.ts       → Logica interna per generare eventi del flusso OAuth
  oauth-events.ts          → 💡 Nuovo modulo che registra e memorizza i messaggi da mostrare
```

---

## ✨ Nuove funzionalità educative

### 🔸 Popup dinamici del flusso OAuth

Durante la procedura di login:

* Ogni passaggio chiave (es. *Request Authorization Code*, *Consent Granted*, *Token Exchanged*, *Session Created*) viene **visualizzato tramite un toast animato** in basso a destra.
* I popup vengono **gestiti da un context React** (`OAuthEventContext`) che emette gli eventi da `oauth-simulator.ts`.
* I messaggi vengono memorizzati in memoria (o in `sessionStorage`) per poterli visualizzare successivamente nella dashboard.

### 🔸 Riepilogo statico nella pagina protetta

Dopo l’autenticazione:

* L’utente viene reindirizzato a `/dashboard`.
* Qui un componente `OAuthSummary` mostra **tutti i messaggi del flusso** in ordine cronologico, con timestamp e ruolo (es. *Client → Provider*, *Provider → Client*).
* Questa sezione permette di **rivedere l’intero scambio**, utile a fini didattici per analizzare i passaggi dell’OAuth Authorization Code Flow.

---

## ⚙️ Configurazione OAuth (NextAuth)

Il file `lib/auth.ts` abilita i provider OAuth **solo se le variabili d’ambiente** sono presenti:

```bash
NEXTAUTH_URL=https://auth-site.vercel.app
NEXTAUTH_SECRET=<random_secret>
GITHUB_ID=<github_client_id>
GITHUB_SECRET=<github_client_secret>
GOOGLE_CLIENT_ID=<google_client_id>
GOOGLE_CLIENT_SECRET=<google_client_secret>
```

In assenza di credenziali, i pulsanti di login sono disabilitati e viene mostrato un messaggio educativo ("Provider non configurato").

---

## 🧩 Possibili estensioni future

* Aggiungere provider aggiuntivi (es. Microsoft, Okta) per confronti tra flussi.
* Permettere di “riavvolgere” la simulazione del flusso nella dashboard.
* Mostrare visivamente gli attori del flusso (Client, Authorization Server, Resource Owner).
* Integrazione con WebSocket o EventSource per flussi in tempo reale.
* Implementare un pannello *“Visualizza pacchetti HTTP reali”* per studenti avanzati.

---

## 📚 Scopo finale

> Rendere visibile e comprensibile l’autenticazione OAuth e SSO attraverso una demo interattiva, visuale e spiegata passo per passo — uno strumento educativo completo per comprendere i meccanismi del login federato.

---

Vuoi che lo adatti anche per essere usato **direttamente come README del repo GitHub** (con badge, screenshot e sezioni “Getting Started”/“Contributing”), oppure lo vuoi tenere come **documento interno per Copilot** (più tecnico e focalizzato sulla struttura del codice)?
Posso formattarlo diversamente a seconda dell’uso.
