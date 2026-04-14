import React, { useState } from 'react';
import {
  format,
  addDays,
  subDays,
  getDaysInMonth,
  startOfMonth,
  getDay,
  getWeek,
  getDayOfYear,
  isLeapYear,

} from 'date-fns';
import { enUS, es } from 'date-fns/locale';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEventContext } from '../store/useEventContext';

export const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { language, events } = useEventContext();

  const locale = language === 'en' ? enUS : es;

  const handlePrevDay = () => setCurrentDate(subDays(currentDate, 1));
  const handleNextDay = () => setCurrentDate(addDays(currentDate, 1));

  // Date Information
  const year = format(currentDate, 'yyyy', { locale });
  const monthName = format(currentDate, 'MMMM', { locale });
  const dayNumber = format(currentDate, 'd', { locale });
  const dayName = format(currentDate, 'EEEE', { locale });

  // Custom Events
  const dateStr = format(currentDate, 'yyyy-MM-dd');
  const todaysEvents = events.filter(e => e.dateStr === dateStr);

  // Extra Info
  const weekNumber = getWeek(currentDate, { locale });
  const dayOfYear = getDayOfYear(currentDate);
  const totalDays = isLeapYear(currentDate) ? 366 : 365;
  const daysLeft = totalDays - dayOfYear;

  // Mini Calendar calculations
  const daysInMonth = getDaysInMonth(currentDate);
  const monthStart = startOfMonth(currentDate);
  const startDayOfWeek = getDay(monthStart); // 0 = Sunday, 1 = Monday, etc.

  // Shift so Monday is 0 for easier grid rendering if locale is ES
  // Using a standard Mo-Su grid.
  const gridStartDay = (startDayOfWeek === 0 ? 6 : startDayOfWeek - 1);

  const miniDays = [];
  for (let i = 0; i < gridStartDay; i++) {
    miniDays.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    miniDays.push(i);
  }

  const weekDayLabels = language === 'en'
    ? ['M', 'T', 'W', 'T', 'F', 'S', 'S']
    : ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

  const monthLabelOtherLang = language === 'en'
    ? format(currentDate, 'MMMM', { locale: es })
    : format(currentDate, 'MMMM', { locale: enUS });

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4 font-sans justify-center">

      {/* Navigation & Container */}
      <div className="flex items-center gap-4">
        <button onClick={handlePrevDay} className="p-2 rounded-full bg-white shadow hover:bg-gray-50 transition-colors">
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </button>

        <div className="w-full max-w-[320px] bg-white rounded-lg shadow-2xl overflow-hidden relative border border-gray-200">

          {/* Binder / Top part */}
          <div className="h-12 bg-gradient-to-b from-gray-200 to-gray-400 w-full relative flex items-center justify-center border-b-2 border-gray-400 shadow-sm">
             <div className="w-3/4 h-3 bg-gray-800 rounded-full shadow-inner opacity-80 border-b border-gray-600"></div>
          </div>

          {/* Header: Year & Month */}
          <div className="bg-[#aab4c8] text-[#1c2c5b] p-4 text-center border-b-4 border-[#1c2c5b] relative overflow-hidden">
             {/* Decorative lines mimicking the design */}
             <div className="absolute top-0 left-0 w-16 h-full border-r border-[#1c2c5b] opacity-20 rounded-r-full"></div>
             <div className="absolute top-0 right-0 w-16 h-full border-l border-[#1c2c5b] opacity-20 rounded-l-full"></div>

             <div className="text-2xl font-bold tracking-widest leading-none mb-1">{year}</div>
             <div className="text-4xl font-extrabold uppercase tracking-widest leading-none">{monthName}</div>
          </div>

          {/* Body */}
          <div className="flex flex-col items-center justify-center p-6 bg-white min-h-[250px] relative">
             {/* Background decorative watermark could go here */}

             {/* Date */}
             <div className="text-[120px] font-bold text-[#333] leading-[0.8] mb-2">{dayNumber}</div>
             <div className="text-2xl font-bold text-[#1c2c5b] uppercase mb-4">{dayName}</div>

             {/* Events / Subtext */}
             <div className="text-center text-xs font-semibold text-[#1c2c5b] flex flex-col gap-1 min-h-[40px] justify-center w-full px-2">
               {todaysEvents.length > 0 ? (
                 todaysEvents.map(event => (
                   <span key={event.id} className="uppercase break-words">{event.text}</span>
                 ))
               ) : (
                 <span className="text-gray-400 font-normal italic">
                   {language === 'en' ? 'No events' : 'Sin eventos'}
                 </span>
               )}
             </div>
          </div>

          {/* Footer: Mini calendar & extra info */}
          <div className="flex justify-between items-end p-4 text-xs font-semibold text-[#1c2c5b] border-t border-gray-100 bg-[#f8f9fa]">
             <div className="flex-1 max-w-[140px]">
                {/* Mini Calendar */}
                <div className="flex items-center gap-1 mb-1">
                  <div className="bg-[#1c2c5b] text-white text-[9px] px-1.5 py-0.5 uppercase tracking-wider font-bold">
                    {monthName}
                  </div>
                  <div className="text-[#1c2c5b] text-[9px] lowercase tracking-wider">
                    {monthLabelOtherLang}
                  </div>
                </div>

                <div className="grid grid-cols-7 gap-x-1 gap-y-0.5 text-center text-[9px]">
                  {weekDayLabels.map((lbl, idx) => (
                    <span key={idx} className="font-bold text-gray-500">{lbl}</span>
                  ))}
                  {miniDays.map((day, idx) => (
                    <span key={idx} className={`
                      ${day ? '' : 'text-transparent'}
                      ${day && day.toString() === dayNumber ? 'border border-[#1c2c5b] rounded-sm bg-gray-200' : ''}
                    `}>
                      {day || '-'}
                    </span>
                  ))}
                </div>
             </div>

             <div className="flex flex-col items-end text-[9px] text-right ml-2 leading-tight text-gray-600">
               <span>{language === 'en' ? 'Week' : 'Semana'} {weekNumber}</span>
               <span>{language === 'en' ? 'Day' : 'Día'} {dayOfYear}</span>
               <span>{language === 'en' ? 'Left' : 'Faltan'} {daysLeft}</span>
             </div>
          </div>

        </div>

        <button onClick={handleNextDay} className="p-2 rounded-full bg-white shadow hover:bg-gray-50 transition-colors">
          <ChevronRight className="w-6 h-6 text-gray-600" />
        </button>
      </div>
    </div>
  );
};
