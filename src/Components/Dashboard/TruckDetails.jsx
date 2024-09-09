import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import truckIMG from './box-truck.png'; // Truck icon for map marker
import L from 'leaflet';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';

// Custom Truck Icon
const truckIcon = new L.Icon({
  iconUrl: truckIMG,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

// Sample truck data
const truckData = {
  id: 'TRUCK001',
  capacity: '25 Tons',
  currentLocation: [20.5937, 78.9629], // Example: Somewhere in India
  status: 'On route to Mumbai',
  lastUpdate: '10 mins ago',
  destination: [19.076, 72.8777], // Example: Destination in Mumbai
};

function TruckDetails() {
  const [chatMessages, setChatMessages] = useState([
    { sender: 'System', message: 'Truck has departed from Nagpur.' },
    { sender: 'System', message: 'Truck is on route to Mumbai.' },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [truckAction, setTruckAction] = useState('');

  // Handle sending a new chat message
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setChatMessages([...chatMessages, { sender: 'User', message: newMessage }]);
      setNewMessage(''); // Clear the input after sending
    }
  };

  return (
    <div style={styles.container}>
      {/* Left Half: Truck Location Map */}
      <div style={styles.mapContainer}>
        <h3>Truck Location</h3>
        <MapContainer center={truckData.currentLocation} zoom={6} style={styles.map}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={truckData.currentLocation} icon={truckIcon}>
            <Tooltip>
              <div>
                <strong>Current Location</strong><br />
                {truckData.status}
              </div>
            </Tooltip>
          </Marker>

          {/* Marker for Destination */}
          <Marker position={truckData.destination}>
            <Tooltip>
              <div>
                <strong>Destination</strong><br />
                Mumbai
              </div>
            </Tooltip>
          </Marker>
        </MapContainer>
      </div>

      {/* Right Half: Truck Details & Chat */}
      <div style={styles.detailsContainer}>
        <div style={styles.detailsSection}>
          <h3>Truck Details</h3>
          <p><strong>Truck ID:</strong> {truckData.id}</p>
          <p><strong>Capacity:</strong> {truckData.capacity}</p>
          <p><strong>Current Status:</strong> {truckData.status}</p>
          <p><strong>Last Update:</strong> {truckData.lastUpdate}</p>

          {/* Onload/Offload Input and Buttons */}
          <input
            type="text"
            value={truckAction}
            onChange={(e) => setTruckAction(e.target.value)}
            placeholder="Enter action..."
            style={styles.truckActionInput}
          />
          <div style={styles.actionButtons}>
            <button style={styles.actionButton}>Onload</button>
            <button style={styles.actionButton}>Offload</button>
          </div>
        </div>

        <div style={styles.chatSection}>
          <h3>Updates / Chat</h3>
          <div style={styles.chatBox}>
            {chatMessages.map((msg, index) => (
              <div key={index} style={msg.sender === 'User' ? styles.userMessage : styles.systemMessage}>
                <strong>{msg.sender}: </strong>{msg.message}
              </div>
            ))}
          </div>

          <div style={styles.chatInputContainer}>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              style={styles.chatInput}
            />
            <button onClick={handleSendMessage} style={styles.sendButton}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// CSS-in-JS styles
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    overflowX:scroll,
    height: '100vh',  // Full-screen height
    width: '100vw',   // Full-screen width
  },
  mapContainer: {
    width: '50%',  // Takes 50% of the screen width
    padding: '20px',
    backgroundColor: '#f8f9fa',
    height: '100%', // Ensures the map container takes full height
  },
  map: {
    height: '85vh',  // Adjust the map height to take up most of the full screen
    width: '100%',
    borderRadius: '10px',
  },
  detailsContainer: {
    width: '50%',
    padding: '20px',
    backgroundColor: '#ffffff',
    borderLeft: '2px solid #e0e0e0',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',  // Ensures the details container takes full height
  },
  detailsSection: {
    marginBottom: '20px',
  },
  chatSection: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  chatBox: {
    flexGrow: 1,
    border: '1px solid #e0e0e0',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '10px',
    overflowY: 'scroll',
    backgroundColor: '#f8f9fa',
  },
  systemMessage: {
    padding: '5px',
    backgroundColor: '#d1e7dd',
    borderRadius: '10px',
    marginBottom: '5px',
    textAlign: 'left',
  },
  userMessage: {
    padding: '5px',
    backgroundColor: '#e2e3e5',
    borderRadius: '10px',
    marginBottom: '5px',
    textAlign: 'right',
  },
  chatInputContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  chatInput: {
    flexGrow: 1,
    padding: '10px',
    border: '1px solid #e0e0e0',
    borderRadius: '5px',
    marginRight: '10px',
  },
  sendButton: {
    padding: '10px 15px',
    backgroundColor: '#007bff',
    color: '#ffffff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  truckActionInput: {
    padding: '10px',
    border: '1px solid #e0e0e0',
    borderRadius: '5px',
    width: '100%',
    marginBottom: '10px',
  },
  actionButtons: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  actionButton: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#ffffff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginRight: '10px',
  },
};

export default TruckDetails;
