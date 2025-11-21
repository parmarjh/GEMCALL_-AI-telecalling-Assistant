
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useLiveCall } from './useLiveCall';

// Mock the @google/genai module
const mockConnect = vi.fn();
const mockClose = vi.fn();
const mockSendRealtimeInput = vi.fn();

vi.mock('@google/genai', () => {
    return {
        GoogleGenAI: vi.fn().mockImplementation(() => ({
            live: {
                connect: mockConnect.mockResolvedValue({
                    close: mockClose,
                    sendRealtimeInput: mockSendRealtimeInput,
                }),
            },
        })),
        Modality: {
            AUDIO: 'AUDIO',
        },
    };
});

// Mock navigator.mediaDevices
const mockAudioTrack = { stop: vi.fn(), enabled: true };
Object.defineProperty(global.navigator, 'mediaDevices', {
    value: {
        getUserMedia: vi.fn().mockResolvedValue({
            getTracks: () => [mockAudioTrack],
            getAudioTracks: () => [mockAudioTrack],
        }),
    },
    writable: true,
});

// Mock AudioContext
window.AudioContext = vi.fn().mockImplementation(() => ({
    createGain: vi.fn().mockReturnValue({ connect: vi.fn() }),
    createMediaStreamSource: vi.fn().mockReturnValue({ connect: vi.fn(), disconnect: vi.fn() }),
    createScriptProcessor: vi.fn().mockReturnValue({
        connect: vi.fn(),
        disconnect: vi.fn(),
        onaudioprocess: null,
    }),
    destination: {},
    close: vi.fn().mockResolvedValue(undefined),
    state: 'running',
}));

describe('useLiveCall Hook', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        mockAudioTrack.enabled = true; // Reset track state
    });

    it('initializes with default state', () => {
        const { result } = renderHook(() => useLiveCall('test-api-key'));
        expect(result.current.isCalling).toBe(false);
        expect(result.current.activeContact).toBeNull();
        expect(result.current.isMuted).toBe(false);
        expect(result.current.isVideoEnabled).toBe(false);
    });

    it('starts a call correctly', async () => {
        const { result } = renderHook(() => useLiveCall('test-api-key'));
        const contact = { id: '1', name: 'Test User', phone: '1234567890' };

        await act(async () => {
            await result.current.startCall(contact, 'Kore');
        });

        expect(result.current.isCalling).toBe(true);
        expect(result.current.activeContact).toEqual(contact);
        expect(mockConnect).toHaveBeenCalled();
    });

    it('stops a call correctly', async () => {
        const { result } = renderHook(() => useLiveCall('test-api-key'));
        const contact = { id: '1', name: 'Test User', phone: '1234567890' };

        await act(async () => {
            await result.current.startCall(contact, 'Kore');
        });

        await act(async () => {
            result.current.stopCall();
        });

        expect(result.current.isCalling).toBe(false);
        expect(result.current.activeContact).toBeNull();
    });

    it('toggles mute', async () => {
        const { result } = renderHook(() => useLiveCall('test-api-key'));
        const contact = { id: '1', name: 'Test User', phone: '1234567890' };

        await act(async () => {
            await result.current.startCall(contact, 'Kore');
        });

        act(() => {
            result.current.handleToggleMute();
        });

        expect(result.current.isMuted).toBe(true);

        act(() => {
            result.current.handleToggleMute();
        });

        expect(result.current.isMuted).toBe(false);
    });
});
