# EVITA — AI Legal Assistant for Tenants Facing Eviction

[![Live Demo](https://img.shields.io/badge/Live_Demo-evictionchatbot.vercel.app-000000?style=flat&logo=vercel&logoColor=white)](https://evictionchatbot.vercel.app)
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
[![React](https://img.shields.io/badge/React-18.2-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4-412991?logo=openai&logoColor=white)](https://openai.com/)

**Built in partnership with [Philadelphia Legal Assistance](https://philalegal.org) to help tenants facing eviction navigate the legal system.**

> Over 21,000 tenants in Philadelphia face eviction each year. Legal assistance hotlines are understaffed and underfunded — many callers wait on hold for hours before reaching an advocate. EVITA provides immediate, knowledgeable assistance to tenants navigating the eviction process.

**[Try the live demo](https://evictionchatbot.vercel.app)**

---

## The Problem

Tenants facing eviction in Philadelphia need quick access to accurate legal information — their rights, court procedures, defense strategies, and available resources. The existing system depends on overwhelmed hotlines that can't meet demand. Many tenants miss critical deadlines or fail to exercise their rights simply because they couldn't get through to an advocate in time.

## The Solution

EVITA is an AI-powered chatbot trained on Philadelphia-specific eviction law, the Eviction Diversion Program, tenant rights and protections, court procedures, and legal defense strategies. It provides:

- **Immediate responses** to eviction-related legal questions — no hold times
- **Status assessment** through conversational intake to determine where a tenant stands in the eviction process
- **Appointment scheduling** from available legal assistance slots
- **Resource referrals** to Philadelphia Legal Assistance, Community Legal Services, and tenant rights organizations

The system prompt contains a comprehensive knowledge base consolidated from materials provided by Philadelphia Legal Assistance, covering the full eviction process from initial notice through appeal.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite 5 |
| Styling | Tailwind CSS 3 |
| AI | OpenAI GPT-4 |
| Deployment | Vercel |
| Knowledge Base | Custom legal prompt (~15K tokens of Philadelphia eviction law) |

## Project Structure

```
evictionchatbot/
├── src/
│   ├── App.jsx          # Root layout
│   ├── Chatbot.jsx      # Core chat interface + OpenAI integration
│   ├── Loader.jsx       # Loading state component
│   ├── prompt.txt       # Legal knowledge base (eviction law, procedures, rights)
│   └── main.jsx         # Entry point
├── public/
├── index.html
├── vite.config.js
├── tailwind.config.js
└── package.json
```

## Getting Started

```bash
# Clone the repository
git clone https://github.com/JiwaniZakir/evictionchatbot.git
cd evictionchatbot

# Install dependencies
npm install

# Set up environment variables
echo "VITE_API_KEY=your_openai_api_key" > .env

# Start development server
npm run dev
```

## Data Sources

- **Legal knowledge**: Materials provided by Philadelphia Legal Assistance, covering the Eviction Diversion Program, court procedures, tenant rights, and defense strategies
- **Code violations**: [OpenDataPhilly](https://opendataphilly.org) code violations dataset
- **Court dockets**: Philadelphia Legal Assistance eviction court dockets API
- **Scheduling**: Google Calendar API integration

## Team

- **Zakir Jiwani** — AI integration, prompt engineering, frontend development
- **Sri Sudersan Thopey Ganesh** — Development
- **Jerome Barnes** — Development
- **Jonathan Pyle** ([Philadelphia Legal Assistance](https://philalegal.org)) — Legal domain expertise, eviction law knowledge base

## Context

EVITA was built at the Social Justice Hackathon 2024 in partnership with Philadelphia Legal Assistance. The project explores whether LLM-powered chatbots can meaningfully assist tenants facing eviction — reducing the burden on understaffed legal hotlines while ensuring people get accurate, timely information about their rights and options.

## Contributing

Contributions are welcome. Areas where help is needed:

- **Expanding the knowledge base** with additional jurisdictions beyond Philadelphia
- **Voice interface** for accessibility (see `prototypes` branch for early work)
- **Multi-language support** for non-English-speaking tenants
- **Integration testing** with legal professionals to validate response accuracy

## License

This project is licensed under the GNU General Public License v3.0 — see [LICENSE](LICENSE) for details.
