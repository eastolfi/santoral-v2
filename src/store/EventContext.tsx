import { createContext } from 'react';

export type Language = 'en' | 'es';

export interface CalendarEvent {
  id: string;
  dateStr: string; // YYYY-MM-DD
  text: string;
}

export interface EventContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  events: CalendarEvent[];
  addEvent: (dateStr: string, text: string) => void;
  deleteEvent: (id: string) => void;
}

export const EventContext = createContext<EventContextProps | undefined>(undefined);
