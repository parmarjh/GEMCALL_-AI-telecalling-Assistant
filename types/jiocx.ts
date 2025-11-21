export interface JioCXCallRequest {
    from: string; // Your JioCX number
    to: string; // Destination number
    callerId?: string;
    timeout?: number;
    webhookUrl?: string;
    customParams?: Record<string, any>;
}

export interface JioCXCallResponse {
    success: boolean;
    callId?: string;
    message?: string;
    sessionId?: string;
    status?: 'initiated' | 'connecting' | 'connected' | 'failed' | 'completed';
    error?: string;
}

export interface JioCXConfig {
    organizationName: string;
    username: string;
    password: string;
    apiKey: string;
    senderId: string;
    dltEntityId: string;
    apiBaseUrl: string;
}
