
export interface TranscriptionTurn {
  id: string;
  speaker: 'user' | 'model';
  text: string;
  timestamp: string;
  rating?: 'good' | 'bad';
}

export interface ChatMessage {
    role: 'user' | 'model';
    parts: { text: string }[];
}

export interface Contact {
  id: string;
  name: string;
  phone: string;
}

export interface CallRecord {
  id: string;
  contactName: string;
  contactPhone: string;
  duration: number; // in seconds
  date: string;
}
