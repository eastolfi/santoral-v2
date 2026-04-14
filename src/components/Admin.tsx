import React, { useState } from 'react';
import { useEventContext } from '../store/useEventContext';
import { Trash2 } from 'lucide-react';

export const Admin: React.FC = () => {
  const { language, setLanguage, events, addEvent, deleteEvent } = useEventContext();
  const [dateStr, setDateStr] = useState('');
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dateStr || !text) return;
    addEvent(dateStr, text);
    setText('');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 font-sans">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6 text-[#1c2c5b]">
          {language === 'en' ? 'Administration' : 'Administración'}
        </h1>

        <div className="mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            {language === 'en' ? 'Settings' : 'Ajustes'}
          </h2>
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium text-gray-700">
              {language === 'en' ? 'Language:' : 'Idioma:'}
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as 'en' | 'es')}
              className="p-2 border rounded shadow-sm focus:ring-[#1c2c5b] focus:border-[#1c2c5b]"
            >
              <option value="es">Español</option>
              <option value="en">English</option>
            </select>
          </div>
        </div>

        <div className="mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            {language === 'en' ? 'Add Event' : 'Añadir Evento'}
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {language === 'en' ? 'Date' : 'Fecha'}
              </label>
              <input
                type="date"
                value={dateStr}
                onChange={(e) => setDateStr(e.target.value)}
                className="w-full p-2 border rounded shadow-sm focus:ring-[#1c2c5b] focus:border-[#1c2c5b]"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {language === 'en' ? 'Text' : 'Texto'}
              </label>
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full p-2 border rounded shadow-sm focus:ring-[#1c2c5b] focus:border-[#1c2c5b]"
                placeholder={language === 'en' ? 'E.g. New Year' : 'Ej. Año Nuevo'}
                required
              />
            </div>
            <button
              type="submit"
              className="bg-[#1c2c5b] text-white px-4 py-2 rounded shadow hover:bg-blue-900 transition-colors font-medium self-start"
            >
              {language === 'en' ? 'Add' : 'Añadir'}
            </button>
          </form>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            {language === 'en' ? 'Existing Events' : 'Eventos Existentes'}
          </h2>
          {events.length === 0 ? (
            <p className="text-gray-500 italic">
              {language === 'en' ? 'No events found.' : 'No hay eventos.'}
            </p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {events.sort((a, b) => a.dateStr.localeCompare(b.dateStr)).map(event => (
                <li key={event.id} className="py-3 flex justify-between items-center">
                  <div>
                    <div className="font-semibold text-gray-800">{event.dateStr}</div>
                    <div className="text-gray-600">{event.text}</div>
                  </div>
                  <button
                    onClick={() => deleteEvent(event.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded transition-colors"
                    title={language === 'en' ? 'Delete' : 'Eliminar'}
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

      </div>
    </div>
  );
};
