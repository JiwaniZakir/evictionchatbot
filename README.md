<div align="center">

# EVITA

**AI-powered legal assistant helping tenants fight eviction in Philadelphia.**

[![React](https://img.shields.io/badge/React-18.2-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4-412991?style=for-the-badge&logo=openai&logoColor=white)](https://openai.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-5.2-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://evictionchatbot.vercel.app)

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue?style=for-the-badge)](https://www.gnu.org/licenses/gpl-3.0)
[![GitHub stars](https://img.shields.io/github/stars/JiwaniZakir/evictionchatbot?style=for-the-badge&color=58A6FF)](https://github.com/JiwaniZakir/evictionchatbot/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/JiwaniZakir/evictionchatbot?style=for-the-badge&color=58A6FF)](https://github.com/JiwaniZakir/evictionchatbot/network/members)

<br />

[![Live Demo](https://img.shields.io/badge/Try_the_Live_Demo-evictionchatbot.vercel.app-58A6FF?style=for-the-badge&logo=vercel&logoColor=white)](https://evictionchatbot.vercel.app)

<br />

</div>

---

## Overview

Every year, over **21,000 tenants** in Philadelphia face eviction. Legal assistance hotlines are overwhelmed — callers wait hours before reaching an advocate, and many never get through at all. Critical deadlines pass. Rights go unexercised. Families lose their homes because they couldn't access information in time.

**EVITA** (Eviction Virtual Intelligent Tenant Assistant) changes that. Built in partnership with [Philadelphia Legal Assistance](https://philalegal.org), EVITA is an AI-powered chatbot trained on a comprehensive knowledge base of Philadelphia eviction law, tenant rights, court procedures, and defense strategies. It provides immediate, accurate legal guidance to tenants — no hold times, no missed calls, no barriers.

> This project was created at the **Social Justice Hackathon 2024** to explore whether LLM-powered tools can meaningfully assist tenants facing eviction, reduce the burden on understaffed legal hotlines, and ensure people get timely information about their rights.

---

## Features

- **Instant Legal Guidance** — Answers eviction-related questions immediately, drawing from a 15K-token knowledge base of Philadelphia-specific eviction law
- **Status Assessment** — Conversational intake determines where a tenant stands in the eviction process and surfaces relevant next steps
- **Defense Strategies** — Identifies applicable legal defenses based on the tenant's specific situation (nonpayment, lease termination, breach of lease)
- **Resource Referrals** — Connects tenants to Philadelphia Legal Assistance, Community Legal Services, the Philly Tenant Hotline, and Right to Counsel programs
- **Eviction Diversion Program Navigation** — Walks tenants through the city's mandatory diversion process step by step
- **Illegal Eviction Detection** — Helps tenants identify whether a lockout is illegal and provides actionable remedies

---

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                      Client (Browser)                   │
│                                                         │
│   ┌──────────┐    ┌──────────────┐    ┌──────────────┐  │
│   │  App.jsx  │───▶│  Chatbot.jsx │───▶│  Loader.jsx  │  │
│   └──────────┘    └──────┬───────┘    └──────────────┘  │
│                          │                              │
│                          │ User message                 │
│                          ▼                              │
│              ┌───────────────────────┐                  │
│              │   Prompt Construction  │                  │
│              │                       │                  │
│              │  prompt.txt (~15K tokens)                │
│              │  Philadelphia eviction law               │
│              │  + user question                         │
│              └───────────┬───────────┘                  │
│                          │                              │
└──────────────────────────┼──────────────────────────────┘
                           │ API Call
                           ▼
                 ┌───────────────────┐
                 │   OpenAI GPT-4    │
                 │   Chat Completions│
                 └───────────────────┘
```

The chatbot loads a comprehensive legal knowledge base from `prompt.txt` on each query, appends the user's question, and sends the combined prompt to GPT-4. Responses are streamed back into a React chat interface styled with Tailwind CSS.

---

## Tech Stack

| Layer | Technology |
|:------|:-----------|
| **Frontend** | React 18, Vite 5 |
| **Styling** | Tailwind CSS 3.4, PostCSS, Autoprefixer |
| **AI** | OpenAI GPT-4 via `openai` SDK |
| **HTTP** | Axios |
| **Deployment** | Vercel |
| **Knowledge Base** | Custom legal prompt (~15K tokens of Philadelphia eviction law) |

---

## Quick Start

### Prerequisites

- Node.js 18+
- An [OpenAI API key](https://platform.openai.com/api-keys)

### Installation

```bash
# Clone the repository
git clone https://github.com/JiwaniZakir/evictionchatbot.git
cd evictionchatbot

# Install dependencies
npm install

# Configure environment
echo "VITE_API_KEY=your_openai_api_key" > .env

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Build for Production

```bash
npm run build
npm run preview
```

---

## Project Structure

```
evictionchatbot/
├── src/
│   ├── App.jsx            # Root layout component
│   ├── App.css            # Global application styles
│   ├── Chatbot.jsx        # Chat interface + OpenAI integration
│   ├── Loader.jsx         # Animated loading indicator
│   ├── prompt.txt         # Legal knowledge base (eviction law, procedures, rights)
│   ├── index.css          # Tailwind directives + base styles
│   ├── main.jsx           # Application entry point
│   └── assets/
├── public/
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

---

## Data Sources

| Source | Description |
|:-------|:-----------|
| **Philadelphia Legal Assistance** | Eviction Diversion Program materials, court procedures, tenant rights, defense strategies |
| **OpenDataPhilly** | Code violations dataset |
| **PhillyTenant.org** | Tenant rights documentation, Know Your Rights materials |
| **Philadelphia Municipal Court** | Eviction court docket procedures |

---

## Impact

<table>
<tr>
<td width="50%">

### The Problem

Philadelphia's legal aid infrastructure cannot keep up with demand. Hotlines are understaffed. Tenants miss critical 10-day appeal windows. Families sign binding agreements in court without understanding their rights. The information gap between landlords with attorneys and tenants without representation leads to preventable evictions every day.

</td>
<td width="50%">

### What EVITA Does

EVITA does not replace lawyers — it bridges the gap. By providing immediate access to accurate, jurisdiction-specific legal information, it helps tenants understand their rights *before* they walk into court. It identifies defenses they may not know they have, explains procedures they are navigating for the first time, and connects them to the legal aid organizations that can represent them.

</td>
</tr>
</table>

**Key numbers:**
- **21,000+** tenants face eviction annually in Philadelphia
- **15K tokens** of curated legal knowledge from Philadelphia Legal Assistance
- **0 seconds** wait time vs. hours on hold for legal hotlines

---

## Team

- **Zakir Jiwani** — AI integration, prompt engineering, frontend development
- **Sri Sudersan Thopey Ganesh** — Development
- **Jerome Barnes** — Development
- **Jonathan Pyle** ([Philadelphia Legal Assistance](https://philalegal.org)) — Legal domain expertise, eviction law knowledge base

---

## Contributing

Contributions are welcome. Here are the areas where help is most needed:

- **Expanding the knowledge base** — Add eviction law for jurisdictions beyond Philadelphia
- **Voice interface** — Improve accessibility for tenants who need verbal interaction (see `prototypes` branch)
- **Multi-language support** — Serve non-English-speaking tenants (Spanish, Mandarin, Vietnamese are priorities for Philadelphia)
- **Response validation** — Integration testing with legal professionals to audit accuracy
- **RAG pipeline** — Replace static prompt injection with retrieval-augmented generation for scalability

### Getting Started

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m "Add your feature"`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## License

This project is licensed under the **GNU General Public License v3.0** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Built with purpose at the Social Justice Hackathon 2024.**

[Philadelphia Legal Assistance](https://philalegal.org) | [PhillyTenant.org](https://phillytenant.org) | [Eviction Diversion Program](https://eviction-diversion.phila.gov)

</div>
