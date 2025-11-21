<div align="center">

# 🚀 Gemini All-in-One Platform with JioCX Integration

**A powerful AI-powered communication platform combining Google Gemini AI with real phone calling capabilities**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?logo=typescript)](https://www.typescriptlang.org/)
[![JioCX](https://img.shields.io/badge/JioCX-Integrated-orange)](https://developer.jiocx.com/)

[Features](#-features) • [Quick Start](#-quick-start-algorithm) • [Usage](#-usage-algorithms) • [Documentation](#-documentation) • [Support](#-support)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Architecture](#-architecture)
- [Quick Start Algorithm](#-quick-start-algorithm)
- [Usage Algorithms](#-usage-algorithms)
- [Testing](#-testing)
- [Configuration](#-configuration)
- [Troubleshooting](#-troubleshooting)
- [Documentation](#-documentation)
- [Support](#-support)

---

## 🎯 Overview

This platform combines the power of **Google Gemini AI** with **JioCX Voice API** to deliver a comprehensive communication solution. Whether you need AI-powered voice conversations through your browser or real phone calls to mobile numbers, this platform has you covered.

### Dual-Mode Communication System

```
┌─────────────────────────────────────────────────────────────┐
│                    GEMINI ALL-IN-ONE PLATFORM               │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────────┐      ┌─────────────────────┐     │
│  │   🌐 WEB MODE       │      │   📞 PHONE MODE     │     │
│  │                     │      │                     │     │
│  │  Browser ──▶ Gemini │      │  App ──▶ JioCX API  │     │
│  │  Audio ◀── AI       │      │  Phone ◀── Network  │     │
│  │                     │      │                     │     │
│  │  No costs           │      │  Per-minute charges │     │
│  │  Instant connection │      │  Real phone calls   │     │
│  └─────────────────────┘      └─────────────────────┘     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## ✨ Features

### 🗣️ Communication Features
- **🌐 Web-Based AI Calls**: Browser-based voice chat powered by Google Gemini 2.0
- **📞 Real Phone Calls**: Make actual phone calls to any mobile number via JioCX Voice API
- **🤖 AI Chatbot**: Intelligent text-based conversations with context awareness
- **💬 Dual Mode Toggle**: Seamlessly switch between web and phone modes

### 🎨 Content Generation
- **🖼️ Image Generation**: Create stunning images from text descriptions
- **🎬 Video Generation**: Generate videos using AI
- **🔊 Text-to-Speech**: Convert text to natural-sounding audio
- **📝 Content Creation**: AI-powered content writing

### 📊 Business Features
- **📞 Contact Management**: Organize and manage contacts with ease
- **📋 Call Queue System**: Sequential calling with drag-and-drop reordering
- **📈 Lead Generation**: Collect and manage leads efficiently
- **📚 Knowledge Base**: RAG-powered document Q&A system
- **🔍 Grounded Search**: Web-search enhanced AI responses

### 🛠️ Technical Features
- **⚡ Real-time Status**: Live call status updates
- **🔒 Secure**: Environment-based credential management
- **🧪 Tested**: Comprehensive test suite (11/11 passing)
- **📱 Responsive**: Works on desktop and mobile browsers
- **🎨 Modern UI**: Clean, intuitive interface

---

## 🏗️ Architecture

### System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         FRONTEND (React + TypeScript)            │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌────────────┐  ┌─────────────┐  ┌──────────────┐            │
│  │  LiveCall  │  │  Chatbot    │  │   Queue      │            │
│  │ Component  │  │  Component  │  │  Management  │            │
│  └─────┬──────┘  └──────┬──────┘  └──────┬───────┘            │
│        │                │                 │                     │
│        └────────────────┼─────────────────┘                     │
│                         │                                        │
├─────────────────────────┼────────────────────────────────────────┤
│                    SERVICE LAYER                                 │
├─────────────────────────┼────────────────────────────────────────┤
│                         │                                        │
│        ┌────────────────┴────────────────┐                      │
│        │                                  │                      │
│   ┌────▼─────┐                    ┌──────▼──────┐              │
│   │  Gemini  │                    │   JioCX     │              │
│   │ Service  │                    │   Service   │              │
│   └────┬─────┘                    └──────┬──────┘              │
│        │                                  │                      │
└────────┼──────────────────────────────────┼──────────────────────┘
         │                                  │
         ▼                                  ▼
┌────────────────────┐           ┌────────────────────┐
│  Google Gemini API │           │   JioCX Voice API  │
│  (Web AI Calls)    │           │  (Real Phone Calls)│
└────────────────────┘           └────────────────────┘
```

### Call Flow Architecture

**Web Mode Flow:**
```
User → Browser → Gemini AI → Audio Response → Browser Speakers
  └─▶ Microphone Input ──────────┘
```

**Phone Mode Flow:**
```
1. User selects contact & enters their phone number
          ↓
2. App sends request to JioCX API
          ↓
3. JioCX calls user's phone number
          ↓
4. User answers their phone
          ↓
5. JioCX calls contact's phone number
          ↓
6. Contact answers
          ↓
7. Both parties connected via JioCX network
```

---

## 🚀 Quick Start Algorithm

### **ALGORITHM:** Initial Setup and Launch

**Prerequisites:**
- ✅ Node.js v18.0.0 or higher ([Download](https://nodejs.org/))
- ✅ npm (comes with Node.js)
- ✅ Modern web browser (Chrome, Firefox, Safari, Edge)
- ✅ Google Gemini API key ([Get one](https://makersuite.google.com/app/apikey))

**Step-by-Step Setup:**

```bash
# ═══════════════════════════════════════════════════════════
# STEP 1: Clone or Navigate to Project Directory
# ═══════════════════════════════════════════════════════════
cd d:\181125\gemcall

# ═══════════════════════════════════════════════════════════
# STEP 2: Install Dependencies
# ═══════════════════════════════════════════════════════════
npm install
# ⏱️ Time: ~2-3 minutes depending on internet speed
# 📦 Installs: React, Gemini AI SDK, TypeScript, Vite, Testing libraries

# ═══════════════════════════════════════════════════════════
# STEP 3: Configure Environment Variables
# ═══════════════════════════════════════════════════════════

# 3.1 - Copy the template file
Copy-Item .env.example .env.local

# 3.2 - Open .env.local in your editor and add your Gemini API key
# Required for basic functionality:
GEMINI_API_KEY=your_actual_gemini_api_key_here

# Optional (for phone call features):
JIOCX_ORGANIZATION_NAME=your_org
JIOCX_USERNAME=your_username
JIOCX_PASSWORD=your_password
JIOCX_API_KEY=your_api_key
JIOCX_SENDER_ID=your_sender_id
JIOCX_DLT_ENTITY_ID=your_dlt_id

# ═══════════════════════════════════════════════════════════
# STEP 4: Start Development Server
# ═══════════════════════════════════════════════════════════
npm run dev
# ⏱️ Server starts in ~5 seconds
# 🌐 Default URL: http://localhost:3000

# ═══════════════════════════════════════════════════════════
# STEP 5: Open in Browser
# ═══════════════════════════════════════════════════════════
# Navigate to: http://localhost:3000
# You should see the application homepage
```

### **Verification Checklist**

After completing setup, verify:

- [ ] ✅ Server running without errors
- [ ] ✅ Application loads in browser
- [ ] ✅ No console errors (press F12 to check)
- [ ] ✅ Can access different features (Chatbot, Live Call, etc.)
- [ ] ✅ Gemini API key is working (test with chatbot)

---

## 📖 Usage Algorithms

### **ALGORITHM 1:** Using Web-Based AI Voice Calls

**Objective:** Have a voice conversation with Gemini AI through your browser

```
┌─────────────────────────────────────────────────────┐
│         WEB-BASED AI VOICE CALL ALGORITHM           │
└─────────────────────────────────────────────────────┘

STEP 1: Navigate to Live Call Feature
   ↓
   └─▶ Click "Live Call" in navigation menu

STEP 2: Select Web Mode
   ↓
   └─▶ Click "🌐 Web Call" button in Call Settings
   └─▶ Verify button is highlighted/active

STEP 3: Grant Microphone Permissions
   ↓
   └─▶ Browser will prompt for microphone access
   └─▶ Click "Allow" or "Grant permission"
   └─▶ Verify microphone icon shows as active

STEP 4: Start Conversation
   ↓
   └─▶ Click "Start Call" button
   └─▶ Wait for Gemini AI to connect (~2-3 seconds)
   └─▶ You'll hear a greeting from the AI

STEP 5: Speak Naturally
   ↓
   └─▶ Speak into your microphone
   └─▶ AI will process and respond
   └─▶ Conversation continues in real-time

STEP 6: End Call
   ↓
   └─▶ Click "End Call" button
   └─▶ Call terminates immediately

STATUS INDICATORS:
• 🟢 Green = Connected and active
• 🟡 Yellow = Connecting...
• 🔴 Red = Disconnected or error
```

**Web Mode Features:**
- ✅ Instant connection (no phone required)
- ✅ No costs beyond API usage
- ✅ Works anywhere with internet
- ✅ AI-powered responses
- ✅ Natural language understanding

---

### **ALGORITHM 2:** Making Real Phone Calls (JioCX Mode)

**Objective:** Make a real phone call to a mobile number through the app

**Prerequisites:**
- ✅ JioCX account configured
- ✅ JioCX credentials in `.env.local`
- ✅ Valid phone number with country code
- ✅ Sufficient JioCX credits

```
┌─────────────────────────────────────────────────────┐
│         REAL PHONE CALL ALGORITHM (JioCX)           │
└─────────────────────────────────────────────────────┘

STEP 1: Navigate to Live Call Feature
   ↓
   └─▶ Click "Live Call" from navigation menu

STEP 2: Switch to Phone Mode
   ↓
   └─▶ Click "📞 Real Phone" button in Call Settings
   └─▶ Verify button is highlighted
   └─▶ Phone number input field should appear

STEP 3: Add/Select Contacts
   ↓
   ├─▶ OPTION A: Add Contact Manually
   │   └─▶ Click "Add Contact" button
   │   └─▶ Enter: Name, Phone (+91XXXXXXXXXX), Email
   │   └─▶ Click "Save"
   │
   └─▶ OPTION B: Import from CSV
       └─▶ Click "Import CSV" button
       └─▶ Select CSV file (format: name,phone,email)
       └─▶ Click "Upload"

STEP 4: Enter Your Phone Number
   ↓
   └─▶ Find "Your Phone Number" input field
   └─▶ Enter your number with country code
   └─▶ Format: +91 9876543210 (for India)
   └─▶ This is the number JioCX will call FIRST

STEP 5: Add Contact to Queue
   ↓
   └─▶ Select contact from list (checkbox)
   └─▶ Click "Add to Queue" button
   └─▶ Contact appears in call queue
   └─▶ Repeat for multiple contacts if needed

STEP 6: Start Calling
   ↓
   └─▶ Review queue order (drag to reorder if needed)
   └─▶ Click "Start Queue" button
   └─▶ Status changes to "Initiating call..."

STEP 7: Answer Your Phone
   ↓
   └─▶ JioCX will call YOUR phone number
   └─▶ You'll receive a call (typically within 5-10 seconds)
   └─▶ Answer the call
   └─▶ Status updates to "Connecting to contact..."

STEP 8: Wait for Contact Connection
   ↓
   └─▶ JioCX automatically calls the CONTACT's number
   └─▶ Status shows "Calling [Contact Name]..."
   └─▶ You'll hear ringtone

STEP 9: Conversation Begins
   ↓
   └─▶ When contact answers, you're connected
   └─▶ Status shows "Connected"
   └─▶ Start your conversation
   └─▶ Timer shows call duration

STEP 10: End Call
   ↓
   ├─▶ OPTION A: Click "End Call" in app
   │   └─▶ Both parties disconnected
   │
   └─▶ OPTION B: Hang up on phone
       └─▶ Call ends naturally
       └─▶ App shows "Call completed"

STEP 11: Queue Continuation (if multiple contacts)
   ↓
   └─▶ After first call ends, queue moves to next contact
   └─▶ Process repeats from STEP 7
   └─▶ Continue until queue is empty

CALL STATUS FLOW:
initiated → connecting → ringing → connected → completed
              ↓
           failed (if error)
```

**Phone Mode Features:**
- ✅ Real phone calls to any mobile number
- ✅ Queue system for multiple contacts
- ✅ Call status tracking
- ✅ Automatic sequential calling
- ✅ Professional caller ID display

---

### **ALGORITHM 3:** Contact Management

**Objective:** Organize and manage your contact list

```
┌─────────────────────────────────────────────────────┐
│           CONTACT MANAGEMENT ALGORITHM              │
└─────────────────────────────────────────────────────┘

ADDING CONTACTS:

Method 1: Manual Entry
   1. Click "+ Add Contact"
   2. Fill in details:
      • Name: Required
      • Phone: Required (with country code)
      • Email: Optional
   3. Click "Save"
   4. Contact appears in list

Method 2: CSV Import
   1. Prepare CSV file with headers: name,phone,email
   2. Click "Import CSV"
   3. Select your file
   4. Review preview
   5. Click "Confirm Import"
   6. All contacts added to list

ORGANIZING CONTACTS:

Search/Filter:
   └─▶ Use search box to find contacts by name
   └─▶ Type name → Results filter in real-time

Sort Contacts:
   └─▶ Click column headers to sort
   └─▶ Name (A-Z, Z-A)
   └─▶ Recent activity

EDITING CONTACTS:

   1. Find contact in list
   2. Click "Edit" icon (pencil)
   3. Modify fields
   4. Click "Save Changes"

DELETING CONTACTS:

Single Contact:
   └─▶ Click "Delete" icon (trash)
   └─▶ Confirm deletion
   └─▶ Contact removed

Multiple Contacts:
   └─▶ Select checkboxes for contacts
   └─▶ Click "Delete Selected"
   └─▶ Confirm bulk deletion

Clear All:
   └─▶ Click "Clear All Contacts"
   └─▶ Confirm (⚠️ This cannot be undone!)
   └─▶ All contacts removed
```

---

### **ALGORITHM 4:** Using Call Queue System

**Objective:** Manage sequential calling for multiple contacts

```
┌─────────────────────────────────────────────────────┐
│            CALL QUEUE MANAGEMENT ALGORITHM          │
└─────────────────────────────────────────────────────┘

BUILDING THE QUEUE:

STEP 1: Add Contacts to Queue
   ↓
   └─▶ Select contacts (checkboxes)
   └─▶ Click "Add to Queue"
   └─▶ Contacts appear in queue panel

STEP 2: Reorder Queue (Optional)
   ↓
   └─▶ Drag and drop contacts to reorder
   └─▶ Top contact will be called first

STEP 3: Review Queue
   ↓
   └─▶ Check contact order
   └─▶ Verify phone numbers
   └─▶ Remove unwanted contacts if needed

EXECUTING THE QUEUE:

STEP 4: Start Queue
   ↓
   └─▶ Ensure your phone number is entered
   └─▶ Click "Start Queue" button
   └─▶ First contact call initiates

STEP 5: Process First Contact
   ↓
   └─▶ Answer your phone
   └─▶ Wait for connection to contact
   └─▶ Have conversation
   └─▶ End call when done

STEP 6: Automatic Progression
   ↓
   └─▶ After call ends, queue moves to next contact
   └─▶ New call initiates automatically
   └─▶ Repeat STEP 5

STEP 7: Queue Completion
   ↓
   └─▶ When last contact is called
   └─▶ Queue shows "All calls completed"
   └─▶ Review call history

QUEUE CONTROLS:

Pause Queue:
   └─▶ Click "Pause" during calling
   └─▶ Current call continues
   └─▶ Next call won't start automatically

Resume Queue:
   └─▶ Click "Resume"
   └─▶ Queue continues after current call

Skip Contact:
   └─▶ Click "Skip" next to contact
   └─▶ Contact removed from queue
   └─▶ Moves to next contact

Clear Queue:
   └─▶ Click "Clear Queue"
   └─▶ Confirm action
   └─▶ All contacts removed from queue
   └─▶ Ongoing call not affected
```

---

## 🧪 Testing

### **ALGORITHM:** Running Tests

```bash
# ═══════════════════════════════════════════════════════════
# Run All Tests
# ═══════════════════════════════════════════════════════════
npm test

# Expected output:
# ✓ App renders without crashing
# ✓ LiveCall component renders correctly
# ✓ Contact management works
# ✓ Queue management works
# ✓ Delete/Clear functions work
# ... (11 total tests)

# ═══════════════════════════════════════════════════════════
# Run Tests in Watch Mode (for development)
# ═══════════════════════════════════════════════════════════
npm test -- --watch

# ═══════════════════════════════════════════════════════════
# Run Tests with Coverage
# ═══════════════════════════════════════════════════════════
npm test -- --coverage
```

### Test Coverage

**Current Status:** ✅ 11/11 tests passing

- ✅ Component rendering
- ✅ Web call functionality
- ✅ Phone call integration
- ✅ Contact management
- ✅ Queue management
- ✅ State management
- ✅ Error handling

---

## ⚙️ Configuration

### Environment Variables Reference

Create `.env.local` file in project root:

```bash
# ═══════════════════════════════════════════════════════════
# GOOGLE GEMINI CONFIGURATION (Required for basic features)
# ═══════════════════════════════════════════════════════════
GEMINI_API_KEY=AIzaSy...your_actual_api_key_here
# Get your key: https://makersuite.google.com/app/apikey

# ═══════════════════════════════════════════════════════════
# JIOCX VOICE API CONFIGURATION (Optional - for phone calls)
# ═══════════════════════════════════════════════════════════

# Organization Details
JIOCX_ORGANIZATION_NAME=your_organization_name
# Example: mycompany

# Authentication Credentials
JIOCX_USERNAME=your_username
# Your JioCX portal username

JIOCX_PASSWORD=your_password
# Your JioCX portal password

JIOCX_API_KEY=your_api_key
# Get from JioCX developer portal

# Caller ID Configuration
JIOCX_SENDER_ID=your_registered_sender_id
# This will be shown as caller ID
# Must be registered with JioCX

# DLT (Distributed Ledger Technology) - Required for India
JIOCX_DLT_ENTITY_ID=your_dlt_entity_id
# Get from DLT portal after registration

# API Endpoint (Usually no change needed)
JIOCX_API_BASE_URL=https://api.jiocx.com/v1
# Contact JioCX support if different endpoint needed
```

### Configuration Mode Reference

| Mode | Required Variables | Features Available |
|------|-------------------|-------------------|
| **Basic** | `GEMINI_API_KEY` | Web AI calls, Chatbot, Image/Video generation |
| **Full** | `GEMINI_API_KEY` + all JioCX vars | All features + Real phone calls |

---

## 🔧 Troubleshooting

### Common Issues and Solutions

#### **Issue 1: "Failed to start dev server"**

**Symptoms:**
```
Error: Cannot find module 'vite'
```

**Solution:**
```bash
# Delete node_modules and reinstall
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
npm run dev
```

---

#### **Issue 2: "Gemini API key invalid"**

**Symptoms:**
- Error message: "Invalid API key"
- AI features not working

**Solution:**
1. Verify API key is correct
2. Check `.env.local` has correct variable name: `GEMINI_API_KEY`
3. No quotes around API key needed
4. Restart dev server after changing `.env.local`
5. Get new key: https://makersuite.google.com/app/apikey

---

#### **Issue 3: "JioCX authentication failed"**

**Symptoms:**
- Phone call button disabled
- Error: "Failed to authenticate with JioCX"

**Solution:**
```bash
# Checklist:
# ✓ All JioCX variables set in .env.local
# ✓ Organization name is correct (case-sensitive)
# ✓ Username and password are correct
# ✓ API key is active (check JioCX portal)
# ✓ Account has sufficient credits
# ✓ Dev server restarted after adding variables

# Test authentication:
# 1. Open browser console (F12)
# 2. Switch to Phone mode
# 3. Check console for detailed error messages
```

---

#### **Issue 4: "Microphone not working"**

**Symptoms:**
- Can't hear user's voice
- Microphone permission denied

**Solution:**
1. **Chrome/Edge:**
   - Click 🔒 icon in address bar
   - Find "Microphone" setting
   - Change to "Allow"
   - Refresh page

2. **Firefox:**
   - Click 🔒 icon in address bar
   - Permissions → Microphone → Allow
   - Refresh page

3. **Check system:**
   - Windows: Settings → Privacy → Microphone → On
   - Verify browser has microphone access

---

#### **Issue 5: "Not receiving phone calls"**

**Symptoms:**
- Status shows "connecting" but phone doesn't ring
- Call fails after timeout

**Solution:**

**Check phone number format:**
```
❌ Wrong: 9876543210
❌ Wrong: 91-9876543210
❌ Wrong: (91) 9876543210
✅ Correct: +919876543210
✅ Correct: +91 9876543210
```

**Verify JioCX settings:**
- Sender ID is registered and active
- DLT Entity ID is valid (for India)
- Account has sufficient credits
- Phone number is not in DND (Do Not Disturb) registry

**Test with JioCX portal:**
1. Login to developer.jiocx.com
2. Try test call from portal
3. If portal works, issue is in app configuration
4. If portal fails, contact JioCX support

---

#### **Issue 6: "Tests failing"**

**Symptoms:**
```
FAIL  App.test.tsx
  × renders without errors
```

**Solution:**
```bash
# Clear test cache
npm test -- --clearCache

# Reinstall testing dependencies
npm install --save-dev @testing-library/react @testing-library/jest-dom vitest jsdom

# Run tests again
npm test
```

---

### Debug Mode

**Enable detailed logging:**

1. Open browser developer tools (F12)
2. Go to Console tab
3. Look for application logs
4. Filter by error level

**Common error codes:**

| Code | Meaning | Solution |
|------|---------|----------|
| `GEMINI_404` | API endpoint not found | Check API key, restart server |
| `JIOCX_401` | Authentication failed | Verify credentials in `.env.local` |
| `JIOCX_403` | Insufficient permissions | Check account status, sender ID |
| `JIOCX_429` | Rate limit exceeded | Wait and retry, contact JioCX |
| `NETWORK_ERROR` | Connection failed | Check internet, firewall settings |

---

## 📚 Documentation

### Additional Resources

- **[JioCX Setup Guide](./JIOCX_SETUP_GUIDE.md)** - Detailed JioCX configuration
- **[Integration Summary](./JIOCX_INTEGRATION_SUMMARY.md)** - Technical implementation details
- **[JioCX API Documentation](https://developer.jiocx.com/)** - Official API docs
- **[Google Gemini AI](https://ai.google.dev/)** - Gemini AI documentation

### Project Structure

```
gemcall/
├── components/           # React components
│   ├── LiveCall.tsx     # Main call interface
│   ├── LiveCall.test.tsx # Component tests
│   └── ...
├── services/            # API services
│   └── jiocxService.ts  # JioCX API integration
├── types/               # TypeScript types
│   └── jiocx.ts        # JioCX type definitions
├── hooks/               # Custom React hooks
│   └── useLiveCall.ts  # Call management hook
├── utils/               # Utility functions
├── .env.example         # Environment template
├── .env.local          # Your configuration (create this)
├── package.json        # Dependencies
├── vite.config.ts      # Vite configuration
└── README.md           # This file
```

---

## 🆘 Support

### Getting Help

**For JioCX Issues:**
- 📧 Email: support@jiocx.com
- 🌐 Portal: [developer.jiocx.com](https://developer.jiocx.com/)
- 💬 Community: [community.jiocx.com](https://community.jiocx.com/)

**For Gemini Issues:**
- 📖 Documentation: [ai.google.dev](https://ai.google.dev/)
- 🐛 Issue Tracker: Google AI GitHub

**For Application Issues:**
- 🐛 Report bugs: Create an issue in the repository
- 💡 Feature requests: Open a discussion
- 📖 Check existing documentation first

### Frequently Asked Questions

**Q: Do I need JioCX to use this app?**
- A: No! The app works with web-based AI calls using only Gemini API. JioCX is optional for real phone calling.

**Q: How much does JioCX cost?**
- A: Typically ₹0.10-0.30 per minute for India domestic calls. Check [JioCX pricing](https://www.jiocx.com/pricing).

**Q: Can I use this for spam calling?**
- A: No. This violates JioCX terms of service and is illegal. Use responsibly for legitimate business purposes only.

**Q: What countries are supported?**
- A: Gemini AI works globally. JioCX primarily supports India, but check their documentation for international coverage.

**Q: Is my data secure?**
- A: Yes. All credentials are stored locally in `.env.local` (never committed). API calls use HTTPS encryption.

---

## 📝 License

This project is licensed under the MIT License. JioCX API usage is subject to [JioCX Terms of Service](https://www.jiocx.com/terms).

---

## 🙏 Acknowledgments

- **Google Gemini AI** - For powerful AI capabilities
- **JioCX** - For voice API integration
- **React Team** - For the amazing framework
- **Vite** - For lightning-fast development

---

<div align="center">

**Made with ❤️ using Google Gemini AI and JioCX Voice API**

[⬆ Back to Top](#-gemini-all-in-one-platform-with-jiocx-integration)

</div>
