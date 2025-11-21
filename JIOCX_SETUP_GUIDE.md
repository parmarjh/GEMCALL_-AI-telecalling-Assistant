# JioCX Voice API Integration Guide

This guide explains how to configure and use JioCX Voice API for real phone call capabilities in your application.

## Features

- **Real Phone Calls**: Make actual calls to mobile numbers
- **Click2Call (C2C)**: Connect two parties through a single API call
- **Call Status Tracking**: Monitor call progress in real-time
- **Queue Management**: Support for sequential calling
- **Dual Mode**: Switch between web-based AI calls and real phone calls

## Prerequisites

1. **JioCX Account**: Sign up at [developer.jiocx.com](https://developer.jiocx.com/)
2. **API Credentials**: Obtain from JioCX developer portal
3. **DLT Registration**: Complete DLT (Distributed Ledger Technology) registration for India

## Configuration

### Step 1: Get JioCX Credentials

1. Visit [developer.jiocx.com](https://developer.jiocx.com/)
2. Create an account or log in
3. Navigate to API Keys section
4. Generate your API credentials:
   - Organization Name
   - Username
   - Password
   - API Key
   - Sender ID
   - DLT Entity ID

### Step 2: Update Environment Variables

Copy `.env.example` to `.env.local` and fill in your credentials:

```bash
# Google Gemini API Key (for web-based AI calls)
GEMINI_API_KEY=your_gemini_api_key_here

# JioCX Voice API Credentials
JIOCX_ORGANIZATION_NAME=your_organization_name
JIOCX_USERNAME=your_username
JIOCX_PASSWORD=your_password
JIOCX_API_KEY=your_api_key
JIOCX_SENDER_ID=your_sender_id
JIOCX_DLT_ENTITY_ID=your_dlt_entity_id
JIOCX_API_BASE_URL=https://api.jiocx.com/v1
```

### Step 3: Restart Development Server

```bash
npm run dev
```

## Usage

### Making a Real Phone Call

1. **Select Call Mode**: 
   - In the Call Settings section, click "📞 Real Phone" button
   
2. **Enter Your Phone Number**:
   - Input your phone number (e.g., `+91 9876543210`)
   - This is the number JioCX will call first
   
3. **Add Contacts**:
   - Add contacts manually or import via CSV
   - Add contacts to the call queue
   
4. **Start Calling**:
   - Click "Start Queue"
   - JioCX will call your phone number first
   - Answer your phone
   - You'll automatically be connected to the contact

### How Click2Call Works

```
1. You click "Start Queue"
2. JioCX API initiates call to YOUR phone number
3. You answer your phone
4. JioCX calls the CONTACT's number
5. Once contact answers, both parties are connected
6. Conversation begins
```

### Call Flow Diagram

```
┌──────────────┐         ┌──────────────┐         ┌──────────────┐
│   Your App   │────────▶│  JioCX API   │────────▶│  Your Phone  │
└──────────────┘         └──────────────┘         └──────────────┘
                                 │                         │
                                 │                   (You answer)
                                 │                         │
                                 ▼                         ▼
                         ┌──────────────┐         ┌──────────────┐
                         │Contact Phone │◀────────│   Connected  │
                         └──────────────┘         └──────────────┘
```

## API Endpoints Used

### 1. Authentication
```
POST /auth/login
Body: { organization, username, password }
Returns: { token }
```

### 2. Click2Call
```
POST /voice/click2call
Headers: Authorization: Bearer {token}
Body: {
  from: "+91XXXXXXXXXX",    // Your phone
  to: "+91YYYYYYYYYY",      // Contact phone
  caller_id: "SENDER_ID",
  timeout: 30
}
Returns: { call_id, session_id, status }
```

### 3. Call Status
```
GET /voice/status/{call_id}
Returns: { call_id, status, message }
```

### 4. End Call
```
POST /voice/hangup/{call_id}
Returns: { success, message }
```

## Status Codes

- `initiated`: Call request sent
- `connecting`: Ringing
- `connected`: Call in progress
- `completed`: Call ended successfully
- `failed`: Call failed

## Troubleshooting

### Authentication Errors
- Verify credentials in `.env.local`
- Check organization name is correct
- Ensure API key is active

### Call Not Received
- Verify phone numbers include country code (e.g., `+91`)
- Check sender ID is registered with JioCX
- Ensure DLT Entity ID is valid

### API Errors
- Check API base URL is correct
- Verify network connectivity
- Review JioCX account status and credits

## Cost Considerations

JioCX charges per minute of call time. Check their pricing at:
- [JioCX Pricing](https://www.jiocx.com/pricing)

Typical costs:
- Domestic calls (India): ₹0.10 - 0.30 per minute
- International calls: Varies by country

## Security Best Practices

1. **Never commit `.env.local`** to version control
2. **Rotate API keys** regularly
3. **Use HTTPS** for all API calls
4. **Validate phone numbers** before calling
5. **Implement rate limiting** to prevent abuse

## Support

- **JioCX Documentation**: [developer.jiocx.com](https://developer.jiocx.com/)
- **Support Email**: support@jiocx.com
- **Developer Forum**: [community.jiocx.com](https://community.jiocx.com/)

## Alternative Integration Methods

### Outbound Dialer (OBD)
For pre-recorded messages:
```typescript
await jiocxService.initiateOutboundCall(
  toNumber,
  fromNumber,
  audioUrl  // URL to pre-recorded message
);
```

### IVR Integration
For interactive voice response, refer to JioCX IVR documentation.

## License

This integration follows your application's license. JioCX API usage is subject to JioCX terms of service.
