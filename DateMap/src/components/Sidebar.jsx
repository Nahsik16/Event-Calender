
import { useState, useEffect } from "react";
import Fuse from "fuse.js";
import { FaArrowRight } from "react-icons/fa";
import { saveAs } from "file-saver"; // To handle file download

const Sidebar = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isOpen, setIsOpen] = useState(false); // State to manage sidebar visibility
  const [selectedMonth, setSelectedMonth] = useState("12"); 
  const [selectedYear, setSelectedYear] = useState("2024"); 
  const [events, setEvents] = useState({}); 

  useEffect(() => {
    // Fetch events from localStorage when the component mounts
    const storedEvents = localStorage.getItem("events");
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    }
  }, []); // Only run once when the component mounts

  // Flatten the data for search (group events by date)
  const flattenedEvents = Object.entries(events).flatMap(([date, eventsOnDate]) =>
    eventsOnDate.map((event) => ({ ...event, date }))
  );

  // Fuse.js configuration for fuzzy search
  const fuse = new Fuse(flattenedEvents, {
    keys: ["name", "description", "date"], // Searchable fields
    threshold: 0.4, // Fuzzy search sensitivity
  });

  // Filter events based on the search keyword
  const filteredEvents =
    searchKeyword.trim() === ""
      ? flattenedEvents
      : fuse.search(searchKeyword).map((result) => result.item);

  // Group the filtered events by date (for search results)
  const groupedEventsbydates = filteredEvents.reduce((acc, event) => {
    if (!acc[event.date]) acc[event.date] = [];
    acc[event.date].push(event);
    console.log(event.date)
    return acc;
  }, {});


  // Filter events based on selected month and year
  const filteredByMonth = flattenedEvents.filter((event) => {
    const eventMonth = new Date(event.date).getMonth() + 1; // Get month from event date (0-based index, hence +1)
    const eventYear = new Date(event.date).getFullYear();
    return eventMonth === parseInt(selectedMonth) && eventYear === parseInt(selectedYear);
  });

  // Function to handle downloading events in JSON format for selected month
  const downloadJSON = () => {
    const data = JSON.stringify(filteredByMonth, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    saveAs(blob, `${selectedMonth}-${selectedYear}-events.json`);
  };

  // Function to handle downloading events in CSV format for selected month
  const downloadCSV = () => {
    const header = ["Date", "Name", "Start Time", "End Time", "Description"];
    const rows = filteredByMonth.map((event) => [
      event.date,
      event.name,
      event.startTime,
      event.endTime,
      event.description,
    ]);
    const csvContent = [
      header.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
    saveAs(blob, `${selectedMonth+1}-${selectedYear}-events.csv`);
  };

  return (
    <div className="h-full">
      {/* Button to open the sidebar */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white py-6 px-3.5 rounded-tr-2xl rounded-br-2xl hover:bg-blue-600"
        >
          <FaArrowRight />
        </button>
      )}

      {/* Sidebar content */}
      {isOpen && (
        <div className="sidebar h-full bg-gray-100 p-4 shadow-md w-full relative">
          {/* Close button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 focus:outline-none"
          >
            ✖
          </button>

          <h2 className="text-xl font-bold mb-4 text-gray-800">Events</h2>

          {/* Month and Year Selection */}
          <div className="mb-4">
            <label className="block text-gray-600">Select Month</label>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {[...Array(12).keys()].map((i) => (
                <option key={i} value={`0${i }`.slice(-2)}>
                  {new Date(0, i).toLocaleString("en-US", { month: "long" })}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-600">Select Year</label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {[2023, 2024, 2025].map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          {/* Download buttons */}
          <div className="mt-4 mb-4 flex space-x-4">
            <button
              onClick={downloadJSON}
              className="px-2 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Download JSON
            </button>
            <button
              onClick={downloadCSV}
              className="px-2 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Download CSV
            </button>
          </div>
          <br />
          {/* Search input */}
          <label className="top-3 text-lg font-bold text-gray-800">Search Events</label>
          <input
            type="text"
            placeholder="Search events by name, description, or date"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {/* Render events grouped by date (for search results) */}
          {Object.keys(groupedEventsbydates).length > 0 ? (
            Object.entries(groupedEventsbydates).map(([date, events]) => (
              <div key={date} className="mb-6">
                <h3 className="text-lg font-semibold text-gray-600 mb-2">{date}</h3>
                <ul className="space-y-2">
                  {events.map((event) => (
                    <li key={event.id} className="p-2 bg-white shadow rounded-md">
                      <strong className="block text-gray-800">{event.name}</strong>
                      <small className="block text-gray-500">
                        {event.startTime} - {event.endTime}
                      </small>
                      <p className="text-sm text-gray-600">{event.description}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No events match your search.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Sidebar;
