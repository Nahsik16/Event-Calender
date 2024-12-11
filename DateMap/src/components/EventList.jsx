/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import  { useState } from 'react';
import EventModal from './EventModal';

const EventList = ({
  selectedDay,
  events,
  currentDate,
  year,
  month,
  onAddEvent,
  onClose,
  onDeleteEvent,
  onEditEvent,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const dateKey = `${year}-${month}-${selectedDay}`;
  const dayEvents = events[dateKey] || [];

  const handleDelete = (eventId) => {
    onDeleteEvent(selectedDay, eventId); // Pass the selected day and event ID to delete
  };

  const handleEdit = (event) => {
    setEditingEvent(event); // Set event for editing
    setShowModal(true); // Show modal for editing
  };

  return (
    <div className="flex-col bg-white rounded-lg shadow-lg p-6">
      {/* Button Section */}
      <div className="flex justify-between mb-4">
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-500 text-white px-4 py-3 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Add Event
        </button>
        <button
          onClick={onClose}
          className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-400 transition duration-200"
        >
          Close
        </button>
      </div>

      {/* Event List */}
      <div className="space-y-4">
        {dayEvents.length > 0 ? (
          <ul>
            {dayEvents.map((event) => (
              <li key={event.id} className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-200">
                <strong className="text-xl font-semibold">{event.name}</strong>
                <span className="block text-sm text-gray-500">
                  {event.startTime} - {event.endTime}
                </span>
                <p className="text-gray-700 mt-2">{event.description}</p>
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => handleEdit(event)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(event.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No events scheduled for this day.</p>
        )}
      </div>

      {/* Event Modal */}
      {showModal && (
        <EventModal
          event={editingEvent}
          onClose={() => setShowModal(false)}
          onSave={(newEvent) => {
            onAddEvent(selectedDay, newEvent); // Update the event list
            setShowModal(false);
            setEditingEvent(null); // Reset editing state
          }}
        />
      )}
    </div>
  );
};

export default EventList;
