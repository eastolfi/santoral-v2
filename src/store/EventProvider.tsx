import React, { useState, type ReactNode } from 'react';
import { EventContext, type Language, type CalendarEvent } from './EventContext';

const getInitialLanguage = (): Language => {
  const storedLang = localStorage.getItem('calendar_lang');
  if (storedLang === 'en' || storedLang === 'es') {
    return storedLang as Language;
  }
  return 'es';
};

const getInitialEvents = (): CalendarEvent[] => {
  const storedEvents = localStorage.getItem('calendar_events');
  if (storedEvents) {
    try {
      return JSON.parse(storedEvents);
    } catch (e) {
      console.error('Failed to parse events', e);
    }
  }
  return [];
};

export const EventProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);
  const [events, setEventsState] = useState<CalendarEvent[]>(getInitialEvents);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('calendar_lang', lang);
  };

  const addEvent = (dateStr: string, text: string) => {
    const newEvent: CalendarEvent = {
      id: crypto.randomUUID(),
      dateStr,
      text,
    };
    const newEvents = [...events, newEvent];
    setEventsState(newEvents);
    localStorage.setItem('calendar_events', JSON.stringify(newEvents));
  };

  const deleteEvent = (id: string) => {
    const newEvents = events.filter(e => e.id !== id);
    setEventsState(newEvents);
    localStorage.setItem('calendar_events', JSON.stringify(newEvents));
  };

  return (
    <EventContext.Provider value={{ language, setLanguage, events, addEvent, deleteEvent }}>
      {children}
    </EventContext.Provider>
  );
};
