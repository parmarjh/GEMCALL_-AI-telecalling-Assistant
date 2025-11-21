import type { JioCXCallRequest, JioCXCallResponse, JioCXConfig } from '../types/jiocx';

/**
 * JioCX Voice API Service
 * 
 * This service handles real phone call integration with JioCX Voice API
 * Features: Click2Call, Outbound calling, Call status tracking
 */
class JioCXVoiceService {
    private config: JioCXConfig;
    private authToken: string | null = null;

    constructor(config: JioCXConfig) {
        this.config = config;
    }

    /**
     * Authenticate with JioCX API
     */
    private async authenticate(): Promise<string> {
        try {
            const response = await fetch(`${this.config.apiBaseUrl}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    organization: this.config.organizationName,
                    username: this.config.username,
                    password: this.config.password,
                }),
            });

            if (!response.ok) {
                throw new Error(`Authentication failed: ${response.statusText}`);
            }

            const data = await response.json();
            this.authToken = data.token || data.accessToken;
            return this.authToken;
        } catch (error) {
            console.error('JioCX Authentication Error:', error);
            throw error;
        }
    }

    /**
     * Get authentication headers
     */
    private async getHeaders(): Promise<HeadersInit> {
        if (!this.authToken) {
            await this.authenticate();
        }

        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.authToken}`,
            'X-API-Key': this.config.apiKey,
            'X-Sender-ID': this.config.senderId,
        };
    }

    /**
     * Initiate a Click2Call (C2C) request
     * This will make JioCX call both numbers and connect them
     */
    async initiateClick2Call(request: JioCXCallRequest): Promise<JioCXCallResponse> {
        try {
            const headers = await this.getHeaders();

            const response = await fetch(`${this.config.apiBaseUrl}/voice/click2call`, {
                method: 'POST',
                headers,
                body: JSON.stringify({
                    from: request.from,
                    to: request.to,
                    caller_id: request.callerId || this.config.senderId,
                    timeout: request.timeout || 30,
                    webhook_url: request.webhookUrl,
                    custom_params: request.customParams,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                return {
                    success: false,
                    error: data.message || 'Call initiation failed',
                    message: data.message,
                };
            }

            return {
                success: true,
                callId: data.call_id || data.callId,
                sessionId: data.session_id || data.sessionId,
                status: 'initiated',
                message: 'Call initiated successfully',
            };
        } catch (error) {
            console.error('JioCX Click2Call Error:', error);
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error',
            };
        }
    }

    /**
     * Initiate an outbound call with pre-recorded message or live agent
     */
    async initiateOutboundCall(
        toNumber: string,
        fromNumber: string,
        audioUrl?: string
    ): Promise<JioCXCallResponse> {
        try {
            const headers = await this.getHeaders();

            const response = await fetch(`${this.config.apiBaseUrl}/voice/outbound`, {
                method: 'POST',
                headers,
                body: JSON.stringify({
                    to: toNumber,
                    from: fromNumber,
                    caller_id: this.config.senderId,
                    audio_url: audioUrl,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                return {
                    success: false,
                    error: data.message || 'Outbound call failed',
                };
            }

            return {
                success: true,
                callId: data.call_id || data.callId,
                status: 'initiated',
            };
        } catch (error) {
            console.error('JioCX Outbound Call Error:', error);
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error',
            };
        }
    }

    /**
     * Get call status
     */
    async getCallStatus(callId: string): Promise<JioCXCallResponse> {
        try {
            const headers = await this.getHeaders();

            const response = await fetch(
                `${this.config.apiBaseUrl}/voice/status/${callId}`,
                {
                    method: 'GET',
                    headers,
                }
            );

            const data = await response.json();

            if (!response.ok) {
                return {
                    success: false,
                    error: 'Failed to get call status',
                };
            }

            return {
                success: true,
                callId: data.call_id,
                status: data.status,
                message: data.message,
            };
        } catch (error) {
            console.error('JioCX Status Check Error:', error);
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error',
            };
        }
    }

    /**
     * End an active call
     */
    async endCall(callId: string): Promise<JioCXCallResponse> {
        try {
            const headers = await this.getHeaders();

            const response = await fetch(
                `${this.config.apiBaseUrl}/voice/hangup/${callId}`,
                {
                    method: 'POST',
                    headers,
                }
            );

            const data = await response.json();

            return {
                success: response.ok,
                message: data.message || 'Call ended',
            };
        } catch (error) {
            console.error('JioCX End Call Error:', error);
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error',
            };
        }
    }
}

// Create singleton instance
let jioCXService: JioCXVoiceService | null = null;

export function getJioCXService(): JioCXVoiceService {
    if (!jioCXService) {
        const config: JioCXConfig = {
            organizationName: process.env.JIOCX_ORGANIZATION_NAME || '',
            username: process.env.JIOCX_USERNAME || '',
            password: process.env.JIOCX_PASSWORD || '',
            apiKey: process.env.JIOCX_API_KEY || '',
            senderId: process.env.JIOCX_SENDER_ID || '',
            dltEntityId: process.env.JIOCX_DLT_ENTITY_ID || '',
            apiBaseUrl: process.env.JIOCX_API_BASE_URL || 'https://api.jiocx.com/v1',
        };

        jioCXService = new JioCXVoiceService(config);
    }

    return jioCXService;
}

export default JioCXVoiceService;
