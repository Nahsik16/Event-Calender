/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid"; 
import CalendarView from "./components/CalendarView";
import Sidebar from "./components/Sidebar";
import EventModal from "./components/EventModal"; 
import { checkOverlap } from "./utils/Overlap"; 
import "./index.css";

const App = () => {
  const loadEventsFromLocalStorage = () => {
    const storedEvents = localStorage.getItem("events");
    return storedEvents ? JSON.parse(storedEvents) : [];
  };

  const [events, setEvents] = useState(loadEventsFromLocalStorage());
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [error, setError] = useState(""); 

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  const addEvent = (newEvent) => {
    if (checkOverlap(newEvent, events)) {
      setError("This event overlaps with an existing event.");
      return;}
    const newEventWithId = { ...newEvent, id: uuidv4() }; // Assign unique ID using uuid
    setEvents((prevEvents) => [...prevEvents, newEventWithId]);
    setError(""); 
  };

 

  const saveEvent = (event) => {
    if (editingEvent) {
      setEvents((prevEvents) =>
        prevEvents.map((e) =>
          e.id === editingEvent.id ? { ...e, ...event } : e
        ));
      setEditingEvent(null); 
    } 
    else {
      addEvent(event); 
    }
    setIsModalVisible(false); 
  };

  

  return (
    <div className="flex h-screen">
      {isSidebarVisible && (
        <div className="w-1/5">
          <Sidebar/>
        </div>
      )}
      <div className={`flex-1 bg-white p-6 ${isSidebarVisible ? "" : "w-full"}`}>
        
        <CalendarView events={events} onAddEvent={() => setIsModalVisible(true)} />
      </div>
      {isModalVisible && (
        <EventModal
          onClose={() => setIsModalVisible(false)}
          onSave={saveEvent}
          event={editingEvent} 
        />
      )}
      {error && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-red-500 text-white p-3 rounded mt-4">
          {error}
        </div>
      )}
    </div>
  );
};

export default App;
