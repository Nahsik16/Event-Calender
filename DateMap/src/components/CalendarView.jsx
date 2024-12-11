import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Import uuid to generate unique IDs
import EventList from './EventList';
import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState(JSON.parse(localStorage.getItem('events')) || {});
  const [selectedDay, setSelectedDay] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null); // For editing event

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Save events to localStorage
  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  // Generate days for the current month
  const generateDays = () => {
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

    const days = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(i);
    return days;
  };

  const handleDayClick = (day) => {
    if (!day) return;
    setSelectedDay(day);
  };

  const handleAddEvent = (day, newEvent) => {
    const dateKey = `${currentDate.getFullYear()}-${currentDate.getMonth()}-${day}`;
    const updatedEvent = { ...newEvent, id: uuidv4() }; // Assign a unique ID to each event
    const updatedEvents = {
      ...events,
      [dateKey]: [...(events[dateKey] || []), updatedEvent],
    };
    setEvents(updatedEvents);
  };

  const handleDeleteEvent = (day, eventId) => {
    const dateKey = `${currentDate.getFullYear()}-${currentDate.getMonth()}-${day}`;
    const updatedEvents = {
      ...events,
      [dateKey]: events[dateKey].filter(event => event.id !== eventId)
    };
    setEvents(updatedEvents);
  };

  const handleEditEvent = (day, event) => {
    setEditingEvent(event);
    setSelectedDay(day); 
  };

  const handleSaveEvent = (day, updatedEvent) => {
    const dateKey = `${currentDate.getFullYear()}-${currentDate.getMonth()}-${day}`;
    const updatedEvents = {
      ...events,
      [dateKey]: events[dateKey].map(event =>
        event.id === updatedEvent.id ? updatedEvent : event
      ),
    };
    setEvents(updatedEvents);
    setEditingEvent(null); // Clear editing mode after save
  };

  const isToday = (day) => {
    const today = new Date();
    return today.getDate() === day && today.getMonth() === month && today.getFullYear() === year;
  };
  const isWeekend = (day) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const dayOfWeek = date.getDay();
    return dayOfWeek === 0 || dayOfWeek === 6; // 0 for Sunday and 6 for Saturday
  };

  return (
    <div className="flex mt-11">
      {/* Calendar Section */}
      <div className={`flex-1 ${selectedDay ? 'mr-80' : 'mr-80'}`}>
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))}
            className=" flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            <FaAngleDoubleLeft /> <span>Previous</span>
          </button>
          <h2 className="text-2xl font-semibold text-center">
            {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
          </h2>
          <button
            onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))}
            className=" flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
           <span>Next</span> <FaAngleDoubleRight />
          </button>
        </div>
        <div className="grid grid-cols-7 gap-2 text-center">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
            <div key={d} className="font-bold text-gray-700">
              {d}
            </div>
          ))}
          {generateDays().map((day, index) => (
            <div
              key={index}
              className={`p-4 border rounded-lg cursor-pointer ${
                day
                ? isToday(day)
                    ? 'border-blue-500 bg-blue-100'
                    : selectedDay === day
                    ? 'border-blue-500 bg-yellow-100'
                    : isWeekend(day)
                    ? 'bg-red-100'
                    : 'hover:bg-blue-100'
                  : 'bg-gray-100'
              }`}
              onClick={() => handleDayClick(day)}
            >
              {day}
            </div>
          ))}
        </div>
      </div>

      {/* Right Sidebar (Event List) */}
      {selectedDay && (
        <div className="w-80 bg-gray-200 p-4 shadow-md h-full overflow-y-auto fixed top-0 right-0 z-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Events for {selectedDay}</h2>
            <button
              onClick={() => setSelectedDay(null)} // Close the sidebar
              className="text-xl text-gray-600 hover:text-gray-800"
            >
              &times;
            </button>
          </div>
          <EventList
            selectedDay={selectedDay}
            events={events}
            currentDate={currentDate}
            year={year}
            month={month}
            onAddEvent={handleAddEvent}
            onDeleteEvent={handleDeleteEvent}
            onEditEvent={handleEditEvent}
            onSaveEvent={handleSaveEvent}
            editingEvent={editingEvent}
          />
        </div>
      )}
    </div>
  );
};

export default Calendar;
