# Gemcall All-in-One Platform

A communication platform combining Google Gemini AI with JioCX Voice API for browser-based AI conversations and real phone calls.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?logo=typescript)](https://www.typescriptlang.org/)

## Overview

This platform offers two communication modes:

| Web Mode | Phone Mode |
|----------|------------|
| Browser-based voice chat with Gemini AI | Real phone calls via JioCX API |
| No additional costs | Per-minute charges apply |
| Instant connection | Calls to any mobile number |

## Features

**Communication**: Web-based AI calls, real phone calls, AI chatbot, seamless mode switching

**Content Generation**: Image generation, video generation, text-to-speech

**Business Tools**: Contact management, call queue system, lead generation, knowledge base with RAG

## Quick Start

### Prerequisites

- Node.js v18.0.0+
- Google Gemini API key ([Get one here](https://makersuite.google.com/app/apikey))
- JioCX credentials (optional, for phone calls)

### Installation

```bash
# Clone and navigate to project
cd gemcall

# Install dependencies
npm install

# Copy environment template
cp .env.example .env.local

# Add your API key to .env.local
# GEMINI_API_KEY=your_key_here

# Start development server
npm run dev
```

The app will be available at `http://localhost:3000`

## Configuration

### Environment Variables

```bash
# Required
GEMINI_API_KEY=your_gemini_api_key

# Optional (for phone calls)
JIOCX_ORGANIZATION_NAME=your_org
JIOCX_USERNAME=your_username
JIOCX_PASSWORD=your_password
JIOCX_API_KEY=your_api_key
JIOCX_SENDER_ID=your_sender_id
JIOCX_DLT_ENTITY_ID=your_dlt_id
```

## Usage

### Web-Based AI Calls

1. Navigate to **Live Call**
2. Select **Web Call** mode
3. Grant microphone permissions when prompted
4. Click **Start Call** to begin conversation
5. Speak naturally—the AI responds in real-time

### Phone Calls (JioCX)

1. Navigate to **Live Call**
2. Select **Real Phone** mode
3. Add contacts manually or import via CSV
4. Enter your phone number (format: `+919876543210`)
5. Add contacts to queue
6. Click **Start Queue**
7. Answer your phone when JioCX calls
8. You'll be connected to the contact

### Call Queue

The queue system supports sequential calling to multiple contacts with drag-and-drop reordering, pause/resume functionality, and skip options.

## Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                 CLIENT                                       │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │                        React + TypeScript                              │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  │  │
│  │  │  LiveCall   │  │   Chatbot   │  │  Contacts   │  │    Queue    │  │  │
│  │  │  Component  │  │  Component  │  │  Manager    │  │   Manager   │  │  │
│  │  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘  │  │
│  │         └─────────────────┴────────────────┴────────────────┘         │  │
│  │                                   │                                    │  │
│  │                          ┌────────┴────────┐                          │  │
│  │                          │   Custom Hooks  │                          │  │
│  │                          │  useLiveCall()  │                          │  │
│  │                          └────────┬────────┘                          │  │
│  └───────────────────────────────────┼───────────────────────────────────┘  │
└──────────────────────────────────────┼──────────────────────────────────────┘
                                       │
                          ┌────────────┴────────────┐
                          │                         │
               ┌──────────▼──────────┐   ┌─────────▼─────────┐
               │   Gemini Service    │   │   JioCX Service   │
               │                     │   │                   │
               │  • AI Chat          │   │  • Auth Manager   │
               │  • Voice Processing │   │  • Call Handler   │
               │  • Content Gen      │   │  • Status Tracker │
               └──────────┬──────────┘   └─────────┬─────────┘
                          │                         │
                          ▼                         ▼
               ┌────────────────────┐   ┌────────────────────┐
               │  Google Gemini API │   │   JioCX Voice API  │
               │                    │   │                    │
               │  • Gemini 2.0      │   │  • Click-to-Call   │
               │  • Real-time Audio │   │  • PSTN Network    │
               └────────────────────┘   └────────────────────┘
```

### Call Flow

**Web Mode (Gemini AI)**
```
User ──► Microphone ──► Browser ──► Gemini API ──► AI Response ──► Speakers
              ▲                                                        │
              └────────────────────────────────────────────────────────┘
                                  Real-time Loop
```

**Phone Mode (JioCX)**
```
┌─────────┐      ┌─────────┐      ┌─────────┐      ┌─────────┐
│  User   │      │  App    │      │  JioCX  │      │ Contact │
│ clicks  │─────►│ sends   │─────►│ calls   │─────►│ phone   │
│ "Call"  │      │ request │      │ user    │      │ rings   │
└─────────┘      └─────────┘      └────┬────┘      └─────────┘
                                       │
                                       ▼
                              User answers phone
                                       │
                                       ▼
                              JioCX calls contact
                                       │
                                       ▼
                              Both parties connected
```

### Data Flow

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Contacts   │────►│    Queue     │────►│  Call State  │
│   Storage    │     │   Manager    │     │   Machine    │
└──────────────┘     └──────────────┘     └──────┬───────┘
                                                  │
                     ┌────────────────────────────┼────────────────────────────┐
                     │                            │                            │
                     ▼                            ▼                            ▼
              ┌─────────────┐            ┌─────────────┐            ┌─────────────┐
              │   IDLE      │───────────►│  CALLING    │───────────►│  CONNECTED  │
              │             │            │             │            │             │
              └─────────────┘            └──────┬──────┘            └──────┬──────┘
                     ▲                          │                          │
                     │                          ▼                          │
                     │                   ┌─────────────┐                   │
                     └───────────────────│  COMPLETED  │◄──────────────────┘
                                         │  / FAILED   │
                                         └─────────────┘
```

### Tech Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| Frontend | React 19, TypeScript 5.8 | UI Components |
| Build | Vite | Dev server, bundling |
| Styling | Tailwind CSS | Utility-first CSS |
| AI | Google Gemini 2.0 | Voice AI, content generation |
| Telephony | JioCX Voice API | Real phone calls |
| Testing | Vitest, Testing Library | Unit & integration tests |

## Testing

```bash
# Run all tests
npm test

# Watch mode
npm test -- --watch

# With coverage
npm test -- --coverage
```

Current status: 11/11 tests passing

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Dev server won't start | Delete `node_modules`, run `npm install` again |
| Invalid API key | Verify `GEMINI_API_KEY` in `.env.local`, restart server |
| JioCX auth failed | Check all JioCX credentials, verify account has credits |
| Microphone not working | Check browser permissions (click lock icon in address bar) |
| Phone not ringing | Use correct format: `+919876543210` |

## Project Structure

```
gemcall/
├── components/          # React components
│   ├── LiveCall.tsx
│   └── LiveCall.test.tsx
├── services/
│   └── jiocxService.ts  # JioCX API integration
├── types/
│   └── jiocx.ts
├── hooks/
│   └── useLiveCall.ts
├── .env.example
└── vite.config.ts
```

## Documentation

- [JioCX Setup Guide](./JIOCX_SETUP_GUIDE.md)
- [Integration Summary](./JIOCX_INTEGRATION_SUMMARY.md)
- [JioCX API Docs](https://developer.jiocx.com/)
- [Google Gemini AI](https://ai.google.dev/)

## Support

**JioCX**: support@jiocx.com | [developer.jiocx.com](https://developer.jiocx.com/)

**Gemini**: [ai.google.dev](https://ai.google.dev/)

## License

MIT License. JioCX usage subject to [JioCX Terms of Service](https://www.jiocx.com/terms).
