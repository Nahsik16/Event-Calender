// utils/overlapUtils.js

// Function to check if a new event overlaps with any existing event on the same date
export const checkOverlap = (newEvent, existingEvents) => {
  const newEventStart = new Date(newEvent.startTime).getTime();
  const newEventEnd = new Date(newEvent.endTime).getTime();

  // Filter the events on the same date
  const sameDateEvents = existingEvents.filter((event) => {
    const eventDate = new Date(event.startTime).toISOString().split('T')[0]; // Get date part (YYYY-MM-DD)
    const newEventDate = new Date(newEvent.startTime).toISOString().split('T')[0]; // Get date part (YYYY-MM-DD)
    return eventDate === newEventDate;
  });

  // Check for overlap on the same date
  return sameDateEvents.some((event) => {
    const existingEventStart = new Date(event.startTime).getTime();
    const existingEventEnd = new Date(event.endTime).getTime();

    // Check if the new event overlaps with any existing event on the same date
    return (
      (newEventStart >= existingEventStart && newEventStart < existingEventEnd) || // New event starts during existing event
      (newEventEnd > existingEventStart && newEventEnd <= existingEventEnd) || // New event ends during existing event
      (newEventStart < existingEventStart && newEventEnd > existingEventEnd) // New event completely envelops existing event
    );
  });
};
