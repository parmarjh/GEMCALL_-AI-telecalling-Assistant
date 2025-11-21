
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LiveCall from './LiveCall';
import userEvent from '@testing-library/user-event';

// Mock the @google/genai module
vi.mock('@google/genai', () => {
    return {
        GoogleGenAI: vi.fn().mockImplementation(() => ({
            live: {
                connect: vi.fn().mockResolvedValue({
                    close: vi.fn(),
                    sendRealtimeInput: vi.fn(),
                }),
            },
        })),
        Modality: {
            AUDIO: 'AUDIO',
        },
    };
});

// Mock navigator.mediaDevices
Object.defineProperty(global.navigator, 'mediaDevices', {
    value: {
        getUserMedia: vi.fn().mockResolvedValue({
            getTracks: () => [{ stop: vi.fn(), enabled: true }],
            getAudioTracks: () => [{ stop: vi.fn(), enabled: true }],
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

describe('LiveCall Component', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders the component correctly', () => {
        render(<LiveCall />);
        expect(screen.getByText('Contact Management')).toBeInTheDocument();
        expect(screen.getByText('Manual Entry')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Contact Name')).toBeInTheDocument();
    });

    it('allows adding a contact manually', async () => {
        render(<LiveCall />);
        const user = userEvent.setup();

        const nameInput = screen.getByPlaceholderText('Contact Name');
        const phoneInput = screen.getByPlaceholderText('Phone Number');
        const addButton = screen.getByText('Add Contact');

        await user.type(nameInput, 'John Doe');
        await user.type(phoneInput, '1234567890');
        await user.click(addButton);

        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('+1 1234567890')).toBeInTheDocument(); // Default country code is +1
    });

    it('shows error when adding empty contact', async () => {
        render(<LiveCall />);
        const user = userEvent.setup();
        const addButton = screen.getByText('Add Contact');

        await user.click(addButton);

        expect(screen.getByText('Name and phone number cannot be empty.')).toBeInTheDocument();
    });

    it('allows adding a contact to the queue', async () => {
        render(<LiveCall />);
        const user = userEvent.setup();

        // Add a contact first
        await user.type(screen.getByPlaceholderText('Contact Name'), 'Jane Doe');
        await user.type(screen.getByPlaceholderText('Phone Number'), '9876543210');
        await user.click(screen.getByText('Add Contact'));

        // Select the contact
        const checkbox = screen.getByRole('checkbox');
        await user.click(checkbox);

        // Add to queue
        const addToQueueButton = screen.getByText(/Add to Queue/);
        await user.click(addToQueueButton);

        // Check if it appears in the queue section (Right Column)
        // We can check for the clear queue button or just the name appearing in the queue list
        // Since the name is already in the contact list, we need to be careful.
        // The queue has a "Clear Queue" button which is disabled initially.
        const clearQueueButton = screen.getByText('Clear Queue');
        expect(clearQueueButton).not.toBeDisabled();
    });

    it('allows deleting a contact', async () => {
        render(<LiveCall />);
        const user = userEvent.setup();

        // Add a contact
        await user.type(screen.getByPlaceholderText('Contact Name'), 'Delete Me');
        await user.type(screen.getByPlaceholderText('Phone Number'), '5555555555');
        await user.click(screen.getByText('Add Contact'));

        expect(screen.getByText('Delete Me')).toBeInTheDocument();

        // Find delete button (it's hidden by default group-hover, but exists in DOM)
        const deleteButton = screen.getByTitle('Delete Contact');
        await user.click(deleteButton);

        expect(screen.queryByText('Delete Me')).not.toBeInTheDocument();
    });

    it('allows clearing all contacts', async () => {
        render(<LiveCall />);
        const user = userEvent.setup();

        // Add two contacts
        await user.type(screen.getByPlaceholderText('Contact Name'), 'Contact 1');
        await user.type(screen.getByPlaceholderText('Phone Number'), '1111111111');
        await user.click(screen.getByText('Add Contact'));

        await user.type(screen.getByPlaceholderText('Contact Name'), 'Contact 2');
        await user.type(screen.getByPlaceholderText('Phone Number'), '2222222222');
        await user.click(screen.getByText('Add Contact'));

        expect(screen.getByText('Contact 1')).toBeInTheDocument();
        expect(screen.getByText('Contact 2')).toBeInTheDocument();

        // Mock window.confirm
        const confirmSpy = vi.spyOn(window, 'confirm').mockReturnValue(true);

        // Click Clear List
        const clearButton = screen.getByText('Clear List');
        await user.click(clearButton);

        expect(confirmSpy).toHaveBeenCalled();
        expect(screen.queryByText('Contact 1')).not.toBeInTheDocument();
        expect(screen.queryByText('Contact 2')).not.toBeInTheDocument();
        expect(screen.getByText('No contacts added yet.')).toBeInTheDocument();
    });
});
